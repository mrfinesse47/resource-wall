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


  const updateInfo = function(email, object){

    const queryParams =[];
    let queryString = `UPDATE users
    SET`

    if (object.name) {
      queryParams.push(`${object.name}`);
      queryString += ` name = $${queryParams.length}`;
    }

    if (object.email) {
      queryString += `${queryParams.length ? ', email = ' : ' email = '}`;
      queryParams.push(`${object.email}`);
      queryString += `$${queryParams.length}`;
    }

    if (object.password) {
      queryString += `${queryParams.length ? ', password = ' : 'password = '}`;
      queryParams.push(`${object.password}`);
      queryString += `$${queryParams.length}`;
    }

    queryParams.push(email)
    queryString += `
    WHERE email = $${queryParams.length}
    RETURNING *
    `

    return db.query(queryString, queryParams).then((result) => result.rows[0])
  }



  return { getUserByEmail, updateInfo };
};
