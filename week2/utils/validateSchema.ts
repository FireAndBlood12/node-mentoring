/* eslint-disable callback-return */
import { Schema, ValidationErrorItem } from 'joi';
import { Request, Response, NextFunction } from 'express';

function errorResponse(schemasErrors : ValidationErrorItem[]) {
    const errors = schemasErrors.map((error) => {
        const { path, message } = error;
        return { path, message };
    });
    return {
        status: 'failed',
        errors
    };
}

function validateSchema(schema : Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
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

export default validateSchema;
