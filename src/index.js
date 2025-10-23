import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import canadasql from "./repository.js";
import getRemoteData, { getAlmostRemoteData, getNotSoRemoteData } from "./service.js";
import { validateDatabaseConfig, validateProvinceData } from "./utils/validations.js";
import { globalErrorHandler } from "./utils/exceptionHandler.js";
import { DEFAULT_CONFIG, HTTP_STATUS, ERROR_MESSAGES, ENV_VARS } from "./utils/constants.js";
import { initializeNewRelic, instrumentExpress } from "./utils/newRelicUtils.js";
import { getAppConfig } from "./utils/configUtils.js";

// Initialize New Relic
const newrelic = await initializeNewRelic();

// Load application configuration
const conf = getAppConfig();

const app = express(); // creating an Express app

// Instrument Express with New Relic
instrumentExpress(newrelic, express);

const { PORT = DEFAULT_CONFIG.PORT, APP_DB_HOST } = process.env;

app.use(bodyParser.json()).use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
const _canadasql = new canadasql();

app.get("/api/v1/provinces-territories", async (request, response, next) => {
  try {
    let data = await getRemoteData(conf.externalService);

    if (APP_DB_HOST) {
      const result = await _canadasql.getProvincesAndTerritories();
      data = result.recordset;
    }
    return response.json(data);
  } catch (err) {
    next(err);
  }
});

app.get("/api/v2/provinces-territories", async (request, response, next) => {
  let data = await getAlmostRemoteData(conf.externalService);

  if (APP_DB_HOST) {
    const result = await _canadasql.getProvincesAndTerritories();
    data = result.recordset;
  }
  return response.json(data);
});

app.get("/api/v3/provinces-territories", (request, response, next) => {
  let data = getNotSoRemoteData(conf.externalService);
  return response.json(data);
});

app.post("/api/v1/provinces-territories", async (request, response, next) => {
  try {
    validateDatabaseConfig(APP_DB_HOST);
    const provinceData = validateProvinceData(request.body);
    const result = await _canadasql.addProvinceOrTerritory(provinceData);

    response.status(HTTP_STATUS.CREATED).json({
      message: ERROR_MESSAGES.PROVINCE_ADDED_SUCCESS,
      id: result.recordset[0].id,
      data: provinceData
    });

  } catch (err) {
    next(err);
  }
});


app.use(globalErrorHandler);
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// server will start listening for requests, the function is called immediately once the server is ready. Console.logs show up in your terminal.
app.listen(PORT, () =>
  console.log(`Hello World, I'm listening on port ${PORT}!`)
);
