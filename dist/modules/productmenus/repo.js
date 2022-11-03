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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ProductMenu_1 = __importDefault(require("../../models/ProductMenu"));
const knex_1 = __importDefault(require("../../knex"));
const variable_1 = require("../../constants/variable");
class Repo {
}
exports.default = Repo;
_a = Repo;
Repo.createMenu = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkExistence = yield ProductMenu_1.default.query().findOne({
            name: data.name.trim(),
            productId: data.productId.trim()
        });
        const checkOrderExistence = yield ProductMenu_1.default.query().findOne({
            orderNo: data.orderNo,
            productId: data.productId.trim()
        });
        if (checkExistence) {
            return {
                error: true,
                errorText: "Product Menu already exists",
            };
        }
        if (checkOrderExistence) {
            return {
                error: true,
                errorText: "Menu order already exists",
            };
        }
        const createdData = yield knex_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () { return yield ProductMenu_1.default.query(trx).insertGraph(data, variable_1.SAFE_UPSERT_OPTIONS); }));
        return createdData;
    }
    catch (error) {
        throw error;
    }
});
Repo.updateMenu = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedData = yield ProductMenu_1.default.query().upsertGraph(data);
        if (!updatedData) {
            return {
                error: "Menu updation failed"
            };
        }
        return updatedData;
    }
    catch (error) {
        throw error;
    }
});
// getAll products
Repo.getMenuByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let productMenus;
        if (productId === "all") {
            productMenus = ProductMenu_1.default.query().withGraphFetched({ level_one_menu: { level_two_menu: true } });
        }
        else {
            productMenus = yield ProductMenu_1.default.query().where("productId", productId).withGraphFetched({ level_one_menu: { level_two_menu: true } });
        }
        if (productMenus) {
            return productMenus;
        }
        else {
            return {
                error: "Menus does not exist"
            };
        }
    }
    catch (error) {
        throw error;
    }
});
//# sourceMappingURL=repo.js.map