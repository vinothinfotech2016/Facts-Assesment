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
// import { PROD_ROLES } from "../../constants";
const repo_1 = __importDefault(require("./repo"));
class Service {
}
exports.default = Service;
_a = Service;
Service.createAppUser = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield repo_1.default.createAppUser(data); });
Service.getAppUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield repo_1.default.getAppUsers(); });
Service.userLogin = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield repo_1.default.userLogin(data); });
Service.updateUser = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield repo_1.default.checkUserExistence(userId);
    if (user.email !== data.email) {
        return {
            error: true,
            errorText: "EmailId already verified. Cannot change emailId",
        };
    }
    // if (user.mobileNo !== data.mobileNo) {
    //   if (user.mobileVerified)
    //     return {
    //       error: true,
    //       errorText: "MobileNo already verified. Cannot change mobileNo",
    //     };
    // }
    return yield repo_1.default.updateUser(data, userId);
});
//# sourceMappingURL=service.js.map