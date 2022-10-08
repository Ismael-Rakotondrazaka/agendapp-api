import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("633a8937eb1308c08dd2491b"),
        firstName: "Darien",
        lastName: "Kassulke",
        email: "Darien16@yahoo.com",
        password:
          "$2b$10$YWwIyVFT0rQFR.IpLOF0ze86wbpdGRFuSIk1PCu1Sh0Z84FknWmw.", // ICibOsc6OnYzgJB
        createdAt: new Date("2021-11-11T14:19:39.524Z"),
        updatedAt: new Date("2021-12-19T04:46:28.432Z"),
        refreshTokens: [],
        todos: [],
      },
    ],
  },
];

export default seed;
