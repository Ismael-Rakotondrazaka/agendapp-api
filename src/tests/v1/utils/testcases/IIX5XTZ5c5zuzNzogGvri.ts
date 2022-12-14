import { ObjectId } from "mongodb";
import { TSeed } from "../../types";
import { nanoid } from "nanoid";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("63329c06f70df6554c998f87"),
        email: "shanie.sipes@hotmail.com",
        firstName: "Shanie",
        lastName: "Sipes",
        password:
          "$2b$10$x1dng9/Pn7LN3aICqa39duxvyR/cbdonbfI9t3zanfDMNE4/zHHye",
        channelId: nanoid(),
        createdAt: new Date("2022-01-10T03:38:07.841Z"),
        updatedAt: new Date("2022-01-29T02:12:47.716Z"),
        refreshTokens: [],
        events: [],
      },
    ],
  },
];

export default seed;
