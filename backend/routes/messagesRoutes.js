const express = require("express");
const router = express.Router();

const { postMessage, getMessage } = require("../controllers/messageController");
//POST /api/messages/
router.post("/", postMessage);
//GET /api/messages/:message_id
router.get("/:message_id", getMessage);
module.exports = router;
