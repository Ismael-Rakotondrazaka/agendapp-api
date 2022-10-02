import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

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
        createdAt: "2022-05-21T14:56:10.168Z",
        updatedAt: "2022-05-31T07:49:55.735Z",
        refreshTokens: [],
        todos: [],
      },
    ],
  },
];

export default seed;
