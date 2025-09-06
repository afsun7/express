const express = require("express");
const posts = require("./post.json");
const queryString = require("querystring");
const app = express();

app.get("/foo", (req, res) => {
  console.log(queryString.parse("key=value&key2=value2&key3=value3"));
  console.log(
    queryString.stringify({
      key: "value",
      key2: "value2",
      key3: "value3",
    })
  );
  const { key11, key12 } = req.query;
  res.send({ key11, key12, url: req.originalUrl });
});

app.get("/blog", (req, res) => {
  const { firstName, lastName } = req.query;
  const regexpFirstName = new RegExp(firstName ?? "", "gi");
  const regexpLastName = new RegExp(lastName ?? "", "gi");
  const filter = posts.filter(
    (post) =>
      post.first_name.match(regexpFirstName) &&
      post.last_name.match(regexpLastName)
  );
  res.send({ posts: filter });
});

app.listen(3000, () => console.log("server run on port 3000"));
