const fs = require("fs");

const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "=lv8xgJJ-Eklq4IsUZPY",
  },
  tls: {
    ca: fs.readFileSync("./http_ca.crt"),
    rejectUnauthorized: false,
  },
});

module.exports = client;
