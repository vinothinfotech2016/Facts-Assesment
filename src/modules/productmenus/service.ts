// import { PROD_ROLES } from "../../constants";
import { parseFormJsonObjects } from "../../utils";
import Repo from "./repo";
export default class Service {

  static createProductMenu = async (data: any) => {
    data = await parseFormJsonObjects(data);
    return await Repo.createMenu(data);
  };


 static updateMenu = async (data: any) => {
  data = await parseFormJsonObjects(data);
  return await Repo.updateMenu(data);
};

  static getMenuByProductId = async (productId: any) => await Repo.getMenuByProductId(productId);

 }




