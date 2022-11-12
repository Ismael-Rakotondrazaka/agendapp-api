import { ObjectId } from "mongodb";
import { TSeed } from "../../types";
import { nanoid } from "nanoid";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("6339c59cb00fd7f44e0a8db4"),
        firstName: "Moises",
        lastName: "Howell",
        email: "Moises.Howell96@hotmail.com",
        password:
          "$2b$10$Z9u64lgWj4TGUyZzWgzZqOtBgL9mmJxzjvhvEZoNCarnV4tzH1Kiu",
        channelId: nanoid(),
        createdAt: new Date("2022-09-12T12:44:45.079Z"),
        updatedAt: new Date("2022-10-08T21:50:44.023Z"),
        refreshTokens: [],
        events: [
          {
            _id: new ObjectId("6339c5bdb98f172a785c44c3"),
            title: "quasi",
            description:
              "If we input the microchip, we can get to the JBOD application through the haptic ASCII firewall!",
            status: "failed",
            level: "normal",
            startAt: new Date("2022-09-20T15:45:00.000Z"),
            endAt: new Date("2022-09-20T16:30:00.000Z"),
            createdAt: new Date("2022-09-20T14:52:19.899Z"),
            updatedAt: new Date("2022-09-20T14:52:19.899Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
