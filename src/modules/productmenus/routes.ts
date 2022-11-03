import { Express } from "express";
import * as controller from "./controller";
import { authenticate, handle } from "../common/request-handler";

export default function (app: Express) {
  app.post("/product/menu/create", handle(controller.createMenus));
  app.put("/product/menu/update", handle(controller.updateMenu));
  app.get("/product/menu/getMenuByProductId/:productId", handle(controller.getMenuByProductId));
}
