import { paths } from "../navigation/routePaths";

export const initValue = {
  userDropdown: [
    { name: "My Profile", route: `${paths.PROFILE}` },
    { name: "Customer", route: `${paths.CUSTOMER}` },
    { name: "Roles & Access", route: `${paths.ROLES}` },
    { name: "My User", route: `${paths.MYUSER}` },
    { name: "Parameters", route: `${paths.PARAM}` },
    { name: "Logout", route: `${paths.LOGIN}` },
  ],
  stepper: [
    { name: "PRODUCT MASTER", route: `${paths.PRODUCTMASTER}` },
    { name: "FORM MASTER", route: `${paths.FORMMASTER}` },
    { name: "MENU MASTER", route: `${paths.MENUMASTER}` },
  ],
};



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
