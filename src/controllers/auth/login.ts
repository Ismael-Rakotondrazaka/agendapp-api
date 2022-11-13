import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../../.env") });
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BadRequestError, UnauthorizedError } from "../../utils/errors";
import { validateEmail, validatePassword } from "../../utils/strings";
import { User } from "../../models";
import authConfig from "../../configs/authConfig.json";
import { createDataResponse } from "../../utils/responses";
import { userResource } from "../../resources";

export default async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    let { email, password } = req.body;

    const FIELDS: {
      name: string;
      type: string;
      required: boolean;
    }[] = [
      {
        name: "email",
        type: "string",
        required: true,
      },
      {
        name: "password",
        type: "string",
        required: true,
      },
    ];

    const FIELDS_REQUIRED: {
      name: string;
      type: string;
      required: boolean;
    }[] = FIELDS.filter((field) => field.required);

    if (!email || !password) {
      throw new BadRequestError(
        `Fields ${FIELDS_REQUIRED.map((field) => field.name).join(
          ", "
        )} are required.`
      );
    }

    // force inputs to be string
    email = email + "";
    password = password + "";

    // validate inputs
    email = validateEmail(email);
    validatePassword(password);

    const targetUser = await User.findOne({
      email: email,
    });

    if (!targetUser) {
      throw new UnauthorizedError("Credential doesn't match to our record.");
    }

    // compare password
    const passwordMatch: boolean = bcrypt.compareSync(
      password,
      targetUser.password
    );

    if (!passwordMatch) {
      throw new UnauthorizedError("Credential doesn't match to our record.");
    }

    const accessTokenData = {
      user: userResource(targetUser),
    };
    const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET || "";
    const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
      expiresIn: `${authConfig.ACCESS_TOKEN_LIFE}ms`,
    });

    const refreshTokenData = {
      user: {
        _id: targetUser._id.toString(),
      },
    };
    const refreshTokenExpires = new Date();
    refreshTokenExpires.setTime(
      refreshTokenExpires.getTime() + authConfig.REFRESH_TOKEN_LIFE
    );
    const refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET || "";
    const refreshToken = jwt.sign(refreshTokenData, refreshTokenSecret, {
      expiresIn: `${refreshTokenExpires.getTime()}`,
    });

    targetUser.refreshTokens.push({
      token: refreshToken,
      expiresAt: refreshTokenExpires,
    });

    await targetUser.save();

    return res.status(200).json(
      createDataResponse({
        user: userResource(targetUser),
        tokens: {
          accessToken,
          refreshToken,
          tokenType: "bearer",
        },
      })
    );
  } catch (error) {
    next(error);
  }
}
