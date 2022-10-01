import dotenv from "dotenv";
dotenv.config();
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

export default async function todoMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { todoId } = req.params;

    if (!/^[a-f0-9]+$/.test(todoId)) {
      throw new NotFoundError();
    }

    const targetUserId: string = (req as ICustomRequest).payload.user._id;
    const targetUser = await User.findOne({
      _id: targetUserId,
    }).select({
      _id: 1,
      todos: 1,
    });

    const targetTodo = targetUser?.todos.id(todoId);

    if (!targetTodo) {
      throw new NotFoundError();
    }

    next();
  } catch (error) {
    next(error);
  }
}
