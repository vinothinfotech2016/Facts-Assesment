exports.up = function (knex) {
    return knex.schema.createTable("level_one_menu", function (table) {
      table.string("id", 36).primary().notNullable();
      table.string("name");
      table.integer("orderNo");
      table
        .string("menuId", 36)
        .references("id")
        .inTable("product_menu")
        .onDelete("CASCADE");
      table.bigInteger("createdAt");
      table.bigInteger("updatedAt");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("level_one_menu");
  };
  