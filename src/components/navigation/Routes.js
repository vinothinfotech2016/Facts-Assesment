import Login from "../pages/Login";
import { Menu } from "../pages/Menu";
import { Profile } from "../pages/Profile";
import { Customer } from "../pages/Customer";
import { Roles } from "../pages/Roles";
import { Usertable } from "../pages/Usertable";
import { Parameters } from "../pages/Parameters";
import { paths } from "./routePaths";
import { ProductMaster } from "../pages/ProductMaster";
import { FormMaster } from "../pages/FormMaster";
import { MenuMaster } from "../pages/MenuMaster";
import Home from "../pages/Home";

export const routes = [
  {
    path: paths.PROFILE,
    component: Profile,
    exact: true,
  },
  {
    path: paths.CUSTOMER,
    component: Customer,
    exact: true,
  },
  {
    path: paths.ROLES,
    component: Roles,
    exact: true,
  },
  {
    path: paths.MYUSER,
    component: Usertable,
    exact: true,
  },
  {
    path: paths.PARAM,
    component: Parameters,
    exact: true,
  },
  {
    path: paths.FORMMASTER,
    component: FormMaster,
    exact: true,
  },
  {
    path: paths.MENUMASTER,
    component: MenuMaster,
    exact: true,
  },
  {
    path: paths.PRODUCTMASTER,
    component: ProductMaster,
    exact: true,
  },
];

export const AppRoutes = [
  {
    path: paths.LOGIN,
    component: Login,
  },
  {
    path: paths.MENU,
    component: Menu,
  },
  {
    path: paths.HOME,
    component: Home,
    exact: true,
  },
];
