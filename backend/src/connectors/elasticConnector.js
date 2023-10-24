const fs = require("fs");

const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "*JiXm9p=f2rSP49_o-+U",
  },
  tls: {
    ca: fs.readFileSync("./http_ca.crt"),
    rejectUnauthorized: false,
  },
});

module.exports = client;
