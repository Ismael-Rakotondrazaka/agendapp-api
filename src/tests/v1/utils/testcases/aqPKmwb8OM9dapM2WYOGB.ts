import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("635a15bdecf04f3f49cb214d"),
        firstName: "Louie",
        lastName: "Steuber",
        email: "Louie.Steuber@hotmail.com",
        password:
          "$2b$10$x9HDbqYDeBNz7ikezMdg7uKwnrrwwCgp3NHUefJXwYOfTtt7.rC92",
        createdAt: new Date("2022-07-11T11:49:13.616Z"),
        updatedAt: new Date("2022-09-12T07:21:16.707Z"),
        events: [
          {
            _id: new ObjectId("635a15e4ade6d7ef67d73e15"),
            title: "porro-veniam",
            description:
              "We need to calculate the open-source EXE application!",
            status: "pending",
            level: "normal",
            startAt: new Date("2022-06-22T18:45:00.000Z"),
            endAt: new Date("2022-06-22T19:00:00.000Z"),
            createdAt: new Date("2021-12-09T23:13:55.296Z"),
            updated: new Date("2021-12-09T23:13:55.296Z"),
          },
          {
            _id: new ObjectId("635a15e4ade6d7ef67d73e16"),
            title: "qui",
            description: "Magnam illo et atque molestiae laudantium voluptas.",
            status: "pending",
            level: "important",
            startAt: faker.date.past(),
            endAt: faker.date.past(),
            createdAt: new Date("2022-03-21T14:39:42.023Z"),
            updated: new Date("2021-12-09T23:13:55.296Z"),
          },
          {
            _id: new ObjectId("635a15e4ade6d7ef67d73e17"),
            title: "doloribus-ad",
            description: "We need to bypass the neural TCP array!",
            status: "pending",
            level: "important",
            startAt: faker.date.future(),
            endAt: faker.date.future(),
            createdAt: new Date("2021-08-23T21:30:28.832Z"),
            updatedAt: new Date("2021-12-09T23:13:55.296Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
