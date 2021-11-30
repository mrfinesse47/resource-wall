const express = require("express");
const router = express.Router();
const isUserLoggedIn = require("./helpers/isUserLoggedIn");

module.exports = (db) => {
  //-----------------------------------------------------------------
  // POST /api/pins/search
  //-----------------------------------------------------------------

  router.post("/search", (req, res) => {});

  //-----------------------------------------------------------------
  // GET /api/pins/:id/comments
  //-----------------------------------------------------------------

  //-----------------------------------------------------------------
  // POST /api/pins/:id/comments
  //-----------------------------------------------------------------

  router.post("/:pinID/comments", (req, res) => {
    // const userID = req.session.user_id; //from the cookie
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    const { pinID } = req.params;

    // user_id, pin_id, comment

    const comment = {
      user_id: userID,
      pin_id: pinID,
      comment: req.body.comment,
    };

    // console.log(comment);

    db.addComment(comment)
      .then((result) => {
        console.log(result[0].id);
        return db.getPinCommentsById(result[0].pin_id);
      })
      .then((comment) => {
        console.log(comment);
        res.json({
          auth: true,
          message: "successfully created comment",
          comment,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          auth: true,
          message: "internal server error",
        });
      });

    // addComment();
  });

  //-----------------------------------------------------------------
  // GET /api/pins/favorites/ --gets all the favorited pins
  //-----------------------------------------------------------------

  router.get("/favorites", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    db.getFavPins(userID)
      .then((pins) => {
        if (!pins) {
          return res.json({
            auth: true,
            message: "not successful in getting users favorite pins",
            pins,
          });
        }
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

  //-----------------------------------------------------------------
  // POST /api/pins/favorites/ --adds a favorite pin
  //-----------------------------------------------------------------

  router.post("/favorites", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }
    console.log("user id", userID);
    db.addFavorite(userID, req.body.id)
      .then((pin) => {
        if (!pin) {
          return res.json({
            auth: true,
            message: "not successful in adding new favorite pin",
            pin,
          });
        }
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

  //-----------------------------------------------------------------
  // /api/pins/owned --gets the pins that a user owns
  //-----------------------------------------------------------------

  router.get("/owned", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    db.getOwnedPins(userID)
      .then((pins) => {
        if (!pins) {
          res.json({
            auth: true,
            message: "not successfull in getting users pins",
            pins,
          });
        }
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

  //-----------------------------------------------------------------
  // /api/pins/:id
  //-----------------------------------------------------------------

  //get pin by pin ID
  router.get("/:pinID", (req, res) => {
    const { isLoggedIn } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }
    const { pinID } = req.params;

    Promise.all([db.getPinById(pinID), db.getPinCommentsById(pinID)])
      .then((values) => {
        console.log(values);
        if (!values[0] || !values[1]) {
          res.json({
            auth: true,
            message: "not successfull in getting users pins",
            pins,
          });
        }
        res.json({
          auth: true,
          message: "successfully retrieved pin by ID",
          pin: values[0],
          comments: values[1],
        });
      })
      .catch((err) => {
        res.status(500).json({
          auth: true,
          message: "internal server error",
        });
      });
  });

  //-----------------------------------------------------------------
  // GET /api/pins/
  //-----------------------------------------------------------------

  //get all pins

  //right now the db limits it to 15

  router.get("/", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
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

  //-----------------------------------------------------------------
  // POST /api/pins/ --  add new pin
  //-----------------------------------------------------------------

  router.post("/", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    const pin = {
      owner_id: userID, //from the user cookie once authenticated
      title: req.body.title,
      description: req.body.description,
      // content_type: req.body.content_type,
      content: req.body.content,
      tag: req.body.tag,
    };

    console.log(pin);
    if (
      !(
        pin.owner_id &&
        pin.title &&
        pin.description &&
        // pin.content_type &&
        pin.content &&
        pin.tag
      )
    ) {
      return res.json({ auth: true, message: "incomplete form" });
    }

    db.addPin(pin)
      .then((result) => {
        if (!pin) {
          return res.json({
            auth: true,
            message: "not successful in adding a new pin",
            pin: result,
          });
        }
        console.log(result);
        res.json({
          auth: true,
          message: "success in adding a new pin",
          pin: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          auth: true,
          message: "unsuccessful in adding new pin",
          pin: null,
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
