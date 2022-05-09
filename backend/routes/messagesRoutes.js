const express = require("express");
const router = express.Router();

const {
  postMessage,
  deleteMessage,
} = require("../controllers/messageController");
//POST /api/messages/:user_id
router.post("/", postMessage);
//DELETE /api/messages/:message_id
router.delete("/:message_id", deleteMessage);
module.exports = router;
