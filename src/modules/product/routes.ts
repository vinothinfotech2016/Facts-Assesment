import { Express } from "express";
import * as controller from "./controller";
import { authenticate, handle } from "../common/request-handler";

export default function (app: Express) {
  app.post("/product/create", handle(controller.createProduct));
  app.get("/product/getProductById/:userId", handle(controller.getProductById));
  app.post("/product/update/:productId", handle(controller.updateProduct));
}
