import * as _ from "lodash";
import AppRoles from "../../models/AppRoles";
import ProductMenu from "../../models/ProductMenu";
import knex from "../../knex";
import { SAFE_UPSERT_OPTIONS } from "../../constants/variable";


export default class Repo {

  static createRoles = async (data: any) => {
    try {
      const checkExistence = await AppRoles.query().findOne({
        role: data.role.trim(),
      });
      if (checkExistence) {
        return {
          error: true,
          errorText: "Role already exists",
        };
      }
      data.accessMenus = JSON.stringify(data.accessMenus);
      const createdData: any = await knex.transaction(
        async (trx) =>
          await AppRoles.query(trx).upsertGraphAndFetch(data, SAFE_UPSERT_OPTIONS)

      );
      return createdData;
    } catch (error) {
      throw error;
    }
  };

  static getAllroles = async () => {
    try {
      // const emailExistence = await Users.query()
      //   .where({ email: data.email })
      //   .whereNot({ mobileNumber: data.mobileNumber });
      // if (emailExistence.length) {
      //   return {
      //     error: true,
      //     errorText: "EmailId already exists and mapped to another mobile",
      //   };
      // }
      return await AppRoles.query();
    } catch (error) {
      throw error;
    }
  };

  // static updateUser = async (data: any, userId: string) =>
  //   await User.query().updateAndFetchById(userId, data);




  // static checkUserExistence = async (where: any) =>
  //   await Users.query().findOne(where);

}
