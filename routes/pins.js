const express = require("express");
const router = express.Router();
const isUserLoggedIn = require("./helpers/isUserLoggedIn");

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("get pins");
    res.json({ auth: false });

    isUserLoggedIn(userID, db).then((isLoggedIn) => {
      //this is in every route and needs to be its own helper
      //the user id from cookie matches an id in the database
      console.log("db user", dbusr);

      if (!isLoggedIn) {
        //user is already logged in
        console.log("user not logged in");
        return res.json({
          auth: false,
          message: "not logged in",
        });
      }
    });
  });
  return router;
};
