import dotenv from "dotenv";
dotenv.config();
import request from "supertest";
import seedDB from "../utils/seeds/seedDB";
import app from "../../../app";
import jwt from "jsonwebtoken";

describe("GET /api/v1/events/:eventId", () => {
  test.each([
    {
      _id: "6339b13e874a202526ee7dc7",
      expected: {
        _id: "6339b13e874a202526ee7dc7",
        title: "aut-et-qui-ratione",
        description:
          "The IP port is down, calculate the primary hard drive so we can connect the PCI pixel!",
        status: "completed",
        level: "normal",
        startAt: "2022-03-05T05:30:00.000Z",
        endAt: "2022-03-05T06:00:00.000Z",
        createdAt: "2021-11-23T06:50:20.867Z",
        updatedAt: "2021-11-23T06:50:20.867Z",
      },
    },
    {
      _id: "6339b13e874a202526ee7dc9",
      expected: {
        _id: "6339b13e874a202526ee7dc9",
        title: "maiores-hic-nihil-delectus-a",
        description:
          "Try to transmit the HTTP pixel, maybe it will program the back-end sensor!",
        status: "failed",
        level: "normal",
        startAt: "2021-11-02T05:15:00.000Z",
        endAt: "2021-11-02T05:30:00.000Z",
        createdAt: "2021-06-18T00:09:45.773Z",
        updatedAt: "2021-06-18T00:09:45.773Z",
      },
    },
    {
      _id: "6339c453a99e445be44ad8b9", // future event
      expected: {
        _id: "6339c453a99e445be44ad8b9",
        title: "corporis-odit-sunt",
        description:
          "Inventore assumenda architecto deleniti vel laudantium iusto.",
        status: "completed",
        level: "important",
        createdAt: "2021-12-26T16:37:31.402Z",
        updatedAt: "2021-12-26T16:37:31.402Z",
      },
    },
    {
      _id: "6339c453a99e445be44ad8ba",
      expected: {
        _id: "6339c453a99e445be44ad8ba",
        title: "id",
        description: "Velit vel et ducimus delectus sint hic.",
        status: "failed",
        level: "important",
        createdAt: "2021-07-21T05:58:48.143Z",
        updatedAt: "2021-07-21T05:58:48.143Z",
      },
    },
  ])(
    "should return the event with status 200 OK {testCase: l_JiVJx_FrNmaldIQX2in}",
    async (testCase) => {
      await seedDB("l_JiVJx_FrNmaldIQX2in");

      // mimic accessToken
      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 10 * 60 * 1000; // 10mn
      const accessToken = jwt.sign(
        {
          user: {
            _id: "6339afa187976cf94101f5a7",
            firstName: "Rusty",
            lastName: "Upton",
          },
        },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}`,
        }
      );

      return request(app)
        .get(`/api/v1/events/${testCase._id}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              data: expect.objectContaining({
                event: expect.objectContaining({
                  _id: expect.any(String),
                  title: expect.any(String),
                  description: expect.any(String),
                  status: expect.any(String),
                  level: expect.any(String),
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
          for (const key in testCase.expected) {
            if (Object.prototype.hasOwnProperty.call(testCase.expected, key)) {
              expect(body.data.event[key] as string).toBe(
                (testCase.expected as Record<string, string>)[key] as string
              );
            }
          }

          const startAt: string = body.data.event.startAt;
          const endAt: string = body.data.event.endAt;
          const createdAt: string = body.data.event.createdAt;
          const updatedAt: string = body.data.event.updatedAt;

          const startAtTime: number = new Date(startAt).getTime();
          const endAtTime: number = new Date(endAt).getTime();
          const createdAtTime: number = new Date(createdAt).getTime();
          const updatedAtTime: number = new Date(updatedAt).getTime();

          expect(startAtTime).not.toBeNaN();
          expect(endAtTime).not.toBeNaN();
          expect(createdAtTime).not.toBeNaN();
          expect(updatedAtTime).not.toBeNaN();

          expect(endAtTime).toBeGreaterThan(startAtTime);
          expect(startAtTime).toBeGreaterThanOrEqual(createdAtTime);
        });
    }
  );

  test.each([
    "6339c5e3b888586512fd608e",
    "6339c5f0f229c1386b89cb63",
    "NotWorking!a",
    "fj_d:!dfc",
  ])(
    "should return 404 Not Found if the event doesn't exist or if the id is in bad format {testCase: b5htpxuXni97Kwk4CAb6x}",
    async (eventId) => {
      await seedDB("b5htpxuXni97Kwk4CAb6x");

      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
      const accessTokenLife = 15; // mn
      const accessToken = jwt.sign(
        {
          user: {
            _id: "6339c59cb00fd7f44e0a8db4",
            firstName: "Moises",
            lastName: "Howell",
          },
        },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}m`,
        }
      );

      return request(app)
        .get(`/api/v1/events/${eventId}`)
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

  test.each([
    "6359b7dedc5c0e4e172913f0",
    "6359b7dedc5c0e4e172913f1",
    "6359b7dedc5c0e4e172913f2",
  ])(
    "should be marked as failed automatically if status is 'pending' but can't be updated {testCase: 'A-n7q3EMSLsNiEWl3uKvm'}",
    async (eventId) => {
      await seedDB("A-n7q3EMSLsNiEWl3uKvm");

      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 10 * 60 * 1000; // 10mn
      const accessToken = jwt.sign(
        {
          user: {
            _id: "6359b741efd58360a17628af",
            firstName: "Maximillian",
            lastName: "Mayer",
          },
        },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}`,
        }
      );

      return request(app)
        .get(`/api/v1/events/${eventId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              data: expect.objectContaining({
                event: expect.objectContaining({
                  _id: expect.any(String),
                  title: expect.any(String),
                  description: expect.any(String),
                  status: "failed",
                  level: expect.any(String),
                  startAt: expect.any(String),
                  endAt: expect.any(String),
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String),
                }),
              }),
            })
          );

          return response.body;
        });
    }
  );
});
