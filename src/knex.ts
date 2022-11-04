import Knex from "knex";

const {
  DB_CONNECTION_URL = "mysql://vhimysql:mysql_01@school-erp.cifnqjduqpnx.ap-south-1.rds.amazonaws.com:3306/design_tool",
  DB_HOST = "school-erp.cifnqjduqpnx.ap-south-1.rds.amazonaws.com",
  DB_PORT = "3306",
  DB_NAME = "design_tool",
  DB_USER = "vhimysql",
  DB_PASS = "mysql_01",
  DB_POOL_MIN = "2",
  DB_POOL_MAX = "100",
} = process.env;

let connection;
if (DB_HOST) {
  connection = {
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  };
} else {
  const props = DB_CONNECTION_URL.split("/");
  const database = props[3];
  const [host, port] = props[2].split("@")[1].split(":");
  const [user, password] = props[2].split("@")[0].split(":");
  connection = {
    database,
    host,
    port: parseInt(port, 10),
    user,
    password,
  };
}

const knex = Knex({
  client: "mysql",
  connection,
  pool: {
    min: parseInt(DB_POOL_MIN, 10),
    max: parseInt(DB_POOL_MAX, 10),
  },
});

export default knex;
