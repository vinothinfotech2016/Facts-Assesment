export const apiRoutes = {
  //myUser
  CREATE_CUSTOMER: "createCustomer",
  USER_LOGIN: "userLogin",
  GET_ROLES: "roles/list",
  GET_USER: "getCustomers",

  //PRODUCTMASTER
  PRODUCT_CREATION: "product/create",
  GET_PRODUCT_BY_ID: "product/getProductById",
  UPDATE_PRODUCT: "product/update",

  // MENU MASTER
  CREATE_MENU: "product/menu/create",
  GET_MENU_BY_USER_ID: "/product/menu/getMenusByUser",
  UPDATE_MENU: "product/menu/update",

  // users
  USER_LISTING: "getAppUsers",
  CREATE_USER: "createAppUser",

  //form master
  CREATE_SCREEN: "screen/create",
  GET_SCREEN_BY_PRODUCT_ID: "screen/getScreensByProduct",
  GET_SCREEN_BY_ID: "screen/getScreen",
};
