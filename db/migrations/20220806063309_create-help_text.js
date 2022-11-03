exports.up = function (knex) {
  return knex.schema.createTable("help_text", function (table) {
    table.integer("id");
    table.string("helpText");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(" help_text ");
};
