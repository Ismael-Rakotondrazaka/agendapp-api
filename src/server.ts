import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";

import app from "./app";
const httpServer = createServer(app);

import { socketServer } from "./services/socketIO";
socketServer.attach(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",") : [],
    credentials: true,
  },
});

const PORT: number | string = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
