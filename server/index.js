const express = require("express");
const proxy = require("express-http-proxy");
const bodyParser = require("body-parser");
const app = express();
const port = 3010;
const userStore = new Map();
userStore.set("bob", { password: "123", score: 0 });

app.use("/proxy", proxy("https://newsapi.org"));

app.post("/login", bodyParser.json(), (req, res) => {
  const user = userStore.get(req.body.username);
  if (user && user.password === req.body.password) {
    res.send(200);
  } else {
    res.send(401);
  }
});

app.put("/signup", bodyParser.json(), (req, res) => {
  const user = userStore.get(req.body.username);
  if (user) {
    res.send(401);
  } else {
    userStore.set(req.body.username, { password: req.body.password, score: 0 });
    res.send(200);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
