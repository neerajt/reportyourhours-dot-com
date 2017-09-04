
exports.up = function(knex, Promise) {
  return knex.schema.createTable('volunteers', function(table) {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('name').notNullable();
    table.jsonb('log').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('volunteers');
};
