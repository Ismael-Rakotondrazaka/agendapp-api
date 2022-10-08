import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("63397f73968531beecab392b"),
        firstName: "Julius",
        lastName: "Schiller",
        email: "Julius_Schiller@yahoo.com",
        password:
          "$2b$10$ZhPswCkNX/F5In9gHADpLew1DEHPd72ihMcRrrgZqOgxOvOEv.KTu",
        createdAt: new Date("2022-06-29T08:45:08.742Z"),
        updatedAt: new Date("2022-08-27T10:19:35.708Z"),
        events: [
          {
            _id: new ObjectId("63397f88074c0dc4737e6c3c"),
            title: "iste-est",
            description: "Fugiat rem ex numquam facere porro placeat.",
            status: "done",
            level: "important",
            startAt: faker.date.future(),
            endAt: faker.date.future(),
            createdAt: new Date("2022-07-03T18:12:59.949Z"),
            updatedAt: new Date("2022-07-03T18:12:59.949Z"),
          },
        ],
      },
    ],
  },
];

export default seed;
