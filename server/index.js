const express = require("express");
const proxy = require("express-http-proxy");
const app = express();
const port = 3010;

app.use("/proxy", proxy("https://newsapi.org"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
