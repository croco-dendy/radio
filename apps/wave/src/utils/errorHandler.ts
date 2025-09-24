import type { Context } from 'hono';
import { z } from 'zod';
import { ResponseHelper } from './response';
import { getErrorMessage } from './errorMessages';

export const ErrorHandler = {
  handle(error: unknown, c: Context) {
    console.error('Error:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(
        (err) => `${err.path.join('.')}: ${err.message}`,
      );
      return ResponseHelper.error(
        c,
        `Validation error: ${errorMessages.join(', ')}`,
        400,
      );
    }

    if (error instanceof Error) {
      // Handle specific error types with centralized messages
      if (error.message === 'Forbidden') {
        return ResponseHelper.forbidden(c, getErrorMessage.auth('FORBIDDEN'));
      }

      if (error.message === 'Not found') {
        return ResponseHelper.notFound(
          c,
          getErrorMessage.resource('NOT_FOUND'),
        );
      }

      if (error.message === 'Unauthorized') {
        return ResponseHelper.unauthorized(
          c,
          getErrorMessage.auth('UNAUTHORIZED'),
        );
      }

      if (error.message === 'Invalid credentials') {
        return ResponseHelper.unauthorized(
          c,
          getErrorMessage.auth('INVALID_CREDENTIALS'),
        );
      }

      if (error.message === 'Email already exists') {
        return ResponseHelper.error(
          c,
          getErrorMessage.account('EMAIL_EXISTS'),
          409,
        );
      }

      if (error.message === 'Username already exists') {
        return ResponseHelper.error(
          c,
          getErrorMessage.account('USERNAME_EXISTS'),
          409,
        );
      }

      if (error.message === 'Invalid or expired token') {
        return ResponseHelper.unauthorized(
          c,
          getErrorMessage.auth('INVALID_TOKEN'),
        );
      }

      // Handle service-specific errors
      if (error.message.includes('Telegram stream')) {
        return ResponseHelper.error(c, error.message, 500);
      }

      if (error.message.includes('RTMP server')) {
        return ResponseHelper.error(c, error.message, 500);
      }

      if (error.message.includes('Unknown service')) {
        return ResponseHelper.error(c, error.message, 400);
      }

      // Handle account-specific errors
      if (error.message.includes('Account with ID')) {
        return ResponseHelper.notFound(c, error.message);
      }

      if (error.message.includes('Current account with ID')) {
        return ResponseHelper.notFound(c, error.message);
      }

      // Handle collection-specific errors
      if (error.message.includes('Collection with ID')) {
        return ResponseHelper.notFound(c, error.message);
      }

      // Generic error handling
      return ResponseHelper.error(c, error.message, 500);
    }

    return ResponseHelper.error(
      c,
      getErrorMessage.system('INTERNAL_ERROR'),
      500,
    );
  },
};
