import { faker } from "@faker-js/faker";
import { TSeed } from "../../types";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const passwordSaltRounds = 10;

const email = "Destini.Rath79@yahoo.com";
const password = "qd4OlZgNxfeg5D6";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email,
        password: bcrypt.hashSync(password, passwordSaltRounds),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        refreshTokens: [],
        todos: [],
      },
    ],
  },
];

export default seed;
