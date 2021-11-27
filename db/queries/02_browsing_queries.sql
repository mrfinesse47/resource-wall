-- show all posts - can change limit whenever we want to whatever we want
`SELECT *
FROM posts
LIMIT 10;`
-- search post by title, tag or rating
-- based off lightbnb getAllProperties in terms of usage of queryParams and queryString refer back to lightbnb

const queryParams =[];
let queryString = `
SELECT posts.*, AVG(post_ratings.rating) AS average_rating
FROM posts
JOIN average_rating ON posts.id = post_ratings.post_id
`;

-- object name and keys subject to change
if (object.title) {
  queryParams.push(`%${object.title}%`);
  queryString += `WHERE title LIKE $${queryParams.length} `;
}

if (object.tag) {
  queryString += `${queryParams.length ? 'AND' : 'WHERE'} ` ;
  queryParams.push(object.tag);
  queryString += `tag = $${queryParams.length}`
}

queryString += `GROUP BY posts.id`

if (object.minimum_rating) {
  queryParams.push(object.minimum_rating);
  queryString += `HAVING AVG(post_rating.rating) > $${queryParams.length}`
}

queryString +=`
ORDER BY posts.created_at
LIMIT 10;
`;


