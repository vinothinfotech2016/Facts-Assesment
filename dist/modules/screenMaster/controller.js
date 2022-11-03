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
exports.updateScreenFlow = exports.createScreenFlow = exports.getScreenComments = exports.getScreensByProduct = exports.getComments = exports.postComments = exports.getScreen = exports.getScreensByUser = exports.createScreen = void 0;
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
const createScreen = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield handler.getBody();
        const files = yield handler.getFiles();
        const params = yield handler.getAllRequestParameters();
        const res = yield service_1.default.createScreen(data, params, files);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.createScreen = createScreen;
const getScreensByUser = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield handler.getRequestParameterAsString("userId");
        const res = yield service_1.default.getScreensByUser(userId);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.getScreensByUser = getScreensByUser;
const getScreen = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const screenId = yield handler.getRequestParameterAsString("screenId");
        const res = yield service_1.default.getScreen(screenId);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.getScreen = getScreen;
const postComments = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield handler.getBody();
        const res = yield service_1.default.postComments(data);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.postComments = postComments;
const getComments = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield handler.getRequestParameterAsString("userId");
        const res = yield service_1.default.getComments(userId);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.getComments = getComments;
const getScreensByProduct = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = yield handler.getRequestParameterAsString("productId");
        const res = yield service_1.default.getScreensByProduct(productId);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.getScreensByProduct = getScreensByProduct;
const getScreenComments = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const screenId = yield handler.getRequestParameterAsString("screenId");
        const res = yield service_1.default.getScreenComments(screenId);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.getScreenComments = getScreenComments;
const createScreenFlow = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const screenId = yield handler.getRequestParameterAsString("screenId");
        const data = yield handler.getBody();
        const res = yield service_1.default.createScreenFlow(screenId, data);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.createScreenFlow = createScreenFlow;
const updateScreenFlow = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const screenId = yield handler.getRequestParameterAsString("screenId");
        const data = yield handler.getBody();
        const files = yield handler.getFiles();
        // const params = await handler.getAllRequestParameters();
        const res = yield service_1.default.updateScreenFlow(screenId, data, files);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.updateScreenFlow = updateScreenFlow;
//# sourceMappingURL=controller.js.map