import User from "../models/User.js";

// Check email already have or not
const isEmailExists = async (value) => {
  const user = await User.findOne({ where: { email: value } });
  if (user) return true;
  else false;
};

// Create a new user
export async function createUser(req, res, next) {
  try {
    const exists = await isEmailExists(req.body.email);
    if (exists) {
      return res.status(500).json({ error: "Email already exists" });
    }

    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

// Read user details by user ID
export async function readUser(req, res, next) {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// Update user information by user ID
export async function updateUser(req, res, next) {
  try {
    const exists = await isEmailExists(req.body.email);
    if (exists) {
      return res.status(500).json({ error: "Email already exists" });
    }
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// Delete a user by user ID
export async function deleteUser(req, res, next) {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
