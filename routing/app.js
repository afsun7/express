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

app.get("/", (req, res) => {
  res.send("<h1>some html</h1>");
  res.send({ message: "hello ExpressJs" });
});

app.get("/product", (req, res) => {
  res.statusCode = 200;
  res.json({ products });
});

app.get("/user", (req, res) => {
  res.json({
    users,
  });
});

// app.get("/product/:id?", (req, res) => {
//   const { id } = req.params;
//   let product = null;
//   if (id) {
//     product = products.find((item) => item.id == id);
//     return res.send(product);
//   }
//   res.json({ products });
// });
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => item.id == id);
  if (!user) {
    // res.json({ message: "user not found" });
    return res.status(404).json({
      statusCode: res.statusCode,
      message: false,
      error: {
        message: "user not found",
      },
    });
  }
  res.status(200).json({
    statusCode: res.statusCode,
    message: true,
    data: {
      user,
    },
  });
});

app.listen(3000, () => console.log("server run on port 3000"));
