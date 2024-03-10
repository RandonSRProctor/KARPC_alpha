-- @block
DROP DATABASE karpc_alpha;
-- @block
CREATE DATABASE karpc_alpha;
USE karpc_alpha;
CREATE TABLE public_conversation (
  id integer PRIMARY KEY AUTO_INCREMENT,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  user VARCHAR(255) NOT NULL,
  message_text VARCHAR(255)
);
INSERT INTO public_conversation (user, message_text)
VALUES ('randy', 'Hey Khalil!'),
  ('khalil', 'Hey Khalil!'),
  ('randy', 'What are you up to?'),
  ('khalil', 'Some pair programming!');
-- @block
SELECT *
FROM public_conversation;