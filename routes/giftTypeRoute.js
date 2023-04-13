const express = require("express"),
router=express.Router();

const controller= require("../controllers/giftTypeController");
const upload = require('../middlewares/giftTypeImages')

router.post("/createGiftType",upload.single("image"),controller.createGiftType)
router.get("/getAllGiftTypes" , controller.getAllGiftTypes);
router.get("/getGiftTypeById",controller.getGiftTypeById);
router.delete("/deleteGiftType",controller.deleteGiftType);
router.put("/updateGiftType",upload.single("image") ,controller.updateGiftType)
router.get("/getGiftTypesByCategory",controller.getGiftTypesByCategory)


module.exports=router