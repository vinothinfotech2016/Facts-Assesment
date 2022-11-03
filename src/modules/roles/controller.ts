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

 export const createRoles = async (handler: RequestHandler) => {
  try {
    const data = await handler.getBody();
    const res: any = await Service.createRoles(data);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }

};

export const getRoles = async (handler: RequestHandler) => {
  try {
    const res: any = await Service.getAllroles();
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
