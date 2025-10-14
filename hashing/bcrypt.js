const bcrypt = require("bcrypt");
function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  console.log(hash);
  return hash;
}

function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

const hash = hashPassword("123456");
console.log(verifyPassword("123456", hash));
