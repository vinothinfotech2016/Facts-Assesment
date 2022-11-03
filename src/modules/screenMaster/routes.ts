import { Express } from "express";
import * as controller from "./controller";
import { authenticate, handle } from "../common/request-handler";

export default function (app: Express) {
  app.post("/screen/create", handle(controller.createScreen));
  app.get("/screen/getScreensByUser/:userId", handle(controller.getScreensByUser));
  app.get("/screen/getScreensByProduct/:productId", handle(controller.getScreensByProduct));
  app.post("/screen/createScreenFlow/:screenId", handle(controller.createScreenFlow));
  app.put("/screen/update/:screenId", handle(controller.updateScreenFlow));
  app.get("/screen/getScreenById/:screenId", handle(controller.getScreen));
  app.post("/screen/commentsReply", handle(controller.postComments));
  app.get("/screen/getCommentsByUser/:userId", handle(controller.getComments));
  app.get("/screen/getScreenComments/:screenId", handle(controller.getScreenComments));

}
