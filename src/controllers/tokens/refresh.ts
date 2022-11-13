import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../../.env") });
import { Request, Response, NextFunction } from "express";
import { User } from "../../models";
import { BadRequestError, UnauthorizedError } from "../../utils/errors";
import jwt from "jsonwebtoken";
import authConfig from "../../configs/authConfig.json";
import createDataResponse from "../../utils/responses/createDataResponse";
import { Types } from "mongoose";
import { IRefreshTokens } from "../../types";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new BadRequestError("Field 'refreshToken' is required.");
    }

    const foundUser = await User.findOne({
      "refreshTokens.token": refreshToken,
    });

    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "";

    // no user with the same RT found
    if (!foundUser) {
      jwt.verify(refreshToken, refreshTokenSecret, {}, async (err, decoded) => {
        // someone is trying to use inexistant refreshToken
        if (err) {
          return next(new UnauthorizedError());
        } else {
          const hackedUserId = (decoded as unknown as Record<string, any>)?.user
            ._id;
          const hackedUser = await User.findById(hackedUserId);

          if (!hackedUser) {
            // ! maybe the refreshTokenSecret has been leaked or the user's account has been deleted
            return next(new UnauthorizedError());
          } else {
            hackedUser.updateOne({
              refreshTokens: [],
            });

            await hackedUser.save();

            return next(new UnauthorizedError());
          }
        }
      });
    } else {
      jwt.verify(refreshToken, refreshTokenSecret, {}, async (err) => {
        // the token is expired or the refreshTokenSecret has been changed
        if (err) {
          return next(new UnauthorizedError());
        } else {
          const refreshTokenSecret: string =
            process.env.REFRESH_TOKEN_SECRET || "";
          const accessTokenSecret: string =
            process.env.ACCESS_TOKEN_SECRET || "";
          const refreshTokenExpires = new Date();
          refreshTokenExpires.setTime(
            refreshTokenExpires.getTime() + authConfig.REFRESH_TOKEN_LIFE
          );

          const newRefreshToken: string = jwt.sign(
            {
              user: {
                _id: foundUser._id,
              },
            },
            refreshTokenSecret,
            {
              expiresIn: `${refreshTokenExpires.getTime() + 15400}`,
            }
          );

          const newAccessToken: string = jwt.sign(
            {
              user: {
                _id: foundUser._id,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
              },
            },
            accessTokenSecret,
            {
              expiresIn: `${authConfig.ACCESS_TOKEN_LIFE}ms`,
            }
          );

          // find the RT's _id
          const refreshTokenId = (
            foundUser.refreshTokens.find(
              (value) => value.token === refreshToken
            ) as Types.ObjectId & IRefreshTokens
          )?._id;

          // delete the old RT
          foundUser.refreshTokens.id(refreshTokenId)?.remove();

          // const updatedUser = await foundUser.save();

          foundUser.refreshTokens.push({
            token: newRefreshToken,
          });

          await foundUser.save();

          return res.json(
            createDataResponse({
              tokens: {
                refreshToken: newRefreshToken,
                accessToken: newAccessToken,
              },
            })
          );
        }
      });
    }
  } catch (error) {
    next(error);
  }
}
