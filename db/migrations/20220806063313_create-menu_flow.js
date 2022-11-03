exports.up = function (knex) {
    return knex.schema.createTable("menu_flow", function (table) {
      table.string("id", 36).primary().notNullable();
      table
      .string("productId", 36)
      .references("id")
      .inTable("product")
      .onDelete("CASCADE");
      table
      .string("menuId", 36)
      .references("id")
      .inTable("product_menu")
      .onDelete("CASCADE");
      table
      .string("levelOneId", 36)
      .references("id")
      .inTable("level_one_menu")
      .onDelete("CASCADE");
      table
      .string("levelTwoId", 36)
      .references("id")
      .inTable("level_two_menu")
      .onDelete("CASCADE");
      table
      .string("screenId", 36)
      .references("id")
      .inTable("screen_master")
      .onDelete("CASCADE");
      table.bigInteger("createdAt");
      table.bigInteger("updatedAt");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("menu_flow");
  };
