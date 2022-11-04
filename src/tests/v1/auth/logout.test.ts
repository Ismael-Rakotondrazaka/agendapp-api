import dotenv from "dotenv";
dotenv.config();
import request from "supertest";
import seedDB from "../utils/seeds/seedDB";
import app from "../../../app";

describe("POST /api/v1/auth/logout", () => {
  test("Should return 204 No Content and should delete only the corresponding refresh token {testCase: is694m7diJtJ357fJaaRJ}", async () => {
    await seedDB("is694m7diJtJ357fJaaRJ");

    const email = "Romaine.Keeling12@hotmail.com";
    const password = "shHs3_MbQYHQwVS";

    let refreshToken1 = "";
    await request(app)
      .post("/api/v1/auth/login")
      .send({
        email,
        password,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body?.data?.tokens).not.toBeFalsy();

        expect(response.body.data.tokens).toEqual(
          expect.objectContaining({
            accessToken: expect.any(String),
            refreshToken: expect.any(String),
            tokenType: "bearer",
          })
        );

        refreshToken1 = response.body.data.tokens.refreshToken;
      });

    let refreshToken2 = "";
    await new Promise((resolve) => {
      // ! wait for 1s to avoid the process in the same thread
      setTimeout(() => {
        request(app)
          .post("/api/v1/auth/login")
          .send({
            email,
            password,
          })
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body?.data?.tokens).not.toBeFalsy();

            expect(response.body.data.tokens).toEqual(
              expect.objectContaining({
                accessToken: expect.any(String),
                refreshToken: expect.any(String),
                tokenType: "bearer",
              })
            );

            refreshToken2 = response.body.data.tokens.refreshToken;
            resolve(response);
          });
      }, 1000);
    });

    await request(app).post("/api/v1/auth/logout").expect(204).send({
      refreshToken: refreshToken1,
    });

    await request(app)
      .post("/api/v1/tokens/refresh")
      .expect("Content-Type", /json/)
      .expect(401)
      .send({
        refreshToken: refreshToken1,
      });

    await request(app)
      .post("/api/v1/tokens/refresh")
      .expect("Content-Type", /json/)
      .expect(200)
      .send({
        refreshToken: refreshToken2,
      });
  });
});
