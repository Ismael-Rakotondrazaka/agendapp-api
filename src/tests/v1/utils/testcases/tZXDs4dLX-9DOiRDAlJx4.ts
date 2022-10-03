import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const startAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
startAt.setHours(4, 0, 0, 0);
const endAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // after tomorrow
endAt.setHours(5, 0, 0, 0);

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("63359bf20984d953b614a4fb"),
        firstName: "Gregory",
        lastName: "Botsford",
        email: "Gregory.Botsford7@yahoo.com",
        password:
          "$2b$10$GiSDsqI52RZn.V73oV/v/u8HvgsaLSfcZKYj1ah1XSuXmmOfen9Gm",
        createdAt: new Date("2022-03-20T22:06:35.266Z"),
        updatedAt: new Date("2022-03-24T22:25:29.735Z"),
        refreshTokens: [],
        todos: [
          {
            _id: new ObjectId("63359c214f499caf6fa5da79"),
            title: "repellat",
            description: "Et quos fuga illum iusto officiis quibusdam.",
            status: "pending",
            level: "important",
            startAt: startAt,
            endAt: endAt,
            createdAt: new Date("2021-09-10T13:34:13.547Z"),
            updatedAt: new Date("2021-09-10T13:34:13.547Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
