import dotenv from "dotenv";
dotenv.config();
import request from "supertest";
import seedDB from "../../utils/seeds/seedDB";
import app from "../../../../app";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

describe("POST /api/v1/todos", () => {
  test("should return the todo data with interval of 15mn, and level normal {testCase: rneXqQz2xP3lxvV6sVgsa}", async () => {
    await seedDB("rneXqQz2xP3lxvV6sVgsa");

    const _id = "632e204e47122dbbc89a9ae2";
    const firstName = "Levi";
    const lastName = "Rutherford";

    // mimic accessToken
    const accessTokenData = {
      user: {
        _id,
        firstName,
        lastName,
      },
    };
    const accessTokenSecret: string =
      process.env.TEST_ACCESS_TOKEN_SECRET || "";
    const accessTokenLife: number = 17 * 60 * 1000; // 17mn
    const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
      expiresIn: `${accessTokenLife}`,
    });

    // creating the data to send
    const title = "quisquam-debitis-temporibus";
    const description =
      "The SMTP monitor is down, generate the auxiliary pixel so we can program the CLI system!";

    const startAt: Date = faker.date.future();
    startAt.setHours(8); // To make sure start is not a few minutes before midnight
    const endAt = new Date(startAt.getTime() + 15 * 60 * 1000); // startAt + 15mn
    const data: Record<string, unknown> = {
      title,
      description,
      startAt,
      endAt,
      level: "normal",
    };

    return request(app)
      .post("/api/v1/todos")
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
                level: expect.any(String),
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
        const startAt = body.data.todo.startAt;
        const endAt = body.data.todo.endAt;
        const createdAt = body.data.todo.createdAt;

        const startAtTime = new Date(startAt).getTime();
        const endAtTime = new Date(endAt).getTime();
        const createdAtTime = new Date(createdAt).getTime();

        expect(startAtTime).not.toBeNaN();
        expect(endAtTime).not.toBeNaN();
        expect(createdAtTime).not.toBeNaN();

        expect(endAtTime).toBeGreaterThan(startAtTime);
        expect(startAtTime).toBeGreaterThanOrEqual(createdAtTime);

        const status = body.data.todo.status;
        expect(status).toBe("pending");
        const level = body.data.todo.level;
        expect(level).toBe("normal");
      });
  });

  test("should return the todo data with interval of 15mn, and level important {testCase: rneXqQz2xP3lxvV6sVgsa}", async () => {
    await seedDB("rneXqQz2xP3lxvV6sVgsa");

    const _id = "632e204e47122dbbc89a9ae2";
    const firstName = "Levi";
    const lastName = "Rutherford";

    // mimic accessToken
    const accessTokenData = {
      user: {
        _id,
        firstName,
        lastName,
      },
    };
    const accessTokenSecret: string =
      process.env.TEST_ACCESS_TOKEN_SECRET || "";
    const accessTokenLife: number = 10 * 60 * 1000; // 10mn
    const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
      expiresIn: `${accessTokenLife}`,
    });

    // creating the data to send
    const title = "quisquam-debitis-temporibus";
    const description =
      "The SMTP monitor is down, generate the auxiliary pixel so we can program the CLI system!";

    const startAt: Date = faker.date.future();
    startAt.setHours(8); // To make sure start is not a few minutes before midnight
    const endAt = new Date(startAt.getTime() + 15 * 60 * 1000); // startAt + 15mn
    const data: Record<string, unknown> = {
      title,
      description,
      startAt,
      endAt,
      level: "important",
    };

    return request(app)
      .post("/api/v1/todos")
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
                level: expect.any(String),
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
        const startAt = body.data.todo.startAt;
        const endAt = body.data.todo.endAt;
        const createdAt = body.data.todo.createdAt;

        const startAtTime = new Date(startAt).getTime();
        const endAtTime = new Date(endAt).getTime();
        const createdAtTime = new Date(createdAt).getTime();

        expect(startAtTime).not.toBeNaN();
        expect(endAtTime).not.toBeNaN();
        expect(createdAtTime).not.toBeNaN();

        expect(endAtTime).toBeGreaterThan(startAtTime);
        expect(startAtTime).toBeGreaterThanOrEqual(createdAtTime);

        const status = body.data.todo.status;
        expect(status).toBe("pending");
        const level = body.data.todo.level;
        expect(level).toBe("important");
      });
  });

  test("should return the todo data with interval of 1h and 45mn {testCase: VX4Yxq1WIDhCT5Q6EQoiX}", async () => {
    await seedDB("VX4Yxq1WIDhCT5Q6EQoiX");

    const _id = "632e204e47122dbbc89a9ae2";
    const firstName = "Ardith";
    const lastName = "Kling";

    // mimic accessToken
    const accessTokenData = {
      user: {
        _id,
        firstName,
        lastName,
      },
    };
    const accessTokenSecret: string =
      process.env.TEST_ACCESS_TOKEN_SECRET || "";
    const accessTokenLife: number = 10 * 60 * 1000; // 10mn
    const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
      expiresIn: `${accessTokenLife}`,
    });

    // creating the data to send
    const title = "quia-eligendi-autem";
    const description =
      "If we calculate the port, we can get to the SQL pixel through the online ASCII sensor!";
    const startAt: Date = faker.date.future();
    // To make sure start is not a few minutes before midnight
    // and work with 24h format
    startAt.setHours(13);
    const endAt = new Date(startAt.getTime() + (60 + 45) * 60 * 1000); // startAt + 1h + 45mn
    const data: Record<string, unknown> = {
      title,
      description,
      startAt,
      endAt,
    };

    return request(app)
      .post("/api/v1/todos")
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
        const startAt = body.data.todo.startAt;
        const endAt = body.data.todo.endAt;
        const createdAt = body.data.todo.createdAt;

        const startAtTime = new Date(startAt).getTime();
        const endAtTime = new Date(endAt).getTime();
        const createdAtTime = new Date(createdAt).getTime();

        expect(startAtTime).not.toBeNaN();
        expect(endAtTime).not.toBeNaN();
        expect(createdAtTime).not.toBeNaN();

        expect(endAtTime).toBeGreaterThan(startAtTime);
        expect(startAtTime).toBeGreaterThanOrEqual(createdAtTime);

        const status = body.data.todo.status;
        expect(status).toBe("pending");
      });
  });

  test("should return 400 Bad Request if start and end are on different day {testCase: MtlzVQ_Ut6hubHzNwPQnP}", async () => {
    await seedDB("MtlzVQ_Ut6hubHzNwPQnP");

    const _id = "632e204e47122dbbc89a9ae2";
    const firstName = "Beulah";
    const lastName = "Collins";

    // mimic accessToken
    const accessTokenData = {
      user: {
        _id,
        firstName,
        lastName,
      },
    };
    const accessTokenSecret: string =
      process.env.TEST_ACCESS_TOKEN_SECRET || "";
    const accessTokenLife: number = 10 * 60 * 1000; // 10mn
    const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
      expiresIn: `${accessTokenLife}`,
    });

    // creating the data to send
    const title = "quisquam-debitis-temporibus";
    const description =
      "The SMTP monitor is down, generate the auxiliary pixel so we can program the CLI system!";

    const startAt: Date = faker.date.future();
    startAt.setHours(4); // To make sure start is not a few minutes before midnight
    const endAt = new Date(startAt.getTime() + 26 * 60 * 60 * 1000); // startAt + 26h
    const data: Record<string, unknown> = {
      title,
      description,
      startAt,
      endAt,
    };

    return request(app)
      .post("/api/v1/todos")
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
  });

  test("should return 400 Bad Request if end is before start {testCase: XJNdn3WA0zhokS3IPnbh6}", async () => {
    await seedDB("XJNdn3WA0zhokS3IPnbh6");

    const _id = "633159f667f9f77f3a1ca474";
    const firstName = "Emanuel";
    const lastName = "Pfeffer";

    // mimic accessToken
    const accessTokenData = {
      user: {
        _id,
        firstName,
        lastName,
      },
    };
    const accessTokenSecret: string =
      process.env.TEST_ACCESS_TOKEN_SECRET || "";
    const accessTokenLife: number = 10 * 60 * 1000; // 10mn
    const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
      expiresIn: `${accessTokenLife}`,
    });

    // creating the data to send
    const title = "quisquam-debitis-temporibus";
    const description =
      "The SMTP monitor is down, generate the auxiliary pixel so we can program the CLI system!";

    const startAt: Date = faker.date.future();
    startAt.setHours(4); // To make sure start is not a few minutes before midnight
    const endAt = new Date(startAt.getTime() - 6 * 60 * 60 * 1000); // startAt - 6h
    const data: Record<string, unknown> = {
      title,
      description,
      startAt,
      endAt,
    };

    return request(app)
      .post("/api/v1/todos")
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
      })
      .then((body) => {
        expect(body.error.statusText).toBe("Bad Request");
        expect(body.error.statusCode).toBe(400);
        expect(body.error.code).toBe("E2");

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
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "description",
      type: "string",
      required: false,
    },
    {
      name: "startAt",
      type: "string",
      required: true,
    },
    {
      name: "endAt",
      type: "string",
      required: true,
    },
    {
      name: "level",
      type: "string",
      required: false,
    },
  ];

  const FIELDS_REQUIRED: {
    name: string;
    type: string;
    required: boolean;
  }[] = FIELDS.filter((field) => field.required);

  test.each(FIELDS_REQUIRED)(
    "Should return 400 Bad Request if $name is missing {testCase: G9vTgREeRtc-OxxfZdJ4R}",
    async (field) => {
      await seedDB("G9vTgREeRtc-OxxfZdJ4R");

      const _id = "632ff402d54fe699132f15b9";
      const firstName = "Enola";
      const lastName = "Hilpert";

      // mimic accessToken
      const accessTokenData = {
        user: {
          _id,
          firstName,
          lastName,
        },
      };
      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 10 * 60 * 1000; // 10mn
      const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
        expiresIn: `${accessTokenLife}`,
      });

      // creating the data to send
      const title = "quisquam-debitis-temporibus";
      const description =
        "The SMTP monitor is down, generate the auxiliary pixel so we can program the CLI system!";

      const startAt: Date = faker.date.future();
      startAt.setHours(10); // To make sure start is not a few minutes before midnight
      const endAt = new Date(startAt.getTime() + 4 * 60 * 60 * 1000); // startAt + 4h
      const data: Record<string, unknown> = {
        title,
        description,
        startAt,
        endAt,
      };

      delete data[field.name];

      return request(app)
        .post("/api/v1/todos")
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

  const FIELDS_OPTIONAL: {
    name: string;
    type: string;
    required: boolean;
  }[] = FIELDS.filter((field) => !field.required);

  test.each(FIELDS_OPTIONAL)(
    "should NOT return error if $name is missing {testCase: SA0mOVFZ2VW6OnEyg2w8h}",
    async (field) => {
      await seedDB("SA0mOVFZ2VW6OnEyg2w8h");

      const _id = "63315b14db38012ee6317576";
      const firstName = "Cydney";
      const lastName = "Gislason";

      // mimic accessToken
      const accessTokenData = {
        user: {
          _id,
          firstName,
          lastName,
        },
      };
      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 10 * 60 * 1000; // 10mn
      const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
        expiresIn: `${accessTokenLife}`,
      });

      // creating the data to send
      const title = "quisquam-debitis-temporibus";
      const description =
        "The SMTP monitor is down, generate the auxiliary pixel so we can program the CLI system!";

      const startAt: Date = faker.date.future();
      startAt.setHours(10); // To make sure start is not a few minutes before midnight
      const endAt = new Date(startAt.getTime() + 4 * 60 * 60 * 1000); // startAt + 4h
      const data: Record<string, unknown> = {
        title,
        description,
        startAt,
        endAt,
      };

      delete data[field.name];

      return request(app)
        .post("/api/v1/todos")
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
                  level: expect.any(String),
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
          const startAt = body.data.todo.startAt;
          const endAt = body.data.todo.endAt;
          const createdAt = body.data.todo.createdAt;

          const startAtTime = new Date(startAt).getTime();
          const endAtTime = new Date(endAt).getTime();
          const createdAtTime = new Date(createdAt).getTime();

          expect(startAtTime).not.toBeNaN();
          expect(endAtTime).not.toBeNaN();
          expect(createdAtTime).not.toBeNaN();

          expect(endAtTime).toBeGreaterThan(startAtTime);
          expect(startAtTime).toBeGreaterThanOrEqual(createdAtTime);

          const status = body.data.todo.status;
          expect(status).toBe("pending");
          const level = body.data.todo.level;
          expect(level).toBe("normal");
        });
    }
  );

  test("should return 400 Bad Request if start is after end {testCase: RaxTGLf7jgds9wd3NlUh3}", async () => {
    await seedDB("RaxTGLf7jgds9wd3NlUh3");

    const _id = "63315c44572f01b9e026aa90";
    const firstName = "Stewart";
    const lastName = "Miller";

    // mimic accessToken
    const accessTokenData = {
      user: {
        _id,
        firstName,
        lastName,
      },
    };
    const accessTokenSecret: string =
      process.env.TEST_ACCESS_TOKEN_SECRET || "";
    const accessTokenLife: number = 10 * 60 * 1000; // 10mn
    const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
      expiresIn: `${accessTokenLife}`,
    });

    // creating the data to send
    const title = "quisquam-debitis-temporibus";
    const description =
      "The SMTP monitor is down, generate the auxiliary pixel so we can program the CLI system!";

    const startAt: Date = faker.date.future();
    startAt.setHours(15); // To make sure start is not a few minutes before midnight
    const endAt = new Date(startAt.getTime() - 6 * 60 * 60 * 1000); // startAt - 6h
    const data: Record<string, unknown> = {
      title,
      description,
      startAt,
      endAt,
    };

    return request(app)
      .post("/api/v1/todos")
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
      })
      .then((body) => {
        expect(body.error.statusText).toBe("Bad Request");
        expect(body.error.statusCode).toBe(400);
        expect(body.error.code).toBe("E2");

        const dateTime = body.error.dateTime;
        expect(new Date(dateTime).getTime()).not.toBeNaN();
      });
  });

  test("should return 403 Forbidden if token is valid but (user) _id doesn't exist", async () => {
    await seedDB();

    const _id = "63316132cc32fc1a289a29d6";
    const firstName = "Josh";
    const lastName = "McLaughlin";

    // mimic accessToken
    const accessTokenData = {
      user: {
        _id,
        firstName,
        lastName,
      },
    };
    const accessTokenSecret: string =
      process.env.TEST_ACCESS_TOKEN_SECRET || "";
    const accessTokenLife: number = 10 * 60 * 1000; // 10mn
    const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
      expiresIn: `${accessTokenLife}`,
    });

    // creating the data to send
    const title = "quisquam-debitis-temporibus";
    const description =
      "The SMTP monitor is down, generate the auxiliary pixel so we can program the CLI system!";

    const startAt: Date = faker.date.future();
    startAt.setHours(20); // To make sure start is not a few minutes before midnight
    const endAt = new Date(startAt.getTime() + 35 * 60 * 1000); // startAt + 35mn
    const data: Record<string, unknown> = {
      title,
      description,
      startAt,
      endAt,
    };

    return request(app)
      .post("/api/v1/todos")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(data)
      .expect("Content-Type", /json/)
      .expect(403)
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
        expect(body.error.code).toBe("E6"); // Forbidden

        const dateTime = body.error.dateTime;
        expect(new Date(dateTime).getTime()).not.toBeNaN();
      });
  });

  test("should return 403 Forbidden if token is invalid", async () => {
    await seedDB();

    const _id = "633162fbea89437454960f9e";
    const firstName = "Mohamed";
    const lastName = "Yundt";

    // mimic accessToken
    const accessTokenData = {
      user: {
        _id,
        firstName,
        lastName,
      },
    };
    const accessTokenSecret: string =
      process.env.TEST_ACCESS_TOKEN_SECRET + `Invalidate${Math.random()}` ||
      `Invalidate${Math.random()}`;
    const accessTokenLife: number = 10 * 60 * 1000; // 10mn
    const accessToken = jwt.sign(accessTokenData, accessTokenSecret, {
      expiresIn: `${accessTokenLife}`,
    });

    // creating the data to send
    const title = "quisquam-debitis-temporibus";
    const description =
      "The SMTP monitor is down, generate the auxiliary pixel so we can program the CLI system!";

    const startAt: Date = faker.date.future();
    startAt.setHours(20); // To make sure start is not a few minutes before midnight
    const endAt = new Date(startAt.getTime() + 35 * 60 * 1000); // startAt + 35mn
    const data: Record<string, unknown> = {
      title,
      description,
      startAt,
      endAt,
    };

    return request(app)
      .post("/api/v1/todos")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(data)
      .expect("Content-Type", /json/)
      .expect(403)
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
        expect(body.error.code).toBe("E6"); // Forbidden

        const dateTime = body.error.dateTime;
        expect(new Date(dateTime).getTime()).not.toBeNaN();
      });
  });
});
