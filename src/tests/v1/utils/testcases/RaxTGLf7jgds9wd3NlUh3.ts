import { faker } from "@faker-js/faker";
import { TSeed } from "../../types";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const passwordSaltRound = 10;

const _id = new ObjectId("63315c44572f01b9e026aa90");
const firstName = "Stewart";
const lastName = "Miller";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id,
        firstName,
        lastName,
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), passwordSaltRound),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        refreshTokens: [],
        todos: [],
      },
    ],
  },
];

export default seed;
