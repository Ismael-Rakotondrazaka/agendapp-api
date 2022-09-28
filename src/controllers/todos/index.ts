import { Response, Request, NextFunction } from "express";
import { User } from "../../models";
import { BadRequestError } from "../../utils/errors";
import { createDataResponse } from "../../utils/responses";
import { todoResource } from "../../resources";

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

    const todos = targetUser.todos.map((todo) => todoResource(todo));

    return res.json(
      createDataResponse({
        todos,
      })
    );
  } catch (error) {
    next(error);
  }
}
