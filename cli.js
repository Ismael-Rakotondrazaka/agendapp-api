#!/usr/bin/env node

const fs = require("fs");
const [, , ...args] = process.argv;

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

const commandFunction = {
  "testCases:new": createTestCase,
};

if (args.length > 0) {
  const command = commandFunction[args[0]];
  command?.();
} else {
  console.log(`
  Commands available:
      testCases:new (path) -> Create a new testCase file with random name on the given path
                              Default path is "${defaultTestCasesPath}"
  `);
}
