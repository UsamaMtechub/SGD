const mongoose = require("mongoose")

const subscription = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    type:{
        type:String,
        enum:["monthly" , "yearly"]
    },
    subscription_fee:String,
    features:[String]
    
})

module.exports = mongoose.model("subscription" , subscription);