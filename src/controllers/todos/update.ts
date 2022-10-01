import { Response, Request, NextFunction } from "express";
import { User } from "../../models";
import { BadRequestError, ConflictError } from "../../utils/errors";
import { createDataResponse } from "../../utils/responses";
import { todoResource } from "../../resources";
import {
  validateTitle,
  validateDescription,
  validateLevel,
  validateStatus,
} from "../../utils/strings";
import { validateInterval } from "../../utils/dates";
import { ITodo } from "../../types";
import { Types } from "mongoose";
import todoConfig from "../../configs/todoConfig.json";

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

    const { todoId } = req.params;

    const targetTodo: (Types.Subdocument<Types.ObjectId> & ITodo) | null =
      targetUser.todos.id(todoId);

    if (!targetTodo) {
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

    const todoUpdate: Record<string, string> = {
      title,
      description,
      status,
      level,
      startAt,
      endAt,
    };

    /*
      if update is possible, there are 2 possibilities: update past or future todo
    */
    let updateType: "past" | "future";

    // check if the targetTodo is on the same day as now
    if (
      targetTodo.startAt.getFullYear() === now.getFullYear() &&
      targetTodo.startAt.getMonth() === now.getMonth() &&
      targetTodo.startAt.getDate() === now.getDate()
    ) {
      // check if targetTodo.endAt is in the past
      if (targetTodo.endAt.getTime() <= now.getTime()) {
        updateType = "past";
      } else {
        // check if now is in the interval of the targetTodo
        if (targetTodo.startAt.getTime() < now.getTime()) {
          updateType = "past";
        }
        // the targetTodo is in the future but on the same day as now
        else {
          updateType = "future";
        }
      }
    }
    // check if the targetTodo is in the past
    else if (targetTodo.endAt.getTime() <= now.getTime()) {
      // check if the targetTodo is ONE DAY before now (yesterday)
      if (
        targetTodo.startAt.getFullYear() === now.getFullYear() &&
        targetTodo.startAt.getMonth() ===
          new Date(now.getTime() - 24 * 60 * 60 * 1000).getMonth() &&
        targetTodo.startAt.getDate() ===
          new Date(now.getTime() - 24 * 60 * 60 * 1000).getDate()
      ) {
        // check if now is on the Summary Period
        const summaryDate = new Date(now.getTime());
        summaryDate.setHours(0, todoConfig.TODO_SUMMARY_PERIOD_MINUTES, 0, 0);
        if (now.getTime() <= summaryDate.getTime()) {
          updateType = "past";
        } else {
          throw new BadRequestError(
            "Can't update past todos unless it's on pervious day and the update is made in the Summary period."
          );
        }
      } else {
        throw new BadRequestError(
          "Can't update past todos unless it's on pervious day and the update is made in the Summary period."
        );
      }
    }
    // the targetTodo is in FUTURE DAYS
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
        todoUpdate[field] !==
        (targetTodo as unknown as Record<string, string>)[field]
      ) {
        throw new BadRequestError(
          `Update to field ${field} is not allowed since the target todo is in the ${updateType}.`
        );
      }
    }

    // check if an update is made
    let hasChange = false;
    for (const field of fieldUpdatable) {
      // .toString() give make them works even if both are Dates
      if (
        todoUpdate[field].toString() !==
        (targetTodo as unknown as Record<string, string>)[field].toString()
      ) {
        hasChange = true;
        break;
      }
    }
    if (!hasChange) {
      throw new BadRequestError("No update found.");
    }

    const conflictTodo = await User.findOne({
      $or: [
        {
          $and: [
            {
              _id: {
                $ne: targetUser._id,
              },
            },
            {
              "todos.startAt": {
                $gte: startAt,
                $lt: endAt,
              },
            },
            {
              "todos.endAt": {
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
              "todos.startAt": {
                $lt: startAt,
              },
            },
            {
              "todos.endAt": {
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
              "todos.startAt": {
                $gte: startAt,
              },
            },
            {
              "todos.endAt": {
                $lte: endAt,
              },
            },
          ],
        },
      ],
    });

    if (conflictTodo) {
      throw new ConflictError(
        "One or many tasks are already existing on the interval given."
      );
    }

    targetTodo.set(todoUpdate);

    await targetUser.save();

    return res.status(201).json(
      createDataResponse({
        todo: todoResource(targetTodo),
      })
    );
  } catch (error) {
    next(error);
  }
}
