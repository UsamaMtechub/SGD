
const receivedGiftModel = require("../models/receivedGiftModel");
const mongoose = require("mongoose")
const giftBoxModel = require('../models/giftBoxModel')
exports.sendGift = async (req,res)=>{
    try{
        const gift_id = req.body.gift_id;
        const sender_id = req.body.sender_id;
        const receiver_id = req.body.receiver_id;
        const how_sender_calls = req.body.how_sender_calls;
        const how_receiver_calls = req.body.how_receiver_calls;
        const message = req.body.message;
        const relation = req.body.relation;
        const somebody = req.body.somebody;

        let image; 
        let band;
        
        if(req.files){
            if(req.files.image){
                if(req.files.image[0]){
                    if(req.files.image[0].path){
                        image = req.files.image[0].path;
                    }
                    
                }
            }
        }
        if(req.files){
            if(req.files.band){
                if(req.files.band[0]){
                    if(req.files.band[0].path){
                        band = req.files.band[0].path;
                    }
                }
            }
        }

        const foundGift = await giftBoxModel.findOne({_id: gift_id});

        if(!foundGift){
            res.json({
                message: "Gift id you provided does not exist",
                status: false
            })
        }

        const sendGift = new receivedGiftModel({
            _id:mongoose.Types.ObjectId(),
            sender_id:sender_id,
            receiver_id:receiver_id,
            gift_id:gift_id,
            how_receiver_calls:how_receiver_calls,
            how_sender_calls: how_sender_calls,
            message: message,
            band: band,
            image:image,
            relation:relation,
            somebody:somebody

        })

        const result = await sendGift.save();

        if(result.gift_id){
            result.gift_id = foundGift;
        }
        

        if(result){
            res.json({
                message: "Gift sent successfully",
                result: result,
                status: true,
                statusCode:201
            })
        }  
        else{
            res.json({
                message: "Gift could not be sent",
                status: false,

            })
        }
    }
    catch(err){
        res.json({
            message: "Error",
            error:err.message
        })
    }
}

exports.getAllSendGifts =async (req,res)=>{
    try{
        const result = await receivedGiftModel.find({}).populate("gift_id").populate("sender_id").populate("receiver_id");
        if(result){
            res.json({
                message: "Fetched all receivedGifts",
                status:true,
                result:result
            })
        }
        else{
            res.json({
                message: "could not fetched",
                status:false,
                result:null
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

exports.userReceivedGifts = async (req,res)=>{
    try{
        const user_id= req.query.user_id;
        const result = await receivedGiftModel.find({receiver_id: user_id}).populate("gift_id").populate("sender_id").populate("receiver_id");

        if(result){
            res.json({
                message: "Fetched all receivedGifts of This User",
                status:true,
                result:result
            })
        }
        else{
            res.json({
                message: "could not fetched",
                status:false,
                result:null
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

exports.userSendGifts = async (req,res)=>{
    try{
        const user_id= req.query.user_id;
        const result = await receivedGiftModel.find({sender_id: user_id}).populate("gift_id").populate("sender_id").populate("receiver_id");

        if(result){
            res.json({
                message: "Fetched all send Gifts of This User",
                status:true,
                result:result
            })
        }
        else{
            res.json({
                message: "could not fetched",
                status:false,
                result:null
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


exports.deleteSendGift = async (req,res)=>{
    try{
        const receivedGiftId= req.query.receivedGiftId;
        const result = await receivedGiftModel.deleteOne({_id: receivedGiftId});

        if(result.deletedCount>0){
            res.json({
                message: "Deleted",
                status:true,
                result:result
            })
        }
        else{
            res.json({
                message: "could not delete",
                status:false,
                result:null
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

exports.updateSendGift = async (req,res)=>{
    try{
        const receivedGiftId= req.body.receivedGiftId;
        const gift_id = req.body.gift_id;
        const sender_id = req.body.sender_id;
        const receiver_id = req.body.receiver_id;
        const result = await receivedGiftModel.findOneAndUpdate({_id: receivedGiftId} , 
            {  
                sender_id:sender_id,
                receiver_id:receiver_id,
                gift_id:gift_id
            },{
                new :true
            });

        if(result){
            res.json({
                message: "Updated",
                status:true,
                result:result
            })
        }
        else{
            res.json({
                message: "could not update",
                status:false,
                result:null
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