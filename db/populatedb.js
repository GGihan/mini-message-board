#! /usr/bin/env node
import 'dotenv/config';
import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL,
  text VARCHAR(400) NOT NULL,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username, text)
VALUES
  ('Jeff', 'Hey, what is going on?'),
  ('Charles', 'Hello, World!'),
  ('Chris', 'Welcome to the Club!');
`;

async function main() {
  console.log('seeding...');
  const dbUrl = process.argv[2] || process.env.DB_URL;
  const client = new Client({
    connectionString: dbUrl,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();