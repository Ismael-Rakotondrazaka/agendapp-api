import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("633986084ca3d3563b95de28"),
        firstName: "Itzel",
        lastName: "Farrell",
        email: "Itzel_Farrell58@hotmail.com",
        password:
          "$2b$10$gHbFgblthb7eR0A2l80w0OAcV.kivZnxZ1pifpe79Jxwo.18f7Y.C",
        createdAt: "2022-05-29T21:26:52.725Z",
        updatedAt: "2022-08-25T08:11:13.326Z",
        refreshTokens: [],
        todos: [
          {
            _id: new ObjectId("633986c1e2ca9973593672a8"),
            title: "consequatur-reiciendis-quis-ipsa-ratione",
            description: "Molestiae ipsa et qui quia modi commodi.",
            status: "done",
            level: "important",
            startAt: faker.date.future(),
            endAt: faker.date.future(),
            createdAt: "2021-07-22T12:06:14.730Z",
          },
        ],
      },
    ],
  },
];

export default seed;
