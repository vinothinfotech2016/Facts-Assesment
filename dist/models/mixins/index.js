"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftDelete = exports.Password = exports.BaseModel = exports.Model = void 0;
const objection_1 = require("objection");
Object.defineProperty(exports, "Model", { enumerable: true, get: function () { return objection_1.Model; } });
const knex_1 = __importDefault(require("../../knex"));
const BaseModel_1 = __importDefault(require("./BaseModel"));
exports.BaseModel = BaseModel_1.default;
const objection_password_1 = __importDefault(require("objection-password"));
exports.Password = objection_password_1.default;
const objection_js_soft_delete_1 = __importDefault(require("objection-js-soft-delete"));
exports.SoftDelete = objection_js_soft_delete_1.default;
objection_1.Model.knex(knex_1.default);
//# sourceMappingURL=index.js.map