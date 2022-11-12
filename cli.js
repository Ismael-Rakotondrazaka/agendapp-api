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
import { nanoid } from "nanoid";

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

function createEvent() {
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

    const createEvent = () => {
      let startAt = faker.date.past();
      startAt = roundDate(startAt);
      const diff =
        [15, 30, 45, 60].at(Math.floor(Math.random() * 4)) * 60 * 1000; // ms
      let endAt = new Date(startAt.getTime() + diff);

      // if they are on different day
      if (startAt.getDate() !== endAt.getDate()) {
        endAt = startAt;
        startAt.setTime(endAt.getTime() - diff);
      }

      return {
        _id: new ObjectId(),
        title: faker.lorem.slug(Math.floor(Math.random() * 5 + 1)),
        description:
          Math.floor(Math.random() * 10) % 2 === 0
            ? faker.hacker.phrase()
            : faker.lorem.sentence(7),
        status:
          Math.round(Math.random() * 100) % 2 === 0 ? "completed" : "failed",
        level:
          Math.round(Math.random() * 100) % 2 === 0 ? "normal" : "important",
        startAt,
        endAt,
        createdAt: faker.date.past(1, startAt),
        updatedAt: faker.date.past(1, startAt),
      };
    };

    let mode = "pretty";

    if (args[2] == "true" || args[2] == "1") {
      mode = "raw";
    }

    if (mode === "pretty") {
      console.log("[");
      for (let index = 0; index < length; index++) {
        const event = createEvent();

        console.log(
          `  {
    "_id": "${event._id}",
    "title": "${event.title}",
    "description": "${event.description}",
    "status": "${event.status}",
    "level": "${event.level}",
    "startAt": "${event.startAt.toISOString()}",
    "endAt": "${event.endAt.toISOString()}",
    "createdAt": "${event.createdAt.toISOString()}",
    "updatedAt": "${event.updatedAt.toISOString()}"
  },`
        );
      }
      console.log("]");
    } else {
      let result = "[";

      for (let index = 0; index < length; index++) {
        const event = createEvent();

        result += `{"_id":{"$oid":"${event._id}"},"title":"${
          event.title
        }","description":"${event.description}","status":"${
          event.status
        }","level":"${
          event.level
        }","startAt":{"$date":"${event.startAt.toISOString()}"},"endAt":{"$date":"${event.endAt.toISOString()}"},"createdAt":{"$date":"${event.createdAt.toISOString()}"},"updatedAt":{"$date":"${event.updatedAt.toISOString()}"}},`;
      }

      result += "]";

      console.log(result);
    }
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

    const createUser = () => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const passwordSaltRounds = 10;
      const createdAt = faker.date.past();
      const password = "password";

      return {
        _id: new ObjectId(),
        firstName: firstName,
        lastName: lastName,
        email: faker.internet.email(firstName, lastName),
        encryptedPassword: bcrypt.hashSync(password, passwordSaltRounds),
        password: password,
        createdAt: createdAt,
        updatedAt: faker.date.soon(Math.floor(Math.random() * 100), createdAt),
      };
    };

    let mode = "pretty";

    if (args[2] == "true" || args[2] == "1") {
      mode = "raw";
    }

    if (mode === "pretty") {
      console.log("[");
      for (let index = 0; index < length; index++) {
        const user = createUser();

        console.log(
          `  {
    "_id": "${user._id}",
    "firstName": "${user.firstName}",
    "lastName": "${user.lastName}",
    "email": "${user.email}",
    "password": "${user.encryptedPassword}",
    "createdAt": "${user.createdAt.toISOString()}",
    "updatedAt": "${user.updatedAt.toISOString()}"
  },`
        );
      }
      console.log("]");
    } else {
      let result = "[";
      for (let index = 0; index < length; index++) {
        const user = createUser();

        result += `{"_id": "${user._id}","firstName":"${
          user.firstName
        }","lastName":"${user.lastName}","email":"${user.email}","password":"${
          user.encryptedPassword
        }","createdAt":"${user.createdAt.toISOString()}","updatedAt":"${user.updatedAt.toISOString()}"},`;
      }
      result += "]";

      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
}

const commandFunction = {
  "testCases:new": createTestCase,
  "events:new": createEvent,
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
      events:new (length) (rawMode) -> Print a list of past events, NOT future. Be aware, Interval CAN be superposed.
                            Default length is 1
      users:new (length) (rawMode) -> Print a list of users.
                            Default length is 1
                            Default user.password is 'password'
  `);
}
