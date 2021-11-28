/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const fakeUser = require("../fake-data/user.json");

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
    res.json({ users: "hello" });
  });
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    login(email, password)
      .then((user) => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        req.session.userId = user.id;
        res.send({ user: { name: user.name, email: user.email, id: user.id } });
      })
      .catch((e) => res.send(e));
    res.json({ users: "hello" });
  });
  return router;
};
