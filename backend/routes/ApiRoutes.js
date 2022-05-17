const express = require("express");
const router = express.Router();
const { getApi } = require("../controllers/");
const endPoint = require("../../endpoints.json");
router.get("/", (req, res) => {
  res.status(200).send(endPoint);
});

module.exports = router;
