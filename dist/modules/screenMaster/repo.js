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
const knex_1 = __importDefault(require("../../knex"));
const fileService_1 = __importDefault(require("../../services/fileService"));
const ScreenMaster_1 = __importDefault(require("../../models/ScreenMaster"));
const service_1 = __importDefault(require("../product/service"));
const CommentsReply_1 = __importDefault(require("../../models/CommentsReply"));
const AppUsers_1 = __importDefault(require("../../models/AppUsers"));
const Product_1 = __importDefault(require("../../models/Product"));
class Repo {
}
exports.default = Repo;
_a = Repo;
Repo.createScreen = (data, params, files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkExistence = yield ScreenMaster_1.default.query().findOne({
            screenName: data.screenName.trim(),
            productId: data.productId.trim(),
        });
        if (checkExistence) {
            return {
                error: true,
                errorText: "Screen already exists",
            };
        }
        if (files)
            yield Repo.fileUpload(data, files);
        const createdData = yield knex_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () { return yield ScreenMaster_1.default.query(trx).insert(data); }));
        return createdData;
    }
    catch (error) {
        throw error;
    }
});
Repo.postComments = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdData = yield knex_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () { return yield CommentsReply_1.default.query(trx).insert(data); }));
        return createdData;
    }
    catch (error) {
        throw error;
    }
});
Repo.getComments = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield AppUsers_1.default.query().findById(userId);
        let screens = yield ScreenMaster_1.default.query().whereIn("productId", JSON.parse(user.productIds));
        if (screens)
            screens = yield Promise.all(screens.map((screenObj) => __awaiter(void 0, void 0, void 0, function* () {
                const product = yield Product_1.default.query().findById(screenObj.productId);
                return Object.assign(Object.assign({}, screenObj), { productName: product.name });
            })));
        return screens;
    }
    catch (error) {
        throw error;
    }
});
Repo.getScreenComments = (screenId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield CommentsReply_1.default.query().where("screenId", screenId);
        return comments;
    }
    catch (error) {
        throw error;
    }
});
Repo.createScreenFlow = (screenId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedScreens = yield ScreenMaster_1.default.query()
            .update({ actionItems: JSON.stringify(data) })
            .where("id", screenId);
        if (updatedScreens)
            return { message: "action items created successfully" };
        if (!updatedScreens) {
            return {
                errorText: "action items are not created",
            };
        }
        return updatedScreens;
    }
    catch (error) {
        throw error;
    }
});
Repo.updateScreenFlow = (id, data, files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingData = yield ScreenMaster_1.default.query().findOne({
            id: id,
        });
        if (files) {
            if (files.screenImageUrl) {
                yield Repo.deleteExistingFile(existingData.screenImageUrl);
            }
            yield Repo.fileUpload(data, files);
        }
        if (!(files === null || files === void 0 ? void 0 : files.screenImageUrl))
            data.screenImageUrl = existingData === null || existingData === void 0 ? void 0 : existingData.screenImageUrl;
        const updatedData = yield ScreenMaster_1.default.query().updateAndFetchById(id, data);
        if (!updatedData) {
            return {
                error: true,
                errorText: "Screen not updated",
            };
        }
        return updatedData;
    }
    catch (error) {
        throw error;
    }
});
Repo.deleteExistingFile = (fileUrl) => __awaiter(void 0, void 0, void 0, function* () {
    yield fileService_1.default.S3FileDelete(fileUrl);
});
Repo.fileUpload = (data, files) => __awaiter(void 0, void 0, void 0, function* () {
    const imgExtension = (imgName) => imgName.split(".")[imgName.split(".").length - 1];
    const screenName = data.screenName.split(" ").join("-");
    if (files.screenImageUrl) {
        const picturePath = `Screen/${screenName}-screen/`;
        const upload = yield fileService_1.default.S3FileUpload(files.screenImageUrl.data, `${screenName}-screen.${imgExtension(files.screenImageUrl.name)}`, picturePath);
        data.screenImageUrl =
            picturePath +
                `${screenName}-screen.${imgExtension(files.screenImageUrl.name)}`;
    }
    return data;
});
// getAll products
Repo.getScreensByProduct = (productIds) => __awaiter(void 0, void 0, void 0, function* () {
    const isArrOfIds = Array.isArray(productIds);
    try {
        const screens = yield ScreenMaster_1.default.query().whereIn("productId", isArrOfIds ? productIds.map((product) => product.id) : [productIds]);
        if (screens) {
            if (screens === null || screens === void 0 ? void 0 : screens.length) {
                return screens.map((screen) => {
                    return Object.assign(Object.assign({}, screen), { screenImageUrl: fileService_1.default.S3FileRead(screen.screenImageUrl) });
                });
            }
            return screens;
        }
        else {
            return {
                error: "Screens does not exist",
            };
        }
    }
    catch (err) {
        throw err;
    }
});
Repo.getScreensByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productIds = yield service_1.default.getProductById(userId);
        return Repo.getScreensByProduct(productIds);
    }
    catch (error) {
        throw error;
    }
});
Repo.getScreen = (screenId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const screen = yield ScreenMaster_1.default.query().findById(screenId);
        if (screen) {
            screen.screenImageUrl = fileService_1.default.S3FileRead(screen.screenImageUrl);
            return screen;
        }
        else {
            return {
                error: true,
                errorText: "screen not found"
            };
        }
        // if (screen.actionItems)
        //   screen.actionItems = await Promise.all(
        //     JSON.parse(screen.actionItems).map(async (scales: any) => {
        //       let targetScreen : any = await ScreenMaster.query().findById(
        //         scales.data.targetId
        //       );
        //       targetScreen.screenImageUrl = FileService.S3FileRead(targetScreen.screenImageUrl)
        //       return {
        //         ...scales,
        //         targetScreen,
        //       };
        //     })
        //   );
    }
    catch (error) {
        throw error;
    }
});
//# sourceMappingURL=repo.js.map