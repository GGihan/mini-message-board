import pool from "./pool.js";

export async function getAllMessages() {
  const { rows } = await pool.query('SELECT * FROM messages');
  return rows;
}

export async function insertMessage(username, text) {
  await pool.query(`
    INSERT INTO messages (username, text)
    VALUES ($1, $2)`,
    [username, text]
  );
} 

export async function getMessage(id) {
  const { rows } = await pool.query(`
    SELECT * FROM messages
    WHERE id = $1`,
    [id]
  );
  return rows[0];
}