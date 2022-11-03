// import { PROD_ROLES } from "../../constants";
import { parseFormJsonObjects } from "../../utils";
import Repo from "./repo";
export default class Service {

  static createScreen = async (data: any, params: any, files: any) => {
    data = await parseFormJsonObjects(data);
    return await Repo.createScreen(data, params, files);
  };

  static updateScreenFlow = async (id: any, data: any, files: any) => {
    data = await parseFormJsonObjects(data);
    return await Repo.updateScreenFlow(id, data, files);
  };
  static getScreensByUser = async (userId: any) => await Repo.getScreensByUser(userId);

  static getScreensByProduct = async (productId: any) => await Repo.getScreensByProduct(productId);
  static createScreenFlow = async (screenId: any, data: any) => {
    data = await parseFormJsonObjects(data);
    return await Repo.createScreenFlow(screenId, data);
  };

  static postComments = async (data: any) => {
    data = await parseFormJsonObjects(data);
    return await Repo.postComments(data);
  };

  static getScreenComments = async (screenId: any) => await Repo.getScreenComments(screenId);

  static getComments = async(userId: any) => await Repo.getComments(userId);

  static getScreen = async (screenId: any) => await Repo.getScreen(screenId);

 }



