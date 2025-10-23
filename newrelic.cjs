/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */

// Load environment variables from .env file
require('dotenv').config();

const fs = require('fs');
const path = require('path');

// Read configuration from our config file
let config = {};
try {
  const configPath = path.join(__dirname, 'src', 'config', 'config.json');
  const configFile = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(configFile);
} catch (error) {
  console.warn('Could not read config file for New Relic configuration:', error.message);
}

module.exports = {
  /**
   * Array of application names.
   */
  app_name: config.newRelic?.app_name || process.env.NEW_RELIC_APP_NAME || 'interview-assmt-be',

  /**
   * Your New Relic license key.
   */
  license_key: process.env.NEW_RELIC_NONPROD_KEY || process.env.NEW_RELIC_LICENSE_KEY || 'your-license-key-here',

  /**
   * Labels to add to the agent.
   */
  labels: config.newRelic?.labels || process.env.NEW_RELIC_LABELS || 'AppDetail:INTERVIEW-ASSMT;BU:INTERVIEW-ASSMT-BE;Region:DEV;Division:ETS',

  /**
   * Distributed tracing configuration
   */
  distributed_tracing: {
    enabled: config.newRelic?.distributed_tracing?.enabled ?? (process.env.NEW_RELIC_DISTRIBUTED_TRACING_ENABLED === 'true') ?? true
  },

  /**
   * Logging configuration
   */
  logging: {
    level: 'info',
    enabled: config.newRelic?.logging?.enabled ?? (process.env.NEW_RELIC_LOG_ENABLED === 'true') ?? false
  },

  /**
   * When true, all request headers except for those listed in attributes.exclude
   * will be captured for all traces, unless otherwise specified in a destination's
   * attributes include/exclude lists.
   */
  allow_all_headers: true,

  attributes: {
    /**
     * Prefix of attributes to exclude from all destinations. Allows * as wildcard
     * at end.
     */
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  }
};
