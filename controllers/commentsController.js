const commentsModel = require("../models/commentsModel");
const mongoose = require("mongoose");
const receivedGiftModel = require('../models/receivedGiftModel');
const notificationModel = require('../models/notificationModel') 

const sendNotificationToUser = require('../utils/sendNotificationToUser');

exports.addComment = async (req,res)=>{
    try{
        const gift_receive_id = req.body.gift_receive_id;
        const comment_by  = req.body.comment_by;
        const user_id = req.body.user_id;
        const comment_text = req.body.comment_text;

        let to;
        let sender_id;
        let foundResult = await receivedGiftModel.findOne({_id : gift_receive_id});

        if(comment_by=="sender"){
            if(foundResult){
                if(foundResult.receiver_id){
                    to=foundResult.receiver_id
                }
                if(foundResult.sender_id){
                    sender_id = foundResult.sender_id
                }
            }
        }
        if(comment_by=="receiver"){
            if(foundResult){
                if(foundResult.sender_id){
                    to=foundResult.sender_id
                }
                if(foundResult.receiver_id){
                    sender_id = foundResult.receiver_id  // sender id of comment ,As if comment is doing be receiver then the notificaiton will be send by receiver id thats why we are assigning it ot sender_id
                }
            }
        }

        const savedComment = new commentsModel({
            _id:mongoose.Types.ObjectId(),
            gift_receive_id:gift_receive_id,
            comment_by:comment_by,
            user_id:user_id,
            comment_text:comment_text
        })

        const result = await savedComment.save();

        if(result){
            let store_and_send_notification =await send_store_notification_of_user(to , "User replied on gift you send" , "on_reply" , sender_id);
            if(store_and_send_notification){
                if(store_and_send_notification.isCreateNotification==true){
                    console.log("notification stored in db")
                }
                else{console.log("could not store notification")}
            }

            if(store_and_send_notification.isSend ==true){
                console.log("Push Notification to user")
            }else{
                console.log("push notification could not send")
            }
        }

        if(result){
            res.json({
                message: "comment has been saved successfully",
                result : result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message: "comment could not be saved successfully",
                result:null,
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error while saving comment",
            status:false,
            error:err.message
        })
    }
}

exports.getAllSavedComments = async (req,res)=>{
    try{
        const result = await commentsModel.find({}).populate("gift_receive_id").populate("user_id");
        if(result){
            res.json({
                message: "All Saved Comments fetched successfully",
                result: result,
                status:true,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "Could not fetch comments",
                result: null , 
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching comments",
            error: err.message,
            status:false
        })
    }
}

exports.getCommentsOfSpecificGift = async (req,res)=>{
    try{
        const gift_receive_id = req.query.gift_receive_id;
        const result = await commentsModel.find({gift_receive_id: gift_receive_id}).populate("gift_receive_id");
        
        if(result){
            res.json({
                message: "Comments of this received gift has been fetched",
                result: result,
                statusCode: 201,
                status:true
            })
        }
        else{
            res.json({
                message: "Comments could not be fetched",
                result:null,
                status:false,
            })
        }

    }
    catch(err){
        res.json({
            message: "Error",
            status:false,
            error:err.message
        })
    }
}

exports.deleteComment = async (req,res)=>{
    try{
        const comment_id = req.query.comment_id;
        const result = await commentsModel.deleteOne({_id:comment_id});

        if(result.deletedCount>0){
            res.json({
                message: "Comment Deleted successfully",
                status:true,
                result: result
            })
        }
        else{
            res.json({
                message: "Comment Deleted successfully",
                status:false,
                result: result
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error: err.message,
            status:false,
        })
    }
}

exports.updateComment = async (req,res)=>{
    try{
        const comment_id= req.body.comment_id;
        const gift_receive_id = req.body.gift_receive_id;
        const comment_by  = req.body.comment_by;
        const user_id = req.body.user_id;
        const comment_text = req.body.comment_text;

        const result = await commentsModel.findByIdAndUpdate({_id:comment_id} 
            ,
            {
                gift_receive_id:gift_receive_id,
                comment_by:comment_by,
                user_id:user_id,
                comment_text:comment_text
            },
            {
                new:true,
                runValidators:true,
            }
            )

            if(result){
                res.json({
                    message:"comment has been updated successfully",
                    result:result,
                    status:true,

                })
            } 
            else{
                res.json({
                    message : "could not update comment",
                    result:result,
                    status:false,
                })
            }

    }
    catch(err){
        res.json({
            message: "Error",
            error:err.message,
            status:false
        })
    }
}



async function send_store_notification_of_user(user_id , message , notification_type , sender_id){
    try{
        let object= { 
            isSend :"" ,
            isCreateNotification : ""
            };

        let isSend = await sendNotificationToUser(user_id , message);
        if(isSend){
            console.log('Notification sent to user')
            object.isSend = true;
        }
        else{
            object.isSend = false;
        }

        let isCreateNotification = await createNotificationOfUser(user_id , message , notification_type , sender_id);
        if(isCreateNotification){
            console.log('Notification stored'); 
            object.isCreateNotification=true;   
        }
        else{
            object.isCreateNotification=false;
        }

        return object;
    }
    catch(err){
        console.log(err);
        return null;
        }
}

async function createNotificationOfUser(user_id , message ,notification_type  ,sender_id){
    try{
        const newNotification = new notificationModel({
            _id : mongoose.Types.ObjectId(),
            from:'user',
            sender_id:sender_id,
            to:user_id,
            message:message,
            notification_type:notification_type
        });

        const result = await newNotification.save();

        if(result){
            return true
        }
        else{
            return false
        }
    }
    catch(err){
        console.log(err);
        return false;
    }
}