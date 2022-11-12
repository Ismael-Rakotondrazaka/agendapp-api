import { IncomingMessage } from "http";
import { JsonWebTokenError, JwtPayload, verify } from "jsonwebtoken";
import { Socket } from "socket.io";
import { User } from "../../models";
import { IClientToServerEvents, IServerToClientEvents } from "../../types";
import {
  ForbiddenError,
  GeneralError,
  UnauthorizedError,
} from "../../utils/errors";
import { createErrorResponse } from "../../utils/responses";

interface ISocketRequest extends IncomingMessage {
  payload: Record<string, unknown> | null | undefined;
}

interface ISocketError extends GeneralError {
  data?: Record<string, unknown> | null | undefined;
}

const authMiddleware = async (
  socketClient: Socket<IClientToServerEvents, IServerToClientEvents>,
  next: (err?: Error | undefined) => void
) => {
  try {
    const refreshToken =
      (socketClient.handshake.headers.authorization || "").split(" ")[1] || "";

    if (!refreshToken) {
      throw new ForbiddenError();
    }

    const refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET || "";
    const decoded: string | JwtPayload = verify(
      refreshToken,
      refreshTokenSecret
    );

    if (
      decoded == null ||
      typeof decoded != "object" ||
      typeof decoded === "string"
    ) {
      throw new ForbiddenError();
    }

    const targetUser = await User.findOne({
      _id: decoded?.user?._id,
    }).select({
      _id: 1,
    });

    if (!targetUser) {
      throw new ForbiddenError();
    }

    (socketClient.request as ISocketRequest).payload = {
      user: {
        _id: targetUser._id.toString(),
      },
    };

    next();
  } catch (error) {
    (socketClient.request as ISocketRequest).payload = null;

    if (error instanceof JsonWebTokenError) {
      const newError: ISocketError = new ForbiddenError();
      newError.data = createErrorResponse(newError);

      next(newError);
    } else {
      const newError: ISocketError = new UnauthorizedError();
      newError.data = createErrorResponse(newError);
      next(error as Error);
    }
  }
};

export { authMiddleware };
