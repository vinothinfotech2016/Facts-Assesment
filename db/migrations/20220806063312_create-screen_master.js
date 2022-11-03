exports.up = function (knex) {
  return knex.schema.createTable("screen_master", function (table) {
    table.string("id", 36).primary().notNullable();
    table
      .string("productId", 36)
      .references("id")
      .inTable("product")
      .onDelete("CASCADE");
    table.string("screenNumber");
    table.string("screenName");
    table.string("screenDescription");
    table.string("screenTypeId");
    table.string("screenComplexityId");
    table.string("screenImageUrl");
    table.string("developerNotes");
    table.string("actionItems");
    table.string("status");
    table.string("effectiveDate");
    table.string("inActiveReason");
    table
      .string("createdBy")
      .references("id")
      .inTable("app_users")
      .onDelete("CASCADE");
    table
      .string("updatedBy")
      .references("id")
      .inTable("app_users")
      .onDelete("CASCADE");
    table.bigInteger("createdAt");
    table.bigInteger("updatedAt");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("screen_master");
};
