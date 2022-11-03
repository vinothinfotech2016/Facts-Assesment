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
const AppUsers_1 = __importDefault(require("../../models/AppUsers"));
const AppRoles_1 = __importDefault(require("../../models/AppRoles"));
class Repo {
}
exports.default = Repo;
_a = Repo;
Repo.createAppUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailExistence = yield AppUsers_1.default.query()
            .where({ email: data.email });
        const mobileExistence = yield AppUsers_1.default.query()
            .where({ mobileNumber: data.mobileNumber });
        // .whereNot({ mobileNumber: data.mobileNumber });
        if (emailExistence.length || mobileExistence.length) {
            return {
                error: true,
                errorText: `${mobileExistence.length ? "Mobile," : ""}${emailExistence.length ? "EmailId" : ""} already exists`,
            };
        }
        data.productIds = JSON.stringify(data.productIds);
        return yield AppUsers_1.default.query().insert(data);
    }
    catch (error) {
        throw error;
    }
});
Repo.getProductsById = (products, productIds) => {
    const parsedProductIds = JSON.parse(productIds);
    let matchedProducts = [];
    products.forEach((currProduct, productIndex, allPrds) => {
        if (parsedProductIds === null || parsedProductIds === void 0 ? void 0 : parsedProductIds.includes(currProduct.id)) {
            matchedProducts = [...matchedProducts, currProduct];
        }
    });
    return matchedProducts;
};
Repo.getAppUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield AppUsers_1.default.query();
        // const allProducts = await Product.query();
        // const updateProducts = allUsers.map((userData: any) => {
        //   return {
        //     ...userData,
        //     products: Repo.getProductsById(allProducts, userData.productIds),
        //   };
        // });
        return allUsers;
    }
    catch (error) {
        throw error;
    }
});
Repo.updateUser = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    data.productIds = JSON.stringify(data.productIds);
    return yield AppUsers_1.default.query().updateAndFetchById(id, data);
});
Repo.userLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const where = data.email
            ? { email: data.email }
            : { mobileNumber: data.mobileNumber };
        const user = yield Repo.checkAuthorizedUser(where);
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
        const userRole = yield AppRoles_1.default.query().findById(user === null || user === void 0 ? void 0 : user.roleId);
        const { accessMenus, role } = userRole;
        return Object.assign(Object.assign({}, user), { accessMenus, role });
    }
    catch (error) {
        throw error;
    }
});
Repo.checkAuthorizedUser = (userCredential) => __awaiter(void 0, void 0, void 0, function* () { return yield AppUsers_1.default.query().findOne(userCredential); });
Repo.checkUserExistence = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield AppUsers_1.default.query().findById(userId); });
//# sourceMappingURL=repo.js.map