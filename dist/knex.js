"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const { DB_CONNECTION_URL = "", DB_HOST = "", DB_PORT = "", DB_NAME = "", DB_USER = "", DB_PASS = "", DB_POOL_MIN = "2", DB_POOL_MAX = "100", } = process.env;
let connection;
if (DB_HOST) {
    connection = {
        host: DB_HOST,
        port: parseInt(DB_PORT, 10),
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
    };
}
else {
    const props = DB_CONNECTION_URL.split("/");
    const database = props[3];
    const [host, port] = props[2].split("@")[1].split(":");
    const [user, password] = props[2].split("@")[0].split(":");
    connection = {
        database,
        host,
        port: parseInt(port, 10),
        user,
        password,
    };
}
const knex = (0, knex_1.default)({
    client: "mysql",
    connection,
    pool: {
        min: parseInt(DB_POOL_MIN, 10),
        max: parseInt(DB_POOL_MAX, 10),
    },
});
exports.default = knex;
//# sourceMappingURL=knex.js.map