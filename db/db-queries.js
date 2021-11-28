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

  const addUser = function(object) {

  }



  return { getUserByEmail, updateInfo };
};
