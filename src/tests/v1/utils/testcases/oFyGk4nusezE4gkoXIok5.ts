import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("633d470f788fc0fa7566bc26"),
        firstName: "Margaret",
        lastName: "Osinski",
        email: "Margaret51@gmail.com",
        password:
          "$2b$10$e3g8tEvUJT8H.ykv2w7ZmO03DI1x/Bnq/ypCK0lD34Pr6NQ.Lm.EK", // cu9XVU1MK5sXG7p
        createdAt: "2022-03-10T13:20:58.137Z",
        updatedAt: "2022-04-03T01:43:20.186Z",
        events: [],
        refreshTokens: [],
      },
    ],
  },
];

export default seed;
