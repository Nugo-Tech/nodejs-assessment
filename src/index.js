import express from "express";
import dotenv from "dotenv/config";

import userRoutes from "./routes/userRoutes.js";
import { sequelize } from "./config/db.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();
const port = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());

// API routes
app.use("/users", userRoutes);

// Error middleware
app.use(errorMiddleware);

// Sync the database and start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
