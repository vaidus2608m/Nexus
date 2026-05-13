import dotenv from "dotenv";
import app from "./app.js";
import {connectDB} from "./src/db/index.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, (req, res) => {
      console.log("Nexus is running on: Port-" + port);
    });
  })
  .catch((error) => {
    console.log("❌ Mongoose Connection Error:", error);
    process.exit(1);
  });
