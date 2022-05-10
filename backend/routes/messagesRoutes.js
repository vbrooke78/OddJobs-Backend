const express = require("express");
const router = express.Router();

const {
  postMessage,
  getMessage,
  postContent,
  deleteMessage,
} = require("../controllers/messageController");
//POST /api/messages/:user_id
router.post("/", postMessage);
//DELETE /api/messages/:message_id/:content_id
router.delete("/:message_id/:content_id", deleteMessage);
//POST /api/messages/
router.post("/", postMessage);
//GET /api/messages/:message_id
router.get("/:message_id", getMessage);
//Post /api/messages/:message_id
router.post("/:message_id", postContent);

module.exports = router;
