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
const LevelTwoMenu_1 = __importDefault(require("./LevelTwoMenu"));
const MenuFlow_1 = __importDefault(require("./MenuFlow"));
let LevelOneMenu = class LevelOneMenu extends mixins_1.Model {
    static get tableName() {
        return "level_one_menu";
    }
    static get jsonSchema() {
        return {
            type: "object",
            properties: Object.assign(Object.assign({}, constants_1.BASE_FIELDS), { id: constants_1.TYPES.ID, name: constants_1.TYPES.STRING, orderNo: constants_1.TYPES.INTEGER, menuId: constants_1.TYPES.ID, createdAt: constants_1.TYPES.INTEGER, updatedAt: constants_1.TYPES.INTEGER }),
        };
    }
    static get relationMappings() {
        return {
            level_two_menu: {
                relation: mixins_1.Model.HasManyRelation,
                modelClass: LevelTwoMenu_1.default,
                join: {
                    from: `${this.tableName}.id`,
                    to: `${LevelTwoMenu_1.default.tableName}.levelOneId`,
                },
            },
            menu_flow: {
                relation: mixins_1.Model.HasManyRelation,
                modelClass: MenuFlow_1.default,
                join: {
                    from: `${this.tableName}.id`,
                    to: `${MenuFlow_1.default.tableName}.levelOneId`,
                },
            },
            product_menu: {
                relation: mixins_1.Model.HasManyRelation,
                modelClass: ProductMenu_1.default,
                join: {
                    from: `${this.tableName}.menuId`,
                    to: `${ProductMenu_1.default.tableName}.id`,
                },
            },
        };
    }
};
LevelOneMenu = __decorate([
    (0, mixins_1.BaseModel)()
], LevelOneMenu);
exports.default = LevelOneMenu;
//# sourceMappingURL=LevelOneMenu.js.map