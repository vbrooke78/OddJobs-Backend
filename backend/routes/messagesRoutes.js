const express = require("express");
const router = express.Router();

const { postMessage, putMessage } = require("../controllers/messageController");
//POST /api/messages/:user_id
router.post("/", postMessage);
//PUT /api/message/:message_id/:content_id
router.put("/:message_id/:content_id", putMessage);
module.exports = router;
