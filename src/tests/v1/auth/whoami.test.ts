import dotenv from "dotenv";
dotenv.config();
import request from "supertest";
import seedDB from "../utils/seeds/seedDB";
import app from "../../../app";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

describe("GET /api/v1/auth/whoami", () => {
  test.each([
    {
      _id: "63649a8e7c1dac786ebe535b",
      firstName: "Crystel",
      lastName: "Rath",
      fullName: "Crystel Rath",
      email: "Crystel44@gmail.com",
      createdAt: "2022-08-30T00:41:12.951Z",
      updatedAt: "2022-09-18T13:08:44.573Z",
    },
    {
      _id: "63649aba9115a48b2973e82b",
      firstName: "Jess",
      lastName: "Lemke",
      fullName: "Jess Lemke",
      email: "Jess.Lemke5@yahoo.com",
      createdAt: "2022-06-20T00:41:31.873Z",
      updatedAt: "2022-06-23T05:24:10.752Z",
    },
  ])(
    "should return user data with status 200 {testCase: 59NKMJfSXs5HcL4UrwTO_}",
    async (testCase) => {
      await seedDB("59NKMJfSXs5HcL4UrwTO_");

      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 10 * 60 * 1000; // 10mn
      const accessToken = jwt.sign(
        {
          user: {
            _id: testCase._id,
            firstName: testCase.firstName,
            lastName: testCase.lastName,
          },
        },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}`,
        }
      );

      return await request(app)
        .get("/api/v1/auth/whoami")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              data: expect.objectContaining({
                user: testCase,
              }),
            })
          );
        });
    }
  );

  test.each([
    {
      _id: "63649a8e7c1dac786ebe535b",
      firstName: "Crystel",
      lastName: "Rath",
      fullName: "Crystal Rath",
      email: "Crystel44@gmail.com",
      createdAt: "2022-08-30T00:41:12.951Z",
      updatedAt: "2022-09-18T13:08:44.573Z",
    },
    {
      _id: "63649aba9115a48b2973e82b",
      firstName: "Jess",
      lastName: "Lemke",
      fullName: "Jess Lemke",
      email: "Jess.Lemke5@yahoo.com",
      createdAt: "2022-06-20T00:41:31.873Z",
      updatedAt: "2022-06-23T05:24:10.752Z",
    },
  ])(
    "should return 403 Forbidden if access token is invalid {testCase: 59NKMJfSXs5HcL4UrwTO_}",
    async (testCase) => {
      await seedDB("59NKMJfSXs5HcL4UrwTO_");

      const accessTokenSecret: string =
        process.env.TEST_ACCESS_TOKEN_SECRET || "";
      const accessTokenLife: number = 10 * 60 * 1000; // 10mn
      let accessToken: string = jwt.sign(
        {
          user: {
            _id: testCase._id,
            firstName: testCase.firstName,
            lastName: testCase.lastName,
          },
        },
        accessTokenSecret,
        {
          expiresIn: `${accessTokenLife}`,
        }
      );

      accessToken += faker.lorem.word();

      return await request(app)
        .get("/api/v1/auth/whoami")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect("Content-Type", /json/)
        .expect(403);
    }
  );
});
