const { query } = require("express");

module.exports = (db) => {
  // GETS

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
    return db
      .query(
        `
    SELECT * FROM users WHERE id = $1;`,
        [id]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  // three table join, returns pin information owned by a specific user
  const getOwnedPins = function (id) {
    return db
      .query(
        `
    SELECT pins.*, tags.name, tags.thumbnail_url, AVG(pin_ratings.rating) AS average_rating
    FROM pins
    JOIN tags ON pins.tag_id = tags.id
    LEFT JOIN pin_ratings ON pins.id = pin_ratings.pin_id
    WHERE owner_id = $1
    GROUP BY pins.id, tags.name, tags.thumbnail_url
    ORDER BY pins.created_at
    `,
        [id]
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err));
  };

  // four table join, returns returns an array of objecsts containing all information of favorited pins by a specific user
  // object contains pin information, tag name and default thumbnail url and the average rating of said pin even if null
  const getFavPins = function (id) {
    return db
      .query(
        `
    SELECT pins.*, tags.name, tags.thumbnail_url, AVG(rating.rating) AS average_rating
    FROM favorite_pins AS fav_pins
    JOIN pins on pins.id = fav_pins.pin_id
    LEFT JOIN pin_ratings AS rating ON rating.pin_id = pins.id
    JOIN tags ON tags.id = pins.tag_id
    WHERE fav_pins.user_id = $1
    GROUP BY pins.id, tags.name, tags.thumbnail_url
    ORDER BY pins.created_at DESC;
    `,
        [id]
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err));
  };

  // three table join, returns all pins with relevant information orders by created_at
  const getAllPins = function () {
    return db
      .query(
        `
    SELECT pins.*, tags.name, tags.thumbnail_url, AVG(pin_ratings.rating) AS average_rating
    FROM pins
    LEFT JOIN pin_ratings ON pins.id = pin_ratings.pin_id
    JOIN tags ON pins.tag_id = tags.id
    GROUP BY pins.id, tags.name, tags.thumbnail_url
    ORDER BY created_at DESC;
    `
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err));
  };

  // three table join, search function that returns all pins information and average rating if a word or phrase matches
  // stored information in the title, tag, description or content
  // due to LOWER() syntax it is case insensitive
  const searchPins = function (pin) {
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
    ORDER BY pins.created_at DESC
    `;
    return db.query(queryString, [queryParam]).then((result) => result.rows);
  };

  // three table join returns all pins information with their average rating even if null
  const getPinById = function (id) {
    return db
      .query(
        `
    SELECT pins.*, tags.name, tags.thumbnail_url, AVG(pin_ratings.rating) AS average_rating
    FROM pins
    LEFT JOIN pin_ratings ON pins.id = pin_ratings.pin_id
    JOIN tags ON pins.tag_id = tags.id
    WHERE pins.id = $1
    GROUP BY pins.id, tags.name, tags.thumbnail_url;
    `,
        [id]
      )
      .then((result) => result.rows[0])
      .catch((err) => console.log(err));
  };

  const getPinCommentsById = function (id) {
    return db
      .query(
        `
    SELECT users.first_name, users.last_name, comments.*
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE pin_id = $1
    ORDER BY created_at;
    `,
        [id]
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err));
  };

  // two table join returns the comments table and user's full name when given a comment id
  const getCommentById = function (commentId) {
    return db
      .query(
        `
    SELECT users.first_name, users.last_name, comments.*
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.id = $1
    ORDER BY created_at;
    `,
        [commentId]
      )
      .then((result) => result.rows[0])
      .catch((err) => console.log(err));
  };

  const getUserFavorites = function (user_id) {
    return db
      .query(
        `
    SELECT favorite_pins.id AS fav_id, favorite_pins.pin_id
    FROM favorite_pins
    WHERE user_id = $1`,
        [user_id]
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err));
  };

  const getRatingsGeneralView = function (user_id) {
    return db
      .query(
        `
    SELECT *
    FROM pin_ratings
    WHERE user_id = $1
    `,
        [user_id]
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err));
  };

  const getRatingsExpandedView = function (user_id, pin_id) {
    return db
      .query(
        `
    SELECT *
    FROM pin_ratings
    WHERE user_id = $1
    AND pin_id = $2
    `,
        [user_id, pin_id]
      )
      .then((result) => result.rows[0])
      .catch((err) => console.log(err));
  };

  // ADD

  const addUser = function (user) {
    const values = [user.first_name, user.last_name, user.email, user.password];
    return db
      .query(
        `INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
        values
      )
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

  // everything is mandatory with exception to url which can be added if the key value pair exists in the object
  const addPin = function (id, object) {
    let queryString = `INSERT INTO pins (owner_id, title, description, content, tag_id, created_at`;
    const queryParams = [
      id,
      object.title,
      object.description,
      object.content,
      object.tag,
    ];
    if (object.url) {
      queryString += ", url)";
      queryParams.push(object.url);
    } else {
      queryString += ")";
    }
    queryString += ` VALUES ($1, $2, $3, $4, $5, now()`;

    if (object.url) {
      queryString += `, $6)`;
    } else {
      queryString += `)`;
    }
    queryString += ` RETURNING *;`;

    return db
      .query(queryString, queryParams)
      .then((result) => result.rows[0])
      .catch((err) => console.log(err));
  };

  const addRating = function (user_id, pin_id, rating) {
    return db
      .query(
        `
    INSERT INTO pin_ratings (user_id, pin_id, rating)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
        [user_id, pin_id, rating]
      )
      .then((result) => result.rows[0])
      .catch((err) => console.log(err));
  };

  const addComment = function (object) {
    return db
      .query(
        `
    INSERT INTO comments (user_id, pin_id, comment, created_at)
    VALUES ($1, $2, $3, now())
    RETURNING *;
    `,
        [object.user_id, object.pin_id, object.comment]
      )
      .then((result) => result.rows[0])
      .catch((err) => console.log(err));
  };

  const addFavorite = function (id, pinId) {
    return db
      .query(
        `
    INSERT INTO favorite_pins (user_id, pin_id)
    SELECT $1, $2
    WHERE NOT EXISTS (
        SELECT user_id, pin_id
        FROM favorite_pins
        WHERE user_id = $1 AND pin_id = $2
    )
    RETURNING *;
    `,
        [id, pinId]
      )
      .then((result) => result.rows[0])
      .catch((err) => console.log(err));
  };

  // OLD FUNCTIONALITY
  // INSERT INTO favorite_pins (user_id, pin_id)
  // VALUES ($1, $2)
  // RETURNING *;

  // EDIT
  // can edit one thing or everything, if statements check if the key exists will append the proper syntax
  // if it is there is already and existing key a , is added in between columns being updated if there are multiple
  // returns the new values in an object
  const updateUserInfo = function (user_id, newInfo) {
    const queryParams = [];
    let queryString = `UPDATE users SET`;

    if (newInfo.first_name) {
      queryParams.push(`${newInfo.first_name}`);
      queryString += ` first_name = $${queryParams.length}`;
    }

    if (newInfo.last_name) {
      queryString += `${
        queryParams.length ? ", last_name = " : " last_name = "
      }`;
      queryParams.push(`${newInfo.last_name}`);
      queryString += `$${queryParams.length}`;
    }

    if (newInfo.email) {
      queryString += `${queryParams.length ? ", email = " : " email = "}`;
      queryParams.push(`${newInfo.email}`);
      queryString += `$${queryParams.length}`;
    }

    if (newInfo.password) {
      queryString += `${queryParams.length ? ", password = " : " password = "}`;
      queryParams.push(`${newInfo.password}`);
      queryString += `$${queryParams.length}`;
    }

    queryParams.push(user_id);
    queryString += ` WHERE id = $${queryParams.length} RETURNING *`;

    return db.query(queryString, queryParams).then((result) => result.rows[0]);
  };

  // REMOVE
  // returns removed pin_id and id
  const removeFavorite = function (user_id, pin_id) {
    return db
      .query(
        `
    DELETE FROM favorite_pins
    WHERE user_id = $1
    AND pin_id = $2
    RETURNING *
    `,
        [user_id, pin_id]
      )
      .then((result) => result.rows[0])
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    getUserByEmail,
    updateUserInfo,
    addUser,
    getUserById,
    addPin,
    addRating,
    addComment,
    addFavorite,
    getOwnedPins,
    getFavPins,
    getAllPins,
    searchPins,
    getPinById,
    getPinCommentsById,
    getCommentById,
    removeFavorite,
    getUserFavorites,
    getRatingsExpandedView,
    getRatingsGeneralView,
  };
};
