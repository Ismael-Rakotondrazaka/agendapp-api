import { Response, Request, NextFunction } from "express";
import { User } from "../../models";
import { BadRequestError, ConflictError } from "../../utils/errors";
import { createDataResponse } from "../../utils/responses";
import { eventResource } from "../../resources";
import {
  validateTitle,
  validateDescription,
  validateLevel,
  validateStatus,
} from "../../utils/strings";
import { validateInterval } from "../../utils/dates";
import { IEvent } from "../../types";
import { Types } from "mongoose";
import eventConfig from "../../configs/eventConfig.json";

interface ICustomRequest extends Request {
  payload: {
    user: {
      _id: string;
    };
  };
}

export default async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const targetUserId: string = (req as ICustomRequest).payload.user._id;
    const targetUser = await User.findOne({
      _id: targetUserId,
    }).select({ refreshTokens: 0 });

    if (!targetUser) {
      throw new BadRequestError();
    }

    const { eventId } = req.params;

    const targetEvent: (Types.Subdocument<Types.ObjectId> & IEvent) | null =
      targetUser.events.id(eventId);

    if (!targetEvent) {
      throw new BadRequestError();
    }

    let { title, description, level, status, startAt, endAt } = req.body;

    const FIELDS: string[] = [
      "title",
      "description",
      "status",
      "level",
      "startAt",
      "endAt",
    ];

    if (!title || !description || !status || !level || !startAt || !endAt) {
      throw new BadRequestError(`Fields ${FIELDS.join(", ")} are required.`);
    }

    // force to be string
    title = title + "";
    description = description + "";
    startAt = startAt + "";
    endAt = endAt + "";
    level = level + "";

    title = validateTitle(title);
    description = validateDescription(description);
    const interval = validateInterval(startAt, endAt);
    startAt = interval.start;
    endAt = interval.end;
    level = validateLevel(level);
    status = validateStatus(status);

    // ! there is an delay between the request sent by the client side and now
    const now = new Date();

    const eventUpdate: Record<string, string> = {
      title,
      description,
      status,
      level,
      startAt,
      endAt,
    };

    /*
      if update is possible, there are 2 possibilities: update past or future event
    */
    let updateType: "past" | "future";

    // check if the targetEvent is on the same day as now
    if (
      targetEvent.startAt.getFullYear() === now.getFullYear() &&
      targetEvent.startAt.getMonth() === now.getMonth() &&
      targetEvent.startAt.getDate() === now.getDate()
    ) {
      // check if targetEvent.endAt is in the past
      if (targetEvent.endAt.getTime() <= now.getTime()) {
        updateType = "past";
      } else {
        // check if now is in the interval of the targetEvent
        if (targetEvent.startAt.getTime() < now.getTime()) {
          updateType = "past";
        }
        // the targetEvent is in the future but on the same day as now
        else {
          updateType = "future";
        }
      }
    }
    // check if the targetEvent is in the past
    else if (targetEvent.endAt.getTime() <= now.getTime()) {
      // check if the targetEvent is ONE DAY before now (yesterday)
      if (
        targetEvent.startAt.getFullYear() === now.getFullYear() &&
        targetEvent.startAt.getMonth() ===
          new Date(now.getTime() - 24 * 60 * 60 * 1000).getMonth() &&
        targetEvent.startAt.getDate() ===
          new Date(now.getTime() - 24 * 60 * 60 * 1000).getDate()
      ) {
        // check if now is on the Summary Period
        const summaryDate = new Date(now.getTime());
        summaryDate.setHours(0, eventConfig.EVENT_SUMMARY_PERIOD_MINUTES, 0, 0);
        if (now.getTime() <= summaryDate.getTime()) {
          updateType = "past";
        } else {
          throw new BadRequestError(
            "Can't update past events unless it's on pervious day and the update is made in the Summary period."
          );
        }
      } else {
        throw new BadRequestError(
          "Can't update past events unless it's on pervious day and the update is made in the Summary period."
        );
      }
    }
    // the targetEvent is in FUTURE DAYS
    else {
      updateType = "future";
    }

    let fieldUpdatable: string[];
    let fieldNoChange: string[];

    if (updateType === "future") {
      fieldUpdatable = ["title", "description", "startAt", "endAt", "level"];
      fieldNoChange = ["status"];
    } else {
      fieldUpdatable = ["status"];
      fieldNoChange = ["title", "description", "startAt", "endAt", "level"];
    }

    // check if an update to fieldNoChange is made
    for (const field of fieldNoChange) {
      if (
        eventUpdate[field] !==
        (targetEvent as unknown as Record<string, string>)[field]
      ) {
        throw new BadRequestError(
          `Update to field ${field} is not allowed since the target event is in the ${updateType}.`
        );
      }
    }

    // check if an update is made
    let hasChange = false;
    for (const field of fieldUpdatable) {
      // .toString() give make them works even if both are Dates
      if (
        eventUpdate[field].toString() !==
        (targetEvent as unknown as Record<string, string>)[field].toString()
      ) {
        hasChange = true;
        break;
      }
    }
    if (!hasChange) {
      throw new BadRequestError("No update found.");
    }

    const conflictEvent = await User.findOne({
      $or: [
        {
          $and: [
            {
              _id: {
                $ne: targetUser._id,
              },
            },
            {
              "events.startAt": {
                $gte: startAt,
                $lt: endAt,
              },
            },
            {
              "events.endAt": {
                $gt: endAt,
              },
            },
          ],
        },
        {
          $and: [
            {
              _id: {
                $ne: targetUser._id,
              },
            },
            {
              "events.startAt": {
                $lt: startAt,
              },
            },
            {
              "events.endAt": {
                $gt: startAt,
                $lte: endAt,
              },
            },
          ],
        },
        {
          $and: [
            {
              _id: {
                $ne: targetUser._id,
              },
            },
            {
              "events.startAt": {
                $gte: startAt,
              },
            },
            {
              "events.endAt": {
                $lte: endAt,
              },
            },
          ],
        },
      ],
    });

    if (conflictEvent) {
      throw new ConflictError(
        "One or many tasks are already existing on the interval given."
      );
    }

    targetEvent.set(eventUpdate);

    await targetUser.save();

    return res.status(201).json(
      createDataResponse({
        event: eventResource(targetEvent),
      })
    );
  } catch (error) {
    next(error);
  }
}
