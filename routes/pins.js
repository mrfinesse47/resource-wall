const express = require("express");
const router = express.Router();
const isUserLoggedIn = require("./helpers/isUserLoggedIn");

//-----------------------------------------------------------------
// /api/pins/
//-----------------------------------------------------------------

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("here");
    const userID = req.session.user_id; //get users cookie
    isUserLoggedIn(userID, db).then((isLoggedIn) => {
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

  //-----------------------------------------------------------------
  // /api/pins/owned
  //-----------------------------------------------------------------

  router.get("/owned", (req, res) => {
    const userID = req.session.user_id; //get users cookie
    isUserLoggedIn(userID, db).then((isLoggedIn) => {
      if (!isLoggedIn) {
        //user is already logged in
        console.log("user not logged in");
        return res.json({
          auth: false,
          message: "not logged in",
        });
      }

      db.getOwnedPins(userID)
        .then((pins) => {
          res.json({
            auth: true,
            message: "successfully got users pins",
            pins,
          });
        })
        .catch(() => {
          res.status(500).json({
            auth: true,
            message: "internal server error",
          });
        });
    });
  });

  return router;
};
