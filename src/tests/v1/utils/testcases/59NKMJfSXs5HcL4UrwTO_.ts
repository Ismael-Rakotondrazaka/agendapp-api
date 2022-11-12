import { ObjectId } from "mongodb";
import { TSeed } from "../../types";
import { nanoid } from "nanoid";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("63649a8e7c1dac786ebe535b"),
        firstName: "Crystel",
        lastName: "Rath",
        email: "Crystel44@gmail.com",
        password:
          "$2b$10$SGj9dni7YJQJKFND9CotJOewMOZIZYWNXEKtITDUUrtabsAlsxm4i", // ySFKdGDN1Bx9GQU
        channelId: nanoid(),
        createdAt: new Date("2022-08-30T00:41:12.951Z"),
        updatedAt: new Date("2022-09-18T13:08:44.573Z"),
        refreshTokens: [],
        events: [],
      },
      {
        _id: new ObjectId("63649aba9115a48b2973e82b"),
        firstName: "Jess",
        lastName: "Lemke",
        email: "Jess.Lemke5@yahoo.com",
        password:
          "$2b$10$vD2eRHAuSSHsFDn4Cu/v0eq20SGmR0mNZJH9cy6QOlp7n/QtKRQEm", // vhEVGlkFQfdp9YG
        createdAt: new Date("2022-06-20T00:41:31.873Z"),
        updatedAt: new Date("2022-06-23T05:24:10.752Z"),
        refreshTokens: [],
        events: [],
      },
    ],
  },
];

export default seed;
