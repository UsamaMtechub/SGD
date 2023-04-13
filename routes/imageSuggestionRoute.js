const express = require("express"),
router=express.Router();

const controller= require("../controllers/imageSuggestionController");
const upload = require('../middlewares/imageSuggestionMulter')

router.post("/createImageSuggestion", upload.single("image"), controller.createsuggestionImage)
router.get("/getAllImageSuggestions" , controller.getAllImageSuggestions);
router.get("/getImageSuggestionById",controller.getsuggestionImageById);
router.delete("/deleteImageSuggestion",controller.deleteSuggestionImage);
router.put("/updateImageSuggestion",upload.single("image"),controller.updatesuggestionImage)

module.exports=router