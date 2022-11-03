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
const AppRoles_1 = __importDefault(require("../../models/AppRoles"));
const knex_1 = __importDefault(require("../../knex"));
const variable_1 = require("../../constants/variable");
class Repo {
}
exports.default = Repo;
_a = Repo;
Repo.createRoles = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkExistence = yield AppRoles_1.default.query().findOne({
            role: data.role.trim(),
        });
        if (checkExistence) {
            return {
                error: true,
                errorText: "Role already exists",
            };
        }
        data.accessMenus = JSON.stringify(data.accessMenus);
        const createdData = yield knex_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () { return yield AppRoles_1.default.query(trx).upsertGraphAndFetch(data, variable_1.SAFE_UPSERT_OPTIONS); }));
        return createdData;
    }
    catch (error) {
        throw error;
    }
});
Repo.getAllroles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const emailExistence = await Users.query()
        //   .where({ email: data.email })
        //   .whereNot({ mobileNumber: data.mobileNumber });
        // if (emailExistence.length) {
        //   return {
        //     error: true,
        //     errorText: "EmailId already exists and mapped to another mobile",
        //   };
        // }
        return yield AppRoles_1.default.query();
    }
    catch (error) {
        throw error;
    }
});
//# sourceMappingURL=repo.js.map