import { Express } from "express";
import * as controller from "./controller";
import { authenticate, handle } from "../common/request-handler";

export default function (app: Express) {
  app.post("/menuFlow/create", handle(controller.createMenuFlow));
  app.put("/menuFlow/updateById/:flowId", handle(controller.updateMenuFlow));
  app.get("/menuFlow/getScreenByMenu/:menuId", handle(controller.getScreenByMenu));
  app.get("/menuFlow/getMenuFlowByUser/:userId", handle(controller.getMenuFlowByUser));
  app.get("/menuFlow/getMenuFlowByProduct/:productId", handle(controller.getMenuFlowByProduct));

  // app.get("/screen/getScreensByProduct/:productId", handle(controller.getScreensByProduct));
  // app.put("/screen/updateFlow/:screenId", handle(controller.updateScreenFlow));
  // app.get("/screen/getScreen/:screenId", handle(controller.getScreen));

}
