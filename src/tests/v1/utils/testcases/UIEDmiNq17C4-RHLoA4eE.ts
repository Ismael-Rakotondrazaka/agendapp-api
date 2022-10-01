import { TSeed } from "../../types";
import { ObjectId } from "mongodb";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("6333f30d40ff5312965bd5ad"),
        firstName: "Dasia",
        lastName: "Armstrong",
        email: "Dasia.Armstrong@yahoo.com",
        password:
          "$2b$10$Gdku2v7pjNs5QFhgLJih0udfjc8IFpN4t1SmCuFyjKRgB.3GNGlPa",
        createdAt: "2022-03-17T16:51:09.687Z",
        updatedAt: "2022-03-23T21:32:51.826Z",
        refreshTokens: [],
        todos: [],
      },
    ],
  },
];

export default seed;