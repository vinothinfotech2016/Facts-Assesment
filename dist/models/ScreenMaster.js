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
const MenuFlow_1 = __importDefault(require("./MenuFlow"));
const AppUsers_1 = __importDefault(require("./AppUsers"));
let ScreenMaster = class ScreenMaster extends mixins_1.Model {
    static get tableName() {
        return "screen_master";
    }
    static get jsonSchema() {
        return {
            type: "object",
            properties: Object.assign(Object.assign({}, constants_1.BASE_FIELDS), { id: constants_1.TYPES.ID, productId: constants_1.TYPES.ID, screenNumber: constants_1.TYPES.STRING, screenName: constants_1.TYPES.TEXT, screenDescription: constants_1.TYPES.TEXT, screenTypeId: constants_1.TYPES.ID, screenComplexityId: constants_1.TYPES.ID, screenImageUrl: constants_1.TYPES.TEXT, developerNotes: constants_1.TYPES.TEXT, status: constants_1.TYPES.STRING, effectiveDate: constants_1.TYPES.STRING, inActiveReason: constants_1.TYPES.TEXT, actionItems: constants_1.TYPES.TEXT, createdAt: constants_1.TYPES.INTEGER, updatedAt: constants_1.TYPES.INTEGER, createdBy: constants_1.TYPES.ID, updatedBy: constants_1.TYPES.ID }),
        };
    }
    static get relationMappings() {
        return {
            product: {
                relation: mixins_1.Model.HasManyRelation,
                modelClass: Product_1.default,
                join: {
                    from: `${this.tableName}.productId`,
                    to: `${Product_1.default.tableName}.id`,
                },
            },
            menu_flow: {
                relation: mixins_1.Model.HasManyRelation,
                modelClass: MenuFlow_1.default,
                join: {
                    from: `${this.tableName}.id`,
                    to: `${MenuFlow_1.default.tableName}.screenId`,
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
ScreenMaster = __decorate([
    (0, mixins_1.BaseModel)()
], ScreenMaster);
exports.default = ScreenMaster;
//# sourceMappingURL=ScreenMaster.js.map