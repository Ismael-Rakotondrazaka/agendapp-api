import { Types, Model } from "mongoose";

// User

export interface IRefreshTokens {
  token: string;
  expiresAt: Date;
}

export interface ITodo {
  title: string;
  description: string;
  level: string;
  status: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date | string | number;
  updatedAt: Date | string | number;
}

export type TUserDocumentProps = {
  refreshTokens: Types.DocumentArray<IRefreshTokens>;
  todos: Types.DocumentArray<ITodo>;
};

export interface IUser {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  refreshTokens: IRefreshTokens[];
  todos: ITodo[];
}

export type TUserModel = Model<
  IUser,
  Record<string, unknown>,
  TUserDocumentProps
>;

// Resource

export type TUserResource = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
};

export type TTodoResource = {
  _id: string;
  title: string;
  description: string;
  level: string;
  status: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date | string | number;
  updatedAt: Date | string | number;
};

// Response

export type TDataResponse = {
  data: Record<string, unknown>;
};

export type TErrorResponse = {
  error: {
    message: string;
    statusText: string;
    statusCode: number;
    code: string;
    dateTime: string | Date;
  };
};
