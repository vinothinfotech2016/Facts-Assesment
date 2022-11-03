"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./user/routes"));
const routes_2 = __importDefault(require("./productmenus/routes"));
const routes_3 = __importDefault(require("./product/routes"));
const routes_4 = __importDefault(require("./roles/routes"));
const routes_5 = __importDefault(require("./appUsers/routes"));
const routes_6 = __importDefault(require("./menuFlow/routes"));
const routes_7 = __importDefault(require("./screenMaster/routes"));
function default_1(app) {
    app.get("/", (req, res) => res.status(200).send({ message: "App Initiated" }));
    (0, routes_1.default)(app);
    (0, routes_2.default)(app);
    (0, routes_3.default)(app);
    (0, routes_4.default)(app);
    (0, routes_5.default)(app);
    (0, routes_6.default)(app);
    (0, routes_7.default)(app);
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map