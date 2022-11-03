import { Express } from "express";
import * as controller from "./controller";
import { authenticate, handle } from "../common/request-handler";

export default function (app: Express) {
  app.post("/createCustomer", handle(controller.createCustomer));
  app.put("/updateCustomer/:customerId", handle(controller.updateCustomer));
  app.post("/customerLogin", handle(controller.customerLogin));
  app.get("/getCustomers", handle(controller.getCustomers));
  // app.post("/refreshToken", handle(controller.refreshToken));
  // app.get("/verifyUserWithEmail/:emailId/:isForgotPassword", handle(controller.verifyUserWithEmail));
  // app.get("/verifyUserWithMobile/:mobileNo", handle(controller.verifyUserWithMobile));
  // app.get("/generateOtp/:emailId", handle(controller.generateOtp));
}
