
const mongoose = require("mongoose")

const category = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    image: String,
    for: {
        type:String,
        enum:['subscribed' , 'login' , 'guest']
    }
})

module.exports= mongoose.model("category", category);
