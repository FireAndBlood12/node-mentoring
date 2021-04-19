import Joi from 'joi';

export default Joi.object().keys({
    login: Joi.string()
        .required(),
    password: Joi.string()
        .required()
});
