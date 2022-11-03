exports.up = function (knex) {
  return knex.schema.createTable("product_menu", function (table) {
    table.string("id", 36).primary().notNullable();
    table
      .string("productId", 36)
      .references("id")
      .inTable("product")
      .onDelete("CASCADE");
    table.string("name");
    table.integer("orderNo");
    table.string("subMenus");
    table.string("effectiveDate");
    table.string("displayType");
    table.string("menuParams"),
    table.string("status"),
    table.string("inActiveReason"),
    table.bigInteger("createdAt");
    table.bigInteger("updatedAt");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(" product_menu ");
};
