-- sign up
`INSERT INTO users (name, email, password)
VALUES ($1, $2, $3);`, [values]

-- login
`SELECT *
FROM users
WHERE email = $1;`, [values]

-- update information, returning is optional if we want to see changes without another query. Will update information and then return the results
`UPDATE users
SET col1 = val1,
    col2 = val2,
    col3 = val3
WHERE email = $1
RETURNING *;`, [email]

-- possible implementation based of lightbnb get all properties queryParams and queryString used to check if a , is needed and to correctly assign $1, $2 or $3. Should in theory allows us to change name, email, password either individually, in pairs or all together.

const email = [object.email]
const queryParams =[];
let queryString = `UPDATE users
SET`

-- change object to whatever name later
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

queryString += `WHERE email = $1`, email
