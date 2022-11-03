exports.up = function (knex) {
    return knex.schema.createTable("comments_reply", function (table) {
      table.string("id", 36).primary().notNullable();
      table
        .string("screenId", 36)
        .references("id")
        .inTable("screen_master")
        .onDelete("CASCADE");
      table.string("comments");
      table.string("reply");
      table.string("commentBy");
      table.string("repliedBy");
      table.bigInteger("createdAt");
      table.bigInteger("updatedAt");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("comments_reply");
  };
  