import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("6332b0fd14f4d1e465f7ddb3"),
        firstName: "Fiona",
        lastName: "Wintheiser",
        email: "Fiona_Wintheiser@yahoo.com",
        password:
          "$2b$10$xQKytHRekWU6vDDnjbeP4OJ3PnAPtQGSN8Gfy9cCMfCWEF3M/mkVy",
        createdAt: new Date("2022-01-23T14:11:20.038Z"),
        updatedAt: new Date("2022-01-28T17:17:43.231Z"),
        refreshTokens: [],
        events: [
          {
            _id: new ObjectId("6332b0ddc1320a76d98b71b7"),
            title: "molestiae-quis-perspiciatis-repudiandae",
            description:
              "generating the interface won't do anything, we need to parse the primary COM port!",
            status: "done",
            level: "normal",
            startAt: new Date("2022-05-20T14:45:00.000Z"),
            endAt: new Date("2022-05-20T15:00:00.000Z"),
            createdAt: new Date("2021-09-26T01:56:38.432Z"),
            updatedAt: new Date("2021-09-26T01:56:38.432Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
