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
  channelId: string;
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
  email: string;
  createdAt: Date | string | number;
  updatedAt: Date | string | number;
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

export interface IGeneralError {
  isSecret: () => boolean;
  getStatusCode: () => number;
  getStatusText: () => string;
  getCode: () => string;
  getMessage: () => string;
  getPrivateMessage: () => string;
  getDateTime: () => Date;
}

export interface IServerToClientEvents {
  "events:store": (event: TEventResource) => void;
  "events:update": (event: TEventResource) => void;
  "events:destroy": (id: string) => void;
}

export interface IClientToServerEvents {
  hello: () => void;
}
