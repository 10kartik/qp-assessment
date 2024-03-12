import express from "express";
import dotenv from "dotenv";
import { initializeDatabase } from "./dbConnection.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";

const app = express();
app.use(express.json());
dotenv.config();

// Use the admin routes
app.use("/admin", adminRoutes);

app.use("/user", userRoutes);

const port = process.env.PORT || 3000;

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log("Connected to the database.");
  });
});
