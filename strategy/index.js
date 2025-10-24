// basic
const usernamePassword = "afsun/123456";
const base64Data = Buffer.from(usernamePassword).toString("base64");
console.log(base64Data);

const decodedData = Buffer.from(base64Data, "base64").toString("ascii");
const [username, password] = decodedData.split("/");
console.log(username, password);
