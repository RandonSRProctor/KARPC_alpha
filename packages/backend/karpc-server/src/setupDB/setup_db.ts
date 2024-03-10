import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
console.log("1.1 start setup db");

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })
  .promise();

try {
  const result = await pool.query(
    `DROP DATABASE ${process.env.MYSQL_DATABASE};`
  );
} catch (error) {
  // Extra gymnastics because TS doesn't like unknown errors
  if (
    typeof error === "object" &&
    error !== null &&
    "errno" in error &&
    error?.errno === 1008
  ) {
    console.log(
      `No previous instance of ${process.env.MYSQL_DATABASE} \n Creating new instance of ${process.env.MYSQL_DATABASE}`
    );
  } else {
    console.error(error);
  }
}
await pool.query(`CREATE DATABASE ${process.env.MYSQL_DATABASE}`);
await pool.query(`USE ${process.env.MYSQL_DATABASE}`);
await pool.query(`CREATE TABLE public_conversation (
  id integer PRIMARY KEY AUTO_INCREMENT,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  user VARCHAR(255) NOT NULL,
  message_text VARCHAR(255)
  );`);

await pool.query(`INSERT INTO public_conversation (user, message_text)
  VALUES ('randy', 'Hey Khalil!'),
  ('khalil', 'Hey Khalil!'),
  ('randy', 'What are you up to?'),
  ('khalil', 'Some pair programming!');`);

await pool.query(`SELECT * FROM public_conversation;`);

pool.end();
console.log("1.2 end setup db");
