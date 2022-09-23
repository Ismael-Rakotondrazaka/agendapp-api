import { Request, Response, NextFunction } from "express";
import { GeneralError, UnknownError } from "../utils/errors/index";
import { createErrorResponse } from "../utils/responses/index";

function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    if (err instanceof GeneralError) {
      return res.status(err.getStatusCode()).json(createErrorResponse(err));
    } else {
      const serverError = new UnknownError();
      return res
        .status(serverError.getStatusCode())
        .json(createErrorResponse(serverError));
    }
  }
  next();
}

export default errorMiddleware;
