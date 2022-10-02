import { Response, Request, NextFunction } from "express";
import { User } from "../../models";
import { BadRequestError } from "../../utils/errors";
import { createDataResponse } from "../../utils/responses";
import { todoResource } from "../../resources";
import { Types } from "mongoose";
import { ITodo } from "../../types";

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

    const { todoId } = req.params;

    const targetTodo: (Types.Subdocument<Types.ObjectId> & ITodo) | null =
      targetUser.todos.id(todoId);

    if (!targetTodo) {
      throw new BadRequestError();
    }

    return res.json(
      createDataResponse({
        todo: todoResource(targetTodo),
      })
    );
  } catch (error) {
    next(error);
  }
}
