import * as _ from "lodash";
import Product from "../../models/Product";
import AppUsers from "../../models/AppUsers";
import AppRoles from "../../models/AppRoles";


export default class Repo {
  static createAppUser = async (data: any) => {
    try {
      const emailExistence = await AppUsers.query()
        .where({ email: data.email });
        const mobileExistence = await AppUsers.query()
        .where({ mobileNumber: data.mobileNumber });
        // .whereNot({ mobileNumber: data.mobileNumber });
      if (emailExistence.length || mobileExistence.length) {
        return {
          error: true,
          errorText: `${mobileExistence.length ? "Mobile," : ""}${emailExistence.length ? "EmailId" : ""} already exists`,
        };
      }
      data.productIds = JSON.stringify(data.productIds);
      return await AppUsers.query().insert(data);
    } catch (error) {
      throw error;
    }
  };

  static getProductsById = (products: any, productIds: any) => {
    const parsedProductIds = JSON.parse(productIds);
    let matchedProducts: any = [];
            products.forEach((currProduct: any, productIndex: any, allPrds: any) => {
               if (parsedProductIds?.includes(currProduct.id)) {
                matchedProducts = [...matchedProducts, currProduct];
               }
            });
            return matchedProducts;
  }
  static getAppUsers = async () => {
    try {
      const allUsers: any = await AppUsers.query();
      // const allProducts = await Product.query();
      // const updateProducts = allUsers.map((userData: any) => {
      //   return {
      //     ...userData,
      //     products: Repo.getProductsById(allProducts, userData.productIds),
      //   };
      // });
      return allUsers;
    } catch (error) {
      throw error;
    }
  };


  static updateUser = async (data: any, id: string) => {
    data.productIds = JSON.stringify(data.productIds);
    return await AppUsers.query().updateAndFetchById(id, data);
  }


  static userLogin = async (data: any) => {
    try {
      const where: any = data.email
        ? { email: data.email }
        : { mobileNumber: data.mobileNumber };
      const user: any = await Repo.checkAuthorizedUser(where);
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
      const userRole: any = await AppRoles.query().findById(user?.roleId);
       const {accessMenus, role} = userRole;
      return { ...user, accessMenus, role };
    } catch (error) {
      throw error;
    }
  };
  static checkAuthorizedUser = async (userCredential: any) => await AppUsers.query().findOne(userCredential);

  static checkUserExistence = async (userId: any) => await AppUsers.query().findById(userId);

}
