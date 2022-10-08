import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("634134be87e70673701fd592"),
        firstName: "Eulalia",
        lastName: "Moen",
        email: "Eulalia.Moen33@yahoo.com",
        password:
          "$2b$10$q3Iusj4tAyTpVmWnAftHF.VlZGEKcyM2NcNvO3knf6UGPKVw22Mx6", // 9U6IrcRdhI8rSdH
        createdAt: new Date("2022-06-15T15:35:34.619Z"),
        updatedAt: new Date("2022-06-17T11:44:08.751Z"),
        refreshTokens: [],
        todos: [],
      },
    ],
  },
];

export default seed;
