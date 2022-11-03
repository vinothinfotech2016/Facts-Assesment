import * as _ from "lodash";
import knex from "../../knex";
import { SAFE_UPSERT_OPTIONS } from "../../constants/index";
import MenuFlow from "../../models/MenuFlow";
import ScreenMaster from "../../models/ScreenMaster";
import Service from "../productmenus/service";
import AppUsers from "../../models/AppUsers";
import ProductMenu from "../../models/ProductMenu";
import LevelOneMenu from "../../models/LevelOneMenu";
import LevelTwoMenu from "../../models/LevelTwoMenu";
import Product from "../../models/Product";


export default class Repo {

  static createMenuFlow = async(data: any) => {
    try {
      let existingFlow: any = [];
      if (data.menuId && data.levelOneId && data.levelTwoId) {
        existingFlow = await MenuFlow.query().findOne({ menuId : data.menuId.trim(), levelOneId: data.levelOneId.trim(), levelTwoId: data.levelTwoId.trim()});
      }
      else if (data.menuId && data.levelOneId) {
        existingFlow = await MenuFlow.query().findOne({ menuId : data.menuId.trim(), levelOneId: data.levelOneId.trim()});

      } else if (data.menuId) {
       existingFlow = await MenuFlow.query().findOne({ menuId : data.menuId.trim()});
      }
      if (existingFlow) {
        return {
          error: true,
          errorText: "Flow already exist"
        };
      }
      else {
        const createdFlow: any = await MenuFlow.query().insert(data);
        return createdFlow;
      }
    } catch (error) {
      throw error;
    }
  };
  static updateMenuFlow = async (flowId: any, data: any) => {
    try {
      const updatedFlow: any = await MenuFlow.query().update(data).where("id", flowId);
      if (updatedFlow) return {message: "Flow updated sucessfully"};
      else {
        return{
          error: true,
          errorText: "Flow not updated"
        };
      }

    } catch (err) {
      throw err;
    }
  }
  static getMenuFlowByProduct = async (productId: any) => {
      try {
        const menus: any = await Service.getMenuByProductId(productId);
        let existingFlows: any = [];
        if (menus) {
          const menuIds = menus.map((menu: any) => menu.id);
          console.log(menuIds, "menuIds");
          existingFlows = await MenuFlow.query().whereIn("menuId", menuIds);
            return {
              existingFlows,
              menus
            };
        }
        else {
          return{
            error : "Menus does not exist"
          };
        }
      } catch (err) {
           throw err;
      }
  }

  static getMenuFlowByUser = async(userId: any) => {
    try {
      const user: any = await AppUsers.query().findById(userId);
      if (user.productIds) {
        const menuFlows: any = await MenuFlow.query().whereIn("productId", JSON.parse(user.productIds));
        const descriptiveMenuFlow = await Promise.all(menuFlows.map(async(flow: any) => {
          return{
            ...flow,
            menu: await ProductMenu.query().findById(flow.menuId).select("id", "name"),
            levelOneMenu: await LevelOneMenu.query().findById(flow.levelOneId).select("id", "name"),
            levelTwoMenu: await LevelTwoMenu.query().findById(flow.levelTwoId).select("id", "name"),
            screen: await ScreenMaster.query().findById(flow.screenId),
            product: await Product.query().findById(flow.productId).select("id", "name")

          };
        }));
      if (menuFlows) return descriptiveMenuFlow;
      } else {
        return {
          error: true,
          errorText: "menu flow not created"
        };
      }

    } catch (err) {
      throw err;
    }
  }
  static getScreenByMenu = async (menuId: any) => {
    try {
      const menuFlow: any = await MenuFlow.query().where("menuId", menuId);
      if (menuFlow?.length) {
        const screenId = menuFlow [0]?.screenId;
        const targetScreen: any = await ScreenMaster.query().findById(screenId);
        if (targetScreen) {
          return targetScreen;
        } else {
          return {
            error: true,
            errorText : "Menus does not exist"
          };
        }
      }
      if (!menuFlow.length) {
        return {
          error: true,
          errorText: "Menu does not exist"
        };
      }
    } catch (error) {
      throw error;
    }

  }

}
