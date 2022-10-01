import dotenv from "dotenv";
dotenv.config();
import request from "supertest";
import seedDB from "../../utils/seeds/seedDB";
import app from "../../../../app";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

describe("GET /api/v1/todos", () => {
  test.each([
    {
      testCase: "Kw_UIqtaNJ8Gv-5_LoiiI",
      input: {
        user: {
          _id: "633295fd263d960e74ce5fc1",
          firstName: "Delmer",
          lastName: "Medhurst",
        },
      },
      output: {
        todos: {
          length: 3,
          value: [
            {
              _id: "6332869880a239ec6262caec",
              title: "libero-accusantium-iusto-qui-fugit",
              description: "Praesentium ut quia voluptates ea rerum qui.",
              status: "done",
              level: "important",
              startAt: "2022-01-09T22:30:00.000Z",
              endAt: "2022-01-09T22:45:00.000Z",
              createdAt: "2021-04-28T14:59:41.566Z",
            },
            {
              _id: "6332869880a239ec6262caed",
              title: "iure-hic-officiis-ut-dolorem",
              description: "Fugiat fugit sed et ut est eligendi.",
              status: "failed",
              level: "important",
              startAt: "2022-07-06T14:00:00.000Z",
              endAt: "2022-07-06T15:00:00.000Z",
              createdAt: "2021-11-21T07:13:11.154Z",
            },
            {
              _id: "6332869880a239ec6262caee",
              title: "quae",
              description: "Maiores consequatur in dolore non aut enim.",
              status: "failed",
              level: "important",
              startAt: "2022-03-30T21:45:00.000Z",
              endAt: "2022-03-30T22:15:00.000Z",
              createdAt: "2022-03-07T18:37:48.152Z",
            },
          ],
        },
      },
    },
    {
      testCase: "8PtXPwmY0_4oMhi471_lp",
      input: {
        user: {
          _id: "633298e97ecb68e4eafd9f93",
          firstName: "Wilhelm",
          lastName: "Waelchi",
        },
      },
      output: {
        todos: {
          length: 21,
          value: [
            {
              _id: "6332983dd0a7c6606e36a275",
              title: "illum",
              description:
                "Libero commodi placeat molestiae harum natus atque.",
              status: "failed",
              level: "important",
              startAt: "2022-05-07T15:15:00.000Z",
              endAt: "2022-05-07T15:30:00.000Z",
              createdAt: "2021-12-31T22:32:13.999Z",
            },
            {
              _id: "6332983dd0a7c6606e36a276",
              title: "sed",
              description: "We need to generate the wireless SCSI card!",
              status: "failed",
              level: "important",
              startAt: "2021-09-27T21:00:00.000Z",
              endAt: "2021-09-27T21:30:00.000Z",
              createdAt: "2021-07-19T15:36:00.277Z",
            },
            {
              _id: "6332983dd0a7c6606e36a277",
              title: "sit-dolorem-incidunt",
              description:
                "Use the virtual TLS feed, then you can generate the virtual transmitter!",
              status: "failed",
              level: "important",
              startAt: "2022-08-18T15:15:00.000Z",
              endAt: "2022-08-18T15:45:00.000Z",
              createdAt: "2021-11-24T13:02:04.166Z",
            },
            {
              _id: "6332983dd0a7c6606e36a278",
              title: "veniam-velit-sequi",
              description:
                "Nihil sequi voluptatem dolor natus soluta distinctio.",
              status: "failed",
              level: "important",
              startAt: "2022-03-30T08:30:00.000Z",
              endAt: "2022-03-30T09:30:00.000Z",
              createdAt: "2021-07-05T16:04:28.296Z",
            },
            {
              _id: "6332983dd0a7c6606e36a279",
              title: "et",
              description:
                "Similique quisquam repellendus deserunt beatae dolor enim.",
              status: "done",
              level: "important",
              startAt: "2021-10-07T14:45:00.000Z",
              endAt: "2021-10-07T15:45:00.000Z",
              createdAt: "2021-04-05T22:51:01.161Z",
            },
            {
              _id: "6332983dd0a7c6606e36a27a",
              title: "perspiciatis",
              description:
                "backing up the bandwidth won't do anything, we need to back up the neural SAS protocol!",
              status: "failed",
              level: "important",
              startAt: "2022-06-24T01:15:00.000Z",
              endAt: "2022-06-24T02:00:00.000Z",
              createdAt: "2022-04-09T10:46:43.942Z",
            },
            {
              _id: "6332983dd0a7c6606e36a27b",
              title: "asperiores-qui-nisi-perspiciatis",
              description:
                "The API interface is down, quantify the redundant capacitor so we can back up the UDP capacitor!",
              status: "failed",
              level: "important",
              startAt: "2021-12-09T15:30:00.000Z",
              endAt: "2021-12-09T16:30:00.000Z",
              createdAt: "2021-10-06T03:52:13.508Z",
            },
            {
              _id: "6332983dd0a7c6606e36a27c",
              title: "aut-officiis-non",
              description:
                "Nesciunt necessitatibus et sed dolorem accusamus laudantium.",
              status: "failed",
              level: "important",
              startAt: "2022-03-10T21:15:00.000Z",
              endAt: "2022-03-10T22:00:00.000Z",
              createdAt: "2021-03-29T21:22:50.692Z",
            },
            {
              _id: "6332983dd0a7c6606e36a27d",
              title: "molestiae-facilis",
              description:
                "Sapiente quis voluptas quis delectus temporibus aliquam.",
              status: "failed",
              level: "normal",
              startAt: "2022-04-10T08:00:00.000Z",
              endAt: "2022-04-10T08:15:00.000Z",
              createdAt: "2022-01-01T03:09:18.961Z",
            },
            {
              _id: "6332983dd0a7c6606e36a27e",
              title: "dolores-nam",
              description:
                "Try to connect the RSS firewall, maybe it will copy the cross-platform pixel!",
              status: "done",
              level: "important",
              startAt: "2022-04-15T19:15:00.000Z",
              endAt: "2022-04-15T20:15:00.000Z",
              createdAt: "2022-04-09T23:18:53.382Z",
            },
            {
              _id: "6332983dd0a7c6606e36a27f",
              title: "eligendi-ex",
              description:
                "You can't transmit the capacitor without synthesizing the redundant AI array!",
              status: "done",
              level: "important",
              startAt: "2022-05-22T06:15:00.000Z",
              endAt: "2022-05-22T07:15:00.000Z",
              createdAt: "2021-11-23T21:18:22.247Z",
            },
            {
              _id: "6332983dd0a7c6606e36a280",
              title: "veritatis-explicabo-culpa-qui",
              description: "Sunt ea beatae et maiores vel magni.",
              status: "done",
              level: "normal",
              startAt: "2022-02-20T15:00:00.000Z",
              endAt: "2022-02-20T15:45:00.000Z",
              createdAt: "2021-05-18T22:25:48.155Z",
            },
            {
              _id: "6332983dd0a7c6606e36a281",
              title: "distinctio-itaque",
              description: "Et magnam magnam magni nihil dolore et.",
              status: "failed",
              level: "important",
              startAt: "2021-12-08T02:45:00.000Z",
              endAt: "2021-12-08T03:00:00.000Z",
              createdAt: "2021-10-17T03:31:11.136Z",
            },
            {
              _id: "6332983dd0a7c6606e36a282",
              title: "quia-aliquid-molestiae-accusantium-ut",
              description: "Esse quo et perferendis architecto et soluta.",
              status: "done",
              level: "normal",
              startAt: "2022-05-29T09:45:00.000Z",
              endAt: "2022-05-29T10:15:00.000Z",
              createdAt: "2022-05-19T07:39:51.610Z",
            },
            {
              _id: "6332983dd0a7c6606e36a283",
              title: "molestiae-perspiciatis-dolorum-qui",
              description: "Omnis dolores numquam aut quia non deserunt.",
              status: "failed",
              level: "normal",
              startAt: "2021-10-20T23:15:00.000Z",
              endAt: "2021-10-20T23:45:00.000Z",
              createdAt: "2021-10-20T16:31:14.793Z",
            },
            {
              _id: "6332983dd0a7c6606e36a284",
              title: "quia-vero-molestiae-nihil",
              description: "Consequatur sed sapiente nam ut ut aut.",
              status: "failed",
              level: "important",
              startAt: "2021-12-05T11:00:00.000Z",
              endAt: "2021-12-05T11:45:00.000Z",
              createdAt: "2021-08-22T01:46:56.234Z",
            },
            {
              _id: "6332983dd0a7c6606e36a285",
              title: "at",
              description:
                "Use the primary SMS transmitter, then you can hack the wireless bus!",
              status: "done",
              level: "normal",
              startAt: "2022-02-10T19:45:00.000Z",
              endAt: "2022-02-10T20:30:00.000Z",
              createdAt: "2022-01-27T21:38:54.918Z",
            },
            {
              _id: "6332983dd0a7c6606e36a286",
              title: "sapiente-rerum-officia",
              description: "Qui ad animi quidem saepe eius excepturi.",
              status: "failed",
              level: "important",
              startAt: "2021-12-07T15:15:00.000Z",
              endAt: "2021-12-07T15:45:00.000Z",
              createdAt: "2021-05-06T22:20:06.920Z",
            },
            {
              _id: "6332983dd0a7c6606e36a287",
              title: "temporibus",
              description: "Ea hic ex harum qui ut quam.",
              status: "failed",
              level: "normal",
              startAt: "2022-07-09T20:30:00.000Z",
              endAt: "2022-07-09T20:45:00.000Z",
              createdAt: "2022-05-18T11:08:50.252Z",
            },
            {
              _id: "6332983dd0a7c6606e36a288",
              title: "voluptatem-inventore-maxime-nesciunt-aperiam",
              description:
                "I'll hack the back-end SCSI card, that should sensor the USB capacitor!",
              status: "failed",
              level: "important",
              startAt: "2021-11-29T05:45:00.000Z",
              endAt: "2021-11-29T06:15:00.000Z",
              createdAt: "2021-06-26T16:54:16.905Z",
            },
            {
              _id: "6332983dd0a7c6606e36a289",
              title: "est-inventore",
              description:
                "If we back up the capacitor, we can get to the XSS transmitter through the online JBOD driver!",
              status: "failed",
              level: "important",
              startAt: "2022-04-02T22:15:00.000Z",
              endAt: "2022-04-02T23:00:00.000Z",
              createdAt: "2022-01-31T22:55:24.631Z",
            },
          ],
        },
      },
    },
    {
      testCase: "IIX5XTZ5c5zuzNzogGvri",
      input: {
        user: {
          _id: "63329c06f70df6554c998f87",
          firstName: "Shanie",
          lastName: "Sipes",
        },
      },
      output: {
        todos: {
          length: 0,
          value: [],
        },
      },
    },
  ])(
    "should return todos with length $output.todos.length {testCase: $testCase}",
    async (test) => {
      await seedDB(test.testCase || undefined);

      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife = 15; // mn

      // mimic access token
      const accessToken = jwt.sign(
        {
          user: test.input.user,
        },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}m`,
        }
      );

      return request(app)
        .get("/api/v1/todos")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.data).not.toBeFalsy();
          expect(response.body.data.todos).toStrictEqual(
            test.output.todos.value
          );
        });
    }
  );

  test.each([
    {
      testCase: "OeSUVU1NOdsM8WALeKU1V",
      input: {
        user: {
          _id: "6332aafc5ba34e20f34787cf",
          firstName: "Emmanuelle",
          lastName: "Borer",
        },
        todos: {
          length: 1,
          values: [
            {
              title: "ut-ullam-autem",
              description:
                "Try to synthesize the CLI pixel, maybe it will index the 1080p protocol!",
              level: "normal",
            },
          ],
        },
      },
      output: {
        before: {
          todos: {
            length: 3,
            value: [
              {
                _id: "6332aaf69a2562484d41e227",
                title: "quo-ad-neque",
                description:
                  "You can't override the port without compressing the optical GB microchip!",
                status: "done",
                level: "normal",
                startAt: "2022-03-28T10:00:00.000Z",
                endAt: "2022-03-28T11:00:00.000Z",
                createdAt: "2021-11-09T02:08:11.172Z",
              },
              {
                _id: "6332aaf69a2562484d41e228",
                title: "molestias-accusantium-quidem",
                description:
                  "Try to program the IP panel, maybe it will compress the primary array!",
                status: "failed",
                level: "normal",
                startAt: "2022-06-12T16:45:00.000Z",
                endAt: "2022-06-12T17:00:00.000Z",
                createdAt: "2021-12-07T09:37:19.650Z",
              },
              {
                _id: "6332aaf69a2562484d41e229",
                title: "praesentium-nam-est",
                description:
                  "I'll generate the redundant USB transmitter, that should bus the COM sensor!",
                status: "failed",
                level: "normal",
                startAt: "2021-11-24T14:30:00.000Z",
                endAt: "2021-11-24T15:15:00.000Z",
                createdAt: "2021-06-26T19:13:29.451Z",
              },
            ],
          },
        },
      },
    },
    {
      testCase: "TDZH0fda2J_j9955JBsGY",
      input: {
        user: {
          _id: "6332b0fd14f4d1e465f7ddb3",
          firstName: "Fiona",
          lastName: "Wintheiser",
        },
        todos: {
          length: 2,
          values: [
            {
              title: "dolores",
              description: "Consequatur et autem aut tempora in et.",
              level: "important",
            },
            {
              title: "enim-qui-quisquam-eius-sunt",
              description:
                "Sed possimus perspiciatis quaerat consequatur sint quo.",
              level: "important",
            },
          ],
        },
      },
      output: {
        before: {
          todos: {
            length: 1,
            value: [
              {
                _id: "6332b0ddc1320a76d98b71b7",
                title: "molestiae-quis-perspiciatis-repudiandae",
                description:
                  "generating the interface won't do anything, we need to parse the primary COM port!",
                status: "done",
                level: "normal",
                startAt: "2022-05-20T14:45:00.000Z",
                endAt: "2022-05-20T15:00:00.000Z",
                createdAt: "2021-09-26T01:56:38.432Z",
              },
            ],
          },
        },
      },
    },
  ])(
    "should return todos with length $input.todos.length + $output.before.todos.length after storing $input.todos.length todos",
    async (test) => {
      await seedDB(test.testCase || undefined);

      const roundDate = (date: Date) => {
        const result = date;
        result.setSeconds(0);
        result.setMilliseconds(0);

        const newMinutes = Math.round(result.getMinutes() / 15) * 15; // get 0, 15, 30, 60
        const diff = newMinutes - result.getMinutes();
        const diffMilliSeconds = diff * 60 * 1000;

        result.setTime(result.getTime() + diffMilliSeconds);
        return result;
      };

      const after = test.output.before.todos.value;

      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
      const accessTokenLife = 15; // mn
      const accessToken = jwt.sign(
        { user: test.input.user },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}m`,
        }
      );

      let lastTodo = new Date();
      await Promise.all(
        test.input.todos.values.map(async (todoInput) => {
          let startAt = faker.date.future(1, lastTodo);
          startAt = roundDate(startAt);
          startAt.setHours(0); // to get more hours until the end of the day
          const intervalMn: number =
            [15, 30, 45, 60].at(Math.floor(Math.random() * 4)) || 15;
          const intervalMs = intervalMn * 60 * 1000;
          const endAt = new Date(startAt.getTime() + intervalMs);

          if (startAt.getDate() !== endAt.getDate()) {
            startAt = endAt;
            endAt.setTime(endAt.getTime() + intervalMs);
          }

          lastTodo = endAt;

          const data = {
            ...todoInput,
            startAt,
            endAt,
          };

          await request(app)
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
              const todo = body.data.todo;
              expect(todo.title).toBe(todoInput.title);
              expect(todo.description).toBe(todoInput.description);
              expect(todo.level).toBe(todoInput.level);
              expect(todo.status).toBe("pending");

              const startAt = body.data.todo.startAt;
              const endAt = body.data.todo.endAt;
              const createdAt = body.data.todo.createdAt;

              const startAtTime = new Date(startAt).getTime();
              const endAtTime = new Date(endAt).getTime();
              const createdAtTime = new Date(createdAt).getTime();

              expect(startAtTime).not.toBeNaN();
              expect(endAtTime).not.toBeNaN();
              expect(createdAtTime).not.toBeNaN();

              return todo;
            })
            .then((todo) => {
              after.push(todo);
            });
        })
      );

      return request(app)
        .get("/api/v1/todos")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200)
        .expect("Content-Type", /json/)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              data: expect.objectContaining({
                todos: after,
              }),
            })
          );
        });
    }
  );
});
