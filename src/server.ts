import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
const port: number = 5000;
//database connection
const db = async () => {
  try {
    await mongoose.connect(config.databse_url as string);
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(` App listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
db();
