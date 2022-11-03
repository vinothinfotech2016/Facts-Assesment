// import { PROD_ROLES } from "../../constants";
import { parseFormJsonObjects } from "../../utils";
import Repo from "./repo";
export default class Service {

  static createProduct = async (data: any, params: any, files: any) => {
    data = await parseFormJsonObjects(data);
    return await Repo.createProduct(data, params, files);
  };

  static updateProduct = async (id: any, data: any, params: any, files: any) => {
    data = await parseFormJsonObjects(data);
    return await Repo.updateProduct(id, data, params, files);
  };


  static getProductById = async (userId: any) => await Repo.getProductById(userId);


 }



