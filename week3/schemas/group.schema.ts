import Joi from 'joi';

export default Joi.object().keys({
    name: Joi.string()
        .alphanum().min(3).max(30)
        .required(),
    permissions: Joi.array().items(
        Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
    )
});
