
const express = require('express');
const router = express.Router();
const controller = require("../controllers/subscriptionController")

router.post("/createSubscription" , controller.postSubscription)
router.get("/getAllSubscriptions" , controller.getAllSubscriptions)
router.get("/getSubscriptionById" , controller.getSubscriptionById)
router.put("/updateSubscription", controller.updateSubscriptions)
router.delete("/deleteSubscription", controller.deleteSubscription)

module.exports= router;