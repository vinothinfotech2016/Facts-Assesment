"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mixins_1 = require("./mixins");
const constants_1 = require("../constants");
const AppUsers_1 = __importDefault(require("./AppUsers"));
let AppRoles = class AppRoles extends mixins_1.Model {
    static get tableName() {
        return "app_roles";
    }
    static get jsonSchema() {
        return {
            type: "object",
            properties: Object.assign(Object.assign({}, constants_1.BASE_FIELDS), { id: constants_1.TYPES.ID, role: constants_1.TYPES.STRING, accessMenus: constants_1.TYPES.STRING, createdAt: constants_1.TYPES.INTEGER, updatedAt: constants_1.TYPES.INTEGER }),
        };
    }
    static get relationMappings() {
        return {
            users: {
                relation: mixins_1.Model.HasManyRelation,
                modelClass: AppUsers_1.default,
                join: {
                    from: `${this.tableName}.id`,
                    to: `${AppUsers_1.default.tableName}.roleId`,
                },
            },
        };
    }
};
AppRoles = __decorate([
    (0, mixins_1.BaseModel)()
], AppRoles);
exports.default = AppRoles;
//# sourceMappingURL=AppRoles.js.map