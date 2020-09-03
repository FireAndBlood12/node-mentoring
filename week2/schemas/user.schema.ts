import Joi from 'joi';

export default Joi.object().keys({
    login: Joi.string()
        .alphanum().min(3).max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,32}$'))
        .required(),
    age: Joi.number()
        .integer().min(4).max(130)
        .required()
});
