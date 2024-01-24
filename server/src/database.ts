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
// get the full conversation
export async function getFullConversation() {
  const QUERY_getAllNotes = `
  SELECT *
  FROM public_conversation;`;

  const result = await pool.query(QUERY_getAllNotes);
  return result[0];
}
// get the last ten messages
export async function getLastTenMessages() {
  const QUERY_getLastTenNotes = `
  SELECT *
  FROM public_conversation
  ORDER BY id DESC
  LIMIT 10;`;

  const result = await pool.query(QUERY_getLastTenNotes);
  return result[0];
}
// get a specific message by id
export async function getMessage(id: number) {
  const QUERY_getMessage = `
  SELECT *
  FROM public_conversation
  WHERE id = ?;`;

  const result = await pool.query(QUERY_getMessage, [id]);
  return result[0];
}
// create a new message
export async function createMessage(user: string, message_text: string) {
  const QUERY_createMessage = `
  INSERT INTO public_conversation (user, message_text)
  VALUES (?, ?);`;

  const result = await pool.query(QUERY_createMessage, [user, message_text]);
  return result;
}
