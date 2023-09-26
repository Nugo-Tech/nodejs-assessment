import express from "express";
import dotenv from "dotenv";

import { testDbConnection } from "./config/index.js";

dotenv.config();
testDbConnection();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ` + port);
});
