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
const ScreenMaster_1 = __importDefault(require("./ScreenMaster"));
let CommentsReply = class CommentsReply extends mixins_1.Model {
    static get tableName() {
        return "comments_reply";
    }
    static get jsonSchema() {
        return {
            type: "object",
            properties: Object.assign(Object.assign({}, constants_1.BASE_FIELDS), { id: constants_1.TYPES.ID, screenId: constants_1.TYPES.ID, comments: constants_1.TYPES.TEXT, reply: constants_1.TYPES.TEXT, commentBy: constants_1.TYPES.STRING, repliedBy: constants_1.TYPES.STRING, createdAt: constants_1.TYPES.INTEGER, updatedAt: constants_1.TYPES.INTEGER }),
        };
    }
    static get relationMappings() {
        return {
            screen_master: {
                relation: mixins_1.Model.HasManyRelation,
                modelClass: Product_1.default,
                join: {
                    from: `${this.tableName}.screenId`,
                    to: `${ScreenMaster_1.default.tableName}.id`,
                },
            }
        };
    }
};
CommentsReply = __decorate([
    (0, mixins_1.BaseModel)()
], CommentsReply);
exports.default = CommentsReply;
//# sourceMappingURL=CommentsReply.js.map