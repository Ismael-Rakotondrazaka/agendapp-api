import { Response, Request, NextFunction } from "express";
import { User } from "../../models";
import { BadRequestError } from "../../utils/errors";
import { createDataResponse } from "../../utils/responses";
import { eventResource } from "../../resources";
import { Types } from "mongoose";
import { IEvent } from "../../types";
import { isInSummaryPeriod, isToday } from "../../utils/dates";

interface ICustomRequest extends Request {
  payload: {
    user: {
      _id: string;
    };
  };
}

export default async function index(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const targetUserId: string = (req as ICustomRequest).payload.user._id;
    const targetUser = await User.findOne({
      _id: targetUserId,
    });

    if (!targetUser) {
      throw new BadRequestError();
    }

    const { eventId } = req.params;

    const targetEvent: (Types.Subdocument<Types.ObjectId> & IEvent) | null =
      targetUser.events.id(eventId);

    if (!targetEvent) {
      throw new BadRequestError();
    }

    const now = new Date();

    if (targetEvent.status === "pending") {
      if (
        targetEvent.startAt.getTime() < now.getTime() &&
        !isToday(targetEvent.startAt) &&
        !isInSummaryPeriod(targetEvent.startAt)
      ) {
        targetEvent.set({
          status: "failed",
        });

        await targetUser.save();
      }
    }

    return res.json(
      createDataResponse({
        event: eventResource(targetEvent),
      })
    );
  } catch (error) {
    next(error);
  }
}
