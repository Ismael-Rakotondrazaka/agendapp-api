import { faker } from "@faker-js/faker";
import { TSeed } from "../../types";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const passwordSaltRounds = 10;

const _id = new ObjectId("633159f667f9f77f3a1ca474");
const firstName = "Emanuel";
const lastName = "Pfeffer";

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
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        refreshTokens: [],
        todos: [],
      },
    ],
  },
];

export default seed;
