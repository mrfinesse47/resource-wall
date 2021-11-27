DROP TABLE if EXISTS posts CASCADE;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description VARCHAR(140),
  content_type TEXT,
  content TEXT,
  tag VARCHAR(20)
);

--repeating columns ratings and comments, should just join to get the relevant information
