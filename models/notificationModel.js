const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema(
  {
    _id:mongoose.Schema.Types.ObjectId,
    from:{
        type:String,
        enum:["user" , "admin"]
    },
    sender_id: {
      type:String,
    },
    to:{
        type:String,
    },
    message: String,
    notification_type:{
        type:String,
        enum:[
         "on_reply"
        ]
    }
  },
  {
    timestamps: true,
  }
);

const notificationModel = mongoose.model("notification", notificationSchema);
module.exports=notificationModel
