import { mapPaths } from "../navigation/routePaths";

export const initValue = {
  userDropdown: [
    { name: "My Profile", route: `${mapPaths.PROFILE}` },
    { name: "Customer", route: `${mapPaths.CUSTOMER}` },
    { name: "Roles & Access", route: `${mapPaths.ROLES}` },
    { name: "My User", route: `${mapPaths.MYUSER}` },
    // { name: "Parameters", route: `${mapPaths.PARAM}` },
    { name: "Logout", route: `${mapPaths.LOGIN}` },
  ],
  devDropDown: [
    { name: "My Profile", route: `${mapPaths.PROFILE}` },
    { name: "Logout", route: `${mapPaths.LOGIN}` },
  ],
  stepper: [
    { name: "PRODUCT MASTER", route: `${mapPaths.PRODUCTMASTER}` },
    { name: "MENU MASTER", route: `${mapPaths.MENUMASTER}` },
    { name: "FORM MASTER", route: `${mapPaths.FORMMASTER}` },
     { name: "SCREEN FLOW", route: `${mapPaths.SCREENFLOW}`}, 
     { name: "MENU FLOW", route: `${mapPaths.MENUFLOW}`},
  ],
};

export const initValues = (role) =>{
 return role === "Developer" ? initValue.devDropDown : initValue.userDropdown
}

export const tableContent = {
  indiUser: {
    header: "INDIVIDUAL USER",
    tHead: ["User Name", "Mobile No", "Email ID", "Status"],
  },
  compUser: {
    header: "COMPANY USER",
    tHead: [
      "Company Name",
      "Contact",
      "Contact Email ID",
      "Contact Mobile",
      "Status",
    ],
  },
};
