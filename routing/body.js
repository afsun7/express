const express = require("express");
const app = new express();
app.use(express.json());
app.use(express.urlencoded());
app.post("/body", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(3000, () => console.log("server run on port 3000"));
