const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const images = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
 image : {
    type: String,
  } ,
  type : {
    type:String,
    enum: ['card' , 'header']
  }
});

module.exports =mongoose.model("images", images);