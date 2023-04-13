const express = require("express"),
router=express.Router();

const controller= require("../controllers/imageController");
const upload = require('../middlewares/card_headerImagesMulter')

router.post("/addImage", upload.single("image"), controller.addImage)
router.get("/getCardImages",controller.getCardImages)
router.get("/getHeaderImages",controller.getHeaderImages)
router.delete("/deletImage",controller.deleteImage)





module.exports=router