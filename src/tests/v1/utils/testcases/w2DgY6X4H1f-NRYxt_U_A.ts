import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const startAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
startAt.setHours(7, 0, 0, 0);
const endAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
endAt.setHours(8, 0, 0, 0);

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("63359626da2ed09caa28702c"),
        firstName: "Maci",
        lastName: "Powlowski",
        email: "Maci.Powlowski@yahoo.com",
        password:
          "$2b$10$iqgxWMwz6atg3MOYTzVScOP2SjT4El53D318w8FLlQlD9S4XGQege",
        createdAt: new Date("2022-04-29T19:17:31.313Z"),
        updatedAt: new Date("2022-06-02T15:06:22.508Z"),
        refreshTokens: [],
        todos: [
          {
            _id: new ObjectId("6335965ffe8a0b7c4f64b656"),
            title: "quaerat-odit-ut",
            description:
              "I'll program the optical SMTP bus, that should bus the SDD matrix!",
            status: "pending",
            level: "normal",
            startAt: startAt,
            endAt: endAt,
            createdAt: new Date("2021-03-24T15:25:27.214Z"),
            updatedAt: new Date("2021-03-24T15:25:27.214Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
