import * as _ from "lodash";
import Product from "../../models/Product";
import Users from "../../models/Users";
// import {
//   SEARCH_FIELDS,
//   SAFE_UPSERT_OPTIONS,
//   PROD_ROLES,
// } from "../../constants";

// import fetchTableList from "../../utils/listing-helper";
// import RefreshToken from "../../models/RefreshToken";
// import jwt from "jsonwebtoken";
// import { JWT_TOKEN_SCERET, REFRESH_TOKEN_SCERET } from "../../constants";
// import moment from "moment";
// import knex from "../../knex";
// import User from "../../models/User";
// import MailService from "../../services/emailService";
// import * as contents from "../../templates/contents";
// import RoleAccess from "../../models/RoleAccess";
// import Employee from "../../models/Employee";
// import UserEmployee from "../../models/UserEmployee";
// import UserRole from "../../models/UserRole";
// import Role from "../../models/Role";

export default class Repo {
  static createCustomer = async (data: any) => {
    try {
      const emailExistence = await Users.query()
        .where({ email: data.email });
        const mobileExistence = await Users.query()
        .where({ mobileNumber: data.mobileNumber });
      if (emailExistence.length || mobileExistence.length) {
        return {
          error: true,
          errorText: `${mobileExistence.length ? "Mobile," : ""}${emailExistence.length ? "EmailId" : ""} already exists`,
        };
      }
      data.products = JSON.stringify(data.products);

      return await Users.query().insert(data);
    } catch (error) {
      throw error;
    }
  };

  static getProductsById = (products: any, productIds: any) => {
    const parsedProductIds = JSON.parse(productIds) || [];

    let matchedProducts: any = [];
            products.forEach((currProduct: any, productIndex: any, allPrds: any) => {
              if (currProduct?.id) {
                if (parsedProductIds.includes(currProduct?.id)) {
                  matchedProducts = [...matchedProducts, currProduct];
                 }
              }
            });
            return matchedProducts;
  }




  static getCustomers = async () => {
    try {
      const allCustomers: any = await Users.query();
      const allProducts = await Product.query();
      const updateCustomers = allCustomers.map((userData: any) => {
        return {
          ...userData,
          products: Repo.getProductsById(allProducts, userData.products),
        };
      });
      return updateCustomers;
    } catch (error) {
      throw error;
    }
  };


  static updateCustomer = async (data: any, id: string) => {
    data.products = JSON.stringify(data.products);
    await Users.query().updateAndFetchById(id, data);

  }

  static customerLogin = async (data: any) => {
    try {
      const where: any = data.email
        ? { email: data.email }
        : { mobileNumber: data.mobileNumber };
      const user: any = await Repo.checkUserExistence(where);
      if (!user) {
        return {
          error: true,
          errorText: "Invalid email address/mobile number",
        };
      }

      const passwordValid = await user.verifyPassword(
        data.password,
        user.password
      );
      if (!passwordValid) {
        return { error: true, errorText: "Wrong password" };
      }


      return { ...user };
    } catch (error) {
      throw error;
    }
  };

  static checkUserExistence = async (where: any) =>
    await Users.query().findOne(where);


}
