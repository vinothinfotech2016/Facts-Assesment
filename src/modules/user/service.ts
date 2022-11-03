// import { PROD_ROLES } from "../../constants";
import Repo from "./repo";
export default class Service {
  static createCustomer = async (data: any) => await Repo.createCustomer(data);
  static getCustomers = async () => await Repo.getCustomers();


  static customerLogin = async (data: any) => await Repo.customerLogin(data);
  static updateCustomer = async (
    data: any,
    userId: string,
  ) => {

    const user: any = await Repo.checkUserExistence({ id: userId });
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
    return await Repo.updateCustomer(data, userId);
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
