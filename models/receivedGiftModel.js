
const mongoose= require("mongoose");

const receivedGiftSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    gift_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"giftBox"
    },
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    receiver_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    how_sender_calls: String,
    how_receiver_calls: String,
    message: String,
    image: String,
    band: String,
    relation: String,
    somebody: String


})

module.exports = mongoose.model("receivedGift" , receivedGiftSchema)