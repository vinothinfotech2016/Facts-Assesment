"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const helper_1 = require("./helper");
function BaseModel() {
    return function (Base) {
        return class extends Base {
            static get useLimitInFirst() {
                return true;
            }
            validateFields() {
                return __awaiter(this, void 0, void 0, function* () {
                    // @ts-ignore
                    (0, helper_1.removeUnwantedFields)(this.constructor.jsonSchema, this);
                });
            }
            $beforeInsert(context) {
                const _super = Object.create(null, {
                    $beforeInsert: { get: () => super.$beforeInsert }
                });
                return __awaiter(this, void 0, void 0, function* () {
                    yield _super.$beforeInsert.call(this, context);
                    this.validateFields();
                    this.id = this.id || (0, uuid_1.v4)();
                    this.createdAt = Date.now() / 100;
                    // this.createdBy = context.userId;
                    this.updatedAt = Date.now() / 100;
                    // this.updatedBy = context.userId;
                });
            }
            $beforeUpdate(opt, context) {
                const _super = Object.create(null, {
                    $beforeUpdate: { get: () => super.$beforeUpdate }
                });
                return __awaiter(this, void 0, void 0, function* () {
                    yield _super.$beforeUpdate.call(this, opt, context);
                    this.validateFields();
                    this.updatedAt = Date.now() / 100;
                    this.updatedBy = context.userId;
                    if (context.softDelete) {
                        // updated soft delete related props
                    }
                    else if (context.undelete) {
                        // updated soft delete related props on undelete action
                    }
                });
            }
        };
    };
}
exports.default = BaseModel;
//# sourceMappingURL=BaseModel.js.map