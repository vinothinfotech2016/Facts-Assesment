// import { PROD_ROLES } from "../../constants";
import Repo from "./repo";
export default class Service {
  static createAppUser = async (data: any) => await Repo.createAppUser(data);
  static getAppUsers = async () => await Repo.getAppUsers();


  static userLogin = async (data: any) => await Repo.userLogin(data);
  static updateUser = async (
    data: any,
    userId: string,
  ) => {

    const user: any = await Repo.checkUserExistence(userId);
    if (user.email !== data.email) {
        return {
          error: true,
          errorText: "EmailId already verified. Cannot change emailId",
        };
    }
    // if (user.mobileNo !== data.mobileNo) {
    //   if (user.mobileVerified)
    //     return {
    //       error: true,
    //       errorText: "MobileNo already verified. Cannot change mobileNo",
    //     };
    // }
    return await Repo.updateUser(data, userId);
  };

  // static verifyUserWithEmail = async (
  //   emailId: string,
  //   isForgotPassword: boolean
  // ) => await Repo.verifyUserWithEmail(emailId, isForgotPassword);
  // static verifyUserWithMobile = async (mobileNo: string) =>
  //   await Repo.verifyUserWithMobile(mobileNo);

  // static generateOtp = async (emailId: string) => {
  //   const user: any = await Repo.checkUserExistence({ emailId });
  //   if (!user) {
  //     return {
  //       error: true,
  //       errorText: "EmailId is not registered",
  //     };
  //   }
  //   return await Repo.generateOtp(emailId);
  // };

  // static refreshToken = async (data: any) => await Repo.refreshToken(data);
}
