import { TSeed } from "../../types";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { faker } from "@faker-js/faker";

const passwordSaltRounds = 10;

const email = "Catharine_Kulas37@gmail.com";
const password = "759UfYGweUcc62Z";
const _id = "632b449b8785e59a587318fb";
const firstName = "Forest";
const lastName = "Cartwright";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [
      {
        _id: new ObjectId(_id),
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, passwordSaltRounds),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        refreshTokens: [],
        dotos: [],
      },
    ],
  },
];

export default seed;
