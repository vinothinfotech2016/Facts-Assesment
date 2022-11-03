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
const Product_1 = __importDefault(require("../../models/Product"));
const Users_1 = __importDefault(require("../../models/Users"));
// import {
//   SEARCH_FIELDS,
//   SAFE_UPSERT_OPTIONS,
//   PROD_ROLES,
// } from "../../constants";
// import fetchTableList from "../../utils/listing-helper";
// import RefreshToken from "../../models/RefreshToken";
// import jwt from "jsonwebtoken";
// import { JWT_TOKEN_SCERET, REFRESH_TOKEN_SCERET } from "../../constants";
// import moment from "moment";
// import knex from "../../knex";
// import User from "../../models/User";
// import MailService from "../../services/emailService";
// import * as contents from "../../templates/contents";
// import RoleAccess from "../../models/RoleAccess";
// import Employee from "../../models/Employee";
// import UserEmployee from "../../models/UserEmployee";
// import UserRole from "../../models/UserRole";
// import Role from "../../models/Role";
class Repo {
}
exports.default = Repo;
_a = Repo;
Repo.createCustomer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailExistence = yield Users_1.default.query()
            .where({ email: data.email });
        const mobileExistence = yield Users_1.default.query()
            .where({ mobileNumber: data.mobileNumber });
        if (emailExistence.length || mobileExistence.length) {
            return {
                error: true,
                errorText: `${mobileExistence.length ? "Mobile," : ""}${emailExistence.length ? "EmailId" : ""} already exists`,
            };
        }
        data.products = JSON.stringify(data.products);
        return yield Users_1.default.query().insert(data);
    }
    catch (error) {
        throw error;
    }
});
Repo.getProductsById = (products, productIds) => {
    const parsedProductIds = JSON.parse(productIds) || [];
    let matchedProducts = [];
    products.forEach((currProduct, productIndex, allPrds) => {
        if (currProduct === null || currProduct === void 0 ? void 0 : currProduct.id) {
            if (parsedProductIds.includes(currProduct === null || currProduct === void 0 ? void 0 : currProduct.id)) {
                matchedProducts = [...matchedProducts, currProduct];
            }
        }
    });
    return matchedProducts;
};
Repo.getCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCustomers = yield Users_1.default.query();
        const allProducts = yield Product_1.default.query();
        const updateCustomers = allCustomers.map((userData) => {
            return Object.assign(Object.assign({}, userData), { products: Repo.getProductsById(allProducts, userData.products) });
        });
        return updateCustomers;
    }
    catch (error) {
        throw error;
    }
});
Repo.updateCustomer = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    data.products = JSON.stringify(data.products);
    yield Users_1.default.query().updateAndFetchById(id, data);
});
Repo.customerLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const where = data.email
            ? { email: data.email }
            : { mobileNumber: data.mobileNumber };
        const user = yield Repo.checkUserExistence(where);
        if (!user) {
            return {
                error: true,
                errorText: "Invalid email address/mobile number",
            };
        }
        const passwordValid = yield user.verifyPassword(data.password, user.password);
        if (!passwordValid) {
            return { error: true, errorText: "Wrong password" };
        }
        return Object.assign({}, user);
    }
    catch (error) {
        throw error;
    }
});
Repo.checkUserExistence = (where) => __awaiter(void 0, void 0, void 0, function* () { return yield Users_1.default.query().findOne(where); });
//# sourceMappingURL=repo.js.map