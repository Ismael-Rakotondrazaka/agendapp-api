import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../../../.env") });
import request from "supertest";
import seedDB from "../utils/seeds/seedDB";
import app from "../../../app";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

describe("PUT /api/v1/events/:eventId", () => {
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
    "should return 400 Bad Request if the event is in the past but not yesterday even if a correct change is made to $name {testCase: 1GWFnOmw--Ad6XtvZSHg2}",
    async (change: { field: string; value: string }) => {
      await seedDB("1GWFnOmw--Ad6XtvZSHg2");

      const originalEventId = "63358cdf924b293800bcc8df";

      const timezoneOffset = new Date().getTimezoneOffset();

      const data: Record<string, string | number> = {
        title: "molestias-consequuntur-excepturi",
        description:
          "Pariatur est assumenda cupiditate veritatis itaque neque.",
        status: "completed",
        level: "important",
        startAt: "2021-10-30T03:00:00.000Z",
        endAt: "2021-10-30T03:15:00.000Z",
        timezoneOffset,
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
        .put(`/api/v1/events/${originalEventId}`)
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
    "should return 200 OK if event is in the future and a correct change is made to $field {testCase: w2DgY6X4H1f-NRYxt_U_A}",
    async (change) => {
      await seedDB("w2DgY6X4H1f-NRYxt_U_A");

      const originalEventId = "6335965ffe8a0b7c4f64b656";

      const originalStartAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
      originalStartAt.setHours(7, 0, 0, 0);
      const originalEndAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
      originalEndAt.setHours(8, 0, 0, 0);
      const originalCreatedAt = "2021-03-24T15:25:27.214Z";
      const originalUpdatedAt = "2021-03-24T15:25:27.214Z";

      const timezoneOffset = new Date().getTimezoneOffset();

      const data: Record<string, string | number> = {
        title: "molestias-consequuntur-excepturi",
        description:
          "Pariatur est assumenda cupiditate veritatis itaque neque.",
        status: "pending",
        level: "important",
        startAt: originalStartAt.toISOString(),
        endAt: originalEndAt.toISOString(),
        timezoneOffset,
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
        .put(`/api/v1/events/${originalEventId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(data)
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              data: expect.objectContaining({
                event: expect.objectContaining({
                  _id: expect.any(String),
                  title: expect.any(String),
                  description: expect.any(String),
                  status: expect.any(String),
                  startAt: expect.any(String),
                  endAt: expect.any(String),
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String),
                }),
              }),
            })
          );

          return response.body;
        })
        .then((body) => {
          const updatedEvent = body.data.event;

          expect(updatedEvent._id).toBe(originalEventId);
          expect(updatedEvent.title).toBe(data.title);
          expect(updatedEvent.description).toBe(data.description);
          expect(updatedEvent.status).toBe(data.status);
          expect(updatedEvent.startAt).toBe(data.startAt);
          expect(updatedEvent.endAt).toBe(data.endAt);
          expect(updatedEvent.createdAt).toBe(originalCreatedAt);
          expect(updatedEvent.updatedAt).not.toBe(originalUpdatedAt);

          expect(new Date(updatedEvent.updatedAt).getTime()).not.toBeNaN();
        });
    }
  );

  test.each([
    "title",
    "description",
    "level",
    "startAt",
    "endAt",
    "timezoneOffset",
  ])(
    "should return 400 Bad Request if field %s is missing even if event is in the future and a change is made {testCase: w2DgY6X4H1f-NRYxt_U_A}",
    async (field: string) => {
      await seedDB("w2DgY6X4H1f-NRYxt_U_A");

      const originalEventId = "6335965ffe8a0b7c4f64b656";

      const originalStartAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
      originalStartAt.setHours(4, 0, 0, 0);
      const originalEndAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
      originalEndAt.setHours(5, 0, 0, 0);

      const timezoneOffset = new Date().getTimezoneOffset();

      const data: Record<string, string | number> = {
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
        timezoneOffset,
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
        .put(`/api/v1/events/${originalEventId}`)
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

  test.each(["pending", "completed", "failed"])(
    "should return 400 Bad Request if trying to update status to %s even if the event is in the future {testCase: tZXDs4dLX-9DOiRDAlJx4}",
    async (statusValue) => {
      await seedDB("tZXDs4dLX-9DOiRDAlJx4");

      const originalEventId = "63359c214f499caf6fa5da79";

      const originalStartAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
      originalStartAt.setHours(4, 0, 0, 0);
      const originalEndAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
      originalEndAt.setHours(5, 0, 0, 0);

      const timezoneOffset = new Date().getTimezoneOffset();

      const data: Record<string, string | number> = {
        title: "repellat",
        description: "Et quos fuga illum iusto officiis quibusdam.",
        status: statusValue,
        level: "important",
        startAt: originalStartAt.toISOString(),
        endAt: originalEndAt.toISOString(),
        timezoneOffset,
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
        .put(`/api/v1/events/${originalEventId}`)
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
    "should return 409 Conflict if interval is correct but it superpose another existing event {testCase: 7n3wgh_LZxHsOS08M1cyF}",
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

      const timezoneOffset = new Date().getTimezoneOffset();

      await request(app)
        .post("/api/v1/events")
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
          timezoneOffset,
        })
        .expect("Content-Type", /json/)
        .expect(201);

      const event = {
        title: faker.lorem.slug(Math.floor(Math.random() * 5 + 1)),
        description:
          Math.floor(Math.random() * 10) % 2 === 0
            ? faker.hacker.phrase()
            : faker.lorem.sentence(7),
        level:
          Math.round(Math.random() * 100) % 2 === 0 ? "normal" : "important",
        startAt: new Date(startAt.getTime() + interval.startAt),
        endAt: new Date(endAt.getTime() + interval.endAt),
        timezoneOffset,
      };

      await request(app)
        .post("/api/v1/events")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(event)
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

  test.each([
    {
      testCase: "Jn-X2oStg05_0VnGkohwZ",
      input: {
        user: {
          _id: "633986084ca3d3563b95de28",
          firstName: "Itzel",
          lastName: "Farrell",
        },
        eventsId: [
          "633985bf42f52701ad7081d8",
          "633985bf42f52701ad7081d9",
          "633985bf42f52701ad7081da",
        ],
      },
    },
    {
      testCase: "nxy_G5Le9bVF4KY4yHkP_",
      input: {
        user: {
          _id: "633986084ca3d3563b95de27",
          firstName: "Daphney",
          lastName: "Emard",
        },
        eventsId: [
          "633985bf42f52701ad7081db",
          "633985bf42f52701ad7081dc",
          "633985bf42f52701ad7081dd",
        ],
      },
    },
  ])(
    "should return 404 Not Found if eventId doesn't exist {testCase: $testCase}",
    async (testCase) => {
      await seedDB(testCase.testCase);

      // mimic accessToken
      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 10 * 60 * 1000; // 10mn
      const accessToken = jwt.sign(
        {
          user: testCase.input.user,
        },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}`,
        }
      );

      await Promise.all(
        testCase.input.eventsId.map(async (eventId) => {
          await request(app)
            .put(`/api/v1/events/${eventId}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .expect("Content-Type", /json/)
            .expect(404)
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
              expect(body.error.statusText).toBe("Not Found");
              expect(body.error.statusCode).toBe(404);
              expect(body.error.code).toBe("E3");

              const dateTime = body.error.dateTime;
              expect(new Date(dateTime).getTime()).not.toBeNaN();
            });
        })
      );
    }
  );

  test.each(["tenetur-nihilim", "jutstABadFormat:", "no!,tssr"])(
    "should return 404 Not Found if eventId is bad format {testCase: yb8ybXLykSuOkNXRQosWk}",
    async (eventId) => {
      await seedDB("yb8ybXLykSuOkNXRQosWk");

      // mimic accessToken
      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 10 * 60 * 1000; // 10mn
      const accessToken = jwt.sign(
        {
          user: {
            _id: "63398d1424ee9e6259de99f4",
            firstName: "Eliezer",
            lastName: "McLaughlin",
          },
        },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}`,
        }
      );

      await request(app)
        .put(`/api/v1/events/${eventId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect("Content-Type", /json/)
        .expect(404)
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
          expect(body.error.statusText).toBe("Not Found");
          expect(body.error.statusCode).toBe(404);
          expect(body.error.code).toBe("E3");

          const dateTime = body.error.dateTime;
          expect(new Date(dateTime).getTime()).not.toBeNaN();
        });
    }
  );
});
