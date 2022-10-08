import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("63358b20b7924baac14f6513"),
        firstName: "Polly",
        lastName: "Bosco",
        email: "Polly90@yahoo.com",
        password:
          "$2b$10$9YKPNXv7WqQhafVOtXXPbubK/5VR3gB.axmM8xRFxnfBfglzC6BKK",
        createdAt: new Date("2021-11-28T11:13:06.387Z"),
        updatedAt: new Date("2022-01-28T11:40:41.604Z"),
        refreshTokens: [],
        events: [
          {
            _id: new ObjectId("63358cdf924b293800bcc8df"),
            title: "molestias-consequuntur-excepturi",
            description:
              "Pariatur est assumenda cupiditate veritatis itaque neque.",
            status: "done",
            level: "important",
            startAt: new Date("2021-10-30T03:00:00.000Z"),
            endAt: new Date("2021-10-30T03:15:00.000Z"),
            createdAt: new Date("2021-03-21T10:22:29.830Z"),
            updatedAt: new Date("2021-03-21T10:22:29.830Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
