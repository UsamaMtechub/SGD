
const { default: mongoose } = require("mongoose");
const subscriptionModel = require("../models/subscriptionModel");

exports.postSubscription =async (req,res)=>{
    try{
        const type = req.body.type;
        const subscription_fee= req.body.subscription_fee;
        const features = req.body.features;

        const newSubscription = new subscriptionModel({
            _id:mongoose.Types.ObjectId(),
            type:type,
            features: features,
            subscription_fee:subscription_fee,
        })

        const result = await newSubscription.save();

        if(result){
            res.json({
                message: "Subscription saved successfully",
                result: result,
                statusCode:"201"
            })
        }
        else{
            res.json({
                message: "Subscription could not be saved successfully",
                result:null,
                statusCode:"400"
            })
        }
    }
    catch(e){
        res.json({
            message: "Error Occurred while creating subscription",
            error:err.message,
        })
    }
}

exports.getAllSubscriptions =async (req,res)=>{
    try{
        const result = await subscriptionModel.find({});
        if(result){
            res.json({
                message: "Subscriptions Fetched",
                result: result,
                statusCode:"201"
            })
        }
        else{
            res.json({
                message: "Subscriptions could not Fetched",
                result:null,
                statusCode:"400"
            })
        }

    }
    catch(e){
        res.json({
            message: "Error Fetching Subscriptions",
            error:err.message
        })
    }
}

exports.getSubscriptionById =async (req,res)=>{
    try{
        const subscription_id = req.query.subscription_id;
        const result = await subscriptionModel.findOne({_id: subscription_id});
        if(result){
            res.json({
                message: "Subscription Fetched",
                result: result,
                statusCode:"201"
            })
        }
        else{
            res.json({
                message: "Subscription could not Fetched",
                result:null,
                statusCode:"400"
            })
        }

    }
    catch(e){
        res.json({
            message: "Error Fetching Subscription",
            error:err.message
        })
    }
}

exports.updateSubscriptions = async(req,res)=>{
    try{
        const subscription_id = req.body.subscription_id;
        const type = req.body.type;
        const subscription_fee= req.body.subscription_fee;
        const features = req.body.features;

        const result = await subscriptionModel.findOneAndUpdate({_id: subscription_id} , 
            {
                type:type,
                features: features,
                subscription_fee:subscription_fee,
            },
            {
                new : true,
            }
            );

            if(result){
                res.json({
                    message: "Subscription updated successfully",
                    result:result,
                    statusCode:201
                })
            }
            else{
                res.json({
                    message: "Subscription could not be updated successfully",
                    result:null,
                    statusCode:500
                })
            }
    }
    catch(e){
        res.json({
            message: "Error updating subscription",
            error:e.message
        })
    }
}

exports.deleteSubscription = async (req ,res)=>{
    try{
        const subscription_id = req.query.subscription_id;
        const result = await subscriptionModel.deleteOne({_id: subscription_id});
        if(result.deletedCount>0){
            res.json({
                message:"Subscription deleted successfully",
                result: result,
                status:true
            })
        }
        else{
            res.json({
                message: "Subscription could not be Deleted , Subscription with this id may not exist",
                result: null,
                status:false

            })
        }
    }
    catch(e){
        res.json({
            message: "Error",
            error:e.message

        })
    }
}