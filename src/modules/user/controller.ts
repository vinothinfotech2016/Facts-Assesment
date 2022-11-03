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

export const createCustomer = async (handler: RequestHandler) => {
  try {
    const data = await handler.getBody();
    const res: any = await Service.createCustomer(data);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};
export const getCustomers = async (handler: RequestHandler) => {
  try {
    const res: any = await Service.getCustomers();
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

export const customerLogin = async (handler: RequestHandler) => {
  try {
    const data = await handler.getBody();
    const res: any = await Service.customerLogin(data);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};


export const updateCustomer = async (handler: RequestHandler) => {
  try {
    const data = await handler.getBody();
    const customerId = await handler.getRequestParameterAsString("customerId");
    const res: any = await Service.updateCustomer(data, customerId);
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
