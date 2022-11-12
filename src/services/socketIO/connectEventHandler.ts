import { IncomingMessage } from "http";
import { Socket } from "socket.io";
import { User } from "../../models";
import { IClientToServerEvents, IServerToClientEvents } from "../../types";
import { ForbiddenError } from "../../utils/errors";

interface ISocketRequest extends IncomingMessage {
  payload: Record<string, any> | null | undefined;
}

const connectEventHandler = async (
  socketClient: Socket<IClientToServerEvents, IServerToClientEvents>
) => {
  try {
    const targetUserId = (socketClient.request as unknown as ISocketRequest)
      .payload?.user?._id;

    if (!targetUserId) throw new ForbiddenError();

    const targetUser = await User.findOne({
      _id: targetUserId,
    });

    if (!targetUser) throw new ForbiddenError();

    socketClient.join(targetUser.channelId);
  } catch (error) {
    // console.log(error);
  }
};

export { connectEventHandler };
