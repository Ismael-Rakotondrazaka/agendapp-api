import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use("*", (req: Request, res: Response): void | Response => {
  return res.json({
    data: {
      message: "Hello World!",
    },
  });
});

export default app;
