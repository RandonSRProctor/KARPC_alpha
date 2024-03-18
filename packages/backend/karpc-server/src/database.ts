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
  FROM public_conversation
  WHERE id = ?;`;

  const result = await pool.query(QUERY_getNote, [id]);
  return result[0];
}

export async function createMessage(user: string, message_text: string) {
  const QUERY_createNote = `
  INSERT INTO public_conversation (user, message_text)
  VALUES (?, ?);`;

  const resultOfPost = await pool.query(QUERY_createNote, [user, message_text]);

  if (
    "insertId" in resultOfPost[0] === false ||
    typeof resultOfPost[0].insertId !== "number"
  ) {
    console.log(
      "Unable to retrieve id for new entry.  Something may have gone wrong",
    );
    return resultOfPost;
  }

  const resultOfGet = await getNote(resultOfPost[0].insertId);
  console.log(resultOfGet);

  return resultOfGet;
}
