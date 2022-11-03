import { Request, Response } from "express";
import * as _ from "lodash";
import { ReturnFormat } from "../../interface/ReturnFormat";
// import Users from "../users/models/User";

export class RequestHandler {
  private request: Request;
  private response: Response;

  constructor(request: Request, response: Response) {
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

  getQueryParameter(key: string) {
    return this.request.query[key];
  }

  getQueryParameters() {
    return this.request.query;
  }

  getAllRequestParameters() {
    return { ...this.request.query, ...this.request.params };
  }

  getRequestParameterAsString(key: string) {
    return this.request.params[key];
  }

  getRequestParameterAsNumber(key: string) {
    const value = parseInt(this.request.params[key]);
    return _.isNaN(value) ? undefined : value;
  }

  getRequestParameterAsBoolean(key: string) {
    return this.request.params[key] === "true" ? true : false;
  }
  getRequestQueryParameter(key: string) {
    return this.request.query[key];
  }

  validate(field: string, message: string) {
    return this.request.assert(field, message);
  }

  async performValidation(): Promise<boolean> {
    const result = await this.request.getValidationResult();
    if (!result.isEmpty()) {
      this.sendValidationError({ message: result.array()[0].msg });
      return false;
    }
    return true;
  }

  sendResponse(data?: object) {
    return this.response.status(200).send(data);
  }

  sendNotFoundResponse(data?: object) {
    return this.response.status(404).send(data);
  }

  sendCreatedResponse(data?: object) {
    return this.response.status(201).send(data);
  }

  sendValidationError(error?: any) {
    return this.response.status(400).send({ error });
  }

  sendServerError(error?: any) {
    console.log(error);
    return this.response.status(500).send({ error });
  }

  handleCreatedResponse(data: ReturnFormat) {
    if (data.error === undefined) return this.sendResponse(data);
    if (data.error) return this.sendValidationError(data.errorText);
    else return this.sendCreatedResponse(data.values);
  }

  handleResponse(data: ReturnFormat) {
    if (data.error === undefined) return this.sendResponse(data);
    if (data.error) return this.sendValidationError(data.errorText);
    else return this.sendResponse(data.values);
  }

  handleFileResponse(data: ReturnFormat) {
    if (data.error === undefined) return this.sendResponse(data);
    if (data.error) return this.sendValidationError(data.errorText);
    this.response.header("Content-Type", "text/csv");
    this.response.attachment(process.env.FILE_NAME_FOR_DOWNLOAD);
    return this.response.send(data.values);
  }
}

export function handle(
  method: (handler: RequestHandler, next?: () => void) => void
) {
  return (request: Request, response: Response, next: () => void) => {
    method(new RequestHandler(request, response), next);
  };
}

export async function authenticate(
  request: Request,
  response: Response,
  next: (error?: any) => void
) {
  const authTokenString = (request.headers["authorization"] || "").toString();
  if (!authTokenString) return response.send(401).end();
  const authToken = authTokenString.split("Bearer ")[1];
  // const user: any = await Users.findOne({ where: { authToken } });
  // if (!user) return response.sendStatus(401).end();
  // request.params.authId = user.id;
  // request.params.authUserTypeId = user.userTypeId;
  next();
}

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
