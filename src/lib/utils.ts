import { AppError, errorMessages, ErrorCode } from '$lib/errors';

export function handleError(error: unknown): void {
    console.error(error);
    if (error instanceof AppError) {
        alert(errorMessages[error.code]);
    } else if (error instanceof Error) {
        alert(error.message);
    } else {
        alert(errorMessages[ErrorCode.UNKNOWN_ERROR]);
    }
}
