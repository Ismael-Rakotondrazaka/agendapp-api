import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { HydratedDocument } from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../../models";
import { IUser } from "../../types";
import { BadRequestError, ConflictError } from "../../utils/errors";
import { createDataResponse } from "../../utils/responses";
import authConfig from "../../configs/authConfig.json";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validatePasswordValidation,
} from "../../utils/strings";
import { userResource } from "../../resources";
import { nanoid } from "nanoid";

export default async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    let { firstName, lastName, email, password, passwordValidation } = req.body;

    const FIELDS: {
      name: string;
      type: string;
      required: boolean;
    }[] = [
      {
        name: "firstName",
        type: "string",
        required: true,
      },
      {
        name: "lastName",
        type: "string",
        required: true,
      },
      {
        name: "email",
        type: "email",
        required: true,
      },
      {
        name: "password",
        type: "string",
        required: true,
      },
      {
        name: "passwordValidation",
        type: "string",
        required: true,
      },
    ];

    const FIELDS_REQUIRED: {
      name: string;
      type: string;
      required: boolean;
    }[] = FIELDS.filter((field) => field.required);

    if (!firstName || !lastName || !email || !password || !passwordValidation) {
      throw new BadRequestError(
        `Fields ${FIELDS_REQUIRED.map((field) => field.name).join(
          ", "
        )} are required.`
      );
    }

    // force inputs to be string
    firstName = firstName + "";
    lastName = lastName + "";
    email = email + "";
    password = password + "";
    passwordValidation = passwordValidation + "";

    // validate inputs
    firstName = validateFirstName(firstName);
    lastName = validateLastName(lastName);
    email = validateEmail(email);

    const duplicateUser: HydratedDocument<IUser> | null = await User.findOne({
      email: email,
    });

    if (duplicateUser) {
      throw new ConflictError("Email already in use.");
    }

    validatePassword(password);
    validatePasswordValidation(passwordValidation, password);

    const hashedPassword: string = bcrypt.hashSync(
      password,
      authConfig.PASSWORD_SALT_ROUNDS
    );

    const targetUser = new User({
      firstName,
      lastName,
      email,
      channelId: nanoid(),
      password: hashedPassword,
    });

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

    return res.status(201).json(
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
