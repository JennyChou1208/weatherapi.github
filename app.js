import express from "express";
const app = express();
import ejs from "ejs";
import fetch from "node-fetch";

app.use(express.static("public"));
app.set("view engine", "ejs");

// api key
let myKey = "67c9a359e0f58b6ba2afd08ca718b845";

// k to cel
function ktoC(k) {
  return (k - 273.15).toFixed(2);
}

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/:city", async (req, res) => {
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;

  let d = await fetch(url);
  let djs = await d.json();
  let { temp } = djs.main;
  let newTemp = ktoC(temp);
  console.log(djs);
  res.render("weather.ejs", { djs, newTemp });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
