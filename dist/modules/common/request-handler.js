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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.handle = exports.RequestHandler = void 0;
const _ = __importStar(require("lodash"));
// import Users from "../users/models/User";
class RequestHandler {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
    getBody() {
        return this.request.body;
    }
    getRequest() {
        return this.request;
    }
    getFiles() {
        return this.request.files;
    }
    getResponse() {
        return this.response;
    }
    getQueryParameter(key) {
        return this.request.query[key];
    }
    getQueryParameters() {
        return this.request.query;
    }
    getAllRequestParameters() {
        return Object.assign(Object.assign({}, this.request.query), this.request.params);
    }
    getRequestParameterAsString(key) {
        return this.request.params[key];
    }
    getRequestParameterAsNumber(key) {
        const value = parseInt(this.request.params[key]);
        return _.isNaN(value) ? undefined : value;
    }
    getRequestParameterAsBoolean(key) {
        return this.request.params[key] === "true" ? true : false;
    }
    getRequestQueryParameter(key) {
        return this.request.query[key];
    }
    validate(field, message) {
        return this.request.assert(field, message);
    }
    performValidation() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.request.getValidationResult();
            if (!result.isEmpty()) {
                this.sendValidationError({ message: result.array()[0].msg });
                return false;
            }
            return true;
        });
    }
    sendResponse(data) {
        return this.response.status(200).send(data);
    }
    sendNotFoundResponse(data) {
        return this.response.status(404).send(data);
    }
    sendCreatedResponse(data) {
        return this.response.status(201).send(data);
    }
    sendValidationError(error) {
        return this.response.status(400).send({ error });
    }
    sendServerError(error) {
        console.log(error);
        return this.response.status(500).send({ error });
    }
    handleCreatedResponse(data) {
        if (data.error === undefined)
            return this.sendResponse(data);
        if (data.error)
            return this.sendValidationError(data.errorText);
        else
            return this.sendCreatedResponse(data.values);
    }
    handleResponse(data) {
        if (data.error === undefined)
            return this.sendResponse(data);
        if (data.error)
            return this.sendValidationError(data.errorText);
        else
            return this.sendResponse(data.values);
    }
    handleFileResponse(data) {
        if (data.error === undefined)
            return this.sendResponse(data);
        if (data.error)
            return this.sendValidationError(data.errorText);
        this.response.header("Content-Type", "text/csv");
        this.response.attachment(process.env.FILE_NAME_FOR_DOWNLOAD);
        return this.response.send(data.values);
    }
}
exports.RequestHandler = RequestHandler;
function handle(method) {
    return (request, response, next) => {
        method(new RequestHandler(request, response), next);
    };
}
exports.handle = handle;
function authenticate(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authTokenString = (request.headers["authorization"] || "").toString();
        if (!authTokenString)
            return response.send(401).end();
        const authToken = authTokenString.split("Bearer ")[1];
        // const user: any = await Users.findOne({ where: { authToken } });
        // if (!user) return response.sendStatus(401).end();
        // request.params.authId = user.id;
        // request.params.authUserTypeId = user.userTypeId;
        next();
    });
}
exports.authenticate = authenticate;
// // Check for Permission
// export function checkPermission(permissionId: number) {
//   return async (request: Request, response: Response, next: (error?: any) => void) => {
//     try {
//       if ([ROLES.SUPER_ADMIN, ROLES.REGIONAL_ADMIN, ROLES.CS_ADMIN].includes(parseInt(request.params.authRoleId))) {
//         const user = await checkUserPermission(permissionId, request.params.authUserId);
//         if (!user) return response.send(403).end();
//       }
//       next();
//     }
//     catch (error) {
//       next(error);
//     }
//   };
// }
// // User Permission check
// export async function checkUserPermission(permissionId: number, authUserId: string) {
//   const user: any = await UserPermission.findOne({
//     where: { userId: authUserId, permissionId }
//   });
//   return user;
// }
//# sourceMappingURL=request-handler.js.map