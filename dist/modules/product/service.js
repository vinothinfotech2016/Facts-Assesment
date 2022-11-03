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
const utils_1 = require("../../utils");
const repo_1 = __importDefault(require("./repo"));
class Service {
}
exports.default = Service;
_a = Service;
Service.createProduct = (data, params, files) => __awaiter(void 0, void 0, void 0, function* () {
    data = yield (0, utils_1.parseFormJsonObjects)(data);
    return yield repo_1.default.createProduct(data, params, files);
});
Service.updateProduct = (id, data, params, files) => __awaiter(void 0, void 0, void 0, function* () {
    data = yield (0, utils_1.parseFormJsonObjects)(data);
    return yield repo_1.default.updateProduct(id, data, params, files);
});
Service.getProductById = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repo_1.default.getProductById(userId); });
//# sourceMappingURL=service.js.map