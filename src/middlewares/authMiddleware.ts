import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../../.env") });
import { Response, Request, NextFunction } from "express";
import { ForbiddenError } from "../utils/errors";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { User } from "../models";

interface ICustomRequest extends Request {
  payload: Record<string, unknown> | null | undefined;
}

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const token: string =
      (req.header("Authorization") || "").split(" ")[1] || "";

    if (!token) {
      throw new ForbiddenError();
    }

    const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET || "";
    const decoded: string | JwtPayload = jwt.verify(token, accessTokenSecret);

    if (
      decoded == null ||
      typeof decoded != "object" ||
      typeof decoded === "string"
    ) {
      throw new ForbiddenError();
    }

    const targetUser = await User.findOne({
      _id: decoded?.user?._id,
    }).select({
      _id: 1,
    });

    if (!targetUser) {
      throw new ForbiddenError();
    }

    (req as ICustomRequest).payload = {
      user: {
        _id: targetUser._id,
      },
    };

    next();
  } catch (error) {
    (req as ICustomRequest).payload = null;

    if (error instanceof JsonWebTokenError) {
      next(new ForbiddenError());
    } else {
      next(error);
    }
  }
}
