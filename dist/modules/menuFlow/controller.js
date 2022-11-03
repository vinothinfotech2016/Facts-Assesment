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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMenuFlow = exports.getMenuFlowByUser = exports.getMenuFlowByProduct = exports.getScreenByMenu = exports.createMenuFlow = void 0;
const service_1 = __importDefault(require("./service"));
/**
 * @api {post} /createUser Create User
 * @apiName createUser
 * @apiExample {curl} Example usage:
 *      **** // Update curl here // ****
 * @apiGroup User
 * @apiHeader {string} Authorization authorization token
 * @apiBody {string} roleId Role
 * @apiBody {string} name User name
 * @apiBody {string} emailId User email
 * @apiBody {string} mobileNo User mobile
 * @apiError {string)} roleId Role is mandatory
 * @apiError {string)} name User name is mandatory and should be a string
 * @apiError {string)} emailId Emailid is mandatory
 * @apiError {string)} mobileNo Mobile no is mandatory
 * @apiSuccess {object} user User created successfully
 *
 */
const createMenuFlow = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield handler.getBody();
        const res = yield service_1.default.createMenuFlow(data);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.createMenuFlow = createMenuFlow;
const getScreenByMenu = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuId = yield handler.getRequestParameterAsString("menuId");
        const res = yield service_1.default.getScreenByMenu(menuId);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.getScreenByMenu = getScreenByMenu;
const getMenuFlowByProduct = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = yield handler.getRequestParameterAsString("productId");
        const res = yield service_1.default.getMenuFlowByProduct(productId);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.getMenuFlowByProduct = getMenuFlowByProduct;
const getMenuFlowByUser = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield handler.getRequestParameterAsString("userId");
        const res = yield service_1.default.getMenuFlowByUser(userId);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.getMenuFlowByUser = getMenuFlowByUser;
const updateMenuFlow = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flowId = yield handler.getRequestParameterAsString("flowId");
        const data = yield handler.getBody();
        const res = yield service_1.default.updateMenuFlow(flowId, data);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.updateMenuFlow = updateMenuFlow;
//# sourceMappingURL=controller.js.map