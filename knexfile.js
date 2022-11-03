require("dotenv").config();

const { DB_CONNECTION_URL } = process.env;

module.exports = {
  development: {
    client: "mysql",
    connection: DB_CONNECTION_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
};
