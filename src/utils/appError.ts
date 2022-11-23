export default class AppError extends Error {
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}