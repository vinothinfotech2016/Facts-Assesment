exports.up = function (knex) {
  return knex.schema.createTable("app_roles", function (table) {
    table.string("id", 36).primary().notNullable();
    table.string("role");
    table.string("accessMenus");
    table.bigInteger("createdAt");
    table.bigInteger("updatedAt");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(" app_roles ");
};
