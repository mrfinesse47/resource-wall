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


  const updateUserInfo = function (email, newInfo) {

    const queryParams = [];
    let queryString = `UPDATE users
    SET`

    if (newInfo.first_name) {
      queryParams.push(`${newInfo.name}`);
      queryString += ` first_name = $${queryParams.length}`;
    }

    if (newInfo.last_name) {
      queryString += `${queryParams.length ? ', last_name = ' : ' last_name = '}`;
      queryParams.push(`${newInfo.name}`);
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

    queryParams.push(email)
    queryString += `
    WHERE email = $${queryParams.length}
    RETURNING *
    `

    return db.query(queryString, queryParams).then((result) => result.rows[0])
  }

  const addUser = function(user) {
    const values = [user.first_name, user.last_name, user.email, user.password]
    return db.query(`INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`, values)
      .then((result) => {
        if (result) {
          return result.rows[0]
        } else {
          return null
        }
      })
      .catch((err) => {
        console.log(err)
        return null
      })
  }

  const addPin = function(object) {
    return db.query(`
    INSERT INTO pins (owner_id, title, description, content_type, content, tag, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, now())
    RETURNING *;
    `, [object.owner_id, object.title, object.description, object.content_type, object.content, object.tag])
      .then(result => result.rows[0])
    //testing, remove .rows[0] in production
  }

  const addRating = function(object) {
    return db.query(`
    INSERT INTO pin_ratings (user_id, pin_id, rating)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [object.user_id, object.pin_id, object.rating])
      .then(result => result.rows[0])
      .catch((err) => console.log(err))
  };

  const addComment = function(object) {
    return db.query(`
    INSERT INTO comments (user_id, pin_id, comment, created_at)
    VALUES ($1, $2, $3, now())
    RETURNING *;
    `, [object.user_id, object.pin_id, object.comment])
      .then(result => result.rows)
      .catch((err) => console.log(err))
  };

  const addFavorite = function(object) {
    return db.query(`
    INSERT INTO favorite_pins (user_id, pin_id)
    VALUES ($1, $2)
    RETURNING *;
    `, [object.user_id, object.pin_id])
      .then(result => result.rows[0])
      .catch((err) => console.log(err))
  };

  const getOwnedPins = function(id) {
    return db.query(`
    SELECT *
    FROM pins
    WHERE owner_id = $1
    `, [id])
      .then(result => result.rows)
      .catch((err) => console.log(err))
  };

  const getFavPins = function(id) {
    return db.query(`
    SELECT pins.*
    FROM pins
    JOIN favorite_pins ON pins.id = favorite_pins.pin_id
    WHERE favorite_pins.user_id = $1
    `, [id])
      .then(result => result.rows)
      .catch((err) => console.log(err))
  }

  const getAllPins = function() {
    return db.query(`
    SELECT *
    FROM pins
    LIMIT 15;
    `)
    .then(result => result.rows)
    .catch((err) => console.log(err))
  }

  const searchPins = function (pin) {
    const queryParams = [];
    let queryString = `
    SELECT pins.*, AVG(pin_ratings.rating) AS average_rating
    FROM pins
    JOIN pin_ratings ON pins.id = pin_ratings.pin_id
    `;

    if (pin.title) {
      queryParams.push(`%${pin.title}%`);
      queryString += `WHERE title LIKE $${queryParams.length} `;
    }

    if (pin.tag) {
      queryString += `${queryParams.length ? 'AND' : 'WHERE'} `;
      queryParams.push(pin.tag);
      queryString += `tag = $${queryParams.length}`
    }

    queryString += `GROUP BY pins.id`

    if (pin.minimum_rating) {
      queryParams.push(pin.minimum_rating);
      queryString += `HAVING AVG(pin_rating.rating) > $${queryParams.length}`
    }

    queryString += `
    ORDER BY pins.created_at
    `;

    return db.query(queryString, queryParams).then((result) => result.rows)
  }


  return { getUserByEmail, updateUserInfo, addUser, getUserById, addPin, addRating, addComment, addFavorite, getOwnedPins, getFavPins, getAllPins, searchPins };
};
