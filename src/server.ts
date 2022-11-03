/**
 * Module dependencies.
 */
import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import logger from "morgan";
import errorHandler from "errorhandler";
import lusca from "lusca";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { EventEmitter } from "events";
import expressValidator = require("express-validator");
import fileUpload from "express-fileupload";
import { default as routes } from "./modules/routes";

dotenv.config();
const app = express();

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
app.set("emitter", new EventEmitter());
app.set("emitter", new EventEmitter());
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(cors());

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

app.get("emitter").on("appStarted", function () {
  console.log(
    "App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("Press CTRL-C to stop\n");
});

initializeApplication().catch((error) => {
  console.log("Error occurred when initializing app.");
  console.log(error);
  process.exit();
});

module.exports = app;

async function initializeApplication() {
  routes(app);
  app.listen(app.get("port"), () => {
    app.get("emitter").emit("appStarted");
  });
  return;
}
