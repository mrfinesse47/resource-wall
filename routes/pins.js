const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("get pins");
    res.json({ auth: false });
  });
  return router;
};
