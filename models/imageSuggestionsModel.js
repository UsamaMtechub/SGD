const mongoose = require('mongoose');

const imageSuggestions = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    message:String,
    image: String,
   
})
module.exports= mongoose.model("imageSuggestions", imageSuggestions);
