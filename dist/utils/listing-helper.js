"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructFilter = void 0;
const lodash_1 = __importDefault(require("lodash"));
const knex_1 = __importDefault(require("../knex"));
function constructFilter(builder, filters = []) {
    const filterConfig = {
        eq: (field, value) => builder.having(field, "=", value),
        ne: (field, value) => builder.having(field, "<>", value),
        contains: (field, value) => builder.having(field, "like", `%${value}%`),
        notContains: (field, value) => builder.having(field, "not like", `%${value}%`),
        gt: (field, value) => builder.having(field, ">", value),
        ge: (field, value) => builder.having(field, ">=", value),
        lt: (field, value) => builder.having(field, "<", value),
        le: (field, value) => builder.having(field, "<=", value),
        in: (field, value) => builder.havingIn(field, value),
        notIn: (field, value) => builder.havingNotIn(field, value),
        between: (field, value) => builder.havingBetween(field, value),
        beginsWith: (field, value) => builder.having(field, "ilike", `${value}%`),
        endsWith: (field, value) => builder.having(field, "ilike", `%${value}`),
        isNull: (field, value) => builder.havingNull(field),
        isNotNull: (field, value) => builder.havingNotNull(field),
    };
    filters.map((filter) => filterConfig[filter.type](filter.field, filter.value));
}
exports.constructFilter = constructFilter;
function constructSearch(builder, search) {
    builder.having(knex_1.default.raw(`concat_ws(' ', ${search.fields.toString()}) ilike '%${search.value}%'`));
}
function fetchTableList({ baseQuery, filters = [], pagination = { limit: 100, offset: 0 }, sorting = [{ column: "createdAt", order: "desc" }], search = { fields: [], value: "" }, }) {
    return __awaiter(this, void 0, void 0, function* () {
        baseQuery.modify((builder) => constructFilter(builder, filters));
        if (!lodash_1.default.isEmpty(search.value))
            constructSearch(baseQuery, search);
        const countQuery = knex_1.default
            .from(baseQuery.clone().as("List"))
            .count({ count: `*` });
        const [countResult, rows] = yield Promise.all([
            countQuery,
            baseQuery
                .orderBy(sorting)
                .limit(pagination.limit)
                .offset(pagination.offset),
        ]);
        return { count: countResult[0].count, rows };
    });
}
exports.default = fetchTableList;
//# sourceMappingURL=listing-helper.js.map