import supertest from "supertest";
import app from "../app.js";

const request = supertest(app);

describe("POST /weather", () => {
  it("responds with 500 error if server does not respond", async () => {
    const response = await request.post("/weather").send({});
    expect(response.status).toBe(500);
  });

  it("responds with 404 error if the city Name is gibberish", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "gibberish123" });
    expect(response.status).toBe(404);
    expect(response.text).toContain("is not found");
  });

  it("responds with 200 status if the city name is found", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "London" });

    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain("London");
  });
});
