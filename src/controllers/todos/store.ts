import { Response, Request, NextFunction } from "express";
import { User } from "../../models";
import { BadRequestError, ConflictError } from "../../utils/errors";
import { createDataResponse } from "../../utils/responses";
import { todoResource } from "../../resources";
import { validateInterval } from "../../utils/dates";
import {
  validateTitle,
  validateDescription,
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
    // check if start is not in the future
    if (new Date(startAt).getTime() < Date.now()) {
      throw new BadRequestError(
        "Invalid interval. startAt is not in the future."
      );
    }
    startAt = interval.start;
    endAt = interval.end;
    level = validateLevel(level);

    // check if no todo exist in the interval
    // there are 3 possibilities
    const conflictTodo = await User.findOne({
      $or: [
        {
          $and: [
            { _id: targetUser._id },
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
            { _id: targetUser._id },
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
            { _id: targetUser._id },
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
      throw new ConflictError();
    }

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