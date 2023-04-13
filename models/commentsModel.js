const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    gift_receive_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"receivedGift"
    },
    comment_by:{
        type:String,
        enum:["sender" , "receiver"]
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    comment_text:String
})

module.exports= mongoose.model("comment" , commentSchema)