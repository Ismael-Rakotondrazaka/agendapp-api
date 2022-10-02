import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("633986084ca3d3563b95de27"),
        firstName: "Daphney",
        lastName: "Emard",
        email: "Daphney_Emard@gmail.com",
        password:
          "$2b$10$Ic2CZ2gnJ/zcJPZfW22MEer.zMKfCkwNeD5j6eyI1tEh7OLnUfZ/m",
        createdAt: "2022-08-29T23:47:23.344Z",
        updatedAt: "2022-09-02T21:29:13.102Z",
        refreshTokens: [],
        todos: [
          {
            _id: new ObjectId("633987426004f9a457bd03a4"),
            title: "dolore-ad-aliquid",
            description: "Et aut vel consequatur dolor sit ab.",
            status: "done",
            level: "important",
            startAt: faker.date.future(),
            endAt: faker.date.future(),
            createdAt: "2021-10-19T00:40:48.170Z",
          },
          {
            _id: new ObjectId("633987426004f9a457bd03a5"),
            title: "mollitia",
            description: "We need to program the digital SSL system!",
            status: "failed",
            level: "normal",
            startAt: faker.date.future(),
            endAt: faker.date.future(),
            createdAt: "2021-07-25T05:19:29.000Z",
          },
        ],
      },
    ],
  },
];

export default seed;
