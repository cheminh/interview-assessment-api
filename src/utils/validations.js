// validations.js - Centralized validation functions

import {
  ERROR_TYPES,
  ERROR_MESSAGES,
  DEFAULT_CONFIG
} from './constants.js';

/**
 * Creates a ValidationError with the specified message
 * @param {string} message - The error message
 * @returns {Error} ValidationError instance
 */
function createValidationError(message) {
  const error = new Error(message);
  error.name = ERROR_TYPES.VALIDATION_ERROR;
  return error;
}

/**
 * Validates if database is configured
 * @param {string} dbHost - Database host environment variable
 * @throws {ValidationError} If database is not configured
 */
export function validateDatabaseConfig(dbHost) {
  if (!dbHost) {
    throw createValidationError(ERROR_MESSAGES.DATABASE_NOT_CONFIGURED);
  }
}

/**
 * Validates province/territory data
 * @param {Object} data - The province/territory data to validate
 * @param {string} data.name - Province/territory name
 * @param {string} data.postal_abbrevation - Postal abbreviation
 * @param {string} data.capital - Capital city
 * @param {string} data.population - Population
 * @throws {ValidationError} If validation fails
 * @returns {Object} Cleaned and validated data
 */
export function validateProvinceData(data) {
  const { name, postal_abbrevation, capital, population } = data;

  // Check if all required fields are present
  if (!name || !postal_abbrevation || !capital || !population) {
    throw createValidationError(ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
  }

  // Validate postal abbreviation length
  if (postal_abbrevation.length !== DEFAULT_CONFIG.POSTAL_CODE_LENGTH) {
    throw createValidationError(ERROR_MESSAGES.INVALID_POSTAL_LENGTH);
  }

  // Validate name length
  if (name.trim().length < DEFAULT_CONFIG.MIN_NAME_LENGTH) {
    throw createValidationError(ERROR_MESSAGES.NAME_TOO_SHORT);
  }

  // Validate capital length
  if (capital.trim().length < DEFAULT_CONFIG.MIN_NAME_LENGTH) {
    throw createValidationError(ERROR_MESSAGES.CAPITAL_TOO_SHORT);
  }

  // Validate population format (basic check)
  const populationStr = population.toString().trim();
  if (populationStr.length === 0) {
    throw createValidationError(ERROR_MESSAGES.POPULATION_EMPTY);
  }

  // Return cleaned data
  return {
    name: name.trim(),
    postal_abbrevation: postal_abbrevation.trim().toUpperCase(),
    capital: capital.trim(),
    population: populationStr
  };
}

/**
 * Validates query parameters for province/territory endpoints
 * @param {Object} query - Request query parameters
 * @returns {Object} Validated query parameters
 */
export function validateQueryParams(query) {
  const validatedQuery = {};

  // Validate limit parameter
  if (query.limit) {
    const limit = parseInt(query.limit, 10);
    if (isNaN(limit) || limit < DEFAULT_CONFIG.MIN_QUERY_LIMIT || limit > DEFAULT_CONFIG.MAX_QUERY_LIMIT) {
      throw createValidationError(ERROR_MESSAGES.INVALID_LIMIT);
    }
    validatedQuery.limit = limit;
  }

  // Validate offset parameter
  if (query.offset) {
    const offset = parseInt(query.offset, 10);
    if (isNaN(offset) || offset < 0) {
      throw createValidationError(ERROR_MESSAGES.INVALID_OFFSET);
    }
    validatedQuery.offset = offset;
  }

  // Validate search parameter
  if (query.search) {
    const search = query.search.trim();
    if (search.length > DEFAULT_CONFIG.MAX_SEARCH_LENGTH) {
      throw createValidationError(ERROR_MESSAGES.SEARCH_TOO_LONG);
    }
    validatedQuery.search = search;
  }

  return validatedQuery;
}

/**
 * Validates province/territory ID parameter
 * @param {string} id - The ID to validate
 * @throws {ValidationError} If ID is invalid
 * @returns {number} Validated ID as number
 */
export function validateProvinceId(id) {
  const numericId = parseInt(id, 10);

  if (isNaN(numericId) || numericId < 1) {
    throw createValidationError(ERROR_MESSAGES.INVALID_ID);
  }

  return numericId;
}
