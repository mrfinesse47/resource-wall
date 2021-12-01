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

const isUserLoggedIn = require("./routes/helpers/isUserLoggedIn");

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
const pinsRoutes = require("./routes/pins");
const dbHelpers = require("./db/db-queries")(db);

//middleware to check if the user is logged in or not
//it passes req.isLoggedin to all routes

app.use((req, res, next) => {
  const userID = req.session.user_id; //get users cookie

  isUserLoggedIn(userID, dbHelpers)
    .then((isLoggedIn) => {
      if (!isLoggedIn) {
        //user is already logged in
        req.isLoggedIn = false;
      } else {
        req.isLoggedIn = true;
        req.userID = userID;
      }
      next();
    })
    .catch((err) => {
      console.log("auth error:", err);
      res.status(500).json({
        auth: true,
        message: "internal server error",
      });
    });
});

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(dbHelpers));
app.use("/api/widgets", widgetsRoutes(dbHelpers));
app.use("/api/pins", pinsRoutes(dbHelpers));
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

// const email = "example@example.com";
// dbHelpers.getUserByEmail(email).then((result) => {
//   console.log('getUserByEmail', result);
// });
// const testId = 1;
// const testNewInfo = {
//   first_name: 'evan',
//   last_name: 'fish',
//   email: 'exale@exale.com',
//   password: 'test'
// };

// // UPDATE USER INFO //
// dbHelpers.updateUserInfo(testId, testNewInfo).then((result) => {
//   console.log('updateInfo', result);
// });

// ADD USER //
// dbHelpers.addUser(testNewInfo).then((result) => {
//   console.log('addUser', result);
// });

// // GET USER BY ID //
// dbHelpers.getUserById(1).then((result) => {
//   console.log('getUsetById', result);
// });

// dbHelpers.getUserById(1).then((result) => {
//   console.log('getUserById', result);
// });

// ADD PIN //
// const id = 1;
// const testPin = {
//   title: "is cell from dragon ball a cell",
//   description: "is cell a cell?",
//   content: "if cell is a cell would a group of cells be tissue? I need to know cause this is Science",
//   tag: 2,
//   url: 'www.example.com'
// };

// const testPin2 = {
//   title: 'is it canibalism if i eat an alaska roll?',
//   description: `please help i'm having a mental breakdown`,
//   content: 'are we eating people? like how soylent green is people?',
//   tag: 2
// };

// dbHelpers.addPin(id, testPin).then((result) => {
//   console.log('addPin', result);
// });

// dbHelpers.addPin(id, testPin2).then((result) => {
//   console.log('addPin2', result);
// });

// ADD RATING //
// const ratingTest = {
//   user_id: 1,
//   pin_id: 1,
//   rating: 4
// };
// dbHelpers.addRating(ratingTest).then((result) => {
//   console.log('addRating', result);
// });

// ADD COMMENT //
// const commentTest = {
//   user_id: 1,
//   pin_id: 1,
//   comment: 'CLICK THIS TO RECIEVE FREE BITCOIN',
// };

// dbHelpers.addComment(commentTest).then((result) => {
//   console.log('addComment', result);
// });

// ADD FAVORITE //
// const user = 16;
// const pinId = 3;
// dbHelpers.addFavorite(user, pinId).then((result) => {
//   console.log('addFavorite', result);
// });

// GET OWNED PINS //
// tested id as int and as string both work
// const testID = 13
// dbHelpers.getOwnedPins(testID).then((result) => {
//   console.log('OwnedPins', result);
// });

// // GET FAV PINS //
// dbHelpers.getFavPins(testID).then((result) => {
//   console.log('FavPins', result);
// });

// ALL PINS //
// dbHelpers.getAllPins().then((result) => {
//   console.log('getAll', result);
// });

// PIN BY ID //
// const testID = 3
// dbHelpers.getPinById(16).then((result) => {
//   console.log('Pin By Id', result);
// });

// PIN COMMENTS BY PIN ID //
// dbHelpers.getPinCommentsById(testID).then((result) => {
//   console.log('Pin Comments', result);
// });

// REFACTORED SEARCH FUNCTION //
// const testPhrase = 'history of';
// dbHelpers.searchPins(testPhrase).then((result) => {
//   console.log('NewSearchTest', result)
// });

// GET COMMENT BY COMMENT ID //
// const commentID = 1;
// dbHelpers.getCommentById(commentID).then((result) => {
//   console.log('commentID', result)
// });

// REFACTORED GET FAV PINS //
// dbHelpers.newGetFavPins(12).then((result) => {
//   console.log('newGetFav', result)
// })
