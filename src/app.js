const express = require("express");
const app = express();
const {StatusCodes} = require('http-status-codes');

// Pre Route Middlewares
require("./middlewares/pre-route.middleware")(app);

// API Version 1

app.get("/", async function (req, res, next) {
  res.status(StatusCodes.OK).json({
    status: "success",
    statusCode: StatusCodes.OK,
    message: `Welcome to the ${process.env.APP_NAME} inventory tracking API. Running in ${process.env.APP_ENV}`,
    more_info: "visit /api/v1 to access version 1 of our API"
  });
});

app.use("/api", require("./routes/versions"));

// PING
app.get("/ping", (req, res) => res.status(200).send("the server is up & running!"));

// Not Found Route
app.all("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: "error",
    status_code: StatusCodes.NOT_FOUND,
    message: "Can't find " + req.originalUrl + " on this server",
  });
});


module.exports = app;
