/**
 * Configuration utilities for loading application config
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Load configuration from config.json file
 * @param {string} configFileName - Name of the config file (default: 'config.json')
 * @returns {Object} Configuration object
 */
export const loadConfig = (configFileName = 'config.json') => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const configPath = path.join(__dirname, '..', 'config', configFileName);
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);

    console.log(`Configuration loaded successfully from ${configFileName}`);
    return config;
  } catch (error) {
    console.error(`Failed to load configuration from ${configFileName}:`, error.message);
    throw new Error(`Configuration loading failed: ${error.message}`);
  }
};

/**
 * Get configuration with default fallbacks
 * @returns {Object} Configuration object with defaults
 */
export const getAppConfig = () => {
  return loadConfig();
};
