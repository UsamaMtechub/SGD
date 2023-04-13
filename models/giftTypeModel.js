const mongoose = require("mongoose")

const giftType = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    image: String,
    for: {
        type:String,
        enum:['subscribed' , 'login' , 'guest']
    }
})

module.exports= mongoose.model("giftType", giftType);
