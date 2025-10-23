// constants.js - Application constants

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// Default Configuration
export const DEFAULT_CONFIG = {
  PORT: 4000,
  MAX_QUERY_LIMIT: 100,
  MIN_QUERY_LIMIT: 1,
  DEFAULT_QUERY_LIMIT: 10,
  MAX_SEARCH_LENGTH: 50,
  MIN_NAME_LENGTH: 2,
  POSTAL_CODE_LENGTH: 2
};

// Error Types
export const ERROR_TYPES = {
  VALIDATION_ERROR: 'ValidationError',
  DATABASE_ERROR: 'DatabaseError',
  CONNECTION_ERROR: 'ConnectionError',
  SERVICE_ERROR: 'ServiceError',
  AUTHENTICATION_ERROR: 'AuthenticationError'
};

// Error Codes
export const ERROR_CODES = {
  ECONNREFUSED: 'ECONNREFUSED',
  ENOTFOUND: 'ENOTFOUND',
  ETIMEDOUT: 'ETIMEDOUT'
};

// API Routes
export const API_ROUTES = {
  BASE: '/api/v1',
  PROVINCES_TERRITORIES: '/api/v1/provinces-territories'
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};

// Error Messages
export const ERROR_MESSAGES = {
  DATABASE_NOT_CONFIGURED: 'Database not configured. Cannot add province/territory.',
  MISSING_REQUIRED_FIELDS: 'Missing required fields: name, postal_abbrevation, capital, population',
  INVALID_POSTAL_LENGTH: 'Postal abbreviation must be exactly 2 characters',
  NAME_TOO_SHORT: 'Province/territory name must be at least 2 characters',
  CAPITAL_TOO_SHORT: 'Capital city name must be at least 2 characters',
  POPULATION_EMPTY: 'Population cannot be empty',
  INVALID_LIMIT: 'Limit must be a number between 1 and 100',
  INVALID_OFFSET: 'Offset must be a non-negative number',
  SEARCH_TOO_LONG: 'Search term must be 50 characters or less',
  INVALID_ID: 'Province ID must be a positive number',

  // Response Messages
  VALIDATION_FAILED: 'Validation failed',
  EXTERNAL_SERVICE_UNAVAILABLE: 'External service unavailable',
  RESOURCE_ALREADY_EXISTS: 'Resource already exists',
  DATABASE_SERVICE_UNAVAILABLE: 'Database service unavailable',
  INTERNAL_SERVER_ERROR: 'Internal server error',

  // Database Error Messages
  DB_CONNECTION_REFUSED: 'Database connection refused',
  DB_CONNECTION_TIMEOUT: 'Database connection timeout',
  DB_AUTH_FAILED: 'Database authentication failed',
  DB_OPERATION_FAILED: 'Database operation failed',

  // Success Messages
  PROVINCE_ADDED_SUCCESS: 'Province/Territory added successfully'
};

// Environment Variables
export const ENV_VARS = {
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',
  APP_DB_HOST: 'APP_DB_HOST',
  APP_DB_USERNAME: 'APP_DB_USERNAME',
  APP_DB_PASSWORD: 'APP_DB_PASSWORD',
  APP_DB_NAME: 'APP_DB_NAME',
  APP_DB_PORT: 'APP_DB_PORT'
};

// Environment Types
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test'
};

// Database Configuration
export const DATABASE_CONFIG = {
  DEFAULT_PORT: 1433,
  ENCRYPT: true,
  TRUST_SERVER_CERTIFICATE: false
};

// Logging
export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

// Request/Response Formats
export const CONTENT_TYPES = {
  JSON: 'application/json',
  TEXT: 'text/plain',
  HTML: 'text/html'
};

// Application Metadata
export const APP_INFO = {
  NAME: 'interview-assmt-be',
  DESCRIPTION: 'Interview Assessment Backend API for Provinces and Territories',
  VERSION: '1.7'
};
