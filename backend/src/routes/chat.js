const router = require("express").Router()
const chatController = require("../controllers/chat")

router.post("/sendchat", chatController.sendChat);
router.post("/receivechats", chatController.receiveChats);

module.exports = router;