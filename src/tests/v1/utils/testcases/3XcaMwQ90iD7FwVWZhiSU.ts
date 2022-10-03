import { faker } from "@faker-js/faker";
import { TSeed } from "../../types";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const email = "Kassandra4@hotmail.com";
const passwordSaltRounds = 10;

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email,
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
