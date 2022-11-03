const { v4: uuid } = require("uuid");
const fs = require("fs");

const data = require("./data.json");

exports.seed = async function (knex) {
  await Promise.all(
    Object.keys(data).map(async (table) => {
      return Promise.all(
        data[table].map((item) => {
          if (!item.id) item.id = uuid();
          return knex(table)
            .where({ id: item.id })
            .then((result) => {
              if (result.length === 0) {
                return knex(table).insert(item);
              }
            });
        })
      );
    })
  );
  await fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify(data, 0, 2));
};
