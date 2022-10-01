import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const startAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
startAt.setHours(8, 0, 0, 0);
const endAt = new Date(startAt.getTime() + 2 * 60 * 60 * 1000); // startAt + 2h

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("633673a9768a8a94df05f16f"),
        firstName: "Torey",
        lastName: "Lowe",
        email: "Torey_Lowe@yahoo.com",
        password:
          "$2b$10$d3ItuFZROFWogK2Jntde9uoxdVQbrf1F24D/MFvj5a/juBZSBPe6C",
        createdAt: "2022-04-01T22:40:43.584Z",
        updatedAt: "2022-04-08T04:57:21.074Z",
        refreshTokens: [],
        todos: [
          {
            _id: new ObjectId("63367477f6c3abf0982487b1"),
            title: "sapiente",
            description:
              "I'll hack the primary HDD feed, that should panel the JBOD driver!",
            status: "failed",
            level: "important",
            startAt: startAt,
            endAt: endAt,
            createdAt: "2021-10-25T21:38:26.225Z",
          },
        ],
      },
    ],
  },
];

export default seed;
