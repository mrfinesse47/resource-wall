DROP TABLE IF EXISTS tags CASCADE;

CREATE TABLE tags (
  id SERIAL PRIMARY KEY NOT NULL,
<<<<<<< HEAD
  tag VARCHAR(255),
  thumbnail_url
)
=======
  name VARCHAR(255),
  thumbnail_url text
);
>>>>>>> db-queries
