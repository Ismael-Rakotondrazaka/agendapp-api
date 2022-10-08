import { Response, Request, NextFunction } from "express";
import { User } from "../../models";
import { BadRequestError } from "../../utils/errors";
import { Types } from "mongoose";
import { IEvent } from "../../types";
import { ForbiddenError } from "../../utils/errors/index";

interface ICustomRequest extends Request {
  payload: {
    user: {
      _id: string;
    };
  };
}

export default async function store(
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

    // check if event is in the past
    if (targetEvent.endAt.getTime() <= now.getTime()) {
      throw new ForbiddenError("Can't update past events.");
    }

    targetUser.events.id(eventId)?.remove();
    await targetUser.save();

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
