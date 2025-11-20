export enum ErrorCode {
    ITEM_NOT_FOUND = 'ITEM_NOT_FOUND',
    MISSING_ID = 'MISSING_ID',
    INVALID_STUDENT_DATA = 'INVALID_STUDENT_DATA',
    INVALID_TEACHER_DATA = 'INVALID_TEACHER_DATA',
    INVALID_AGE = 'INVALID_AGE',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export const errorMessages: Record<ErrorCode, string> = {
    [ErrorCode.ITEM_NOT_FOUND]: 'The requested item could not be found.',
    [ErrorCode.MISSING_ID]: 'The item must have a valid ID.',
    [ErrorCode.INVALID_STUDENT_DATA]: 'Please provide all required student details (First Name, Last Name, Age, Class).',
    [ErrorCode.INVALID_TEACHER_DATA]: 'Please provide all required teacher details (First Name, Last Name, Subject).',
    [ErrorCode.INVALID_AGE]: 'Age must be a positive number greater than zero.',
    [ErrorCode.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.'
};

export class AppError extends Error {
    public code: ErrorCode;

    constructor(code: ErrorCode) {
        super(errorMessages[code]);
        this.code = code;
        this.name = 'AppError';
    }
}
