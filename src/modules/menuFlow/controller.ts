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

export const createMenuFlow = async (handler: RequestHandler) => {
  try {
    const data = await handler.getBody();
    const res: any = await Service.createMenuFlow(data);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};


export const getScreenByMenu = async (handler: RequestHandler) => {
  try {
    const menuId = await handler.getRequestParameterAsString("menuId");
    const res: any = await Service.getScreenByMenu(menuId);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};

export const getMenuFlowByProduct = async (handler: RequestHandler) => {
  try {
    const productId = await handler.getRequestParameterAsString("productId");
    const res: any = await Service.getMenuFlowByProduct(productId);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};

export const getMenuFlowByUser = async (handler: RequestHandler) => {

  try {
    const userId = await handler.getRequestParameterAsString("userId");
    const res: any = await Service.getMenuFlowByUser(userId);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};

export const updateMenuFlow = async (handler: RequestHandler) => {

  try {
    const flowId = await handler.getRequestParameterAsString("flowId");
    const data = await handler.getBody();
    const res: any = await Service.updateMenuFlow(flowId, data);
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


