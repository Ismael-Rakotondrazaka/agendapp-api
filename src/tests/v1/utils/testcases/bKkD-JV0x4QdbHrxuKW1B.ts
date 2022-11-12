import { ObjectId } from "mongodb";
import { TSeed } from "../../types";
import { nanoid } from "nanoid";

const now = new Date();
const startAt = new Date(now.getTime());
startAt.setHours(now.getHours(), 0, 0, 0);
const endAt = new Date(now.getTime());
endAt.setHours(now.getHours() + 1, 0, 0, 0);

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("63391103efb338e11d7152fa"),
        firstName: "Arvilla",
        lastName: "Schoen",
        email: "Arvilla.Schoen84@gmail.com",
        password:
          "$2b$10$UxT9LCD7Cu0Qgd63v4d5YuI0F.HMz3JA4ymNU1c41w9r4qN9bOeJm",
        channelId: nanoid(),
        createdAt: new Date("2022-08-13T21:01:20.251Z"),
        updatedAt: new Date("2022-09-28T02:19:17.787Z"),
        refreshTokens: [],
        events: [
          {
            _id: new ObjectId("6339113572db4facefd2be95"),
            title: "perferendis-suscipit",
            description: "We need to copy the haptic XSS program!",
            status: "completed",
            level: "important",
            startAt: startAt,
            endAt: endAt,
            createdAt: new Date("2020-11-08T11:05:51.167Z"),
            updatedAt: new Date("2020-11-08T11:05:51.167Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
