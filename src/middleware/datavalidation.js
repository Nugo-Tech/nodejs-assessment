const {check, validationResult} = require('express-validator')

const addUserValidation = [
    check('name', 'Name is invalid').trim().notEmpty(),
    check('email', 'Email is invalid').trim().isEmail().notEmpty(),
    check('address', 'Address is invalid').trim().notEmpty(),
    check('city', 'City is invalid').trim().notEmpty(),
    check('country', 'Country is invalid').trim().notEmpty(),
  ];

  module.exports= {addUserValidation}
