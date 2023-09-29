const express = require("express");
const {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/userController");
const Joi = require("joi");
const {validateRequest} = require("../middleware/userValidation");
const router = express.Router();

//create the joi schema for validating user inputs
const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
});


router.get('/',getAllUsers);
router.get('/:id',getUserById)
router.post('/',validateRequest(schema),addUser)
router.delete('/:id',deleteUser)
router.put('/:id',validateRequest(schema),updateUser)




module.exports = router;