const express = require("express");
const router = express.Router();


const {
  postMessage,
  getMessage,
  postContent,
  deleteMessage,
  putMessage
} = require("../controllers/messageController");

//DELETE /api/messages/:message_id/:content_id
router.delete("/:message_id/:content_id", deleteMessage);
//POST /api/messages/
router.post("/", postMessage);
//GET /api/messages/:message_id
router.get("/:message_id", getMessage);
//Post /api/messages/:message_id
router.post("/:message_id", postContent);
//PUT /api/message/:message_id/:content_id
router.put("/:message_id/:content_id", putMessage);


module.exports = router;
