// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(
  cookieSession({
    name: "user",
    keys: ["key1", "key2"],
  })
);

// app.set("view engine", "ejs"); dont neecd for SPA
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const dbHelpers = require("./db/db-queries")(db);

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(dbHelpers));
app.use("/api/widgets", widgetsRoutes(dbHelpers));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// getUser(db);

// --------------------------------------------------------------------------------------------------------------------------//
//                                               TESTING DB QUERIES                                                          //
// --------------------------------------------------------------------------------------------------------------------------//

const email = "example@example.com";
// dbHelpers.getUserByEmail(email).then((result) => {
//   console.log('getUserByEmail', result);
// });

const testNewInfo = {
  first_name: 'evan',
  last_name: 'fish',
  email: 'example@example.com',
  password: 'test'
}

// // UPDATE USER INFO //
// dbHelpers.updateUserInfo(email, testNewInfo).then((result) => {
//   console.log('updateInfo', result)
// });
// ADD USER //
// dbHelpers.addUser(testNewInfo).then((result) => {
//   console.log('addUser', result)
// });
// // GET USER BY ID //
// dbHelpers.getUserById(1).then((result) => {
//   console.log('getUsetById', result)
// });

// dbHelpers.getUserById(1).then((result) => {
//   console.log('getUserById', result)
// });

// const testPin = {
//   owner_id: 1,
//   title: "is cell from dbz a cell",
//   description: "is cell a cell?",
//   content_type: "Text",
//   content: "if cell is a cell would a group of cells be tissue?",
//   tag: "Science"
// }

// const testPin2 = {
//   owner_id: 2,
//   title: 'is it canibalism if i eat an alaska roll?',
//   description: `please help i'm having a mental breakdown`,
//   content_type: 'Text',
//   content: 'are we eating people? like how soylent green is people?',
//   tag: 'Science'
// }

// dbHelpers.addPin(testPin).then((result) => {
//   console.log('addPin', result)
// })

// dbHelpers.addPin(testPin2).then((result) => {
//   console.log('addPin2', result)
// })

// ADD RATING //
// const ratingTest = {
//   user_id: 1,
//   pin_id: 1,
//   rating: 4
// }
// dbHelpers.addRating(ratingTest).then((result) => {
//   console.log('addRating', result)
// })

// ADD COMMENT //
// const commentTest = {
//   user_id: 1,
//   pin_id: 1,
//   comment: 'CLICK THIS TO RECIEVE FREE BITCOIN',
// }
// dbHelpers.addComment(commentTest).then((result) => {
//   console.log('addComment', result)
// })

// ADD FAVORITE //
// const favoriteTest = {
//   user_id: 1,
//   pin_id: 1,
// }
// dbHelpers.addFavorite(favoriteTest).then((result) => {
//   console.log('addFavorite', result)
// })

// const testID = 16
// // GET OWNED PINS //
// dbHelpers.getOwnedPins(testID).then((result) => {
//   console.log('OwnedPins', result)
// });

// // GET FAV PINS //
// dbHelpers.getFavPins(testID).then((result) => {
//   console.log('FavPins', result)
// })

// ALL PINS //
dbHelpers.getAllPins().then((result) => {
  console.log('getAll', result)
})


// PIN SEARCH //
// comment - getPins works but currently due to seeds having too little fake data average rating seems a little obtuse
// tested conditions: all, title + rating

// const testPinSearch = {
//   title: 'Science'
// }

// dbHelpers.searchPins(testPinSearch).then((result) => {
//   console.log('search', result)
// })


