const express = require("express");
const router = express.Router();

const { postMessage } = require("../controllers/messageController");
//POST /api/messages/:user_id
router.post("/", postMessage);

module.exports = router;
