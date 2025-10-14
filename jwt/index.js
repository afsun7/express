// const jwt = require("jsonwebtoken");
// const secret = "JH21TC3W0z6Ca5dOJCFYIRsjMKfpHM4FV5zhl7g76/BDsm6";
// const token = jwt.sign({ id: "some_id", email: "omidi@gmail.com" }, secret, {
//   expiresIn: 1000 * 60, // 1d 1w 1y
//   algorithm: "HS256",
// });
// console.log(token);

const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync("privateKey.key");
const publicKey = fs.readFileSync("publicKey.pem");
const token = jwt.sign(
  { id: "some_id", email: "omidi@gmail.com" },
  privateKey,
  {
    expiresIn: 1000 * 60, // 1d 1w 1y
    algorithm: "RS256",
  }
);
try {
  const verifyToken = jwt.verify(token, publicKey);
  console.log("Verified payload:", verifyToken);
} catch (err) {
  console.error("Invalid token:", err.message);
}
