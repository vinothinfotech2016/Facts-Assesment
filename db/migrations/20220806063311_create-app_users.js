exports.up = function (knex) {
    return knex.schema.createTable("app_users", function (table) {
      table.string("id", 36).primary().notNullable();
      table.string("name");
      table.string("email");
      table.string("mobileNumber");
      table.string("productIds");
      table
        .string("roleId", 36)
        .references("id")
        .inTable("app_roles")
        .onDelete("CASCADE");
      table.string("password");
      table.bigInteger("createdAt");
      table.bigInteger("updatedAt");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("app_users");
  };
