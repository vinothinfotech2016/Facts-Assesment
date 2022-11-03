"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const lusca_1 = __importDefault(require("lusca"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const events_1 = require("events");
const expressValidator = require("express-validator");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routes_1 = __importDefault(require("./modules/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
app.set("emitter", new events_1.EventEmitter());
app.set("emitter", new events_1.EventEmitter());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(lusca_1.default.xframe("SAMEORIGIN"));
app.use(lusca_1.default.xssProtection(true));
app.use(express_1.default.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use((0, cors_1.default)());
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use((0, errorhandler_1.default)());
app.get("emitter").on("appStarted", function () {
    console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
    console.log("Press CTRL-C to stop\n");
});
initializeApplication().catch((error) => {
    console.log("Error occurred when initializing app.");
    console.log(error);
    process.exit();
});
module.exports = app;
function initializeApplication() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, routes_1.default)(app);
        app.listen(app.get("port"), () => {
            app.get("emitter").emit("appStarted");
        });
        return;
    });
}
//# sourceMappingURL=server.js.map