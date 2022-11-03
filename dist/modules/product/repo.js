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
const fileService_1 = __importDefault(require("../../services/fileService"));
const Product_1 = __importDefault(require("../../models/Product"));
const AppUsers_1 = __importDefault(require("../../models/AppUsers"));
class Repo {
}
exports.default = Repo;
_a = Repo;
Repo.createProduct = (data, params, files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkExistence = yield Product_1.default.query().findOne({
            name: data.name.trim(),
        });
        if (checkExistence) {
            return {
                erusersror: true,
                errorText: "Product already exists",
            };
        }
        if (files)
            yield Repo.fileUpload(data, files);
        data.status = "Active";
        const createdData = yield Product_1.default.query().insert(data);
        return createdData;
    }
    catch (error) {
        throw error;
    }
});
Repo.updateProduct = (id, data, params, files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingData = yield Product_1.default.query().findOne({
            id: id,
        });
        if (files) {
            if (files.leftLogoUrl) {
                yield Repo.deleteExistingFile(existingData.leftLogoUrl);
            }
            if (files.rightLogoUrl) {
                yield Repo.deleteExistingFile(existingData.rightLogoUrl);
            }
            if (files.centerLogoUrl) {
                yield Repo.deleteExistingFile(existingData.centerLogoUrl);
            }
            yield Repo.fileUpload(data, files);
        }
        if (!(files === null || files === void 0 ? void 0 : files.leftLogoUrl))
            data.leftLogoUrl = existingData === null || existingData === void 0 ? void 0 : existingData.leftLogoUrl;
        if (!(files === null || files === void 0 ? void 0 : files.rightLogoUrl))
            data.rightLogoUrl = existingData === null || existingData === void 0 ? void 0 : existingData.rightLogoUrl;
        if (!(files === null || files === void 0 ? void 0 : files.centerLogoUrl))
            data.centerLogoUrl = existingData === null || existingData === void 0 ? void 0 : existingData.centerLogoUrl;
        const updatedData = yield Product_1.default.query().updateAndFetchById(id, data);
        return updatedData;
    }
    catch (error) {
        throw error;
    }
});
Repo.deleteExistingFile = (fileUrl) => __awaiter(void 0, void 0, void 0, function* () {
    yield fileService_1.default.S3FileDelete(fileUrl);
    // const splitUrl: any = fileUrl.split(/(?:.com|-picture)+/);
    //  await FileService.S3FileDelete(splitUrl[2]?.replace(/\/+$/, ""), splitUrl[1]);
});
Repo.fileUpload = (data, files) => __awaiter(void 0, void 0, void 0, function* () {
    const imgExtension = (imgName) => imgName.split(".")[imgName.split(".").length - 1];
    const productName = data.name.split(" ").join("-");
    if (files.leftLogoUrl) {
        const picturePath = `Product/${productName}-leftLogo/`;
        const upload = yield fileService_1.default.S3FileUpload(files.leftLogoUrl.data, `${productName}-leftLogo.${imgExtension(files.leftLogoUrl.name)}`, picturePath);
        data.leftLogoUrl = picturePath + `${productName}-leftLogo.${imgExtension(files.leftLogoUrl.name)}`;
    }
    if (files.rightLogoUrl) {
        const picturePath = `Product/${productName}-rightLogo/`;
        const upload = yield fileService_1.default.S3FileUpload(files.rightLogoUrl.data, `${productName}-rightLogo.${imgExtension(files.rightLogoUrl.name)}`, picturePath);
        data.rightLogoUrl = picturePath + `${productName}-rightLogo.${imgExtension(files.rightLogoUrl.name)}`;
    }
    if (files.centerLogoUrl) {
        const picturePath = `Product/${productName}-centerLogo/`;
        const upload = yield fileService_1.default.S3FileUpload(files.centerLogoUrl.data, `${productName}-centerLogo.${imgExtension(files.centerLogoUrl.name)}`, picturePath);
        data.centerLogoUrl = picturePath + `${productName}-centerLogo.${imgExtension(files.centerLogoUrl.name)}`;
    }
    return data;
});
// getAll products
Repo.getProductById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    let products = [];
    try {
        const users = yield AppUsers_1.default.query().select("app_users.*", "app_roles.role")
            .join("app_roles", "app_users.roleId", "app_roles.id").where("app_users.id", userId);
        const userRole = (_b = users[0]) === null || _b === void 0 ? void 0 : _b.role;
        const productIds = (_c = users[0]) === null || _c === void 0 ? void 0 : _c.productIds;
        if (userRole === "Admin") {
            products = yield Product_1.default.query();
        }
        else if (productIds) {
            products = yield Product_1.default.query().findByIds(JSON.parse(productIds));
        }
        if (products === null || products === void 0 ? void 0 : products.length) {
            return products.map((product) => {
                return Object.assign(Object.assign({}, product), { leftLogoUrl: fileService_1.default.S3FileRead(product.leftLogoUrl), rightLogoUrl: fileService_1.default.S3FileRead(product.rightLogoUrl), centerLogoUrl: fileService_1.default.S3FileRead(product.centerLogoUrl) });
            });
        }
        else
            return {
                error: true,
                errorText: "Products not found"
            };
    }
    catch (error) {
        throw error;
    }
});
//# sourceMappingURL=repo.js.map