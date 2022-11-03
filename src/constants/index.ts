// import EduBoard from "../models/EduBoard";
// import GovernmentType from "../models/GovernmentType";
// import OrganizationType from "../models/OrganizationType";
// import Role from "../models/Role";
// import CampusType from "../models/CampusType";
// import Facility from "../models/Facility";
// import ClassCategory from "../models/ClassCategory";
// import Language from "../models/Language";
// import EmployeeType from "../models/EmployeeType";
// import District from "../models/District";
// import State from "../models/State";
// import Gender from "../models/Gender";
// import Designation from "../models/Designation";
// import Menu from "../models/Menu";
// import AtttendanceStatus from "../models/AtttendanceStatus";
// import LeaveType from "../models/LeaveType";
// import LeaveStatus from "../models/LeaveStatus";

// export const FILTER_FIELDS: any = {
//   // Need to add the filter fields here based on the models (table)
// };

// export const SORT_ORDER: any = { ASC: "ASC", DESC: "DESC" };

// export const SORTING_FIELDS: any = {
//   // Need to add the sort fields here based on the models (table)
// };

// export const SEARCH_FIELDS: any = {
//   // Need to add the search fields here based on the models (table)
// };

// export const MODELS: any = {
//   facility: Facility,
//   campusType: CampusType,
//   governmentType: GovernmentType,
//   organizationType: OrganizationType,
//   role: Role,
//   branchCategory: EduBoard,
//   classCategory: ClassCategory,
//   language: Language,
//   employeeType: EmployeeType,
//   state: State,
//   district: District,
//   gender: Gender,
//   menu: Menu,
//   designation: Designation,
//   attendanceStatus: AtttendanceStatus,
//   leaveType: LeaveType,
//   leaveStatus: LeaveStatus,
// };

export const TYPES = {
  STRING: {
    type: ["string", "null"],
    minLength: 0,
    maxLength: 255,
  },
  LONGTEXT: {
    type: ["string", "null"],
    minLength: 0,
    maxLength: 4294967295,
  },
  ID: {
    type: "string",
    minLength: 0,
    maxLength: 36,
  },
  EMAIL: {
    type: "string",
    minLength: 0,
    maxLength: 255,
  },
  TEXT: {
    type: ["string", "null"],
    minLength: 0,
    maxLength: 65535,
  },
  DECIMAL: {
    type: ["number", "null"],
  },
  INTEGER: {
    type: ["integer", "null"],
  },
  BOOLEAN: {
    type: ["boolean", "null"],
  },
  CUSTOMSTRING: (length = 100) => ({
    type: ["string", "null"],
    minLength: 0,
    maxLength: length,
  }),
  DATE: {
    type: ["string", "null"],
  },
  JSON: {
    type: ["object", "null"],
  },
  TIME: {
    type: ["string", "null"],
  },
  YEAR: {
    type: ["string", "null"],
  },
};

export const BASE_FIELDS = {
  id: TYPES.ID,
  // createdAt: TYPES.DATE,
  // createdBy: TYPES.ID,
  // updatedAt: TYPES.DATE,
  // updatedBy: TYPES.ID,
};

export const SAFE_UPSERT_OPTIONS = {
  noDelete: true,
  insertMissing: true,
  relate: false,
  noUnrelate: false,
};

export enum ROLE_TYPES {
  SUPER_ADMIN = "8b0a059d-3bc4-4e63-a532-40cba852ae15",
  NON_SUPER_ADMIN = "d3ab0c6d-c8c6-4b0d-af49-25840c47c27c",
}

// export enum APPLICATION_ROLES {
//   SUPER_ADMIN = "0bee062a-a8b1-4ca3-9ffd-d7c7109a96c0",
//   CAMPUS_ADMIN = "6eb18053-94ba-4301-87c9-435789297b26",
//   BRANCH_ADMIN = "96059fce-19f3-4502-b972-68be69309b08",
//   TEACHER = "20dee8f9-7cba-4e7c-8525-56a877554b91",
//   DRIVER = "790f53fb-e574-4bae-97f0-b72837996250",
//   PARENT = "6cb7697f-6210-4ffc-a0eb-8a0d1181a9d4",
//   OTHERS = "362570c1-b8a3-4e9b-a963-8b0c92ec2f39",
// }
export const PROD_ROLES = {
  VHITECH_ADMIN: "Vhitech Admin",
  PARENT: "Parent",
  TEACHER: "Teacher",
  DRIVER: "Driver",
};

export enum ATTENDANCE_STATUS {
  PRESENT = "848b0592-8dc4-42c7-a7da-826f747cbabe",
  ABSENT = "274e441c-5d7b-44c0-ac23-6ffbc54cb286",
  NOT_YET_MARKED = "340b1d5a-463a-48f6-acaf-2f0baa8ce149",
}
export const JWT_TOKEN_SCERET = "kXp2s5v8y/A?D(G+";
export const REFRESH_TOKEN_SCERET = "hWmZq3t6w9z$C&F)";
