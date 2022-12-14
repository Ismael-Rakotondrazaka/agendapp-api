import { ObjectId } from "mongodb";
import { TSeed } from "../../types";
import { nanoid } from "nanoid";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("633a890013a8c12a531ea137"),
        firstName: "Lyric",
        lastName: "Kovacek",
        email: "Lyric_Kovacek82@hotmail.com",
        password:
          "$2b$10$0xB5p6.d8VvxGRz62j3Na.AmUJ6WLmslwebHM4rXEWl3M8vSxeJ1a", // HPgCdAilXqFiEns
        channelId: nanoid(),
        createdAt: new Date("2021-11-28T20:37:55.315Z"),
        updatedAt: new Date("2021-11-30T10:50:46.722Z"),
        refreshTokens: [],
        events: [],
      },
    ],
  },
];

export default seed;
