import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("633408aeab6c493041b2c596"),
        firstName: "Bonnie",
        lastName: "Balistreri",
        email: "Bonnie.Balistreri3@gmail.com",
        password:
          "$2b$10$OrhVRqwwELkhIOBUYT16cO/vnMyL1.RHesG8g7sHoXOAo3/CrSzUO",
        createdAt: "2022-06-10T18:02:16.322Z",
        updatedAt: "2022-06-13T16:21:32.406Z",
        refreshTokens: [],
        todos: [],
      },
    ],
  },
];

export default seed;