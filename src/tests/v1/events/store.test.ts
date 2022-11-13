import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../../../.env") });
import request from "supertest";
import seedDB from "../utils/seeds/seedDB";
import app from "../../../app";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

describe("POST /api/v1/events", () => {
  test("should return the event data with interval of 15mn, and level normal {testCase: rneXqQz2xP3lxvV6sVgsa}", async () => {
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
      .post("/api/v1/events")
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
        const startAt = body.data.event.startAt;
        const endAt = body.data.event.endAt;
        const createdAt = body.data.event.createdAt;
        const updatedAt = body.data.event.updatedAt;

        const startAtTime = new Date(startAt).getTime();
        const endAtTime = new Date(endAt).getTime();
        const createdAtTime = new Date(createdAt).getTime();
        const updatedAtTime = new Date(updatedAt).getTime();

        expect(startAtTime).not.toBeNaN();
        expect(endAtTime).not.toBeNaN();
        expect(createdAtTime).not.toBeNaN();
        expect(updatedAtTime).not.toBeNaN();

        expect(endAtTime).toBeGreaterThan(startAtTime);
        expect(startAtTime).toBeGreaterThanOrEqual(createdAtTime);

        const status = body.data.event.status;
        expect(status).toBe("pending");
        const level = body.data.event.level;
        expect(level).toBe("normal");
      });
  });

  test("should return the event data with interval of 15mn, and level important {testCase: rneXqQz2xP3lxvV6sVgsa}", async () => {
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
      .post("/api/v1/events")
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
        const startAt = body.data.event.startAt;
        const endAt = body.data.event.endAt;
        const createdAt = body.data.event.createdAt;
        const updatedAt = body.data.event.updatedAt;

        const startAtTime = new Date(startAt).getTime();
        const endAtTime = new Date(endAt).getTime();
        const createdAtTime = new Date(createdAt).getTime();
        const updatedAtTime = new Date(updatedAt).getTime();

        expect(startAtTime).not.toBeNaN();
        expect(endAtTime).not.toBeNaN();
        expect(createdAtTime).not.toBeNaN();
        expect(updatedAtTime).not.toBeNaN();

        expect(endAtTime).toBeGreaterThan(startAtTime);
        expect(startAtTime).toBeGreaterThanOrEqual(createdAtTime);

        const status = body.data.event.status;
        expect(status).toBe("pending");
        const level = body.data.event.level;
        expect(level).toBe("important");
      });
  });

  test("should return the event data with interval of 1h and 45mn {testCase: VX4Yxq1WIDhCT5Q6EQoiX}", async () => {
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
      .post("/api/v1/events")
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
        const startAt = body.data.event.startAt;
        const endAt = body.data.event.endAt;
        const createdAt = body.data.event.createdAt;
        const updatedAt = body.data.event.updatedAt;

        const startAtTime = new Date(startAt).getTime();
        const endAtTime = new Date(endAt).getTime();
        const createdAtTime = new Date(createdAt).getTime();
        const updatedAtTime = new Date(updatedAt).getTime();

        expect(startAtTime).not.toBeNaN();
        expect(endAtTime).not.toBeNaN();
        expect(createdAtTime).not.toBeNaN();
        expect(updatedAtTime).not.toBeNaN();

        expect(endAtTime).toBeGreaterThan(startAtTime);
        expect(startAtTime).toBeGreaterThanOrEqual(createdAtTime);

        const status = body.data.event.status;
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
      .post("/api/v1/events")
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

  test("should return 400 Bad Request if endAt is before startAt {testCase: XJNdn3WA0zhokS3IPnbh6}", async () => {
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
    startAt.setHours(14); // To make sure start is not a few minutes before midnight
    const endAt = new Date(startAt.getTime() - 6 * 60 * 60 * 1000); // startAt - 6h
    const data: Record<string, unknown> = {
      title,
      description,
      startAt,
      endAt,
    };

    return request(app)
      .post("/api/v1/events")
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
        .post("/api/v1/events")
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
        .post("/api/v1/events")
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
          const startAt = body.data.event.startAt;
          const endAt = body.data.event.endAt;
          const createdAt = body.data.event.createdAt;
          const updatedAt = body.data.event.updatedAt;

          const startAtTime = new Date(startAt).getTime();
          const endAtTime = new Date(endAt).getTime();
          const createdAtTime = new Date(createdAt).getTime();
          const updatedAtTime = new Date(updatedAt).getTime();

          expect(startAtTime).not.toBeNaN();
          expect(endAtTime).not.toBeNaN();
          expect(createdAtTime).not.toBeNaN();
          expect(updatedAtTime).not.toBeNaN();

          expect(endAtTime).toBeGreaterThan(startAtTime);
          expect(startAtTime).toBeGreaterThanOrEqual(createdAtTime);

          const status = body.data.event.status;
          expect(status).toBe("pending");
          const level = body.data.event.level;
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
      .post("/api/v1/events")
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
      .post("/api/v1/events")
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
      .post("/api/v1/events")
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

  /* 
    {
      startAt: relative to startAt,
      endAt: relative to endAt,
    }
  */
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
    "should return 409 Conflict if interval is correct but it superpose another existing event {testCase: UIEDmiNq17C4-RHLoA4eE}",
    async (interval) => {
      await seedDB("UIEDmiNq17C4-RHLoA4eE");

      const startAt = faker.date.future();
      startAt.setHours(9, 0, 0, 0);
      const intervalMs = 2 * 60 * 60 * 1000; // 2h (9h - 11h)
      const endAt = new Date(startAt.getTime() + intervalMs);

      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife = 15; // mn

      // mimic access token
      const accessToken = jwt.sign(
        {
          user: {
            _id: "6333f30d40ff5312965bd5ad",
            firstName: "Dasia",
            lastName: "Armstrong",
          },
        },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}m`,
        }
      );

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

  /* [interval in mn] */
  test.each([15, 30, 75, -15, -30, -75])(
    "should return 201 if interval is continuous {testCase: _8s9bX8dmR7sJu_sl4veC}",
    async (interval) => {
      await seedDB("_8s9bX8dmR7sJu_sl4veC");

      const startAt = faker.date.future();
      startAt.setHours(12, 0, 0, 0);
      const endAt = new Date(startAt.getTime() + 2 * 60 * 60 * 1000);

      // mimic accessToken
      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 10 * 60 * 1000; // 10mn
      const accessToken = jwt.sign(
        {
          user: {
            _id: "633408aeab6c493041b2c596",
            firstName: "Bonnie",
            lastName: "Balistreri",
          },
        },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}`,
        }
      );

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
        })
        .expect("Content-Type", /json/)
        .expect(201);

      const newStartAt =
        interval > 0
          ? endAt
          : new Date(startAt.getTime() + interval * 60 * 1000);

      const newEndAt =
        interval > 0
          ? new Date(endAt.getTime() + interval * 60 * 1000)
          : startAt;

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
          startAt: newStartAt,
          endAt: newEndAt,
        })
        .expect("Content-Type", /json/)
        .expect(201);
    }
  );

  // [ interval in mn ]
  test.each([15, 30, 75])(
    "should return 201 Created if startAt or endAt is at midnight {testCase: y-GEOrbC8lISzyHB22JPV}",
    async (interval) => {
      await seedDB("y-GEOrbC8lISzyHB22JPV");

      const data: Record<string, string> = {
        title: faker.lorem.slug(Math.floor(Math.random() * 5 + 1)),
        description:
          Math.floor(Math.random() * 10) % 2 === 0
            ? faker.hacker.phrase()
            : faker.lorem.sentence(7),
        status: Math.round(Math.random() * 100) % 2 === 0 ? "completed" : "failed",
        level:
          Math.round(Math.random() * 100) % 2 === 0 ? "normal" : "important",
      };

      // mimic accessToken
      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 10 * 60 * 1000; // 10mn
      const accessToken = jwt.sign(
        {
          user: {
            _id: "6337cb1801181e08bb858f8a",
            firstName: "Javonte",
            lastName: "Herman",
          },
        },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}`,
        }
      );

      // endAt is at midnight
      const endAt = faker.date.future();
      endAt.setHours(0, 0, 0, 0);

      const startAt = new Date(endAt.getTime() - interval * 60 * 1000); // start - interval

      data["startAt"] = startAt.toISOString();
      data["endAt"] = endAt.toISOString();

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
        })
        .expect("Content-Type", /json/)
        .expect(201);

      // clear the DB and repopulate
      await seedDB("y-GEOrbC8lISzyHB22JPV");

      startAt.setTime(endAt.getTime());
      endAt.setMinutes(interval, 0, 0);

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
        })
        .expect("Content-Type", /json/)
        .expect(201);
    }
  );
});
