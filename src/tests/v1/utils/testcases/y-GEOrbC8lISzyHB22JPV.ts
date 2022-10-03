import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("6337cb1801181e08bb858f8a"),
        firstName: "Javonte",
        lastName: "Herman",
        email: "Javonte35@gmail.com",
        password:
          "$2b$10$GqaKXpBccjqFiTyoTTrelOBIbymSJfeVBhErYVXj7J.Dk0MIBqhvW",
        createdAt: new Date("2022-08-08T11:10:17.337Z"),
        updatedAt: new Date("2022-08-17T03:38:49.747Z"),
        refreshTokens: [],
        todos: [],
      },
    ],
  },
];

export default seed;
