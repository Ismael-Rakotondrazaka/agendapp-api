import { ObjectId } from "mongodb";
import { TSeed } from "../../types";
import { nanoid } from "nanoid";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("63398f1bca611ec061752bb3"),
        firstName: "Camron",
        lastName: "Hyatt",
        email: "Camron7@hotmail.com",
        password:
          "$2b$10$tdBgD2JQUy6lLChzuXeyde90tRQUbM5b1MjsxbHlgZpWfTNt7IzXS",
        channelId: nanoid(),
        createdAt: new Date("2022-05-21T14:56:10.168Z"),
        updatedAt: new Date("2022-05-31T07:49:55.735Z"),
        refreshTokens: [],
        events: [],
      },
    ],
  },
];

export default seed;
