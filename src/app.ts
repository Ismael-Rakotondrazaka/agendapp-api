import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../.env") });

import express, { Express } from "express";
const app: Express = express();

import cors from "cors";
app.use(
  cors({
    origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",") : [],
    credentials: true,
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

import authRoutes from "./routes/v1/auth/index";
app.use("/api/v1/auth", authRoutes);

import eventRoutes from "./routes/v1/events/index";
app.use("/api/v1/events", eventRoutes);

import tokenRoutes from "./routes/v1/tokens/index";
app.use("/api/v1/tokens", tokenRoutes);

import { NotFoundError } from "./utils/errors";
app.all("*", () => {
  throw new NotFoundError();
});

import { errorMiddleware } from "./middlewares/index";
app.use(errorMiddleware);

import mongoose from "./services/mongoose/index";
const databaseUri: string = process.env.DATABASE_URI || "";
mongoose.connect(databaseUri);

export default app;
