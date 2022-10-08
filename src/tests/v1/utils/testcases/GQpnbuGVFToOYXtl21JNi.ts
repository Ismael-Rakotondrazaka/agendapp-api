import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("633989fdb508b4c5274f4ec9"),
        firstName: "Deja",
        lastName: "Skiles",
        email: "Deja_Skiles7@hotmail.com",
        password:
          "$2b$10$4tP1gwyB0Xg8mAG6qXlUwu4nbfJLcXyvtLFogTWGgXYiD7qbWifSC",
        createdAt: new Date("2021-11-30T16:05:02.797Z"),
        updatedAt: new Date("2022-01-14T06:11:58.312Z"),
        refreshTokens: [],
        events: [
          {
            _id: new ObjectId("63398ac29c6ca3cd8bfc548a"),
            title: "eos",
            description:
              "Mollitia enim officia veritatis velit iure occaecati.",
            status: "failed",
            level: "normal",
            startAt: faker.date.future(),
            endAt: faker.date.future(),
            createdAt: new Date("2021-09-08T10:20:51.793Z"),
            updatedAt: new Date("2021-09-08T10:20:51.793Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
