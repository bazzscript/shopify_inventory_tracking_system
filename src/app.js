const express = require("express");
const app = express();
const {StatusCodes} = require('http-status-codes');

// Pre Route Middlewares
require("./middlewares/pre-route.middleware")(app);

// API Version 1
app.use("/api", require("./routes/versions"));

// PING
app.get("/ping", (req, res) => res.status(200).send("the server is up & running!"));

// Not Found Route
app.all("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: "error",
    status_code: StatusCodes.NOT_FOUND,
    message: "Can't find " + req.originalUrl + " on this server",
    data: "empty"
  });
});


module.exports = app;
