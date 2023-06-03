import fetch from "node-fetch";

const path = {
  root: "/",
  weather: "/weather",
};

app.get(path.root, (req, res) => {
  res.send("hello from backend to frontend");
});
app.listen(3000, () => {
  console.log("Server started");
});

app.post(path.weather, async (req, res) => {
  const cityName = req.body.cityName;
  res.send({ weatherText: `${cityName}` });
});
