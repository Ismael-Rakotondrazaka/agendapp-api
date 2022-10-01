import dotenv from "dotenv";
dotenv.config();
import request from "supertest";
import seedDB from "../../utils/seeds/seedDB";
import app from "../../../../app";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

describe("PUT /api/v1/todos/:todoId", () => {
  test.each([
    {
      field: "title",
      value: "odit",
    },
    {
      field: "description",
      value:
        "I'll synthesize the online JSON system, that should alarm the UDP interface!",
    },
    {
      field: "status",
      value: "failed",
    },
    {
      field: "level",
      value: "normal",
    },
    {
      field: "startAt",
      value: "2021-10-30T02:00:00.000Z",
    },
    {
      field: "endAt",
      value: "2021-10-30T04:15:00.000Z",
    },
  ])(
    "should return 400 Bad Request if the todo is in the past but not yesterday even if a correct change is made to $name {testCase: 1GWFnOmw--Ad6XtvZSHg2}",
    async (change: { field: string; value: string }) => {
      await seedDB("1GWFnOmw--Ad6XtvZSHg2");

      const originalTodoId = "63358cdf924b293800bcc8df";

      const data: Record<string, string> = {
        title: "molestias-consequuntur-excepturi",
        description:
          "Pariatur est assumenda cupiditate veritatis itaque neque.",
        status: "done",
        level: "important",
        startAt: "2021-10-30T03:00:00.000Z",
        endAt: "2021-10-30T03:15:00.000Z",
      };

      data[change.field] = change.value;

      // mimic accessToken
      const accessTokenData = {
        user: {
          _id: "63358b20b7924baac14f6513",
          firstName: "Polly",
          lastName: "Bosco",
        },
      };
      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 17 * 60 * 1000; // 17mn
      const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
        expiresIn: `${accessTokenLife}`,
      });

      return request(app)
        .put(`/api/v1/todos/${originalTodoId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(data)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              error: expect.objectContaining({
                message: expect.any(String),
                statusText: expect.any(String),
                statusCode: expect.any(Number),
                code: expect.any(String),
                dateTime: expect.any(String),
              }),
            })
          );

          return response.body;
        });
    }
  );

  test.each([
    {
      field: "title",
      value: "odit",
    },
    {
      field: "description",
      value:
        "I'll synthesize the online JSON system, that should alarm the UDP interface!",
    },
    {
      field: "level",
      value: "normal",
    },
    {
      field: "startAt",
      value: -1 * 60 * 60 * 1000,
    },
    {
      field: "endAt",
      value: 1 * 60 * 60 * 1000,
    },
  ])(
    "should return 200 OK if todo is in the future and a correct change is made to $field {testCase: w2DgY6X4H1f-NRYxt_U_A}",
    async (change) => {
      await seedDB("w2DgY6X4H1f-NRYxt_U_A");

      const originalTodoId = "6335965ffe8a0b7c4f64b656";

      const originalStartAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
      originalStartAt.setHours(7, 0, 0, 0);
      const originalEndAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
      originalEndAt.setHours(8, 0, 0, 0);

      const data: Record<string, string> = {
        title: "molestias-consequuntur-excepturi",
        description:
          "Pariatur est assumenda cupiditate veritatis itaque neque.",
        status: "pending",
        level: "important",
        startAt: originalStartAt.toISOString(),
        endAt: originalEndAt.toISOString(),
      };

      if (typeof change.value === "number") {
        data[change.field] = new Date(
          new Date(data[change.field]).getTime() + change.value
        ).toISOString();
      } else {
        data[change.field] = change.value;
      }

      // mimic accessToken
      const accessTokenData = {
        user: {
          _id: "63359626da2ed09caa28702c",
          firstName: "Maci",
          lastName: "Powlowski",
        },
      };
      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 17 * 60 * 1000; // 17mn
      const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
        expiresIn: `${accessTokenLife}`,
      });

      return request(app)
        .put(`/api/v1/todos/${originalTodoId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(data)
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              data: expect.objectContaining({
                todo: expect.objectContaining({
                  _id: expect.any(String),
                  title: expect.any(String),
                  description: expect.any(String),
                  status: expect.any(String),
                  startAt: expect.any(String),
                  endAt: expect.any(String),
                  createdAt: expect.any(String),
                }),
              }),
            })
          );

          return response.body;
        })
        .then((body) => {
          const updatedTodo = body.data.todo;

          expect(updatedTodo).toEqual(
            expect.objectContaining({
              ...data,
            })
          );
        });
    }
  );

  test.each(["title", "description", "level", "startAt", "endAt"])(
    "should return 400 Bad Request if field %s is missing even if todo is in the future and a change is made {testCase: w2DgY6X4H1f-NRYxt_U_A}",
    async (field: string) => {
      await seedDB("w2DgY6X4H1f-NRYxt_U_A");

      const originalTodoId = "6335965ffe8a0b7c4f64b656";

      const originalStartAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
      originalStartAt.setHours(4, 0, 0, 0);
      const originalEndAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
      originalEndAt.setHours(5, 0, 0, 0);

      const data: Record<string, string> = {
        title: "odit",
        description:
          "I'll synthesize the online JSON system, that should alarm the UDP interface!",
        status: "pending",
        level: "normal",
        startAt: new Date(
          originalStartAt.getTime() - 1 * 60 * 60 * 1000
        ).toISOString(),
        endAt: new Date(
          originalEndAt.getTime() + 1 * 60 * 60 * 1000
        ).toISOString(),
      };

      delete data[field];

      // mimic accessToken
      const accessTokenData = {
        user: {
          _id: "63359626da2ed09caa28702c",
          firstName: "Maci",
          lastName: "Powlowski",
        },
      };
      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 17 * 60 * 1000; // 17mn
      const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
        expiresIn: `${accessTokenLife}`,
      });

      return request(app)
        .put(`/api/v1/todos/${originalTodoId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(data)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              error: expect.objectContaining({
                message: expect.any(String),
                statusText: expect.any(String),
                statusCode: expect.any(Number),
                code: expect.any(String),
                dateTime: expect.any(String),
              }),
            })
          );

          return response.body;
        });
    }
  );

  test.each(["pending", "done", "failed"])(
    "should return 400 Bad Request if trying to update status to %s even if the todo is in the future {testCase: tZXDs4dLX-9DOiRDAlJx4}",
    async (statusValue) => {
      await seedDB("tZXDs4dLX-9DOiRDAlJx4");

      const originalTodoId = "63359c214f499caf6fa5da79";

      const originalStartAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
      originalStartAt.setHours(4, 0, 0, 0);
      const originalEndAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
      originalEndAt.setHours(5, 0, 0, 0);

      const data: Record<string, string> = {
        title: "repellat",
        description: "Et quos fuga illum iusto officiis quibusdam.",
        status: statusValue,
        level: "important",
        startAt: originalStartAt.toISOString(),
        endAt: originalEndAt.toISOString(),
      };

      // mimic accessToken
      const accessTokenData = {
        user: {
          _id: "63359bf20984d953b614a4fb",
          firstName: "Gregory",
          lastName: "Botsford",
        },
      };
      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 17 * 60 * 1000; // 17mn
      const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
        expiresIn: `${accessTokenLife}`,
      });

      return request(app)
        .put(`/api/v1/todos/${originalTodoId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(data)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              error: expect.objectContaining({
                message: expect.any(String),
                statusText: expect.any(String),
                statusCode: expect.any(Number),
                code: expect.any(String),
                dateTime: expect.any(String),
              }),
            })
          );

          return response.body;
        });
    }
  );

  test.each([
    {
      startAt: -2 * 60 * 60 * 1000, // -2h
      endAt: -45 * 60 * 1000, // -45mn
    },
    {
      startAt: 0, // 0h
      endAt: 0, // 0h
    },
    {
      startAt: 1 * 60 * 60 * 1000, // +1h
      endAt: 1 * 60 * 60 * 1000, // +1h
    },
    {
      startAt: -1 * 60 * 60 * 1000, // -1h
      endAt: 1 * 60 * 60 * 1000, // +1h
    },
  ])(
    "should return 409 Conflict if interval is correct but it superpose another existing todo {testCase: 7n3wgh_LZxHsOS08M1cyF}",
    async (interval) => {
      await seedDB("7n3wgh_LZxHsOS08M1cyF");

      const startAt = faker.date.future();
      startAt.setHours(9, 0, 0, 0);
      const intervalMs = 2 * 60 * 60 * 1000; // 2h (9h - 11h)
      const endAt = new Date(startAt.getTime() + intervalMs);

      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife = 15; // mn

      const accessToken = jwt.sign(
        {
          user: {
            _id: "633673a9768a8a94df05f16f",
            firstName: "Torey",
            lastName: "Lowe",
          },
        },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}m`,
        }
      );

      await request(app)
        .post("/api/v1/todos")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          title: faker.lorem.slug(Math.floor(Math.random() * 5 + 1)),
          description:
            Math.floor(Math.random() * 10) % 2 === 0
              ? faker.hacker.phrase()
              : faker.lorem.sentence(7),
          level:
            Math.round(Math.random() * 100) % 2 === 0 ? "normal" : "important",
          startAt,
          endAt,
        })
        .expect("Content-Type", /json/)
        .expect(201);

      const todo = {
        title: faker.lorem.slug(Math.floor(Math.random() * 5 + 1)),
        description:
          Math.floor(Math.random() * 10) % 2 === 0
            ? faker.hacker.phrase()
            : faker.lorem.sentence(7),
        level:
          Math.round(Math.random() * 100) % 2 === 0 ? "normal" : "important",
        startAt: new Date(startAt.getTime() + interval.startAt),
        endAt: new Date(endAt.getTime() + interval.endAt),
      };

      await request(app)
        .post("/api/v1/todos")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(todo)
        .expect("Content-Type", /json/)
        .expect(409)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              error: expect.objectContaining({
                message: expect.any(String),
                statusText: expect.any(String),
                statusCode: expect.any(Number),
                code: expect.any(String),
                dateTime: expect.any(String),
              }),
            })
          );

          return response.body;
        })
        .then((body) => {
          expect(body.error.statusText).toBe("Conflict");
          expect(body.error.statusCode).toBe(409);
          expect(body.error.code).toBe("E4"); // Conflict

          const dateTime = body.error.dateTime;
          expect(new Date(dateTime).getTime()).not.toBeNaN();
        });
    }
  );
});
