const express = require('express');
const router = express.Router();
const controller = require("../controllers/commentsController")

router.post("/addComment" , controller.addComment)
router.get("/getAllGiftComments" , controller.getAllSavedComments)
router.get("/getCommentsOfSpecificGift" , controller.getCommentsOfSpecificGift)
router.put("/updateComment", controller.updateComment)
router.delete("/deleteComment", controller.deleteComment)


module.exports= router;