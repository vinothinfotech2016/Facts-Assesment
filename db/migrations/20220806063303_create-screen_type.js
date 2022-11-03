exports.up = function (knex) {
  return knex.schema.createTable("screen_type", function (table) {
    table.string("id", 36).primary().notNullable();
    table.string("name");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(" screen_type ");
};
