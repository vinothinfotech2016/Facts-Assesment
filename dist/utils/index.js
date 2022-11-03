"use strict";
// const otpGenerator = require("otp-generator");
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
exports.splitUrl = exports.parseFormJsonObjects = void 0;
const fileService_1 = __importDefault(require("../services/fileService"));
// import * as bcrypt from "bcrypt";
const saltRounds = 10;
const bcrypt = require("bcrypt");
const parseFormJsonObjects = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(Object.keys(data).map((key) => {
        if (data[key] === "null")
            data[key] = undefined;
        else {
            const values = data[key].toString().trim();
            if (values.startsWith("[") ||
                values.startsWith("{") ||
                values.toLowerCase() === "true" ||
                values.toLowerCase() === "false")
                try {
                    data[key] = JSON.parse(data[key]);
                }
                catch (error) {
                    data[key] = data[key];
                }
        }
    }));
    return data;
});
exports.parseFormJsonObjects = parseFormJsonObjects;
const splitUrl = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const splitPaths = path.split(/(?:-picture)+/);
    // const logoUrl: any = await FileService.S3FileRead(splitPaths[0] + "-picture", splitPaths[1].replace(/\/+$/, ""));
    const logoUrl = yield fileService_1.default.S3FileRead(splitPaths[0] + "-picture");
    return logoUrl;
});
exports.splitUrl = splitUrl;
// export const generateOTP = () =>
//   otpGenerator.generate(6, {
//     digits: true,
//     alphabets: false,
//     upperCase: false,
//     specialChars: false,
//   });
// For generate hash from password
// export const generatehash = (password: string) => {
//   const res = new Promise((accept, reject) => {
//     bcrypt.hash(password, saltRounds, function (err: any, hash: any) {
//       if (err) reject(err);
//       else accept({ hash });
//     });
//   });
//   return res;
// };
// // For Verifying Password with hash
// export async function verifyPassword(password: string, hashAlready: any) {
//   return new Promise((accept, reject) => {
//     bcrypt.compare(password, hashAlready, function (err: any, result: any) {
//       if (err) reject(err);
//       else accept(result);
//     });
//   });
// }
//# sourceMappingURL=index.js.map