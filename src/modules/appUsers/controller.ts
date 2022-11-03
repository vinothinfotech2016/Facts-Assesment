"use strict";
import { RequestHandler } from "../common/request-handler";
import Service from "./service";

/**
 * @api {post} /createUser Create User
 * @apiName createUser
 * @apiExample {curl} Example usage:
 *      **** // Update curl here // ****
 * @apiGroup User
 * @apiHeader {string} Authorization authorization token
 * @apiBody {string} roleId Role
 * @apiBody {string} name User name
 * @apiBody {string} emailId User email
 * @apiBody {string} mobileNo User mobile
 * @apiError {string)} roleId Role is mandatory
 * @apiError {string)} name User name is mandatory and should be a string
 * @apiError {string)} emailId Emailid is mandatory
 * @apiError {string)} mobileNo Mobile no is mandatory
 * @apiSuccess {object} user User created successfully
 *
 */

export const createAppUser = async (handler: RequestHandler) => {
  try {
    const data = await handler.getBody();
    const res: any = await Service.createAppUser(data);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};
export const getAppUsers = async (handler: RequestHandler) => {
  try {
    const res: any = await Service.getAppUsers();
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};
/**
 * @api {post} /userLogin Verify user with emailId
 * @apiName userLogin
 * @apiExample {curl} Example usage:
 *      **** // Update curl here // ****
 * @apiGroup User
 * @apiHeader {string} Authorization authorization token
 * @apiBody {string} mobileNo User mobile No
 * @apiBody {string} emailId User email
 * @apiSuccess {object} user Verified user record
 */

export const userLogin = async (handler: RequestHandler) => {
  try {
    const data = await handler.getBody();
    const res: any = await Service.userLogin(data);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};


export const updateUser = async (handler: RequestHandler) => {
  try {
    const data = await handler.getBody();
    const userId = await handler.getRequestParameterAsString("userId");
    const res: any = await Service.updateUser(data, userId);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};

// export const refreshToken = async (handler: RequestHandler) => {
//   try {
//     const data = await handler.getBody();
//     const res: any = await Service.refreshToken(data);
//     return handler.handleCreatedResponse(res);
//   } catch (err) {
//     return handler.sendServerError(err);
//   }
// };

// export const verifyUserWithEmail = async (handler: RequestHandler) => {
//   try {
//     const emailId = await handler.getRequestParameterAsString("emailId");
//     const isForgotPassword = await handler.getRequestParameterAsBoolean("isForgotPassword");
//     const res: any = await Service.verifyUserWithEmail(emailId, isForgotPassword);
//     return handler.handleCreatedResponse(res);
//   } catch (err) {
//     return handler.sendServerError(err);
//   }
// };

// export const verifyUserWithMobile = async (handler: RequestHandler) => {
//   try {
//     const mobileNo = await handler.getRequestParameterAsString("mobileNo");
//     const res: any = await Service.verifyUserWithMobile(mobileNo);
//     return handler.handleCreatedResponse(res);
//   } catch (err) {
//     return handler.sendServerError(err);
//   }
// };

// export const generateOtp = async (handler: RequestHandler) => {
//   try {
//     const emailId = await handler.getRequestParameterAsString("emailId");
//     const res: any = await Service.generateOtp(emailId);
//     return handler.handleCreatedResponse(res);
//   } catch (err) {
//     return handler.sendServerError(err);
//   }
// };
