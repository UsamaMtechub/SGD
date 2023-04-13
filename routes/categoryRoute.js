const express = require("express"),
router=express.Router();

const controller= require("../controllers/categoryController");
const upload = require('../middlewares/categoryImages')

router.post("/createCategory", upload.single("image"), controller.createCategory)
router.get("/getAllCategories" , controller.getAllCategories);
router.get("/getCategoryById",controller.getCategoryById);
router.delete("/deleteCategory",controller.deleteCategory);
router.put("/updateCategory",upload.single("image"),controller.updateCategory)

module.exports=router