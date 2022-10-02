import { ObjectId } from "mongodb";
import { TSeed } from "../../types";
import { faker } from "@faker-js/faker";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("6337deae65fabe621e3ce938"),
        firstName: "Ephraim",
        lastName: "Jacobi",
        email: "Ephraim_Jacobi@hotmail.com",
        password:
          "$2b$10$dGhJ.veI1Kk5h.jQt1KPuurBk3W.T4YbupTOR1wy8jM4ChJM7xUkC",
        createdAt: "2022-02-06T02:42:32.946Z",
        updatedAt: "2022-02-15T23:58:58.285Z",
        refreshTokens: [],
        todos: [
          {
            _id: new ObjectId("6337e296e3611b1acb901abc"),
            title: "mollitia-at",
            description:
              "You can't program the bandwidth without programming the redundant SDD hard drive!",
            status: "failed",
            level: "normal",
            startAt: faker.date.future(),
            endAt: faker.date.future(),
            createdAt: "2021-09-24T08:14:05.042Z",
          },
          {
            _id: new ObjectId("6337e296e3611b1acb901abd"),
            title: "animi",
            description: "Qui quod recusandae quia molestiae id est.",
            status: "done",
            level: "normal",
            startAt: faker.date.future(),
            endAt: faker.date.future(),
            createdAt: "2021-08-27T03:56:33.510Z",
          },
          {
            _id: new ObjectId("6337e296e3611b1acb901abe"),
            title: "dolor",
            description:
              "Eaque qui consequatur illo iste voluptatem aspernatur.",
            status: "failed",
            level: "important",
            startAt: faker.date.future(),
            endAt: faker.date.future(),
            createdAt: "2021-06-22T09:28:19.093Z",
          },
        ],
      },
    ],
  },
];

export default seed;
