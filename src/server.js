var path = require("path");
require("dotenv").config({
  path: path.join(__dirname, `/configs/${process.env.APP_ENV?.trim()}.env`),
});

const app = require("./app");

// Connect to database
const connectDB = require("./configs/db.config");

const port = process.env.PORT || 6000;

const start = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start server
    app.listen(port, () =>
      console.log(`${process.env.APP_NAME} ${process.env.APP_ENV} Server started on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();