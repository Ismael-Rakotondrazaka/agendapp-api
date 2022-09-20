import request from "supertest";

import app from "./app";

describe("App", () => {
  test("should get any message", () => {
    return request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
              message: expect.any(String),
            }),
          })
        );
      });
  });
});
