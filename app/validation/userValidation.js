const Joi = require('joi');

const userSchema = Joi.object().keys({
    first_name: Joi.string().min(3).max(30).required(),
    last_name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(6).max(20).required(),
    mobile: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    role_id: Joi.number().min(1).max(1).required(),
});

const userLoginSchema = Joi.object().keys({
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(6).max(20).required(),
    //role_id: Joi.number().min(1).max(1).required(),
});

module.exports = {
    userSchema,
    userLoginSchema
};