#!/usr/bin/env node

const fs = require("fs");
const [, , ...args] = process.argv;
const { faker } = require("@faker-js/faker");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const defaultTestCasesPath = "./src/tests/v1/utils/testcases";

async function createTestCase() {
  try {
    const nanoid = (await import("nanoid")).nanoid;

    const pathToFile = args[1] || defaultTestCasesPath;
    const fileName = nanoid();
    const fullPath = `${pathToFile}/${fileName}.ts`;

    fs.writeFileSync(
      fullPath,
      `
import { faker } from "@faker-js/faker";
import { TSeed } from "../../types";

const seed: TSeed[] = [
  {
    collection: "users",
    documents: [],
  },
];

export default seed;
`
    );

    console.log(`
New testCase with name "${fileName}" created at "${fullPath}"
    `);
  } catch (error) {
    console.log(error);
  }
}

function createTodo() {
  try {
    let length;
    if ((args[1] === "") | (args[1] === undefined)) {
      length = 1;
    } else {
      if (!/^\d+$/.test(args[1])) {
        throw new Error("Invalid arguments");
      } else {
        length = +args[1];
      }
    }

    const roundDate = (date) => {
      const result = date;
      result.setSeconds(0);
      result.setMilliseconds(0);

      const newMinutes = Math.round(result.getMinutes() / 15) * 15; // get 0, 15, 30, 60
      const diff = newMinutes - result.getMinutes();
      const diffMilliSeconds = diff * 60 * 1000;

      result.setTime(result.getTime() + diffMilliSeconds);
      return result;
    };

    console.log("[");
    for (let index = 0; index < length; index++) {
      let startAt = faker.date.past();
      startAt = roundDate(startAt);
      const diff =
        [15, 30, 45, 60].at(Math.floor(Math.random() * 4)) * 60 * 1000; // ms
      let endAt = new Date(startAt.getTime() + diff);

      // if they are on different day
      if (startAt.getDate() !== endAt.getDate()) {
        endAt = startAt;
        startAt = endAt.getDate() - diff;
      }

      const todo = {
        _id: new ObjectId(),
        title: faker.lorem.slug(Math.floor(Math.random() * 5 + 1)),
        description:
          Math.floor(Math.random() * 10) % 2 === 0
            ? faker.hacker.phrase()
            : faker.lorem.sentence(7),
        status: Math.round(Math.random() * 100) % 2 === 0 ? "done" : "failed",
        level:
          Math.round(Math.random() * 100) % 2 === 0 ? "normal" : "important",
        startAt,
        endAt,
        createdAt: faker.date.past(1, startAt),
      };
      console.log(
        `  {
    "_id": "${todo._id}",
    "title": "${todo.title}",
    "description": "${todo.description}",
    "status": "${todo.status}",
    "level": "${todo.level}",
    "startAt": "${todo.startAt.toISOString()}",
    "endAt": "${todo.endAt.toISOString()}",
    "createdAt": "${todo.createdAt.toISOString()}"
  },`
      );
    }
    console.log("]");
  } catch (error) {
    console.log(error);
  }
}

function createUser() {
  try {
    let length;
    if ((args[1] === "") | (args[1] === undefined)) {
      length = 1;
    } else {
      if (!/^\d+$/.test(args[1])) {
        throw new Error("Invalid arguments");
      } else {
        length = +args[1];
      }
    }

    console.log("[");
    for (let index = 0; index < length; index++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const passwordSaltRounds = 10;
      const createdAt = faker.date.past();

      const user = {
        _id: new ObjectId(),
        firstName: firstName,
        lastName: lastName,
        email: faker.internet.email(firstName, lastName),
        password: bcrypt.hashSync(
          faker.internet.password(),
          passwordSaltRounds
        ),
        createdAt: createdAt,
        updatedAt: faker.date.soon(Math.floor(Math.random() * 100), createdAt),
      };

      console.log(
        `  {
    "_id": "${user._id}",
    "firstName": "${user.firstName}",
    "lastName": "${user.lastName}",
    "email": "${user.email}",
    "password": "${user.password}",
    "createdAt": "${user.createdAt.toISOString()}",
    "updatedAt": "${user.updatedAt.toISOString()}"
  },`
      );
    }
    console.log("]");
  } catch (error) {
    console.log(error);
  }
}

const commandFunction = {
  "testCases:new": createTestCase,
  "todos:new": createTodo,
  "users:new": createUser,
};

if (args.length > 0) {
  const command = commandFunction[args[0]];
  command?.();
} else {
  console.log(`
  Commands available:
      testCases:new (path) -> Create a new testCase file with random name on the given path
                              Default path is "${defaultTestCasesPath}"
      todos:new (length) -> Print a list of past todos, NOT future. Be aware, Interval CAN be superposed.
                            Default length is 1
      users:new (length) -> Print a list of users.
                            Default length is 1
  `);
}
