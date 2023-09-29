const express = require("express");

const {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers).post(addUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;