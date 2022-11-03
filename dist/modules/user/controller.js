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
exports.updateCustomer = exports.customerLogin = exports.getCustomers = exports.createCustomer = void 0;
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
const createCustomer = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield handler.getBody();
        const res = yield service_1.default.createCustomer(data);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.createCustomer = createCustomer;
const getCustomers = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield service_1.default.getCustomers();
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.getCustomers = getCustomers;
/**
 * @api {post} /userLogin Verify user with emailId
 * @apiName userLogin
 * @apiExample {curl} Example usage:
 *      **** // Update curl here // ****
 * @apiGroup User
 * @apiHeader {string} Authorization authorization token
 * @apiBody {string} mobileNo User mobile No
 * @apiBody {string} emailId User email
 * @apiSuccess {object} user Verified user record
 */
const customerLogin = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield handler.getBody();
        const res = yield service_1.default.customerLogin(data);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.customerLogin = customerLogin;
const updateCustomer = (handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield handler.getBody();
        const customerId = yield handler.getRequestParameterAsString("customerId");
        const res = yield service_1.default.updateCustomer(data, customerId);
        return handler.handleCreatedResponse(res);
    }
    catch (err) {
        return handler.sendServerError(err);
    }
});
exports.updateCustomer = updateCustomer;
//# sourceMappingURL=controller.js.map