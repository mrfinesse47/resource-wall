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
    db.getUserByEmail(req.body.email)
      .then((user) => {
        if (user) {
          if (req.body.password === user.password) {
            req.session.user_id = user.id;
            console.log("authenticated");
            res.json({ auth: true, message: "success" });
          } else {
            console.log("not authenticated");
            res.json({ auth: false, message: "bad password" });
          }
        } else {
          console.log("email does not exist");
          res.json({ auth: false, message: "not a valid email address" });
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
        res.status(500).json({ auth: false, message: "internal server error" });
      });

    router.post("/logout", (req, res) => {
      req.session = null; //deletes user cookies
      res.json({ auth: false });
    });
  });
  return router;
};
