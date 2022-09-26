import { faker } from "@faker-js/faker";
import { TSeed } from "../../types";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const passwordSaltRounds = 10;

const _id = new ObjectId("632e204e47122dbbc89a9ae2");
const firstName = "Ardith";
const lastName = "Kling";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: _id,
        firstName,
        lastName,
        email: faker.internet.email(),
        password: bcrypt.hashSync(
          faker.internet.password(),
          passwordSaltRounds
        ),
        refreshTokens: [],
        todos: [],
      },
    ],
  },
];

export default seed;
