const express = require("express");
const morgan = require("morgan");
const omitEmpty = require("omit-empty");
// const camelCase = (...args) =>
//   import("camelcase-keys").then(({ default: camelCaseKeys }) =>
//     camelCaseKeys(...args)
//   );

const camelCaseKeys = async (str, opts) =>
  (await import("camelcase-keys")).default(str, opts);
const app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));
app.use(morgan(":method :url :status :res[content-length]"));

app.use(camelCase);
app.use(
  (req, res, next) => {
    console.log("log1");
    next();
  },
  (req, res, next) => {
    console.log("log2");
    next();
  }
);

function removeEmptyFields(options = {}) {
  return (req, res, next) => {
    req.body = omitEmpty(req.body, options);
    next();
  };
}

function getTime(req, res, next) {
  req.time = Date.now();
  next();
}
async function camelCase(req, res, next) {
  req.body = await camelCaseKeys(req.body, { deep: true });
  req.query = await camelCaseKeys(req.query);
  req.params = await camelCaseKeys(req.params);
  next();
}

function checkAuth(req, res, next) {
  const { userName, password } = req.query;
  if (userName == "afsun" && password == "1234") {
    return next();
  }
  res.send("Authentication is failed");
}

// app.use((req, res, next) => getTime(req, res, next));
// app.use(getTime);

app.get("/", (req, res, next) => {
  console.log("Response route");
  res.send("finish request");
});

app.post("/create", removeEmptyFields(), (req, res, next) => {
  res.send(req.body);
});

app.get("/blogs", async (req, res, next) => {
  // console.log(await camelCase({ "first-name": "afsun" }));
  res.send({
    query: req.query,
    params: req.params,
    body: req.body,
  });
});

app.get("/users", checkAuth, (req, res) => {
  // console.log(req.time);
  res.send("users");
});

app.use((req, res, next) => {
  console.log("log3");
  next();
});
app.listen(3000, () => console.log("server run on port 3000"));
