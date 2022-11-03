export const FILTER_FIELDS: any = {
  // Need to add the filter fields here based on the models (table)
};

export const SORT_ORDER: any = { ASC: "ASC", DESC: "DESC" };

export const SORTING_FIELDS: any = {
  // Need to add the sort fields here based on the models (table)
};

export const SEARCH_FIELDS: any = {
  // Need to add the search fields here based on the models (table)
};

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
