import { ObjectId } from "mongodb";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId("63329c06f70df6554c998f87"),
        firstName: "Shanie",
        lastName: "Sipes",
        password:
          "$2b$10$x1dng9/Pn7LN3aICqa39duxvyR/cbdonbfI9t3zanfDMNE4/zHHye",
        createdAt: "2022-01-10T03:38:07.841Z",
        updatedAt: "2022-01-29T02:12:47.716Z",
        todos: [],
      },
    ],
  },
];

export default seed;
