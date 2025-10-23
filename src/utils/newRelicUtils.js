/**
 * New Relic utilities for monitoring and instrumentation
 */

/**
 * Initialize New Relic conditionally based on environment
 * @returns {Promise<Object|null>} New Relic instance or null if not enabled/failed
 */
export const initializeNewRelic = async () => {
  let newrelic = null;

  try {
    // Only initialize New Relic in production or when explicitly enabled
    if (process.env.NODE_ENV === 'production' || process.env.ENABLE_NEW_RELIC === 'true') {
      newrelic = await import("newrelic");
      newrelic = newrelic.default;
      console.log('New Relic monitoring enabled');
    } else {
      console.log('New Relic monitoring disabled for development');
    }
  } catch (err) {
    console.warn('New Relic initialization failed:', err.message);
    console.warn('Application will continue without New Relic monitoring');
  }

  return newrelic;
};

/**
 * Instrument Express application with New Relic
 * @param {Object} newrelic - New Relic instance
 * @param {Object} express - Express instance
 */
export const instrumentExpress = (newrelic, express) => {
  if (newrelic) {
    try {
      newrelic.instrumentLoadedModule('express', express);
      console.log('Express instrumented with New Relic');
    } catch (err) {
      console.warn('New Relic Express instrumentation failed:', err.message);
    }
  }
};

/**
 * Get New Relic instance if available
 * @param {Object} newrelic - New Relic instance
 * @returns {Object|null} New Relic instance or null
 */
export const getNewRelic = (newrelic) => {
  return newrelic || null;
};
