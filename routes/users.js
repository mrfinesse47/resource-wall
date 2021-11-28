/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
//const fakeUser = require("../fake-data/user.json");

module.exports = (db) => {
  router.get("/", (req, res) => {
    // db.query(`SELECT * FROM users;`)
    //   .then((data) => {
    //     // const users = data.rows;
    //     res.json({ users: "hello" });
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err.message });
    //   });
    res.json({
      users: "hello",
    });
  });

  router.post("/login", (req, res) => {
    const userID = req.session.user_id;

    console.log("here");

    if (!userID) {
      return res.json({
        auth: false,
        message: "not logged in"
      });
    }

    db.getUserById(userID).then((dbusr) => {
      if (dbusr) {
        //user is already logged in
        console.log("already logged in");
        return res.json({
          auth: true,
          message: "already logged in"
        });
      }

      //user is not logged in

      db.getUserByEmail(req.body.email)
        .then((user) => {
          if (user) {
            //if the user exists in the database
            if (req.body.password === user.password) {
              //check the user password vs the form password
              req.session.user_id = user.id;
              console.log("authenticated");
              res.json({
                auth: true,
                message: "success"
              });
            } else {
              console.log("not authenticated");
              res.json({
                auth: false,
                message: "bad password"
              });
            }
          } else {
            //user does not exist in db as per email
            console.log("email does not exist");
            res.json({
              auth: false,
              message: "not a valid email address"
            });
          }
        })
        .catch((err) => {
          //db error
          console.log("db error");
          console.log(err);
          res
            .status(500)
            .json({
              auth: false,
              message: "internal server error"
            });
        });
    });

    router.post("/logout", (req, res) => {
      req.session = null; //deletes user cookies
      res.json({
        auth: false,
        message: "sucessfully logged out user"
      });
    });
  });
  return router;
};
