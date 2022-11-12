import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";
import { TSeed } from "../../types";
import { nanoid } from "nanoid";

const startAt1 = faker.date.future();
const endAt1 = faker.date.soon(1, startAt1);

const startAt2 = faker.date.soon(2, endAt1);
const endAt2 = faker.date.soon(1, startAt2);

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("6339afa187976cf94101f5a7"),
        firstName: "Rusty",
        lastName: "Upton",
        email: "Rusty.Upton@yahoo.com",
        password:
          "$2b$10$DaTjZFdkRl7POzDkLKrOeO/y.HEAgiGHhCjuv8eRnxQOzwtdSoYI6",
        channelId: nanoid(),
        createdAt: new Date("2021-11-01T17:30:37.736Z"),
        updatedAt: new Date("2021-12-06T12:17:25.204Z"),
        refreshTokens: [],
        events: [
          {
            _id: new ObjectId("6339b13e874a202526ee7dc7"),
            title: "aut-et-qui-ratione",
            description:
              "The IP port is down, calculate the primary hard drive so we can connect the PCI pixel!",
            status: "completed",
            level: "normal",
            startAt: new Date("2022-03-05T05:30:00.000Z"),
            endAt: new Date("2022-03-05T06:00:00.000Z"),
            createdAt: new Date("2021-11-23T06:50:20.867Z"),
            updatedAt: new Date("2021-11-23T06:50:20.867Z"),
          },
          {
            _id: new ObjectId("6339b13e874a202526ee7dc8"),
            title: "qui-consequuntur-voluptatibus-consequatur-eius",
            description: "Ad quidem occaecati sed asperiores qui mollitia.",
            status: "failed",
            level: "normal",
            startAt: new Date("2021-11-23T02:00:00.000Z"),
            endAt: new Date("2021-11-23T02:30:00.000Z"),
            createdAt: new Date("2021-04-28T03:00:46.048Z"),
            updatedAt: new Date("2021-04-28T03:00:46.048Z"),
          },
          {
            _id: new ObjectId("6339b13e874a202526ee7dc9"),
            title: "maiores-hic-nihil-delectus-a",
            description:
              "Try to transmit the HTTP pixel, maybe it will program the back-end sensor!",
            status: "failed",
            level: "normal",
            startAt: new Date("2021-11-02T05:15:00.000Z"),
            endAt: new Date("2021-11-02T05:30:00.000Z"),
            createdAt: new Date("2021-06-18T00:09:45.773Z"),
            updatedAt: new Date("2021-06-18T00:09:45.773Z"),
          },
          {
            _id: new ObjectId("6339c453a99e445be44ad8b9"),
            title: "corporis-odit-sunt",
            description:
              "Inventore assumenda architecto deleniti vel laudantium iusto.",
            status: "completed",
            level: "important",
            startAt: startAt1,
            endAt: endAt1,
            createdAt: new Date("2021-12-26T16:37:31.402Z"),
            updatedAt: new Date("2021-12-26T16:37:31.402Z"),
          },
          {
            _id: new ObjectId("6339c453a99e445be44ad8ba"),
            title: "id",
            description: "Velit vel et ducimus delectus sint hic.",
            status: "failed",
            level: "important",
            startAt: startAt2,
            endAt: endAt2,
            createdAt: new Date("2021-07-21T05:58:48.143Z"),
            updatedAt: new Date("2021-07-21T05:58:48.143Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
