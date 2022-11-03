import { Express } from "express";
import * as controller from "./controller";
import { authenticate, handle } from "../common/request-handler";

export default function (app: Express) {
  app.post("/createAppUser", handle(controller.createAppUser));
  app.put("/updateUser/:userId", handle(controller.updateUser));
  app.post("/userLogin", handle(controller.userLogin));
  app.get("/getAppUsers", handle(controller.getAppUsers));
  // app.post("/refreshToken", handle(controller.refreshToken));
  // app.get("/verifyUserWithEmail/:emailId/:isForgotPassword", handle(controller.verifyUserWithEmail));
  // app.get("/verifyUserWithMobile/:mobileNo", handle(controller.verifyUserWithMobile));
  // app.get("/generateOtp/:emailId", handle(controller.generateOtp));
}
