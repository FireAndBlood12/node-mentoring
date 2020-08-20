/* eslint-disable callback-return */
function errorResponse(schemasErrors) {
    const errors = schemasErrors.map((error) => {
        const { path, message } = error;
        return { path, message };
    });
    return {
        status: 'failed',
        errors
    };
}

function validateSchema(schema) {
    return (req, res, next) => {
        const validationResult = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });
        if (validationResult.error) {
            res.status(400).json(errorResponse(validationResult.error.details));
        } else {
            next();
        }
    };
}

module.exports = validateSchema;
