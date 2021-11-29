/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const isUserLoggedIn = require("./helpers/isUserLoggedIn");
//const fakeUser = require("../fake-data/user.json");

module.exports = (db) => {
  // router.get("/", (req, res) => {
  //   // res.json({
  //   //   users: "hello",
  //   // });
  // });

  //-----------------------------------------------------------------
  // /api/users/auth
  //-----------------------------------------------------------------

  router.get("/auth", (req, res) => {
    console.log(req.session.user_id);
    if (!req.session.user_id) {
      return res.json({ auth: false, message: "user has no cookie" });
    }
    const userID = req.session.user_id; //get users id from their cookie
    isUserLoggedIn(userID, db)
      .then((isLoggedIn) => {
        return res.json({ auth: isLoggedIn });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          auth: false,
          message: "internal server error",
        });
      });
    // res.json({ msg: "hi" });
  });

  //-----------------------------------------------------------------
  // /api/users/login
  //-----------------------------------------------------------------

  router.post("/login", (req, res) => {
    // if (!(req.session.user_id && req.session.email)) {
    //   return res.json({
    //     auth: false,
    //     message: "empty fields",
    //   });
    // }
    const userID = req.session.user_id; //get users id from their cookie

    isUserLoggedIn(userID, db).then((isLoggedIn) => {
      //the user is already logged in
      if (isLoggedIn) {
        console.log("already logged in");
        return res.json({
          auth: true,
          message: "already logged in",
        });
      }
      // user is not logged in

      db.getUserByEmail(req.body.email)
        .then((user) => {
          console.log(user, "db user");
          if (!user) {
            //user does not exist in db as per email
            console.log("email does not exist");
            return res.json({
              auth: false,
              message: "not a valid email address",
            });
          }
          if (req.body.password !== user.password) {
            //check the user password vs the form password

            console.log("not authenticated");
            return res.json({
              auth: false,
              message: "bad password",
            });
          }
          req.session.user_id = user.id;
          //sets the cookie for the client
          console.log(req.session.user_id);
          console.log("authenticated");
          res.json({
            auth: true,
            message: "success",
          });
        })
        .catch((err) => {
          //db error
          console.log("db error");
          console.log(err);
          res.status(500).json({
            auth: false,
            message: "internal server error",
          });
        });
    });
  });

  //-----------------------------------------------------------------
  // /api/users/logout
  //-----------------------------------------------------------------

  router.post("/logout", (req, res) => {
    req.session = null; //deletes user cookies
    res.json({
      auth: false,
      message: "sucessfully logged out user",
    });
  });

  //-----------------------------------------------------------------
  // /api/users/signup
  //-----------------------------------------------------------------

  router.post("/signup", (req, res) => {
    const userID = req.session.user_id;

    const user = {
      first_name: req.body.FirstName,
      last_name: req.body.LastName,
      email: req.body.email,
      password: req.body.password,
    };

    if (!(user.first_name && user.last_name && user.email && user.password)) {
      return res.json({ auth: false, message: "incomplete form" });
    }

    //first thing is to check if the user is already logged in

    isUserLoggedIn(userID, db).then((isLoggedIn) => {
      if (isLoggedIn) {
        //user is already logged in
        console.log("already logged in");
        return res.json({
          auth: true,
          message: "already logged in",
        });
      }

      //if they arent logged in we can then go about creating a user

      db.addUser(user)
        .then((result) => {
          if (!result) {
            console.log("not successful in adding new user");
            return res.json({
              auth: false,
              message: "not succesful in registering user",
            });
          }
          console.log("successfully added user to db: ", result);
          req.session.user_id = result.id; //set the cookie according to the userid returned from the database
          res.json({
            auth: true,
            message: "succesful registration",
          });
        })
        .catch((err) => {
          console.log("db error", err);
          res.status(500).json({
            auth: false,
            message: "internal server error",
          });
        });
    });
  });
  return router;
};
