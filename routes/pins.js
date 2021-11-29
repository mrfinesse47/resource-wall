const express = require("express");
const router = express.Router();
const isUserLoggedIn = require("./helpers/isUserLoggedIn");

module.exports = (db) => {
  //-----------------------------------------------------------------
  // GET /api/pins/
  //-----------------------------------------------------------------

  //get all pins

  router.get("/", (req, res) => {
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
  // POST /api/pins/ --  add new pin
  //-----------------------------------------------------------------

  router.post("/", (req, res) => {
    const userID = req.session.user_id; //get users cookie
    isUserLoggedIn(userID, db).then((isLoggedIn) => {
      if (!isLoggedIn) {
        //user is already logged in
        return res.json({
          auth: false,
          message: "not logged in",
        });
      }

      const pin = {
        owner_id: userID, //from the user cookie once authenticated
        title: req.body.title,
        description: req.body.description,
        content_type: req.body.content_type,
        content: req.body.content,
        tag: req.body.tag,
      };

      if (
        !(
          pin.owner_id &&
          pin.title &&
          pin.description &&
          pin.content_type &&
          pin.content &&
          pin.tag
        )
      ) {
        return res.json({ auth: false, message: "incomplete form" });
      }

      //   [object.owner_id, object.title, object.description, object.content_type, object.content, object.tag])
      //   .then(result => result.rows[0])

      db.addPin(pin)
        .then((result) => {
          console.log(result);
          res.json({ auth: true, message: "success in adding a new pin" });
        })
        .catch((err) => {
          console.log(err);
          res.json({ auth: "true", message: "logged in" });
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

//-----------------------------------------------------------------
// /api/pins/favorites/ --gets all the favorited pins
//-----------------------------------------------------------------

//get all information about a paticular pin (rating,comments,likes)

//-----------------------------------------------------------------
// /api/pins/:id
//-----------------------------------------------------------------

//get pin by pin ID
router.get("/:pinID", (req, res) => {
  const userID = req.session.user_id; //get users cookie
  isUserLoggedIn(userID, db).then((isLoggedIn) => {
    if (!isLoggedIn) {
      //user is already logged in
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }
    const { pinID } = req.params;

    return res.json({
      auth: true,
      message: "success",
    });
  });
});
//-----------------------------------------------------------------
// /api/pins/:id/edit -- edits an existing pin
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// /api/pins/:edit
//-----------------------------------------------------------------

//if the user owns a pin on the expanded view they can edit it
