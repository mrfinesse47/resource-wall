const express = require("express");
const router = express.Router();
const isUserLoggedIn = require("./helpers/isUserLoggedIn");

module.exports = (db) => {
  //-----------------------------------------------------------------
  // GET /api/pins/favorites/ --gets all the favorited pins
  //-----------------------------------------------------------------

  router.get("/favorites", (req, res) => {
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

      db.getFavPins(userID)
        .then((pins) => {
          res.json({
            auth: true,
            message: "successful in getting users favorite pins",
            pins,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            auth: true,
            message: "internal server error",
          });
        });
    });
  });

  //   const getFavPins = function (id) {
  //     return db
  //       .query(
  //         `
  //     SELECT pins.*
  //     FROM pins
  //     JOIN favorite_pins ON pins.id = favorite_pins.pin_id
  //     WHERE favorite_pins.user_id = $1
  //     `,
  //         [id]
  //       )
  //       .then((result) => result.rows)
  //       .catch((err) => console.log(err));
  //   };

  //-----------------------------------------------------------------
  // POST /api/pins/favorites/ --adds a favorite pin
  //-----------------------------------------------------------------

  router.post("/favorites", (req, res) => {
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
      console.log("user id", userID);
      db.addFavorite(userID, req.body.id)
        .then((pin) => {
          console.log(pin);
          res.json({
            auth: true,
            message: "successful in adding new favorite pin",
            pin,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            auth: true,
            message: "internal server error",
          });
        });
    });
  });

  //   const addFavorite = function(object) {
  //     return db.query(`
  //     INSERT INTO favorite_pins (user_id, pin_id)
  //     VALUES ($1, $2)
  //     RETURNING *;
  //     `, [object.user_id, object.pin_id])
  //       .then(result => result.rows[0])
  //       .catch((err) => console.log(err))
  //   };

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

      db.getPinById(pinID)
        .then((pin) => {
          res.json({
            auth: true,
            message: "successfully retrieved pin by ID",
            pin,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            auth: true,
            message: "internal server error",
          });
        });
    });
  });
  //-----------------------------------------------------------------
  // GET /api/pins/
  //-----------------------------------------------------------------

  //get all pins

  //right now the db limits it to 15

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

      db.addPin(pin)
        .then((result) => {
          console.log(result);
          res.json({
            auth: true,
            message: "success in adding a new pin",
            pin: result,
          });
        })
        .catch((err) => {
          console.log(err);
          res.json({ auth: "true", message: "logged in" });
        });
    });
  });

  //get all information about a paticular pin (rating,comments,likes)

  //-----------------------------------------------------------------
  // /api/pins/:id/edit -- edits an existing pin
  //-----------------------------------------------------------------

  //-----------------------------------------------------------------
  // /api/pins/:edit
  //-----------------------------------------------------------------

  //if the user owns a pin on the expanded view they can edit it
  return router;
};
