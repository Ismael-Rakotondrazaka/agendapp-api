import dotenv from "dotenv";
dotenv.config();
import request from "supertest";
import seedDB from "../utils/seeds/seedDB";
import app from "../../../app";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

describe("POST /api/v1/tokens/refresh", () => {
  test.each([
    {
      testCase: "fSKto6ufhmjfcBVn_wNBS",
      input: {
        user: {
          _id: "633a890013a8c12a531ea137",
          firstName: "Lyric",
          lastName: "Kovacek",
          email: "Lyric_Kovacek82@hotmail.com",
          password: "HPgCdAilXqFiEns",
        },
      },
    },
    {
      testCase: "dwN7u8tlMczKqRhXQ8L72",
      input: {
        user: {
          _id: "633a8937eb1308c08dd2491b",
          firstName: "Darien",
          lastName: "Kassulke",
          email: "Darien16@yahoo.com",
          password: "ICibOsc6OnYzgJB",
        },
      },
    },
  ])(
    "should return a new access and refresh tokens with status 200 OK {testCase: $testCase}",
    async (testCase) => {
      await seedDB(testCase.testCase);

      /*const refreshTokenData = {
        user: testCase.input.user,
      };
      const accessTokenSecret: string =
        process.env.TEST_REFRESH_TOKEN_SECRET || "";
      const refreshTokenLife: number = 10 * 60 * 1000; // 10mn
       const refreshTokenOld: string = jwt.sign(
        refreshTokenData,
        accessTokenSecret,
        {
          expiresIn: `${refreshTokenLife}`,
        }
      ); */

      // await request(app);

      return (
        request(app)
          .post("/api/v1/auth/login")
          .expect("Content-Type", /json/)
          .expect(200)
          .send({
            email: testCase.input.user.email,
            password: testCase.input.user.password,
          })
          .then((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({
                data: expect.objectContaining({
                  tokens: {
                    refreshToken: expect.any(String),
                    accessToken: expect.any(String),
                    tokenType: expect.any(String),
                  },
                  user: expect.any(Object),
                }),
              })
            );

            return response.body;
          })
          .then(async (body) => {
            let bodyReceived: any;

            await request(app)
              .post("/api/v1/tokens/refresh")
              .expect("Content-Type", /json/)
              .expect(200)
              .send({
                refreshToken: body.data.tokens.refreshToken,
              })
              .then((response) => {
                expect(response.body).toEqual(
                  expect.objectContaining({
                    data: expect.objectContaining({
                      tokens: {
                        refreshToken: expect.any(String),
                        accessToken: expect.any(String),
                      },
                    }),
                  })
                );

                bodyReceived = response.body;
              });

            return bodyReceived;
          })

          // verify if the access token works properly
          .then(async (body) => {
            const accessToken: string = body.data.tokens.accessToken;

            const testAccessSecret: string =
              process.env.TEST_ACCESS_TOKEN_SECRET || "";

            const accessTokenDecoded = jwt.verify(
              accessToken,
              testAccessSecret
            );

            expect(accessTokenDecoded).toEqual(
              expect.objectContaining({
                user: expect.objectContaining({
                  _id: testCase.input.user._id,
                  firstName: testCase.input.user.firstName,
                  lastName: testCase.input.user.lastName,
                }),
              })
            );

            await request(app)
              .get("/api/v1/todos")
              .set("Authorization", `Bearer ${accessToken}`)
              .expect("Content-Type", /json/)
              .expect(200)
              .then((response) => {
                expect(response.body).toEqual(
                  expect.objectContaining({
                    data: expect.objectContaining({
                      todos: expect.any(Array),
                    }),
                  })
                );
              });

            return body;
          })
          // verify if the refresh token can be used
          .then(async (body) => {
            const refreshToken: string = body.data.tokens.refreshToken;

            // expect(refreshToken).not.toBe(refreshTokenOld);

            const testRefreshSecret: string =
              process.env.TEST_REFRESH_TOKEN_SECRET || "";

            const refreshTokenDecoded = jwt.verify(
              refreshToken,
              testRefreshSecret
            );

            expect(refreshTokenDecoded).toEqual(
              expect.objectContaining({
                user: expect.objectContaining({
                  _id: testCase.input.user._id,
                }),
              })
            );

            await request(app)
              .post("/api/v1/tokens/refresh")
              .send({
                refreshToken,
              })
              .expect("Content-Type", /json/)
              .expect(200)
              .then((response) => {
                expect(response.body).toEqual(
                  expect.objectContaining({
                    data: expect.objectContaining({
                      tokens: {
                        refreshToken: expect.any(String),
                        accessToken: expect.any(String),
                      },
                    }),
                  })
                );
              });

            return body;
          })
      );
    }
  );

  test("should return 401 Unauthorized if refresh token is used more than once {testCase: oFyGk4nusezE4gkoXIok5}", async () => {
    await seedDB("oFyGk4nusezE4gkoXIok5");

    const input: {
      email: string;
      password: string;
    } = {
      email: "Margaret51@gmail.com",
      password: "cu9XVU1MK5sXG7p",
    };

    let refreshTokenReceived = "";

    await request(app)
      .post("/api/v1/auth/login")
      .send(input)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
              tokens: expect.objectContaining({
                accessToken: expect.any(String),
                refreshToken: expect.any(String),
              }),
              user: expect.anything(),
            }),
          })
        );

        refreshTokenReceived = response.body.data.tokens.refreshToken;
      });

    await request(app)
      .post("/api/v1/tokens/refresh")
      .send({
        refreshToken: refreshTokenReceived,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
              tokens: expect.objectContaining({
                accessToken: expect.any(String),
                refreshToken: expect.any(String),
              }),
            }),
          })
        );
      });

    await request(app)
      .post("/api/v1/tokens/refresh")
      .send({
        refreshToken: refreshTokenReceived,
      })
      .expect("Content-Type", /json/)
      .expect(401)
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
  });

  test("should return 401 if the refresh token is invalid {testCase: E6SS8Hcd2sK6owvnLHdHG}", async () => {
    return request(app)
      .post("/api/v1/tokens/refresh")
      .expect(401)
      .expect("Content-Type", /json/)
      .send({
        refreshToken: faker.lorem.sentence().replace(/ /g, ""),
      });
  });

  test.each(["refreshToken"])(
    "should return 400 Bad Request if field '%s' is missing. {testCase: E6SS8Hcd2sK6owvnLHdHG}",
    async (field) => {
      await seedDB("E6SS8Hcd2sK6owvnLHdHG");

      const input = {
        email: "Eulalia.Moen33@yahoo.com",
        password: "9U6IrcRdhI8rSdH",
      };

      const data: Record<string, unknown> = {
        refreshToken: faker.lorem.sentence().replace(/ /g, ""),
      };

      delete data[field];

      await request(app)
        .post("/api/v1/auth/login")
        .expect(200)
        .expect("Content-Type", /json/)
        .send(input)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              data: expect.objectContaining({
                user: expect.anything(),
                tokens: expect.objectContaining({
                  refreshToken: expect.any(String),
                  accessToken: expect.any(String),
                  tokenType: "bearer",
                }),
              }),
            })
          );
        })
        .then(async () => {
          await request(app)
            .post("/api/v1/tokens/refresh")
            .expect("Content-Type", /json/)
            .expect(400)
            .send(data);
        });
    }
  );
});
