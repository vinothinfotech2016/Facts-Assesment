import Login from "../pages/Login";
import { Menu } from "../pages/Menu";
import { Profile } from "../pages/Profile";
import { Customer } from "../pages/Customer";
import { Roles } from "../pages/Roles";
import { Usertable } from "../pages/Usertable";
import { Parameters } from "../pages/Parameters";
import { mapPaths } from "./routePaths";
import { ProductMaster } from "../pages/ProductMaster";
import { FormMaster } from "../pages/FormMaster";
import { MenuMaster } from "../pages/MenuMaster";
import Home from "../pages/Home";

export const routes = [
  {
    path: mapPaths.PROFILE,
    component: Profile,
    exact: true,
  },
  {
    path: mapPaths.CUSTOMER,
    component: Customer,
    exact: true,
  },
  {
    path: mapPaths.ROLES,
    component: Roles,
    exact: true,
  },
  {
    path: mapPaths.MYUSER,
    component: Usertable,
    exact: true,
  },
  {
    path: mapPaths.PARAM,
    component: Parameters,
    exact: true,
  },
  {
    path: mapPaths.FORMMASTER,
    component: FormMaster,
    exact: true,
  },
  {
    path: mapPaths.MENUMASTER,
    component: MenuMaster,
    exact: true,
  },
  {
    path: mapPaths.PRODUCTMASTER,
    component: ProductMaster,
    exact: true,
  },
];

export const AppRoutes = [
  {
    path: mapPaths.LOGIN,
    component: Login,
  },
  {
    path: mapPaths.MENU,
    component: Menu,
  },
  {
    path: mapPaths.HOME,
    component: Home,
    exact: true,
  },
];
