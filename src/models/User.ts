import { Schema, model, Types } from "mongoose";
import { IUser, IRefreshTokens, ITodo, TUserModel } from "../types";

const refreshTokenSchema = new Schema<Types.ObjectId & IRefreshTokens>({
  token: String,
  expiresAt: Date,
});

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
    description: {
      type: String,
      required: false,
      default: "",
      min: 0,
      max: 200,
    },
    level: {
      type: String,
      required: false,
      enum: ["normal", "important"],
      default: "normal",
    },
    status: {
      type: String,
      required: true,
      enum: ["done", "pending", "failed"],
      default: "pending",
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema<IUser, TUserModel>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshTokens: [refreshTokenSchema],
    todos: [todoSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User: TUserModel = model<IUser, TUserModel>("User", userSchema);

export default User;
