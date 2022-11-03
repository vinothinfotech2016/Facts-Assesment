// import { PROD_ROLES } from "../../constants";
import { parseFormJsonObjects } from "../../utils";
import Repo from "./repo";
export default class Service {

  static createMenuFlow = async (data: any) => {
    data = await parseFormJsonObjects(data);
    return await Repo.createMenuFlow(data);
  };
  static updateMenuFlow = async (flowId:any,data: any) => {
    data = await parseFormJsonObjects(data);
    return await Repo.updateMenuFlow(flowId,data);
  };

  static getScreenByMenu = async (menuId: any) => await Repo.getScreenByMenu(menuId);

  static getMenuFlowByUser = async (userId: any) => await Repo.getMenuFlowByUser(userId);

  static getMenuFlowByProduct = async (data: any) => {
    data = await parseFormJsonObjects(data);
    return await Repo.getMenuFlowByProduct(data);
  };
 }



