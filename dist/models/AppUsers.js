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
const AppRoles_1 = __importDefault(require("./AppRoles"));
const ProductMenu_1 = __importDefault(require("./ProductMenu"));
let AppUsers = class AppUsers extends mixins_1.Model {
    static get tableName() {
        return "app_users";
    }
    static get jsonSchema() {
        return {
            type: "object",
            properties: Object.assign(Object.assign({}, constants_1.BASE_FIELDS), { id: constants_1.TYPES.ID, name: constants_1.TYPES.STRING, email: constants_1.TYPES.EMAIL, productIds: constants_1.TYPES.TEXT, password: constants_1.TYPES.STRING, mobileNumber: constants_1.TYPES.STRING, roleId: constants_1.TYPES.ID, createdAt: constants_1.TYPES.INTEGER, updatedAt: constants_1.TYPES.INTEGER }),
        };
    }
    static get relationMappings() {
        return {
            role: {
                relation: mixins_1.Model.BelongsToOneRelation,
                modelClass: AppRoles_1.default,
                join: {
                    from: `${this.tableName}.roleId`,
                    to: `${AppRoles_1.default.tableName}.id`,
                },
            },
            menus: {
                relation: mixins_1.Model.HasManyRelation,
                modelClass: ProductMenu_1.default,
                join: {
                    from: `${this.tableName}.id`,
                    to: [
                        "product_menu.createdBy",
                        "product_menu.updatedBy",
                    ],
                },
            },
            // product: {
            //   relation: Model.HasManyRelation,
            //   modelClass: Product,
            //   join: {
            //     from: `${this.tableName}.id`,
            //     to: `${Product.tableName}.createdBy`,
            //   },
            // },
            // productUpdatedBy: {
            //   relation: Model.HasManyRelation,
            //   modelClass: Product,
            //   join: {
            //     from: `${this.tableName}.id`,
            //     to: `${Product.tableName}.updatedBy`,
            //   },
            // },
        };
    }
};
AppUsers = __decorate([
    (0, mixins_1.BaseModel)(),
    (0, mixins_1.Password)({ allowEmptyPassword: false })
], AppUsers);
exports.default = AppUsers;
//# sourceMappingURL=AppUsers.js.map