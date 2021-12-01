DROP TABLE IF EXISTS tags CASCADE;

-- predetermined in MVP, maybe in stretch we can create our own tags

CREATE TABLE tags (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  thumbnail_url text
);
