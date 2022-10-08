import { Types, Model } from "mongoose";

// User

export interface IRefreshTokens {
  token: string;
  expiresAt: Date;
}

export interface IEvent {
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
  refreshTokens: Types.DocumentArray<Types.ObjectId & IRefreshTokens>;
  events: Types.DocumentArray<Types.ObjectId & IEvent>;
};

export interface IUser {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  refreshTokens: IRefreshTokens[];
  events: IEvent[];
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

export type TEventResource = {
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
