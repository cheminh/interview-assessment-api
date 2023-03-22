const express = require("express"); // importing the module
const bodyParser = require("body-parser");
const cors = require("cors");
const canadasql = require("./repository");
const conf = require("./config.json");
const localData = require("./data");
const getRemoteData = require("./service");
const app = express(); // creating an Express app

const { PORT = 4000, APP_DB_HOST } = process.env;

app.use(bodyParser.json()).use(cors());
const _canadasql = new canadasql();

// set up route for '/', http://expressjs.com/en/5x/api.html#res.send
// this will show up on `localhost:4000` in the browser
app.get("/api/v1/provinces-territories", async (request, response) => {
  try {
    // to call a remote service that returns the same data as 'localData',
    // uncomment the 'getRemoteData' line and comment the 'localData' line

    let data = localData.provinces_territories;
    // let data = await getRemoteData(conf.externalService);

    if (APP_DB_HOST) {
      const result = await _canadasql.getProvincesAndTerritories();
      data = result.recordset;
    }
    return response.json(data);
  } catch (err) {
    console.error(
      "Error happened when retriving provices and territories from db",
      err
    );
    response.sendStatus(500);
  }
});

// server will start listening for requests, the function is called immediately once the server is ready. Console.logs show up in your terminal.
app.listen(PORT, () =>
  console.log(`Hello World, I'm listening on port ${PORT}!`)
);
