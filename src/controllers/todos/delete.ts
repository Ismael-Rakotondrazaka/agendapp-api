import { Response, Request, NextFunction } from "express";
import { User } from "../../models";
import { BadRequestError } from "../../utils/errors";
import { Types } from "mongoose";
import { ITodo } from "../../types";
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

    const { todoId } = req.params;

    const targetTodo: (Types.Subdocument<Types.ObjectId> & ITodo) | null =
      targetUser.todos.id(todoId);

    if (!targetTodo) {
      throw new BadRequestError();
    }

    const now = new Date();

    // check if todo is in the past
    if (targetTodo.endAt.getTime() <= now.getTime()) {
      throw new ForbiddenError("Can't update past todos.");
    }

    targetUser.todos.id(todoId)?.remove();
    await targetUser.save();

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
