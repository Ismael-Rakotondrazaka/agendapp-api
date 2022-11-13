import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../../.env") });
import { Request, Response, NextFunction } from "express";
import { BadRequestError, UnauthorizedError } from "../../utils/errors";
import { User } from "../../models";
import { Types } from "mongoose";
import { IRefreshTokens } from "../../types";

export default async function logout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new BadRequestError("Property refresh token is required.");
    }

    const foundUser = await User.findOne({
      "refreshTokens.token": refreshToken,
    });

    if (!foundUser) {
      throw new UnauthorizedError();
    }

    const refreshTokenId = (
      foundUser.refreshTokens.find(
        (value) => value.token === refreshToken
      ) as Types.ObjectId & IRefreshTokens
    )?._id;

    foundUser.refreshTokens.id(refreshTokenId)?.remove();

    await foundUser.save();

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
