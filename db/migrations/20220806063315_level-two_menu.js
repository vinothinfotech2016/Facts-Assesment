exports.up = function (knex) {
    return knex.schema.createTable("level_two_menu", function (table) {
      table.string("id", 36).primary().notNullable();
      table.string("name");
      table
        .string("levelOneId", 36)
        .references("id")
        .inTable("level_one_menu")
        .onDelete("CASCADE");
      table.bigInteger("createdAt");
      table.bigInteger("updatedAt");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("level_two_menu");
  };
  