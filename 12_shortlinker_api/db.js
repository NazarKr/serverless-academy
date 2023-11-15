const { Client } = require("pg");

const client = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
});

client.connect();
client
  .query("select now()")
  .then((res) =>
    console.log("DB ^_^ connected successfully " + res.rows[0].now)
  );

module.exports = client;
