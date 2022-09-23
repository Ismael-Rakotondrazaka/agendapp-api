import dotenv from "dotenv";
dotenv.config();
import request from "supertest";
import seedDB from "../../utils/seeds/seedDB";
import app from "../../../../app";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

describe("POST /api/v1/auth/register", () => {
  test("should return user and tokens data", async () => {
    await seedDB();

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const passwordValidation = password;

    return request(app)
      .post("/api/v1/auth/register")
      .send({
        firstName,
        lastName,
        email,
        password,
        passwordValidation,
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
              user: expect.objectContaining({
                _id: expect.any(String),
                firstName: expect.any(String),
                lastName: expect.any(String),
                fullName: expect.any(String),
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
              _id: expect.any(String),
              firstName: firstName,
              lastName: lastName,
            }),
          })
        );

        expect(refreshTokenDecoded).toEqual(
          expect.objectContaining({
            user: expect.objectContaining({
              _id: expect.any(String),
            }),
          })
        );
      });
  });

  test("should return 400 Bad Request Error if password != passwordValidation", async () => {
    const password = faker.internet.password();
    const passwordValidation = password + "45";

    return request(app)
      .post("/api/v1/auth/register")
      .send({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password,
        passwordValidation,
      })
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
      })
      .then((body) => {
        expect(body.error.statusText).toBe("Bad Request");
        expect(body.error.statusCode).toBe(400);
        expect(body.error.code).toBe("E2");

        const dateTime = body.error.dateTime;
        expect(new Date(dateTime).getTime()).not.toBeNaN();
      });
  });

  test("should return 409 Conflict Error if email is already used {testCase: 3XcaMwQ90iD7FwVWZhiSU}", async () => {
    await seedDB("3XcaMwQ90iD7FwVWZhiSU");

    const email = "Kassandra4@hotmail.com";
    const password = faker.internet.password();

    return request(app)
      .post("/api/v1/auth/register")
      .send({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email,
        password,
        passwordValidation: password,
      })
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
  });

  const FIELDS: {
    name: string;
    type: string;
    required: boolean;
  }[] = [
    {
      name: "firstName",
      type: "string",
      required: true,
    },
    {
      name: "lastName",
      type: "string",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "password",
      type: "string",
      required: true,
    },
    {
      name: "passwordValidation",
      type: "string",
      required: true,
    },
  ];

  const FIELDS_REQUIRED = FIELDS.filter((field) => field.required);

  test.each(FIELDS_REQUIRED)(
    "should return 400 Bad Request when field $name is missing",
    async (field) => {
      await seedDB();

      const password = faker.internet.password();

      const data: Record<string, unknown> = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password,
        passwordValidation: password,
      };

      delete data[field.name];

      return request(app)
        .post("/api/v1/auth/register")
        .send(data)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              error: expect.objectContaining({
                message: expect.any(String),
                statusCode: expect.any(Number),
                statusText: expect.any(String),
                code: expect.any(String),
                dateTime: expect.any(String),
              }),
            })
          );

          return response.body;
        })
        .then((body) => {
          expect(body.error.statusText).toBe("Bad Request");
          expect(body.error.statusCode).toBe(400);
          expect(body.error.code).toBe("E2");

          const dateTime = body.error.dateTime;
          expect(new Date(dateTime).getTime()).not.toBeNaN();
        });
    }
  );

  test.each([
    {
      key: "firstName",
      value: "Victoria!",
    },
    {
      key: "firstName",
      value: "Smith04",
    },
    {
      key: "firstName",
      value: "SmithSmithSmithSmithX", // * max 20 characters
    },
    {
      key: "lastName",
      value: "#Barth*=",
    },
    {
      key: "lastName",
      value: "Ma11ths5",
    },
    {
      key: "lastName",
      value: "BarthBarthBarthBarthBarthX", // * max 20 characters
    },
    {
      key: "email",
      value: "465rcze4456",
    },
    {
      key: "password",
      value: "55555", // * min 8 characters
    },
  ])(
    "should return 400 Bad Request if field $key is invalid",
    async (invalid) => {
      await seedDB();

      const password = faker.internet.password();
      const data: Record<string, unknown> = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password,
        passwordValidation: password,
      };

      data[invalid.key] = invalid.value;

      return request(app)
        .post("/api/v1/auth/register")
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
        })
        .then((body) => {
          expect(body.error.statusText).toBe("Bad Request");
          expect(body.error.statusCode).toBe(400);
          expect(body.error.code).toBe("E2");

          const dateTime = body.error.dateTime;
          expect(new Date(dateTime).getTime()).not.toBeNaN();
        });
    }
  );
});
