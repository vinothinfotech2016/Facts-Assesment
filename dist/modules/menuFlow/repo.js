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
const MenuFlow_1 = __importDefault(require("../../models/MenuFlow"));
const ScreenMaster_1 = __importDefault(require("../../models/ScreenMaster"));
const service_1 = __importDefault(require("../productmenus/service"));
const AppUsers_1 = __importDefault(require("../../models/AppUsers"));
const ProductMenu_1 = __importDefault(require("../../models/ProductMenu"));
const LevelOneMenu_1 = __importDefault(require("../../models/LevelOneMenu"));
const LevelTwoMenu_1 = __importDefault(require("../../models/LevelTwoMenu"));
const Product_1 = __importDefault(require("../../models/Product"));
class Repo {
}
exports.default = Repo;
_a = Repo;
Repo.createMenuFlow = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let existingFlow = [];
        if (data.menuId && data.levelOneId && data.levelTwoId) {
            existingFlow = yield MenuFlow_1.default.query().findOne({ menuId: data.menuId.trim(), levelOneId: data.levelOneId.trim(), levelTwoId: data.levelTwoId.trim() });
        }
        else if (data.menuId && data.levelOneId) {
            existingFlow = yield MenuFlow_1.default.query().findOne({ menuId: data.menuId.trim(), levelOneId: data.levelOneId.trim() });
        }
        else if (data.menuId) {
            existingFlow = yield MenuFlow_1.default.query().findOne({ menuId: data.menuId.trim() });
        }
        if (existingFlow) {
            return {
                error: true,
                errorText: "Flow already exist"
            };
        }
        else {
            const createdFlow = yield MenuFlow_1.default.query().insert(data);
            return createdFlow;
        }
    }
    catch (error) {
        throw error;
    }
});
Repo.updateMenuFlow = (flowId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedFlow = yield MenuFlow_1.default.query().update(data).where("id", flowId);
        if (updatedFlow)
            return { message: "Flow updated sucessfully" };
        else {
            return {
                error: true,
                errorText: "Flow not updated"
            };
        }
    }
    catch (err) {
        throw err;
    }
});
Repo.getMenuFlowByProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menus = yield service_1.default.getMenuByProductId(productId);
        let existingFlows = [];
        if (menus) {
            const menuIds = menus.map((menu) => menu.id);
            console.log(menuIds, "menuIds");
            existingFlows = yield MenuFlow_1.default.query().whereIn("menuId", menuIds);
            return {
                existingFlows,
                menus
            };
        }
        else {
            return {
                error: "Menus does not exist"
            };
        }
    }
    catch (err) {
        throw err;
    }
});
Repo.getMenuFlowByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield AppUsers_1.default.query().findById(userId);
        if (user.productIds) {
            const menuFlows = yield MenuFlow_1.default.query().whereIn("productId", JSON.parse(user.productIds));
            const descriptiveMenuFlow = yield Promise.all(menuFlows.map((flow) => __awaiter(void 0, void 0, void 0, function* () {
                return Object.assign(Object.assign({}, flow), { menu: yield ProductMenu_1.default.query().findById(flow.menuId).select("id", "name"), levelOneMenu: yield LevelOneMenu_1.default.query().findById(flow.levelOneId).select("id", "name"), levelTwoMenu: yield LevelTwoMenu_1.default.query().findById(flow.levelTwoId).select("id", "name"), screen: yield ScreenMaster_1.default.query().findById(flow.screenId), product: yield Product_1.default.query().findById(flow.productId).select("id", "name") });
            })));
            if (menuFlows)
                return descriptiveMenuFlow;
        }
        else {
            return {
                error: true,
                errorText: "menu flow not created"
            };
        }
    }
    catch (err) {
        throw err;
    }
});
Repo.getScreenByMenu = (menuId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const menuFlow = yield MenuFlow_1.default.query().where("menuId", menuId);
        if (menuFlow === null || menuFlow === void 0 ? void 0 : menuFlow.length) {
            const screenId = (_b = menuFlow[0]) === null || _b === void 0 ? void 0 : _b.screenId;
            const targetScreen = yield ScreenMaster_1.default.query().findById(screenId);
            if (targetScreen) {
                return targetScreen;
            }
            else {
                return {
                    error: true,
                    errorText: "Menus does not exist"
                };
            }
        }
        if (!menuFlow.length) {
            return {
                error: true,
                errorText: "Menu does not exist"
            };
        }
    }
    catch (error) {
        throw error;
    }
});
//# sourceMappingURL=repo.js.map