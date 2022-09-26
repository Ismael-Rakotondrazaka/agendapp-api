import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
const app: Express = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

import authRoutes from "./routes/v1/auth/index";
app.use("/api/v1/auth", authRoutes);

import todoRoutes from "./routes/v1/todos/index";
app.use("/api/v1/todos", todoRoutes);

import { errorMiddleware } from "./middlewares/index";
app.use(errorMiddleware);

import mongoose from "./services/mongoose/index";
const databaseUri: string = process.env.TEST_DATABASE_URI || "";
mongoose.connect(databaseUri);

export default app;
