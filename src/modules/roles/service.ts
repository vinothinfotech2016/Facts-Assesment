// import { PROD_ROLES } from "../../constants";
import { parseFormJsonObjects } from "../../utils";
import Repo from "./repo";
export default class Service {
  static createRoles = async (data: any) => {
    data = await parseFormJsonObjects(data);
    return await Repo.createRoles(data);
  };
  static getAllroles = async () => await Repo.getAllroles();
 }
