const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("get pins");
    res.json({ auth: false });

    db.getUserById(userID).then((dbusr) => {
      //this is in every route and needs to be its own helper
      //the user id from cookie matches an id in the database
      console.log("db user", dbusr);
      if (!dbusr) {
        //user is already logged in
        console.log("already logged in");
        return res.json({
          auth: true,
          message: "already logged in",
        });
      }
    });
  });
  return router;
};
