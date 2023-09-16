// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  production: {
    client: 'mysql',
    connection: {
        host : 'localhost',
        port : 3306,
        user : 'nodecal',
        password : 'Lw4dxzXKQUAJ',
        database : 'nodecal'
    }
  }
};