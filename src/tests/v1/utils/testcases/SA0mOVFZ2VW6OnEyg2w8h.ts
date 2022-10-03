import { faker } from "@faker-js/faker";
import { TSeed } from "../../types";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const passwordSaltRound = 10;

const _id = new ObjectId("63315b14db38012ee6317576");
const firstName = "Cydney";
const lastName = "Gislason";

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
