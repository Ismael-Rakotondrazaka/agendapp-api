import { Response, Request, NextFunction } from "express";
import { User } from "../../models";
import { BadRequestError } from "../../utils/errors";
import { createDataResponse } from "../../utils/responses";
import { eventResource } from "../../resources";
import { isToday, isInSummaryPeriod } from "../../utils/dates";
import { Types } from "mongoose";
import { IEvent } from "../../types";

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
    }).select({ refreshTokens: 0 });

    if (!targetUser) {
      throw new BadRequestError();
    }

    const now = new Date();

    const events = (
      targetUser.events as (Types.Subdocument<Types.ObjectId> & IEvent)[]
    ).map((event) => {
      if (event.status === "pending") {
        if (
          event.startAt.getTime() < now.getTime() &&
          !isToday(event.startAt) &&
          !isInSummaryPeriod(event.startAt)
        ) {
          event.set({
            status: "failed",
          });
        }
      }

      return eventResource(event);
    });

    await targetUser.save();

    return res.json(
      createDataResponse({
        events,
      })
    );
  } catch (error) {
    next(error);
  }
}
