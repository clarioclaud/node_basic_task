const Joi = require('joi');

const bookSchema = Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.required(),
    image: Joi.string().required(),
});

module.exports = {
    bookSchema
};