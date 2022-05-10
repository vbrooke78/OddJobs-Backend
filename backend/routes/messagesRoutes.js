const express = require("express");
const router = express.Router();

const {
  postMessage,
  getMessage,
  postContent,
  deleteMessage,
  putMessage,
  getUserContent,
  getChatsByUser,
} = require("../controllers/messageController");

//DELETE /api/messages/:message_id/:content_id
router.delete("/:message_id/:content_id", deleteMessage);
//POST /api/messages/
router.post("/", postMessage);
//GET /api/messages/:user_id
// router.get("/chats/:user_id", getChatsByUser);
//GET /api/messages/:message_id
router.get("/:message_id", getMessage);
//Post /api/messages/:message_id
router.post("/:message_id", postContent);
//PUT /api/message/:message_id/:content_id
router.put("/:message_id/:content_id", putMessage);
//GET /api/messages/:user_id/:message_id
router.get("/:user_id/:message_id", getUserContent);

module.exports = router;
