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
const Product_1 = __importDefault(require("./Product"));
const LevelOneMenu_1 = __importDefault(require("./LevelOneMenu"));
const AppUsers_1 = __importDefault(require("./AppUsers"));
let ProductMenu = class ProductMenu extends mixins_1.Model {
    static get tableName() {
        return "product_menu";
    }
    static get jsonSchema() {
        return {
            type: "object",
            properties: Object.assign(Object.assign({}, constants_1.BASE_FIELDS), { id: constants_1.TYPES.ID, productId: constants_1.TYPES.ID, name: constants_1.TYPES.STRING, orderNo: constants_1.TYPES.INTEGER, effectiveDate: constants_1.TYPES.STRING, subMenus: constants_1.TYPES.TEXT, displayType: constants_1.TYPES.STRING, menuParams: constants_1.TYPES.STRING, status: constants_1.TYPES.STRING, inActiveReason: constants_1.TYPES.TEXT, createdAt: constants_1.TYPES.INTEGER, updatedAt: constants_1.TYPES.INTEGER, createdBy: constants_1.TYPES.ID, updatedBy: constants_1.TYPES.ID }),
        };
    }
    static get relationMappings() {
        return {
            product: {
                relation: mixins_1.Model.BelongsToOneRelation,
                modelClass: Product_1.default,
                join: {
                    from: `${this.tableName}.productId`,
                    to: `${Product_1.default.tableName}.id`,
                },
            },
            level_one_menu: {
                relation: mixins_1.Model.HasManyRelation,
                modelClass: LevelOneMenu_1.default,
                join: {
                    from: `${this.tableName}.id`,
                    to: `${LevelOneMenu_1.default.tableName}.menuId`,
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
ProductMenu = __decorate([
    (0, mixins_1.BaseModel)()
], ProductMenu);
exports.default = ProductMenu;
//# sourceMappingURL=ProductMenu.js.map