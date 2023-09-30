import express from "express";

import {
  createUser,
  readUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  validateCreateUser,
  validateUpdateUser,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/", validateCreateUser, createUser);
router.get("/:userId", readUser);
router.put("/:userId", validateUpdateUser, updateUser);
router.delete("/:userId", deleteUser);

export default router;
