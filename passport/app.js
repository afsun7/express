const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
require("./config/mongoose.config");
const AllRouters = require("./routes/index.routes");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const { passportInit } = require("./passport.config");
const { notFound, errorHandler } = require("./utils/error-handler");
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layout/main");

// Set up session
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  })
);

//Set up passport
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(AllRouters(passport));
app.use(notFound);
app.use(errorHandler);
// Route تست
app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

app.listen(3000, () => {
  console.log("server run on port 3000");
});
