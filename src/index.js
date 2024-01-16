import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/dbConnection.js";

dotenv.config({
  path: "../env",
});

connectDB()
  .then(() => {
    try {
      const port = process.env.PORT;
      app.listen(port, () => {
        console.log(`Server running on port ${port} 🔥`);
      });
    } catch (err) {
      console.log("Error in Creating Server connection !! ", err);
    }
  })
  .catch((err) => {
    console.log("Error in DB connection !! ", err);
  });
