DROP TABLE if EXISTS pin_ratings CASCADE;

CREATE TABLE pin_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  pin_id INTEGER REFERENCES pins(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL DEFAULT 0
);
