const express = require("express");

const app = new express();
app.get("/:number", (req, res, next) => {
  try {
    let number = req.params.number;
    if (number == 2) throw { status: 400, message: "number is not equal 2" };
    if (number == 3) throw { status: 400, message: "number is not equal 3" };
    if (number == 4) throw { status: 400, message: "number is not equal 4" };

    res.send("index address");
  } catch (error) {
    // خط زیر کاری که انجام میدهد خطایی که در ترای باشه به کد اخر که خطای 500 میگیره میفرسته و انچا هندل میکنه
    next(error);
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    statusCode: res.statusCode,
    error: {
      type: "Not Found",
      message: "not found" + req.url + "route",
    },
  });
});
app.use((error, req, res, next) => {
  return res.json({
    statusCode: error.status || 500,
    error: {
      message: error.message || "internalServerError ",
    },
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
