
const mongoose=require("mongoose")

const giftBox= new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:String,
    yt_link:String,
    image:String,
    type:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"giftType"
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    giftFor:{
        type:String,
        enum:["login" , 'subscribed' , 'guest']
    },
    greeting_text : {
        type: String,
    },
    color: String
},{
    timestamps: true
}) 



module.exports = mongoose.model("giftBox" , giftBox);