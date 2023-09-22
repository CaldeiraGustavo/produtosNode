/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', (table) => {
        table.increments('id')
        table.text('nome', 255).unique().notNullable()
        table.text('login', 255).unique().notNullable()
        table.text('email', 255).notNullable()
        table.text('senha', 255).notNullable()
        table.text('roles', 255).notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('usuarios')
};
