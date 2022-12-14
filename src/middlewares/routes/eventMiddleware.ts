import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../../.env") });
import { Response, Request, NextFunction } from "express";
import { User } from "../../models";
import { NotFoundError } from "../../utils/errors";

interface ICustomRequest extends Request {
  payload: {
    user: {
      _id: string;
    };
  };
}

export default async function eventMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { eventId } = req.params;

    if (!/^[a-f0-9]+$/.test(eventId)) {
      throw new NotFoundError();
    }

    const targetUserId: string = (req as ICustomRequest).payload.user._id;
    const targetUser = await User.findOne({
      _id: targetUserId,
    }).select({
      _id: 1,
      events: 1,
    });

    const targetEvent = targetUser?.events.id(eventId);

    if (!targetEvent) {
      throw new NotFoundError();
    }

    next();
  } catch (error) {
    next(error);
  }
}
