import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("6363e7dd8b631a841a82fecd"),
        firstName: "Romaine",
        lastName: "Keeling",
        email: "Romaine.Keeling12@hotmail.com",
        password:
          "$2b$10$qLFhgtJdDFY8YjoaHGKGYuROhJJ6sXVdZ/DSm88YRMRPkwqCsK14.", // shHs3_MbQYHQwVS
        createdAt: new Date("2022-06-08T08:02:32.897Z"),
        updatedAt: new Date("2022-06-12T15:34:38.515Z"),
        refreshTokens: [],
        events: [],
      },
    ],
  },
];

export default seed;
