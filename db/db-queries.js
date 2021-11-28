module.exports = (db) => {
  const getUserByEmail = function(email) {
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

  const getUserById = function(id) {
    return db.query(`
    SELECT * FROM users WHERE id = $1;`, [id])
    .then((result) => {
      if (result){
        return result.rows[0];
      } else {
        return null;
      }
    });
  };


  const updateInfo = function(email, newInfo){

    const queryParams =[];
    let queryString = `UPDATE users
    SET`

    if (newInfo.name) {
      queryParams.push(`${newInfo.name}`);
      queryString += ` name = $${queryParams.length}`;
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
    const values = [user.name, user.email, user.password]
    return db.query(`INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;`, values)
      .then((result) => {
        if (result) {
          return result.rows[0]
        } else {
          return null
        }
      })
      .catch((err) => console.log(err))
  }

  const addPin = function(object) {
    return db.query(`
    INSERT INTO posts (owner_id, title, description, content_type, content, tag, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `, [object.owner_id, object.title, object.description, object.content_type, object.content, object.tag, object.created_at])
    .then(result => result.rows[0])
    //testing, remove .rows[0] in production
  }

  return { getUserByEmail, updateInfo, addUser, getUserById, addPin };
};





