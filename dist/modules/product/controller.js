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
exports.updateProduct = exports.getProductById = exports.createProduct = void 0;
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
const createProduct = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield handler.getBody();
        const files = yield handler.getFiles();
        const params = yield handler.getAllRequestParameters();
        const res = yield service_1.default.createProduct(data, params, files);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.createProduct = createProduct;
const getProductById = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield handler.getRequestParameterAsString("userId");
        const res = yield service_1.default.getProductById(userId);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.getProductById = getProductById;
const updateProduct = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = yield handler.getRequestParameterAsString("productId");
        const data = yield handler.getBody();
        const files = yield handler.getFiles();
        const params = yield handler.getAllRequestParameters();
        const res = yield service_1.default.updateProduct(productId, data, params, files);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.updateProduct = updateProduct;
//# sourceMappingURL=controller.js.map