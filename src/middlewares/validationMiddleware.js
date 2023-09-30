import {
  createUserSchema,
  updateUserSchema,
} from "../validations/userValidation.js";

export const validateCreateUser = (req, res, next) => {
  const userData = req.body; // Assuming the request body contains user data

  const { error } = createUserSchema.validate(userData);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // If validation passes, continue to the next middleware or route handler
  next();
};

export const validateUpdateUser = (req, res, next) => {
  const userData = req.body; // Assuming the request body contains user data

  const { error } = updateUserSchema.validate(userData);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // If validation passes, continue to the next middleware or route handler
  next();
};
