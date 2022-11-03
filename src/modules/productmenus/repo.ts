import * as _ from "lodash";
import ProductMenu from "../../models/ProductMenu";
import knex from "../../knex";
import { SAFE_UPSERT_OPTIONS } from "../../constants/variable";
import Product from "../../models/Product";
import LevelTwoMenu from "../../models/LevelTwoMenu";


export default class Repo {

  static createMenu = async (data: any) => {
    try {
      const checkExistence = await ProductMenu.query().findOne({
        name: data.name.trim(),
        productId: data.productId.trim()
      });
      const checkOrderExistence = await ProductMenu.query().findOne({
        orderNo: data.orderNo,
        productId: data.productId.trim()
      });
      if (checkExistence) {
        return {
          error: true,
          errorText: "Product Menu already exists",
        };
      }
      if (checkOrderExistence) {
        return {
          error: true,
          errorText: "Menu order already exists",
        };
      }
      const createdData: any = await knex.transaction(
        async (trx) =>
          await ProductMenu.query(trx).insertGraph(data, SAFE_UPSERT_OPTIONS)

      );
      return createdData;
    } catch (error) {
      throw error;
    }
  };

  static updateMenu = async ( data: any) => {
    try {
      const updatedData: any = await ProductMenu.query().upsertGraph(data);
       if (!updatedData) {
         return{
           error: "Menu updation failed"
         };
       }
      return updatedData;
    } catch (error) {
      throw error;
    }
  };


// getAll products

static getMenuByProductId = async (productId: any) => {
  try {
    let productMenus;
    if (productId === "all") {
      productMenus = ProductMenu.query().withGraphFetched({level_one_menu: {level_two_menu: true}});
    }
    else  {
      productMenus = await ProductMenu.query().where("productId", productId).withGraphFetched({level_one_menu: {level_two_menu: true}});
    }
    if (productMenus) {
      return productMenus;
    } else {
      return {
        error : "Menus does not exist"
      };
    }
  } catch (error) {
    throw error;
  }
}
}