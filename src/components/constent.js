export const initValue = {
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
  userDropdown: [
    { name: "My Profile", route: "/profile" },
    { name: "Customer", route: "/customer" },
    { name: "Roles & Access", route: "/roles" },
    { name: "My User", route: "/myuser" },
    { name: "Parameters", route: "/parameters" },
    { name: "Logout", route: "/" },
  ],
  stepper: [
    { name: "PRODUCT MASTER", route: "home/productMaster" },
    { name: "FORM MASTER", route: "home/formMaster" },
    { name: "MENU MASTER", route: "home/menuMaster" },
  ],
};
