require('./config/environment').setup();

module.exports = {

  [process.env.NODE_ENV]: {
    client: process.env.DB_CLIENT,
    connection: process.env.DATABASE_URL,
    // this will probably be moved in process.env as well.
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ssl: true
  }

};
