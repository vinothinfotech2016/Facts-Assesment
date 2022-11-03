exports.up = function (knex) {
  return knex.schema.createTable("product", function (table) {
    table.string("id", 36).primary().notNullable();
    table.string("name");
    table.string("description");
    table.string("leftLogoUrl");
    table.string("rightLogoUrl");
    table.string("centerLogoUrl");
    table.string("centerLogoText");
    table.string("status");
    table.string("effectiveDate");
    table.string("inActiveReason");
    table.string("createdBy",36)
    table.string("updatedBy", 36)
    table.bigInteger("createdAt");
    table.bigInteger("updatedAt");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("product");
};
