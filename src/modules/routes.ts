import { Express } from "express";
import { default as userRoutes } from "./user/routes";
import { default as menuRoutes } from "./productmenus/routes";
import { default as productRoutes } from "./product/routes";
import { default as roleRoutes } from "./roles/routes";
import { default as appUserRoutes } from "./appUsers/routes";
import { default as menuFlowRoutes } from "./menuFlow/routes";
import { default as screenMasterRoutes } from "./screenMaster/routes";



export default function (app: Express) {
  app.get("/", (req, res) =>
    res.status(200).send({ message: "App Initiated" })
  );
  userRoutes(app);
  menuRoutes(app);
  productRoutes(app);
  roleRoutes(app);
  appUserRoutes(app);
  menuFlowRoutes(app);
  screenMasterRoutes(app);
}
