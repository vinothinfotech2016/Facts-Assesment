exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.string("id", 36).primary().notNullable();
    table.string("name");
    table.string("email");
    table.string("userType");
    table.string("userId");
    table.string("token");
    table.string("mobileNumber");
    table.string("address");
    table.string("state");
    table.string("products");
    table.string("district");
    table
      .string("roleId", 36)
      .references("id")
      .inTable("app_roles")
      .onDelete("CASCADE");
    table.string("pincode");
    table.string("password");
    table.bigInteger("createdAt");
    table.bigInteger("updatedAt");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(" users ");
};
