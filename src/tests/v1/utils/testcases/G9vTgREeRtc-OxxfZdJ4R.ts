import { faker } from "@faker-js/faker";
import { TSeed } from "../../types";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const passwordSaltRound = 10;

const _id = new ObjectId("632ff402d54fe699132f15b9");
const firstName = "Enola";
const lastName = "Hilpert";

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
