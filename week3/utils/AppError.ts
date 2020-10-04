
export default class AppError extends Error {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
