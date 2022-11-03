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

export const createScreen = async (handler: RequestHandler) => {
  try {
    const data = await handler.getBody();
    const files = await handler.getFiles();
    const params = await handler.getAllRequestParameters();
    const res: any = await Service.createScreen(data, params, files);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};

export const getScreensByUser = async (handler: RequestHandler) => {
  try {
    const userId = await handler.getRequestParameterAsString("userId");
    const res: any = await Service.getScreensByUser(userId);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};

export const getScreen = async (handler: RequestHandler) => {
  try {
    const screenId = await handler.getRequestParameterAsString("screenId");
    const res: any = await Service.getScreen(screenId);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};

export const postComments = async (handler: RequestHandler) => {
  try {
    const data = await handler.getBody();
    const res: any = await Service.postComments(data);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};

export const getComments = async (handler: RequestHandler) => {
  try {

    const userId = await handler.getRequestParameterAsString("userId");
    const res: any = await Service.getComments(userId);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};

export const getScreensByProduct = async (handler: RequestHandler) => {
  try {
    const productId = await handler.getRequestParameterAsString("productId");
    const res: any = await Service.getScreensByProduct(productId);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};

export const getScreenComments = async (handler: RequestHandler) => {
  try {
    const screenId = await handler.getRequestParameterAsString("screenId");
    const res: any = await Service.getScreenComments(screenId);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};



export const createScreenFlow = async (handler: RequestHandler) => {
  try {
    const screenId = await handler.getRequestParameterAsString("screenId");
    const data = await handler.getBody();
    const res: any = await Service.createScreenFlow(screenId, data);
    return handler.handleCreatedResponse(res);
  } catch (err) {
    return handler.sendServerError(err);
  }
};



export const updateScreenFlow = async (handler: RequestHandler) => {
  try {
    const screenId = await handler.getRequestParameterAsString("screenId");
    const data = await handler.getBody();
    const files = await handler.getFiles();
    // const params = await handler.getAllRequestParameters();
    const res: any = await Service.updateScreenFlow(screenId, data, files);
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


