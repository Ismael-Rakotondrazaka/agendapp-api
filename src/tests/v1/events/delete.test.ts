import dotenv from "dotenv";
dotenv.config();
import request from "supertest";
import seedDB from "../utils/seeds/seedDB";
import app from "../../../app";
import jwt from "jsonwebtoken";

describe("DELETE /api/v1/events/:eventId", () => {
  test.each([
    {
      testCase: "2ANkuhxt2gOPrN4hpSqau",
      input: {
        user: {
          _id: "6337deae65fabe621e3ce938",
          firstName: "Ephraim",
          lastName: "Jacobi",
        },
        eventId: "6337e296e3611b1acb901abd",
      },
      output: {
        expectedLength: 2,
      },
    },
    {
      testCase: "Szqmq89wB16UoEYJAoVyY",
      input: {
        user: {
          _id: "63397f73968531beecab392b",
          firstName: "Julius",
          lastName: "Schiller",
        },
        eventId: "63397f88074c0dc4737e6c3c",
      },
      output: {
        expectedLength: 0,
      },
    },
  ])(
    "should return 204 No Content for deleting future events {testCase: $testCase}",
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
      await request(app)
        .delete(`/api/v1/events/${testCase.input.eventId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(204); // No Content

      await request(app)
        .get("/api/v1/events")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data.events.length).toBe(
            testCase.output.expectedLength
          );
        });
    }
  );

  test("should return 403 Forbidden when deleting past events {testCase: _amQYGPl3FZU0txY_Z6zm}", async () => {
    await seedDB("_amQYGPl3FZU0txY_Z6zm");

    const eventIds: string[] = [
      "63390eb0f209f919baa94e2a",
      "63390eb0f209f919baa94e2b",
      "63390eb0f209f919baa94e2c",
    ];

    // mimic accessToken
    const accessTokenSecret: string =
      process.env.TEST_ACCESS_TOKEN_SECRET || "";
    const accessTokenLife: number = 10 * 60 * 1000; // 10mn
    const accessToken = jwt.sign(
      {
        user: {
          _id: "63390e42879dd9ff90e79acf",
          firstName: "Lonnie",
          lastName: "Lang",
        },
      },
      accessTokenSecret,
      {
        expiresIn: `${accessTokenLife}`,
      }
    );

    await Promise.all(
      eventIds.map(async (eventId) => {
        await request(app)
          .delete(`/api/v1/events/${eventId}`)
          .set("Authorization", `Bearer ${accessToken}`)
          .expect("Content-Type", /json/)
          .expect(403) // Forbidden
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
            expect(body.error.statusText).toBe("Forbidden");
            expect(body.error.statusCode).toBe(403);
            expect(body.error.code).toBe("E6");

            const dateTime = body.error.dateTime;
            expect(new Date(dateTime).getTime()).not.toBeNaN();
          });
      })
    );
  });

  test("should return 204 No Content for deleting a events is passing now {testCase: bKkD-JV0x4QdbHrxuKW1B}", async () => {
    await seedDB("bKkD-JV0x4QdbHrxuKW1B");

    const eventId = "6339113572db4facefd2be95";

    // mimic accessToken
    const accessTokenSecret: string =
      process.env.TEST_ACCESS_TOKEN_SECRET || "";
    const accessTokenLife: number = 10 * 60 * 1000; // 10mn
    const accessToken = jwt.sign(
      {
        user: {
          _id: "63391103efb338e11d7152fa",
          firstName: "Arvilla",
          lastName: "Schoen",
        },
      },
      accessTokenSecret,
      {
        expiresIn: `${accessTokenLife}`,
      }
    );

    await request(app)
      .delete(`/api/v1/events/${eventId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(204); // No Content
  });

  test.each([
    {
      testCase: "jiToE7a8EcWnriExxKkCv",
      input: {
        user: {
          _id: "633989fdb508b4c5274f4ec8",
          firstName: "Kiley",
          lastName: "Senger",
        },
        eventsId: [
          "63398b6d9e3607e181a718fc",
          "63398b6d9e3607e181a718fd",
          "63398b6d9e3607e181a718fe",
        ],
      },
    },
    {
      testCase: "GQpnbuGVFToOYXtl21JNi",
      input: {
        user: {
          _id: "633989fdb508b4c5274f4ec9",
          firstName: "Deja",
          lastName: "Skiles",
        },
        eventsId: [
          "63398b93953a9e2498d073c8",
          "63398b93953a9e2498d073c9",
          "63398b93953a9e2498d073ca",
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
            .delete(`/api/v1/events/${eventId}`)
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

  test.each(["sed-ullam", "{540fdf56dfa543cb6}", "!f#dfs"])(
    "should return 404 Not Found if eventId is bad format {testCase: _iN258fQ4pawAJsURy_W5}",
    async (eventId) => {
      await seedDB("_iN258fQ4pawAJsURy_W5");

      // mimic accessToken
      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 10 * 60 * 1000; // 10mn
      const accessToken = jwt.sign(
        {
          user: {
            _id: "63398f1bca611ec061752bb3",
            firstName: "Camron",
            lastName: "Hyatt",
          },
        },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}`,
        }
      );

      await request(app)
        .delete(`/api/v1/events/${eventId}`)
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
