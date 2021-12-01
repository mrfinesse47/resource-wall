const {
  query
} = require("express");

module.exports = (db) => {

  const getUserByEmail = function (email) {
    return db
      .query(`SELECT * FROM users WHERE email = $1;`, [email])
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const getUserById = function (id) {
    return db.query(`
    SELECT * FROM users WHERE id = $1;`, [id])
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const updateUserInfo = function (user_id, newInfo) {

    const queryParams = [];
    let queryString = `UPDATE users SET`;

    if (newInfo.first_name) {
      queryParams.push(`${newInfo.first_name}`);
      queryString += ` first_name = $${queryParams.length}`;
    }

    if (newInfo.last_name) {
      queryString += `${queryParams.length ? ', last_name = ' : ' last_name = '}`;
      queryParams.push(`${newInfo.last_name}`);
      queryString += `$${queryParams.length}`;
    }

    if (newInfo.email) {
      queryString += `${queryParams.length ? ', email = ' : ' email = '}`;
      queryParams.push(`${newInfo.email}`);
      queryString += `$${queryParams.length}`;
    }

    if (newInfo.password) {
      queryString += `${queryParams.length ? ', password = ' : 'password = '}`;
      queryParams.push(`${newInfo.password}`);
      queryString += `$${queryParams.length}`;
    }

    queryParams.push(user_id);
    queryString += ` WHERE id = $${queryParams.length} RETURNING *`;

    return db.query(queryString, queryParams).then((result) => result.rows[0]);
  };

  const addUser = function (user) {
    const values = [user.first_name, user.last_name, user.email, user.password];
    return db.query(`INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`, values)
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };

  const addPin = function(id, object) {
    let queryString = `INSERT INTO pins (owner_id, title, description, content, tag_id, created_at`;
    const queryParams = [id, object.title, object.description, object.content, object.tag];
    if (object.url) {
      queryString += ', url)';
      queryParams.push(object.url);
    } else {
      queryString += ')';
    }
    queryString += ` VALUES ($1, $2, $3, $4, $5, now()`

    if(object.url) {
      queryString += `, $6)`;
    } else {
      queryString += `)`;
    }
    queryString += ` RETURNING *;`;

    return db.query(queryString, queryParams)
      .then((result) => result.rows[0])
      .catch((err) => console.log(err))
  };

  const addRating = function (object) {
    return db.query(`
    INSERT INTO pin_ratings (user_id, pin_id, rating)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [object.user_id, object.pin_id, object.rating])
      .then((result) => result.rows[0])
      .catch((err) => console.log(err))
  };

  const addComment = function (object) {
    return db.query(`
    INSERT INTO comments (user_id, pin_id, comment, created_at)
    VALUES ($1, $2, $3, now())
    RETURNING *;
    `, [object.user_id, object.pin_id, object.comment])
      .then(result => result.rows[0])
      .catch((err) => console.log(err))
  };

  const addFavorite = function (id, pinId) {
    return db.query(`
    INSERT INTO favorite_pins (user_id, pin_id)
    VALUES ($1, $2)
    RETURNING *;
    `, [id, pinId])
      .then((result) => result.rows[0])
      .catch((err) => console.log(err))
  };

  const getOwnedPins = function (id) {
    return db.query(`
    SELECT pins.*, tags.name, tags.thumbnail_url, AVG(pin_ratings.rating) AS average_rating
    FROM pins
    JOIN tags ON pins.tag_id = tags.id
    LEFT JOIN pin_ratings ON pins.id = pin_ratings.pin_id
    WHERE owner_id = $1
    GROUP BY pins.id, tags.name, tags.thumbnail_url
    ORDER BY pins.created_at
    `, [id])
      .then((result) => result.rows)
      .catch((err) => console.log(err))
  };

  const getFavPins = function (id) {
    return db.query(`
    SELECT pins.*, tags.name, tags.thumbnail_url, AVG(rating.rating) AS average_rating
    FROM favorite_pins AS fav_pins
    JOIN pins on pins.id = fav_pins.pin_id
    LEFT JOIN pin_ratings AS rating ON rating.pin_id = pins.id
    JOIN tags ON tags.id = pins.tag_id
    WHERE fav_pins.user_id = $1
    GROUP BY pins.id, tags.name, tags.thumbnail_url;
    `, [id])
      .then((result) => result.rows)
      .catch((err) => console.log(err))
  }

  const getAllPins = function () {
    return db.query(`
    SELECT pins.*, tags.name, tags.thumbnail_url, AVG(pin_ratings.rating) AS average_rating
    FROM pins
    LEFT JOIN pin_ratings ON pins.id = pin_ratings.pin_id
    JOIN tags ON pins.tag_id = tags.id
    GROUP BY pins.id, tags.name, tags.thumbnail_url
    ORDER BY created_at;
    `)
    .then((result) => result.rows)
    .catch((err) => console.log(err))
  };

  const searchPins = function(pin) {
    const queryParam = `%${pin}%`;
    let queryString = `
    SELECT pins.*, tags.name, tags.thumbnail_url, AVG(pin_ratings.rating) AS average_rating
    FROM pins
    LEFT JOIN pin_ratings on pins.id = pin_ratings.pin_id
    JOIN tags ON pins.tag_id = tags.id
    WHERE LOWER(pins.title) LIKE LOWER($1)
    OR LOWER(tags.name) LIKE LOWER($1)
    OR LOWER(pins.description) LIKE LOWER($1)
    OR LOWER(pins.content) LIKE LOWER($1)
    GROUP BY pins.id , tags.name, tags.thumbnail_url
    ORDER BY pins.created_at
    `;
    return db.query(queryString, [queryParam])
      .then((result) => result.rows)
  }

  const getPinById = function (id) {
    return db.query(`
    SELECT pins.*, tags.name, tags.thumbnail_url, AVG(pin_ratings.rating) AS average_rating
    FROM pins
    LEFT JOIN pin_ratings ON pins.id = pin_ratings.pin_id
    JOIN tags ON pins.tag_id = tags.id
    WHERE pins.id = $1
    GROUP BY pins.id, tags.name, tags.thumbnail_url;
    `, [id])
      .then((result) => result.rows[0])
      .catch((err) => console.log(err))
  };

  const getPinCommentsById = function (id) {
    return db.query(`
    SELECT users.first_name, users.last_name, comments.*
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE pin_id = $1
    ORDER BY created_at;
    `, [id])
      .then((result) => result.rows)
      .catch((err) => console.log(err))
  };

  const getCommentById = function(commentId) {
    return db.query(`
    SELECT users.first_name, users.last_name, comments.*
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.id = $1
    ORDER BY created_at;
    `, [commentId])
      .then((result) => result.rows[0])
      .catch((err) => console.log(err))
  };

  const removeFavorite = function(user_id, pin_id) {
    return db.query(`
    DELETE FROM favorite_pins
    WHERE user_id = $1
    AND pin_id = $2
    RETURNING *
    `, [user_id, pin_id])
      .then((result) => result.rows[0])
      .catch((err) => {console.log(err)})
  };

  const getUserFavorites = function(user_id) {
    return db.query(`
    SELECT favorite_pins.id AS fav_id, favorite_pins.pin_id
    FROM favorite_pins
    WHERE user_id = $1`
    ,[user_id])
      .then((result) => result.rows)
      .catch((err) => console.log(err))
  };

  return { getUserByEmail, updateUserInfo, addUser, getUserById, addPin, addRating, addComment, addFavorite, getOwnedPins, getFavPins, getAllPins, searchPins, getPinById, getPinCommentsById, getCommentById, removeFavorite, getUserFavorites };
};
