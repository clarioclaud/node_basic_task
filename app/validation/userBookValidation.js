const Joi = require('joi');

const userBookSchema = Joi.object().keys({
    user_id: Joi.required(),
    book_id: Joi.number().required(),
    return_date: Joi.string().required(),
});

module.exports = {
    userBookSchema
};