const express = require("express");
const app = express();

const products = [
  { id: 1, name: "product1" },
  { id: 2, name: "product2" },
  { id: 3, name: "product3" },
  { id: 4, name: "product4" },
];
const users = [
  { id: 1, name: "user1" },
  { id: 2, name: "user2" },
  { id: 3, name: "user3" },
  { id: 4, name: "user4" },
];

app.get("/file.txt", (req, res) => {
  res.status(200).send("Accepted:" + req.url);
});
// app.get("/ab*cd", (req, res) => {
//   //ab(alphabet)cd
//   res.status(200).send("Accepted:" + req.url);
// });

app.get(/a/, (req, res) => {
  //ab(alphabet)cd
  res.status(200).send("Accepted:" + req.url + "/a");
});
app.get(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, (req, res) => {
  //email
  res.status(200).send("Accepted:" + req.url + "gmail");
});
app.get(/.*nodejs$/, (req, res) => {
  //دات اول به معنای هر چیزی ستاره به معنای بی نهایت است و اما اخرش که $ گذاشتم یعنی اخرش باید به نودجی اس باید ختم شود
  res.status(200).send("Accepted:" + req.url + "/nodejs");
});
app.listen(3000, () => console.log("server run on port 3000"));
