import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import { User } from "../../models";
import { BadRequestError } from "../../utils/errors";
import createDataResponse from "../../utils/responses/createDataResponse";
import { HydratedDocument, Types } from "mongoose";
import { IUser, TUserDocumentProps } from "../../types";
import userResource from "../../resources/userResource";

interface ICustomRequest extends Request {
  payload: {
    user: {
      _id: string;
    };
  };
}

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const targetUserId: string = (req as ICustomRequest).payload.user._id;

    const targetUser:
      | (HydratedDocument<unknown, any, IUser> &
          IUser & {
            _id: Types.ObjectId;
          } & TUserDocumentProps)
      | null = await User.findOne({
        _id: targetUserId,
      }).select({
        refreshTokens: 0,
        events: 0,
      });

    if (!targetUser) {
      throw new BadRequestError();
    }

    return res.json(
      createDataResponse({
        user: userResource(targetUser),
      })
    );
  } catch (error) {
    next(error);
  }
}
