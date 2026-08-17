const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }
    : false
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL error:", err.message);
});

async function query(text, params) {
  return pool.query(text, params);
}

async function testDatabase() {
  const result = await query("SELECT NOW() AS now");
  return result.rows[0];
}

module.exports = {
  pool,
  query,
  testDatabase
};
