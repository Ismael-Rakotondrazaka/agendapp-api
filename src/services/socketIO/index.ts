import { Server } from "socket.io";

const socketServer = new Server<IClientToServerEvents, IServerToClientEvents>();

import { IClientToServerEvents, IServerToClientEvents } from "../../types";

import { authMiddleware } from "./authMiddleware";
socketServer.use(authMiddleware);

import { connectEventHandler } from "./connectEventHandler";

socketServer.on("connection", (socket) => {
  connectEventHandler(socket);
});

export { socketServer };
