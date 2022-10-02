import { faker } from "@faker-js/faker";
import request from "supertest";
import app from "../../../app";

describe("Different method to inexistant uri", () => {
  let uri: string;

  beforeEach(() => {
    uri = faker.lorem.sentence().replace(/ /g, "/");
  });

  test("should return 404 Not Found for method GET", async () => {
    return request(app)
      .get(`/${uri}`)
      .expect("Content-Type", /json/)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.objectContaining({
              message: expect.any(String),
              statusText: expect.any(String),
              statusCode: expect.any(Number),
              code: expect.any(String),
              dateTime: expect.any(String),
            }),
          })
        );

        return response.body;
      })
      .then((body) => {
        expect(body.error.statusText).toBe("Not Found");
        expect(body.error.statusCode).toBe(404);
        expect(body.error.code).toBe("E3");

        const dateTime = body.error.dateTime;
        expect(new Date(dateTime).getTime()).not.toBeNaN();
      });
  });

  test("should return 404 Not Found for method POST", async () => {
    return request(app)
      .post(`/${uri}`)
      .expect("Content-Type", /json/)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.objectContaining({
              message: expect.any(String),
              statusText: expect.any(String),
              statusCode: expect.any(Number),
              code: expect.any(String),
              dateTime: expect.any(String),
            }),
          })
        );

        return response.body;
      })
      .then((body) => {
        expect(body.error.statusText).toBe("Not Found");
        expect(body.error.statusCode).toBe(404);
        expect(body.error.code).toBe("E3");

        const dateTime = body.error.dateTime;
        expect(new Date(dateTime).getTime()).not.toBeNaN();
      });
  });

  test("should return 404 Not Found for method PUT", async () => {
    return request(app)
      .put(`/${uri}`)
      .expect("Content-Type", /json/)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.objectContaining({
              message: expect.any(String),
              statusText: expect.any(String),
              statusCode: expect.any(Number),
              code: expect.any(String),
              dateTime: expect.any(String),
            }),
          })
        );

        return response.body;
      })
      .then((body) => {
        expect(body.error.statusText).toBe("Not Found");
        expect(body.error.statusCode).toBe(404);
        expect(body.error.code).toBe("E3");

        const dateTime = body.error.dateTime;
        expect(new Date(dateTime).getTime()).not.toBeNaN();
      });
  });

  test("should return 404 Not Found for method DELETE", async () => {
    return request(app)
      .delete(`/${uri}`)
      .expect("Content-Type", /json/)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.objectContaining({
              message: expect.any(String),
              statusText: expect.any(String),
              statusCode: expect.any(Number),
              code: expect.any(String),
              dateTime: expect.any(String),
            }),
          })
        );

        return response.body;
      })
      .then((body) => {
        expect(body.error.statusText).toBe("Not Found");
        expect(body.error.statusCode).toBe(404);
        expect(body.error.code).toBe("E3");

        const dateTime = body.error.dateTime;
        expect(new Date(dateTime).getTime()).not.toBeNaN();
      });
  });
});
