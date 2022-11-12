import dotenv from "dotenv";
dotenv.config();
import request from "supertest";
import seedDB from "../utils/seeds/seedDB";
import app from "../../../app";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

describe("POST /api/v1/auth/login", () => {
  test("should return user and tokens data {testCase: 4iJeyrbIHJSbB5o3fgPxj}", async () => {
    await seedDB("4iJeyrbIHJSbB5o3fgPxj");

    const email = "Catharine_Kulas37@gmail.com";
    const password = "759UfYGweUcc62Z";
    const _id = "632b449b8785e59a587318fb";
    const firstName = "Forest";
    const lastName = "Cartwright";

    return request(app)
      .post("/api/v1/auth/login")
      .send({
        email,
        password,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
              user: expect.objectContaining({
                _id: expect.any(String),
                firstName: expect.any(String),
                lastName: expect.any(String),
                fullName: expect.any(String),
                email: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              }),
              tokens: {
                accessToken: expect.any(String),
                refreshToken: expect.any(String),
                tokenType: expect.any(String),
              },
            }),
          })
        );

        return response.body;
      })
      .then((body) => {
        const user = body.data.user;
        expect(user.firstName).toBe(firstName);
        expect(user.lastName).toBe(lastName);
        expect(user.fullName).toBe(`${firstName} ${lastName}`);
        expect(user.email).toBe(email);
        const createdAtTime = new Date(user.createdAt).getTime();
        const updatedAtTime = new Date(user.updatedAt).getTime();

        expect(createdAtTime).not.toBeNaN();
        expect(updatedAtTime).not.toBeNaN();

        const tokens = body.data.tokens;
        expect(tokens.tokenType).toBe("bearer");
        const accessToken = tokens.accessToken;
        const refreshToken = tokens.refreshToken;

        const testAccessSecret: string =
          process.env.TEST_ACCESS_TOKEN_SECRET || "";
        const testRefreshSecret: string =
          process.env.TEST_REFRESH_TOKEN_SECRET || "";

        const accessTokenDecoded = jwt.verify(accessToken, testAccessSecret);
        const refreshTokenDecoded = jwt.verify(refreshToken, testRefreshSecret);

        expect(accessTokenDecoded).toEqual(
          expect.objectContaining({
            user: expect.objectContaining({
              _id: _id,
              firstName: firstName,
              lastName: lastName,
            }),
          })
        );

        expect(refreshTokenDecoded).toEqual(
          expect.objectContaining({
            user: expect.objectContaining({
              _id: _id,
            }),
          })
        );
      });
  });

  test("should return 401 Unauthorized if email is not found", async () => {
    await seedDB();

    return request(app)
      .post("/api/v1/auth/login")
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
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
      })
      .then((body) => {
        expect(body.error.statusText).toBe("Unauthorized");
        expect(body.error.statusCode).toBe(401);
        expect(body.error.code).toBe("E5"); // Unauthorized

        const dateTime = body.error.dateTime;
        expect(new Date(dateTime).getTime()).not.toBeNaN();
      });
  });

  test("should return 401 Unauthorized if password doesn't match {testCase: 5xuYxOFrQo5QgTJz-BXFn}", async () => {
    await seedDB("5xuYxOFrQo5QgTJz-BXFn");

    const email = "Destini.Rath79@yahoo.com";
    const password: string = "qd4OlZgNxfeg5D6" + "JustToInvalidate";

    return request(app)
      .post("/api/v1/auth/login")
      .send({
        email,
        password,
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
      })
      .then((body) => {
        expect(body.error.statusText).toBe("Unauthorized");
        expect(body.error.statusCode).toBe(401);
        expect(body.error.code).toBe("E5"); // Unauthorized

        const dateTime = body.error.dateTime;
        expect(new Date(dateTime).getTime()).not.toBeNaN();
      });
  });
});
