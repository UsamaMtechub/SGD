const express = require('express');
const router = express.Router();
const controller = require("../controllers/giftBoxController")
const upload = require("../middlewares/giftBoxMulter")

router.post("/createGiftBox" , upload.single("image"), controller.createGiftBox)
router.get("/getAllGiftboxes" , controller.getAllGiftBoxes)
router.get("/getGiftBoxByUserId" , controller.getGiftBoxesByUserId)
router.put("/updateGiftBox",upload.single("image"), controller.updateGiftBox)
router.delete("/deleteGiftBox/:giftBoxId", controller.deleteGiftBoxes)
router.get("/getGiftBoxesByCategory_id" , controller.getGiftBoxesByCategory_id)
router.get("/getGiftBoxesByType" , controller.getGiftBoxesByType)



module.exports= router;