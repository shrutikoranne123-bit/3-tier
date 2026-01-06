const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

app.use(cors());

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'db',
  database: process.env.PGDATABASE || 'mydb',
  password: process.env.PGPASSWORD || 'postgrespassword',
  port: process.env.PGPORT || 5432,
});

// Simple endpoint to get users from DB
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
});

// Seed database on start if table doesn't exist
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `);

    // Insert sample data if table is empty
    const { rows } = await pool.query('SELECT COUNT(*) FROM users');
    if (parseInt(rows[0].count, 10) === 0) {
      await pool.query("INSERT INTO users (name) VALUES ('Alice'), ('Bob'), ('Charlie');");
      console.log('Seeded users table');
    }
  } catch (err) {
    console.error('Error seeding database:', err);
  }
})();

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
