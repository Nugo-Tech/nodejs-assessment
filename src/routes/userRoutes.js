import express from "express";

import {
  createUser,
  readUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/:userId", readUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
