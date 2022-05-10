const express = require("express");
const router = express.Router();

const {
  postMessage,
  getMessage,
  postContent,
} = require("../controllers/messageController");
//POST /api/messages/
router.post("/", postMessage);
//GET /api/messages/:message_id
router.get("/:message_id", getMessage);
//Post /api/messages/:message_id
router.post("/:message_id", postContent);
module.exports = router;
