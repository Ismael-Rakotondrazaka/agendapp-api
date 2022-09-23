export type TUserResource = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
};

export interface IUser {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  refreshTokens: string[];
}

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
