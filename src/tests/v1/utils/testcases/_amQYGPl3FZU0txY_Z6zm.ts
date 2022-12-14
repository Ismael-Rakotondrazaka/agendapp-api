import { ObjectId } from "mongodb";
import { TSeed } from "../../types";
import { nanoid } from "nanoid";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("63390e42879dd9ff90e79acf"),
        firstName: "Lonnie",
        lastName: "Lang",
        email: "Lonnie27@hotmail.com",
        password:
          "$2b$10$RI.8raMz/MHZYBFfUMVzz.2J8mNo39dAXIt/.YG/VKQntVKc/C8TG",
        channelId: nanoid(),
        createdAt: new Date("2022-01-04T20:18:19.395Z"),
        updatedAt: new Date("2022-01-20T12:52:40.693Z"),
        refreshTokens: [],
        events: [
          {
            _id: new ObjectId("63390eb0f209f919baa94e2a"),
            title: "sint-neque-vel-porro-aut",
            description: "Doloribus voluptas id quo ex unde sapiente.",
            status: "completed",
            level: "normal",
            startAt: new Date("2022-05-29T07:15:00.000Z"),
            endAt: new Date("2022-05-29T08:15:00.000Z"),
            createdAt: new Date("2022-01-17T15:07:27.891Z"),
            updatedAt: new Date("2022-01-17T15:07:27.891Z"),
          },
          {
            _id: new ObjectId("63390eb0f209f919baa94e2b"),
            title: "vel-neque-et-aut",
            description:
              "backing up the capacitor won't do anything, we need to copy the primary AI capacitor!",
            status: "failed",
            level: "normal",
            startAt: new Date("2021-12-31T21:00:00.000Z"),
            endAt: new Date("2021-12-31T21:15:00.000Z"),
            createdAt: new Date("2021-06-02T01:44:17.932Z"),
            updatedAt: new Date("2021-06-02T01:44:17.932Z"),
          },
          {
            _id: new ObjectId("63390eb0f209f919baa94e2c"),
            title: "tempora-voluptatem-minima-qui",
            description: "Numquam culpa aut incidunt accusamus iste deleniti.",
            status: "failed",
            level: "important",
            startAt: new Date("2022-09-01T21:15:00.000Z"),
            endAt: new Date("2022-09-01T21:45:00.000Z"),
            createdAt: new Date("2022-02-15T11:56:53.888Z"),
            updatedAt: new Date("2022-02-15T11:56:53.888Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
