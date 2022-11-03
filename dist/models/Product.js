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
const ProductMenu_1 = __importDefault(require("./ProductMenu"));
const AppUsers_1 = __importDefault(require("./AppUsers"));
const ScreenMaster_1 = __importDefault(require("./ScreenMaster"));
let Product = class Product extends mixins_1.Model {
    static get tableName() {
        return "product";
    }
    static get jsonSchema() {
        return {
            type: "object",
            properties: Object.assign(Object.assign({}, constants_1.BASE_FIELDS), { id: constants_1.TYPES.ID, name: constants_1.TYPES.STRING, description: constants_1.TYPES.STRING, leftLogoUrl: constants_1.TYPES.TEXT, rightLogoUrl: constants_1.TYPES.TEXT, centerLogoUrl: constants_1.TYPES.TEXT, centerLogoText: constants_1.TYPES.TEXT, status: constants_1.TYPES.STRING, inActiveReason: constants_1.TYPES.TEXT, effectiveDate: constants_1.TYPES.STRING, createdBy: constants_1.TYPES.ID, updatedBy: constants_1.TYPES.ID, createdAt: constants_1.TYPES.INTEGER, updatedAt: constants_1.TYPES.INTEGER }),
        };
    }
    static get relationMappings() {
        return {
            productMenu: {
                relation: mixins_1.Model.HasManyRelation,
                modelClass: ProductMenu_1.default,
                join: {
                    from: `${this.tableName}.id`,
                    to: `${ProductMenu_1.default.tableName}.productId`,
                },
            },
            screen_master: {
                relation: mixins_1.Model.HasManyRelation,
                modelClass: ScreenMaster_1.default,
                join: {
                    from: `${this.tableName}.id`,
                    to: `${ScreenMaster_1.default.tableName}.productId`,
                },
            },
            users: {
                relation: mixins_1.Model.HasManyRelation,
                modelClass: AppUsers_1.default,
                join: {
                    from: [`${this.tableName}.createdBy`, `${this.tableName}.updatedBy`],
                    to: `${AppUsers_1.default.tableName}.id`,
                },
            }
        };
    }
};
Product = __decorate([
    (0, mixins_1.BaseModel)()
], Product);
exports.default = Product;
//# sourceMappingURL=Product.js.map