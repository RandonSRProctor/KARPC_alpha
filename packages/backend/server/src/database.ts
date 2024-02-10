import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getFullConversation() {
  const QUERY_getAllNotes = `
  SELECT *
  FROM public_conversation;`;

  const result = await pool.query(QUERY_getAllNotes);
  return result[0];
}

export async function getNote(id: number) {
  const QUERY_getNote = `
  SELECT *
  FROM notes
  WHERE id = ?;`;

  const result = await pool.query(QUERY_getNote, [id]);
  return result[0];
}

export async function createNote(title: string, contents: string) {
  const QUERY_createNote = `
  INSERT INTO notes (title, contents)
  VALUES (?, ?);`;

  const result = await pool.query(QUERY_createNote, [title, contents]);
  return result;
}
