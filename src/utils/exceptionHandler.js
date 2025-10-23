// exceptionHandler.js - Centralized exception handling utility

import {
  HTTP_STATUS,
  ERROR_TYPES,
  ERROR_CODES,
  ERROR_MESSAGES,
  ENVIRONMENTS,
  ENV_VARS
} from './constants.js';

/**
 * Global error handler middleware for Express applications
 * Handles different types of errors and returns appropriate HTTP responses
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export function globalErrorHandler(err, req, res, next) {
  // Log the error with context
  console.error(`Error on ${req.method} ${req.path}:`, {
    message: err.message,
    stack: err.stack,
    code: err.code,
    name: err.name
  });

  // Handle different error types
  if (err.name === ERROR_TYPES.VALIDATION_ERROR) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: ERROR_MESSAGES.VALIDATION_FAILED,
      details: err.message
    });
  }

  if (err.code === ERROR_CODES.ECONNREFUSED || err.code === ERROR_CODES.ENOTFOUND) {
    return res.status(HTTP_STATUS.SERVICE_UNAVAILABLE).json({
      error: ERROR_MESSAGES.EXTERNAL_SERVICE_UNAVAILABLE
    });
  }

  if (err.message && err.message.includes('duplicate')) {
    return res.status(HTTP_STATUS.CONFLICT).json({
      error: ERROR_MESSAGES.RESOURCE_ALREADY_EXISTS
    });
  }

  if (err.name === ERROR_TYPES.CONNECTION_ERROR || err.name === ERROR_TYPES.DATABASE_ERROR) {
    return res.status(HTTP_STATUS.SERVICE_UNAVAILABLE).json({
      error: ERROR_MESSAGES.DATABASE_SERVICE_UNAVAILABLE
    });
  }

  // Default fallback for unexpected errors
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    ...(process.env[ENV_VARS.NODE_ENV] === ENVIRONMENTS.DEVELOPMENT && { details: err.message })
  });
}

/**
 * Creates a standardized error object with specific properties
 * @param {string} message - Error message
 * @param {string} name - Error type/name
 * @param {number} statusCode - HTTP status code
 * @returns {Error} Configured error object
 */
export function createError(message, name = 'Error', statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR) {
  const error = new Error(message);
  error.name = name;
  error.statusCode = statusCode;
  return error;
}

/**
 * Async error wrapper for Express route handlers
 * Automatically catches async errors and passes them to the error handler
 * @param {Function} fn - Async route handler function
 * @returns {Function} Wrapped route handler
 */
export function asyncErrorHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Handle database connection errors
 * @param {Error} err - Database error
 * @returns {Error} Standardized database error
 */
export function handleDatabaseError(err) {
  if (err.code === ERROR_CODES.ECONNREFUSED) {
    return createError(ERROR_MESSAGES.DB_CONNECTION_REFUSED, ERROR_TYPES.DATABASE_ERROR, HTTP_STATUS.SERVICE_UNAVAILABLE);
  }

  if (err.code === ERROR_CODES.ETIMEDOUT) {
    return createError(ERROR_MESSAGES.DB_CONNECTION_TIMEOUT, ERROR_TYPES.DATABASE_ERROR, HTTP_STATUS.SERVICE_UNAVAILABLE);
  }

  if (err.message && err.message.includes('login failed')) {
    return createError(ERROR_MESSAGES.DB_AUTH_FAILED, ERROR_TYPES.DATABASE_ERROR, HTTP_STATUS.SERVICE_UNAVAILABLE);
  }

  return createError(ERROR_MESSAGES.DB_OPERATION_FAILED, ERROR_TYPES.DATABASE_ERROR, HTTP_STATUS.SERVICE_UNAVAILABLE);
}

/**
 * Handle external service errors
 * @param {Error} err - Service error
 * @param {string} serviceName - Name of the external service
 * @returns {Error} Standardized service error
 */
export function handleServiceError(err, serviceName = 'External service') {
  if (err.code === ERROR_CODES.ECONNREFUSED || err.code === ERROR_CODES.ENOTFOUND) {
    return createError(`${serviceName} unavailable`, ERROR_TYPES.SERVICE_ERROR, HTTP_STATUS.SERVICE_UNAVAILABLE);
  }

  if (err.code === ERROR_CODES.ETIMEDOUT) {
    return createError(`${serviceName} timeout`, ERROR_TYPES.SERVICE_ERROR, HTTP_STATUS.SERVICE_UNAVAILABLE);
  }

  return createError(`${serviceName} error`, ERROR_TYPES.SERVICE_ERROR, HTTP_STATUS.SERVICE_UNAVAILABLE);
}
