import supertest from "supertest";
import app from "../app";

const request = supertest(app);

describe("POST /weather", () => {
  it("404 error if the city Name is not found", async () => {
    const response = await request.post("/weather").send({});
    expect(response.status).toBe(404);
  });

  it("404 error if the city Name is gibberish", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "gibberish123" });
    expect(response.status).toBe(404);
    expect(response.text).toBe("City is not found");
  });

  it("200 status if the city name is found", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "London" })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.cityName).toBe("London");
    expect(response.body.temperature).toBeDefined();
  });
});
