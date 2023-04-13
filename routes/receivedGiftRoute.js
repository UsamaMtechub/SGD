
const express = require('express');
const router = express.Router();
const controller = require("../controllers/receivedGiftController")
const upload = require('../middlewares/sendGiftBoxImages')

router.post("/sendGift" , 
upload.fields([
    {
        name: 'image',
        maxCount:1
    },
    {
        name: 'band',
        maxCount:1
    }
]),
controller.sendGift);

router.get("/getAllSendGifts" , controller.getAllSendGifts)
router.get("/getUserReceivedGifts" , controller.userReceivedGifts)
router.get("/getUserSendGifts", controller.userSendGifts)
router.delete("/deleteSendGift", controller.deleteSendGift)
router.put("/updateSendGift" , controller.updateSendGift)

module.exports= router;