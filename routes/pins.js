const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //-----------------------------------------------------------------
  // POST /api/pins/search
  //-----------------------------------------------------------------

  router.post("/search", (req, res) => {
    const { isLoggedIn } = req; //gets this from middleware

    console.log("search param", req.body.search);

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    db.searchPins(req.body.search)
      .then((pins) => {
        res.json({
          auth: true,
          message: "successful search",
          pins,
        });
      })
      .catch((err) => {
        res.json({
          auth: true,
          message: "not successful in search",
        });
      });
  });

  //-----------------------------------------------------------------
  // GET /api/pins/:id/comments
  //-----------------------------------------------------------------

  //no need to get a specific comment at the moment, the are provided
  //the expanded pins view

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

    console.log("comment", comment);

    db.addComment(comment)
      .then((result) => {
        console.log(result.id);
        return db.getPinCommentsById(result.pin_id);
      })
      .then((comments) => {
        const comment = comments[comments.length - 1];
        //sends back the users last comment
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
  // POST /api/pins/favorites/:pinID/delete --removes a favorite pin
  //-----------------------------------------------------------------

  router.post("/favorites/:pinID/delete", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    db.removeFavorite(userID, req.params.pinID)
      .then((pin) => {
        res.json({
          auth: true,
          message: "successful deleting a favorite pin",
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
  // POST /api/pins/favorites/:pinID --adds a favorite pin
  //-----------------------------------------------------------------

  router.post("/favorites/:pinID", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }
    // console.log("pin id", req.body.id);
    db.addFavorite(userID, req.params.pinID)
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
  // /api/pins/:id/rating-- sends a rating to a pin
  //-----------------------------------------------------------------

  router.post("/:pinID/rating", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    console.log("#########", req.body.rating);

    db.addRating(userID, req.params.pinID, req.body.rating)
      .then((result) => {
        res.json({
          auth: true,
          message: "sent rating to pin",
          result,
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
  // GET /api/pins/:id/rating --gets user rating for a pin
  //-----------------------------------------------------------------

  // getRatingsExpandedView

  router.get("/:pinID/rating", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    const { pinID } = req.params;

    db.getRatingsExpandedView(userID, pinID)
      .then((rating) => {
        console.log(rating);
        res.json({
          auth: true,
          message: "successfully got rating for pin",
          rating,
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
  // GET /api/pins/:id
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

    //using promise all because both db queries dont depend on each other

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
      title: req.body.title,
      description: req.body.description,
      //url: req.body.thumbnail_url,
      content: req.body.content,
      tag: req.body.tag,
    };

    if (!(pin.title && pin.description && pin.content && pin.tag)) {
      return res.json({ auth: true, message: "incomplete form" });
    }

    console.log(pin);

    db.addPin(userID, pin)
      .then((result) => {
        if (!pin) {
          return res.json({
            auth: true,
            message: "not successful in adding a new pin",
            pin: result,
          });
        }
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

  //for future implementation

  //-----------------------------------------------------------------
  // /api/pins/:edit
  //-----------------------------------------------------------------

  //if the user owns a pin on the expanded view they can edit it
  return router;
};
