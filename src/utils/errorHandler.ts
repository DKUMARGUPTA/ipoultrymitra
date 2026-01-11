export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const catchAsync =
  (fn: Function) =>
  (...args: any[]) =>
    Promise.resolve(fn(...args)).catch(args[args.length - 1]);

export const handleError = (error: any) => {
  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      message: error.message,
      isOperational: error.isOperational,
    };
  }

  // Handle Supabase errors
  if (error?.message?.includes('supabase')) {
    return {
      status: 500,
      message: 'Database operation failed',
      isOperational: true,
    };
  }

  // Unknown error
  return {
    status: 500,
    message: 'An unexpected error occurred',
    isOperational: false,
  };
};

export const errorMessages = {
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'The requested resource was not found',
  BAD_REQUEST: 'Invalid request parameters',
  INTERNAL_ERROR: 'Internal server error',
  CONFLICT: 'This resource already exists',
  FORBIDDEN: 'You do not have permission to access this resource',
};
