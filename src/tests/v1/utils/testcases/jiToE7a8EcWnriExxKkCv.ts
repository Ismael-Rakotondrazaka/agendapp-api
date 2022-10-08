import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("633989fdb508b4c5274f4ec8"),
        firstName: "Kiley",
        lastName: "Senger",
        email: "Kiley.Senger61@gmail.com",
        password:
          "$2b$10$UbohSUg4v4D9Le6GBSVbXeKfligM1NpDTxuRDxTafICtQNlnYB..K",
        createdAt: new Date("2022-09-05T15:01:01.139Z"),
        updatedAt: new Date("2022-09-23T04:27:54.188Z"),
        refreshTokens: [],
        events: [
          {
            _id: new ObjectId("63398a4837dfa028f1519afd"),
            title: "est-esse-architecto-iure-autem",
            description: "Facere pariatur expedita culpa eius a consequatur.",
            status: "failed",
            level: "important",
            startAt: faker.date.future(),
            endAt: faker.date.future(),
            createdAt: new Date("2022-01-17T02:51:46.927Z"),
            updatedAt: new Date("2022-01-17T02:51:46.927Z"),
          },
          {
            _id: new ObjectId("63398a4837dfa028f1519afe"),
            title: "itaque-nisi-neque",
            description:
              "I'll reboot the bluetooth GB transmitter, that should program the RAM capacitor!",
            status: "done",
            level: "important",
            startAt: faker.date.future(),
            endAt: faker.date.future(),
            createdAt: new Date("2021-12-14T07:48:23.206Z"),
            updatedAt: new Date("2021-12-14T07:48:23.206Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
