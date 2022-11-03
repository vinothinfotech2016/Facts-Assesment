import * as _ from "lodash";
import knex from "../../knex";
import FileService from "../../services/fileService";
import ScreenMaster from "../../models/ScreenMaster";
import Service from "../product/service";
import CommentsReply from "../../models/CommentsReply";
import AppUsers from "../../models/AppUsers";
import Product from "../../models/Product";

export default class Repo {
  static createScreen = async (data: any, params: any, files: any) => {
    try {
      const checkExistence = await ScreenMaster.query().findOne({
        screenName: data.screenName.trim(),
        productId: data.productId.trim(),
      });
      if (checkExistence) {
        return {
          error: true,
          errorText: "Screen already exists",
        };
      }
      if (files) await Repo.fileUpload(data, files);
      const createdData: any = await knex.transaction(
        async (trx) => await ScreenMaster.query(trx).insert(data)
      );
      return createdData;
    } catch (error) {
      throw error;
    }
  };

  static postComments = async (data: any) => {
    try {
      const createdData: any = await knex.transaction(
        async (trx) => await CommentsReply.query(trx).insert(data)
      );
      return createdData;
    } catch (error) {
      throw error;
    }
  };

  static getComments = async (userId: any) => {
    try {
      const user: any = await AppUsers.query().findById(userId);
      let screens: any = await ScreenMaster.query().whereIn("productId", JSON.parse(user.productIds));
        if (screens)
        screens = await Promise.all(
          screens.map(async (screenObj: any) => {
            const product: any = await Product.query().findById(
              screenObj.productId
            );
            return {
              ...screenObj,
              productName: product.name,
            };
          })
        );
      return screens;
    } catch (error) {
      throw error;
    }
  }
static getScreenComments = async (screenId: any) => {

  try {

    const comments: any = await CommentsReply.query().where("screenId", screenId);
    return comments;
  } catch (error) {
    throw error;
  }

}
  static createScreenFlow = async (screenId: any, data: any) => {
    try {
      const updatedScreens: any = await ScreenMaster.query()
        .update({ actionItems: JSON.stringify(data) })
        .where("id", screenId);
      if (updatedScreens)
        return { message: "action items created successfully" };
      if (!updatedScreens) {
        return {
          errorText: "action items are not created",
        };
      }
      return updatedScreens;
    } catch (error) {
      throw error;
    }
  };

  static updateScreenFlow = async (id: any, data: any, files: any) => {
    try {
      const existingData: any = await ScreenMaster.query().findOne({
        id: id,
      });
      if (files) {
        if (files.screenImageUrl) {
          await Repo.deleteExistingFile(existingData.screenImageUrl);
        }

        await Repo.fileUpload(data, files);
      }
      if (!files?.screenImageUrl)
        data.screenImageUrl = existingData?.screenImageUrl;

      const updatedData: any = await ScreenMaster.query().updateAndFetchById(
        id,
        data
      );
      if (!updatedData) {
        return {
          error: true,
          errorText: "Screen not updated",
        };
      }
      return updatedData;
    } catch (error) {
      throw error;
    }
  };
  static deleteExistingFile = async (fileUrl: any) => {
    await FileService.S3FileDelete(fileUrl);
  };

  static fileUpload = async (data: any, files: any) => {
    const imgExtension = (imgName: any) =>
      imgName.split(".")[imgName.split(".").length - 1];
    const screenName = data.screenName.split(" ").join("-");
    if (files.screenImageUrl) {
      const picturePath = `Screen/${screenName}-screen/`;
      const upload: any = await FileService.S3FileUpload(
        files.screenImageUrl.data,
        `${screenName}-screen.${imgExtension(files.screenImageUrl.name)}`,
        picturePath
      );
      data.screenImageUrl =
        picturePath +
        `${screenName}-screen.${imgExtension(files.screenImageUrl.name)}`;
    }
    return data;
  };

  // getAll products
  static getScreensByProduct = async (productIds: any) => {
    const isArrOfIds = Array.isArray(productIds);
    try {
      const screens: any = await ScreenMaster.query().whereIn(
        "productId",
        isArrOfIds ? productIds.map((product: any) => product.id) : [productIds]
      );
      if (screens) {
        if (screens?.length) {
          return screens.map((screen: any) => {
            return {
              ...screen,
              screenImageUrl: FileService.S3FileRead(screen.screenImageUrl),
            };
          });
        }
        return screens;
      } else {
        return {
          error: "Screens does not exist",
        };
      }
    } catch (err) {
      throw err;
    }
  };

  static getScreensByUser = async (userId: any) => {
    try {
      const productIds = await Service.getProductById(userId);
      return Repo.getScreensByProduct(productIds);
    } catch (error) {
      throw error;
    }
  };

  static getScreen = async (screenId: any) => {
    try {
      const screen: any = await ScreenMaster.query().findById(screenId);
      if (screen){
        screen.screenImageUrl = FileService.S3FileRead(screen.screenImageUrl);
        return screen;
      }else{
        return{
          error:true,
          errorText:"screen not found"
        }
      }

      // if (screen.actionItems)
      //   screen.actionItems = await Promise.all(
      //     JSON.parse(screen.actionItems).map(async (scales: any) => {
      //       let targetScreen : any = await ScreenMaster.query().findById(
      //         scales.data.targetId
      //       );
      //       targetScreen.screenImageUrl = FileService.S3FileRead(targetScreen.screenImageUrl)
      //       return {
      //         ...scales,
      //         targetScreen,
      //       };
      //     })
      //   );

    } catch (error) {
      throw error;
    }
  };
}
