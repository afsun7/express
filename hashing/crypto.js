const crypto = require("crypto");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return `$2s.${salt}.${hash}`;
}

function verifyHashPassword(password, hashPassword) {
  const salt = hashPassword.split(".")?.[1];
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  const newHash = `$2s.${salt}.${hash}`;
  return newHash === hashPassword;
}

const hashed = hashPassword("123456");
const result = verifyHashPassword("123456", hashed);
console.log(result);
