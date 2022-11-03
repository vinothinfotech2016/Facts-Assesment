import * as _ from "lodash";
import knex from "../../knex";
import FileService from "../../services/fileService";
import Product from "../../models/Product";
import AppUsers from "../../models/AppUsers";


export default class Repo {
  static createProduct = async (data: any, params: any, files: any) => {
    try {
      const checkExistence = await Product.query().findOne({
        name: data.name.trim(),
      });
      if (checkExistence) {
        return {
          erusersror: true,
          errorText: "Product already exists",
        };
      }
      if (files) await Repo.fileUpload(data, files);
      data.status = "Active";
      const createdData: any = await Product.query().insert(data);
      return createdData;
    } catch (error) {
      throw error;
    }
  };

  static updateProduct = async (id: any, data: any, params: any, files: any) => {
    try {
      const existingData: any = await Product.query().findOne({
        id: id,
      });
      if (files) {
        if (files.leftLogoUrl) {
          await Repo.deleteExistingFile(existingData.leftLogoUrl);
        }
        if (files.rightLogoUrl) {
          await Repo.deleteExistingFile(existingData.rightLogoUrl);
        }
        if (files.centerLogoUrl) {
          await Repo.deleteExistingFile(existingData.centerLogoUrl);
        }
        await Repo.fileUpload(data, files);
      }
      if (!files?.leftLogoUrl) data.leftLogoUrl = existingData?.leftLogoUrl;
      if (!files?.rightLogoUrl) data.rightLogoUrl = existingData?.rightLogoUrl;
      if (!files?.centerLogoUrl) data.centerLogoUrl = existingData?.centerLogoUrl;

      const updatedData: any = await Product.query().updateAndFetchById(id, data);
      return updatedData;
    } catch (error) {
      throw error;
    }
  };

  static deleteExistingFile = async(fileUrl: any) => {
    await FileService.S3FileDelete(fileUrl);
    // const splitUrl: any = fileUrl.split(/(?:.com|-picture)+/);
    //  await FileService.S3FileDelete(splitUrl[2]?.replace(/\/+$/, ""), splitUrl[1]);

  }

  static fileUpload = async (data: any, files: any) => {

    const imgExtension = (imgName: any) => imgName.split(".")[imgName.split(".").length - 1];
    const productName = data.name.split(" ").join("-");

    if (files.leftLogoUrl) {
      const picturePath = `Product/${productName}-leftLogo/`;
      const upload: any = await FileService.S3FileUpload(
        files.leftLogoUrl.data,
        `${productName}-leftLogo.${imgExtension(files.leftLogoUrl.name)}`,
        picturePath
      );
      data.leftLogoUrl = picturePath + `${productName}-leftLogo.${imgExtension(files.leftLogoUrl.name)}`;
    }
    if (files.rightLogoUrl) {
      const picturePath = `Product/${productName}-rightLogo/`;
      const upload: any = await FileService.S3FileUpload(
        files.rightLogoUrl.data,
        `${productName}-rightLogo.${imgExtension(files.rightLogoUrl.name)}`,
        picturePath
      );
      data.rightLogoUrl = picturePath + `${productName}-rightLogo.${imgExtension(files.rightLogoUrl.name)}`;
    } if (files.centerLogoUrl) {
      const picturePath = `Product/${productName}-centerLogo/`;
      const upload: any = await FileService.S3FileUpload(
        files.centerLogoUrl.data,
        `${productName}-centerLogo.${imgExtension(files.centerLogoUrl.name)}`,
        picturePath
      );
      data.centerLogoUrl = picturePath + `${productName}-centerLogo.${imgExtension(files.centerLogoUrl.name)}`;
    }
    return data;
  };

// getAll products

static getProductById = async (userId: any) => {
  let products: any = [];
  try {
    const users: any = await AppUsers.query().select("app_users.*", "app_roles.role")
    .join("app_roles", "app_users.roleId", "app_roles.id").where("app_users.id", userId);
    const userRole = users[0]?.role;
    const productIds = users[0]?.productIds;
    if (userRole === "Admin") {
      products = await Product.query();
    } else if (productIds) {
      products = await Product.query().findByIds(JSON.parse(productIds));
    }
    if (products?.length) {
      return products.map((product: any) => {
        return{
          ...product,
          leftLogoUrl: FileService.S3FileRead(product.leftLogoUrl),
          rightLogoUrl: FileService.S3FileRead(product.rightLogoUrl),
          centerLogoUrl: FileService.S3FileRead(product.centerLogoUrl)
        };
      });
   }
    else return{
      error: true,
      errorText: "Products not found"
    };
  } catch (error) {
    throw error;
  }
};


}
