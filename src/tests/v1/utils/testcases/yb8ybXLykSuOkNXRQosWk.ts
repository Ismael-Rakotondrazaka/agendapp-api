import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("63398d1424ee9e6259de99f4"),
        firstName: "Eliezer",
        lastName: "McLaughlin",
        email: "Eliezer.McLaughlin9@yahoo.com",
        password:
          "$2b$10$YguUiEImNl1BEQa9Jck5I.dAhmYb26/ixYN4FcZLSyavijAB6.U5S",
        createdAt: new Date("2022-01-16T20:07:48.822Z"),
        updatedAt: new Date("2022-01-21T22:13:41.209Z"),
        refreshTokens: [],
        todos: [
          {
            _id: new ObjectId("63398d2bf34247cac358864b"),
            title: "tenetur-nihil-veniam-temporibus",
            description:
              "Ullam consequuntur autem voluptate sed rerum assumenda.",
            status: "done",
            level: "important",
            startAt: "2022-01-12T06:15:00.000Z",
            endAt: "2022-01-12T07:00:00.000Z",
            createdAt: new Date("2021-10-28T22:31:12.058Z"),
            updatedAt: new Date("2021-10-28T22:31:12.058Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
