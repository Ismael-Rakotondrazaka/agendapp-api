import { Response, Request, NextFunction } from "express";
import { User } from "../../models";
import { BadRequestError } from "../../utils/errors";
import { createDataResponse } from "../../utils/responses";
import { todoResource } from "../../resources";
import {
  validateTitle,
  validateDescription,
  validateInterval,
  validateLevel,
} from "../../utils/strings";

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
    // TODO what if it's not the best way
    const targetUserId: string = (req as ICustomRequest).payload.user._id;
    const targetUser = await User.findOne({
      _id: targetUserId,
    }).select({ refreshTokens: 0 });

    if (!targetUser) {
      throw new BadRequestError();
    }

    let { title, description, startAt, endAt, level } = req.body;

    const FIELDS: {
      name: string;
      type: string;
      required: boolean;
    }[] = [
      {
        name: "title",
        type: "string",
        required: true,
      },
      {
        name: "description",
        type: "string",
        required: false,
      },
      {
        name: "startAt",
        type: "string",
        required: true,
      },
      {
        name: "endAt",
        type: "string",
        required: true,
      },
      {
        name: "level",
        type: "string",
        required: false,
      },
    ];

    const FIELDS_REQUIRED: {
      name: string;
      type: string;
      required: boolean;
    }[] = FIELDS.filter((field) => field.required);

    if (!title || !startAt || !endAt) {
      throw new BadRequestError(
        `Fields ${FIELDS_REQUIRED.map((field) => field.name).join(
          ", "
        )} are required`
      );
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

    const targetTodo = targetUser.todos.create({
      title,
      description,
      startAt,
      endAt,
      level,
    });

    targetUser.todos.push(targetTodo);
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
