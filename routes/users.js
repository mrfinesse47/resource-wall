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
  //-----------------------------------------------------------------
  // /api/users/auth
  //-----------------------------------------------------------------

  router.get("/auth", (req, res) => {
    const {
      isLoggedIn
    } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    return res.json({
      auth: isLoggedIn,
      message: "user is logged in",
    });
  });

  //-----------------------------------------------------------------
  // /api/users/info
  //-----------------------------------------------------------------

  router.get("/info", (req, res) => {
    const {
      isLoggedIn,
      userID
    } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    db.getUserById(userID)
      .then((userInfo) => {
        return res.json({
          auth: true,
          message: "successful in getting user info",
          userInfo,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          auth: false,
          message: "internal server error",
        });
      });

    // return res.json({
    //   auth: isLoggedIn,
    //   message: "user is logged in",
    // });
  });

  //-----------------------------------------------------------------
  // /api/users/login
  //-----------------------------------------------------------------

  router.post("/login", (req, res) => {
    const {
      isLoggedIn
    } = req; //gets this from middleware
    if (isLoggedIn) {
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
            message: "User information is incorrect",
          });
        }
        if (req.body.password !== user.password) {
          //check the user password vs the form password

          return res.json({
            auth: false,
            message: "User information is incorrect",
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
    const user = {
      first_name: req.body.FirstName,
      last_name: req.body.LastName,
      email: req.body.email,
      password: req.body.password,
    };

    //makes sure the sign up form is complete

    if (!(user.first_name && user.last_name && user.email && user.password)) {
      return res.json({
        auth: false,
        message: "Please fill in all required fields",
      });
    }

    //second thing is to check if the user is already logged in

    const {
      isLoggedIn
    } = req; //gets this from middleware

    if (isLoggedIn) {
      return res.json({
        auth: true,
        message: "already logged in",
      });
    }

    //if they arent logged in we can then go about creating a user

    db.addUser(user)
      .then((result) => {
        if (!result) {
          return res.json({
            auth: false,
            message: "Email already in use",
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

  //-----------------------------------------------------------------
  // /api/users/:id/edit
  //-----------------------------------------------------------------

  router.post("/edit", (req, res) => {
    const user = {
      first_name: req.body.FirstName,
      last_name: req.body.LastName,
      email: req.body.email,
      password: req.body.password,
    };

    //makes sure the edit form is completenpm star

    const {
      isLoggedIn,
      userID
    } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in to edit",
        formError: null,
      });
    }

    if (!(user.first_name || user.last_name || user.email || user.password)) {
      return res.json({
        auth: true,
        message: "Please fill in all required fields",
        formError: true,
      });
    }

    //if the user is logged in add to the database

    db.updateUserInfo(userID, user)
      .then((result) => {
        if (!result) {
          return res.json({
            auth: true,
            message: "not successful in changing user details",
            formError: false,
          });
        }
        res.json({
          auth: true,
          message: "successful in changing user details",
          formError: false,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          auth: true,
          message: "internal server error",
          formError: null,
        });
      });
  });

  return router;
};
