/* eslint-disable callback-return */
import { Schema, ValidationErrorItem } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { formatMessForLogging, logger } from '../utils/logger';

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
            const errors = errorResponse(validationResult.error.details);
            logger.info(formatMessForLogging(req, errors, 400));
            res.status(400).json(errors);
        } else {
            next();
        }
    };
}

export default validateSchema;
