import fetch from "node-fetch";
const app = express();
app.use(express(json))

// const API_KEY = "3ea96a8f2c2e6006050fa5167a9e20e8";

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

app.post(path.weather,(req, res) => {
  const cityName = req.body.cityName;
  res.send({`City Name is ${cityName}` });
});
