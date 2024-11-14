const express = require("express")
const ConversationController = require("../controllers/ConversationController")

const router = express.Router()

router.get("/", ConversationController.getAllConversation)
router.post("/", ConversationController.addConversation)
router.put("/", ConversationController.updateConversation)
router.delete("/", ConversationController.deleteConversation)

module.exports = router