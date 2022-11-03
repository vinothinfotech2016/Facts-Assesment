"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAFE_UPSERT_OPTIONS = exports.BASE_FIELDS = exports.TYPES = exports.SEARCH_FIELDS = exports.SORTING_FIELDS = exports.SORT_ORDER = exports.FILTER_FIELDS = void 0;
exports.FILTER_FIELDS = {
// Need to add the filter fields here based on the models (table)
};
exports.SORT_ORDER = { ASC: "ASC", DESC: "DESC" };
exports.SORTING_FIELDS = {
// Need to add the sort fields here based on the models (table)
};
exports.SEARCH_FIELDS = {
// Need to add the search fields here based on the models (table)
};
exports.TYPES = {
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
exports.BASE_FIELDS = {
    id: exports.TYPES.ID,
    // createdAt: TYPES.DATE,
    // createdBy: TYPES.ID,
    // updatedAt: TYPES.DATE,
    // updatedBy: TYPES.ID,
};
exports.SAFE_UPSERT_OPTIONS = {
    noDelete: true,
    insertMissing: true,
    relate: false,
    noUnrelate: false,
};
//# sourceMappingURL=variable.js.map