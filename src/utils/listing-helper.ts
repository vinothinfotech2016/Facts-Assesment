import _ from "lodash";
import knex from "../knex";

export function constructFilter(builder: any, filters: Filter[] = []) {
  const filterConfig: any = {
    eq: (field: string, value: any) => builder.having(field, "=", value),
    ne: (field: string, value: any) => builder.having(field, "<>", value),
    contains: (field: string, value: any) =>
      builder.having(field, "like", `%${value}%`),
    notContains: (field: string, value: any) =>
      builder.having(field, "not like", `%${value}%`),
    gt: (field: string, value: any) => builder.having(field, ">", value),
    ge: (field: string, value: any) => builder.having(field, ">=", value),
    lt: (field: string, value: any) => builder.having(field, "<", value),
    le: (field: string, value: any) => builder.having(field, "<=", value),
    in: (field: string, value: any) => builder.havingIn(field, value),
    notIn: (field: string, value: any) => builder.havingNotIn(field, value),
    between: (field: string, value: any) => builder.havingBetween(field, value),
    beginsWith: (field: string, value: any) =>
      builder.having(field, "ilike", `${value}%`),
    endsWith: (field: string, value: any) =>
      builder.having(field, "ilike", `%${value}`),
    isNull: (field: string, value: any) => builder.havingNull(field),
    isNotNull: (field: string, value: any) => builder.havingNotNull(field),
  };

  filters.map((filter) =>
    filterConfig[filter.type](filter.field, filter.value)
  );
}

function constructSearch(builder: any, search: Search) {
  builder.having(
    knex.raw(
      `concat_ws(' ', ${search.fields.toString()}) ilike '%${search.value}%'`
    )
  );
}

export default async function fetchTableList({
  baseQuery,
  filters = [],
  pagination = { limit: 100, offset: 0 },
  sorting = [{ column: "createdAt", order: "desc" }],
  search = { fields: [], value: "" },
}: {
  baseQuery: any;
  filters: Filter[];
  pagination: Pagination;
  sorting: Sort[];
  search: Search;
}) {
  baseQuery.modify((builder: any) => constructFilter(builder, filters));

  if (!_.isEmpty(search.value)) constructSearch(baseQuery, search);

  const countQuery = knex
    .from(baseQuery.clone().as("List"))
    .count({ count: `*` });

  const [countResult, rows] = await Promise.all([
    countQuery,
    baseQuery
      .orderBy(sorting)
      .limit(pagination.limit)
      .offset(pagination.offset),
  ]);
  return { count: countResult[0].count, rows };
}
