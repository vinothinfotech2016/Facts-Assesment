import Login from "../pages/Login";
import { Menu } from "../pages/Menu";
import { Profile } from "../pages/Profile";
import { ChangePassword } from "../pages/ChangePassword";
import { Roles } from "../pages/Roles";
import { Usertable } from "../pages/Usertable";
import { Parameters } from "../pages/Parameters";
import { mapPaths } from "./routePaths";
import { ProductMaster } from "../pages/ProductMaster";
import { FormMaster } from "../pages/FormMaster";
import { MenuMaster } from "../pages/MenuMaster";
import Home from "../pages/Home";
import { UserForm } from "../pages/UserForm";
import ProductMasterForm from "../pages/ProductMasterForm";
import { NewFormMaster } from "../pages/NewFormMaster";
import { NewMenu } from "../pages/NewMenu";
import EditProfile from "../pages/EditProfile";
import { Customertable } from "../pages/Customertable";
import { CustomerForm } from "../pages/CustomerForm";
import PreviewPage from "../pages/PreviewPage";
import NewRole from "../pages/NewRole";
import CheckFlowPage from "../pages/CheckFlowPage";
import ImageMapperPage from "../pages/ImageMapperPage";
import DeveloperMenu from "../pages/DeveloperMenu";

export const routes = [
  {
    path: mapPaths.PROFILE,
    component: Profile,
    exact: true,
  },
  {
    path: mapPaths.PROFILEFORM,
    component: EditProfile,
    exact: true,
  },
  {
    path: mapPaths.CHANGEPASSWORD,
    component: ChangePassword,
    exact: true,
  },
  {
    path: mapPaths.CUSTOMER,
    component: Customertable,
    exact: true,
  },
  {
    path: mapPaths.CUSTOMERFORM,
    component: CustomerForm,
    exact: true,
  },
  {
    path: mapPaths.ROLES,
    component: Roles,
    exact: true,
  },
  {
    path: mapPaths.ROLESFORM,
    component: NewRole,
    exact: true,
  },
  {
    path: mapPaths.MYUSER,
    component: Usertable,
    exact: true,
  },
  {
    path: mapPaths.MYUSERFORM,
    component: UserForm,
    exact: true,
  },
  {
    path: mapPaths.PARAM,
    component: Parameters,
    exact: true,
  },

  {
    path: mapPaths.PRODUCTMASTER,
    component: ProductMaster,
    exact: true,
  },
  {
    path: mapPaths.PRODUCTMASTERFORM,
    component: ProductMasterForm,
    exact: true,
  },
  {
    path: mapPaths.FORMMASTER,
    component: FormMaster,
    exact: true,
  },
  {
    path: mapPaths.FORMMASTERFORM,
    component: NewFormMaster,
    exact: true,
  },
  {
    path: mapPaths.MENUMASTER,
    component: MenuMaster,
    exact: true,
  },
  {
    path: mapPaths.MENUMASTERFORM,
    component: NewMenu,
    exact: true,
  },
  {
    path: mapPaths.PREVIEWPAGE,
    component: PreviewPage,
    exact: true,
  },
  {
    path: mapPaths.CHECKPAGE,
    component: CheckFlowPage,
    exact: true,
  },
  // {
  //   path: mapPaths.IMAGEMAPPERPAGE,
  //   component: ImageMapperPage,
  //   exact: true,
  // },
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
  {
    path: mapPaths.DEV_MENU,
    component: DeveloperMenu,
    exact: true,
  },
];
