var path = require("path");
require("dotenv").config({
  path: path.join(__dirname, `/config/${process.env.APP_ENV?.trim()}.env`),
});

const app = require("./app");

const connectDB = require("./config/db.config");

const port = process.env.PORT || 6000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      console.log(`${process.env.APP_NAME} ${process.env.APP_ENV} Server started on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();