"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller = __importStar(require("./controller"));
const request_handler_1 = require("../common/request-handler");
function default_1(app) {
    app.post("/createAppUser", (0, request_handler_1.handle)(controller.createAppUser));
    app.put("/updateUser/:userId", (0, request_handler_1.handle)(controller.updateUser));
    app.post("/userLogin", (0, request_handler_1.handle)(controller.userLogin));
    app.get("/getAppUsers", (0, request_handler_1.handle)(controller.getAppUsers));
    // app.post("/refreshToken", handle(controller.refreshToken));
    // app.get("/verifyUserWithEmail/:emailId/:isForgotPassword", handle(controller.verifyUserWithEmail));
    // app.get("/verifyUserWithMobile/:mobileNo", handle(controller.verifyUserWithMobile));
    // app.get("/generateOtp/:emailId", handle(controller.generateOtp));
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map