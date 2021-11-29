const express = require("express");
const router = express.Router();
const isUserLoggedIn = require("./helpers/isUserLoggedIn");

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("here");
    const userID = req.session.user_id;
    isUserLoggedIn(userID, db).then((isLoggedIn) => {
      //this is in every route and needs to be its own helper
      //the user id from cookie matches an id in the database
      //console.log("db user", dbusr);

      if (!isLoggedIn) {
        //user is already logged in
        console.log("user not logged in");
        return res.json({
          auth: false,
          message: "not logged in",
        });
      }
      //if user is logged in proceed with getting all pins from db
      db.getAllPins()
        .then((pins) => {
          console.log("success sending all pins");
          res.json({
            auth: true,
            message: "successfully got all pins",
            pins,
          });
        })
        .catch((err) => {
          res.status(500).json({
            auth: false,
            message: "internal server error",
          });
        });
    });
  });
  return router;
};
