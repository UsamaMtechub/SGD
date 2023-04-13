

const mongoose = require("mongoose");
const giftBoxModel= require("../models/giftBoxModel");
const fs= require("fs");

exports.createGiftBox = async (req,res)=>{
    try{
    const name = req.body.name;
    const yt_link = req.body.yt_link;
    const type = req.body.type;
    const category_id = req.body.category_id;
    const user_id = req.body.user_id;
    const giftFor = req.body.giftFor;
    const greeting_text = req.body.greeting_text;
    const color = req.body.color;


    let image;
    if(req.file){
         image= req.file.path
    }
        
        const newgiftBox = new giftBoxModel({
            _id:mongoose.Types.ObjectId(),
            yt_link:yt_link,
            name:name,
            type:type,
            category_id:category_id,
            image:image,
            user_id:user_id,
            giftFor:giftFor,
            greeting_text: greeting_text,
            color:color
            
        })
       const result = await newgiftBox.save();
       if(result){
        res.json({
            message: "giftBox successfully saved",
            result: result,
            status: "success",
            statusCode: 201
        })
    }
    else{
        res.json({
            message: "giftBox could not be saved",
            result: result,
            statusCode: 404,
        })
    }
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            statusCode:500
        })
    }
    

            
        }
       


exports.getAllGiftBoxes = (req,res)=>{

    giftBoxModel.find({} , function(err,result){
        try{
            if(result){
                res.json({
                    message: "Fetched giftBoxes are: ", 
                    result: result,
                    statusCode: 200
                })
            }
            else{
                res.json({
                    message: "Result is Null",
                    statusCode:404
                })
            }
        }
        catch(err){
            res.json({
                message: "Error occurred while fetching giftBoxes",
                Error:err,
                errorMessage: err.message,
                statusCode:404
            })
                
            }
        }).populate('category_id')
        
}

exports.deleteGiftBoxes = async (req,res)=>{
    const giftBoxId= req.params.giftBoxId;
    

        const foundResult = await giftBoxModel.findOne({_id: giftBoxId});
        if(foundResult){
        if(foundResult.image){
            fs.unlink(foundResult.image , (err)=>{
                if(err){
                    console.log(err);
                }
            })
        }  
    }

    giftBoxModel.deleteOne({_id:giftBoxId},function(err,result){
        try{
            if(result.deletedCount > 0){
                res.json({
                    message: "Successfully deleted",
                    result: result,
                    status: "success",
                    statusCode:200
                })
            }
            else{
                res.json({
                    message: "Nothing to deleted  , giftBox with this Id may not exist",
                    result: result,
                    statusCode: 404

                })
            }
        }
        catch(err){
            res.json({
                message: "Error occurred while deleting giftBox with this Id",
                Error:err,
                errorMessage: err.message,
                statusCode:404
            })
        }

    })
}

exports.updateGiftBox =async (req,res)=>{
    const giftBoxId= req.body.giftBoxId;
    const name = req.body.name;
    const yt_link = req.body.yt_link;
    const type = req.body.type;
    const category_id = req.body.category_id;
    const user_id = req.body.user_id;
    const giftFor = req.body.giftFor;
    const greeting_text = req.body.greeting_text;
    const color = req.body.color;
    if(req.file){
        const foundResult = await giftBoxModel.findOne({_id: giftBoxId});
        if(foundResult){
        if(foundResult.image){
            fs.unlink(foundResult.image , (err)=>{
                if(err){
                    console.log(err);
                }
            })
        }  
    }
    }

    if(req.file){
        var result = await giftBoxModel.findOneAndUpdate({_id:giftBoxId}, 
            {
                yt_link:yt_link,
                name:name,
                type:type,
                category_id:category_id,
                image:req.file.path,
                user_id:user_id,
                giftFor:giftFor,
                greeting_text: greeting_text,
                color: color
            },{new:true})
    }
    else{
        var result = await giftBoxModel.findOneAndUpdate({_id:giftBoxId}, 
            {
                yt_link:yt_link,
                name:name,
                message:message,
                type:type,
                category_id:category_id,
                user_id:user_id,
                giftFor:giftFor,
            },{new:true})
    }
    
    
    if(result){
        res.json({
            message: "Updated Successfully",
            result:result,
            status:true,
            statusCode:201
        })
    }
    else{
        res.json({
            message: "Did not update Successfully",
            status:false
            
        })
    }


}

exports.getGiftBoxesByUserId = async (req,res)=>{
    try{
        const user_id= req.query.user_id;

       const result= await giftBoxModel.find({user_id:user_id}).populate("user_id").populate("type").populate('category_id');

       if(result){
        res.json({
            message: "gift boxes created by this user ",
            result: result,
            status:true,
        })
       }
       else{
        res.json({
            message: "Could not be able to fetch",
            status:false,
            
        })
       }
    }
    catch(err){
        res.json({
            message: "Error occurred while fetching",
            status:false,
            error:err.message,

        })
    }
}


exports.getGiftBoxesByCategory_id = async (req,res)=>{
    try{
        const category_id= req.query.category_id;


       const result= await giftBoxModel.find({category_id:category_id}).populate("user_id").populate("type").populate('category_id');

       if(result){
        res.json({
            message: "gift boxes fetched by category id",
            result: result,
            status:true,
        })
       }
       else{
        res.json({
            message: "Could not be able to fetch",
            status:false,
            
        })
       }
    }
    catch(err){
        res.json({
            message: "Error occurred while fetching",
            status:false,
            error:err.message,

        })
    }
}


exports.getGiftBoxesByType= async(req,res)=>{
    try{
        const type= req.query.type;


       const result= await giftBoxModel.find({type:type}).populate("user_id").populate("type").populate('category_id');

       if(result){
        res.json({
            message: "gift boxes fetchd by type",
            result: result,
            status:true,
        })
       }
       else{
        res.json({
            message: "Could not be able to fetch",
            status:false,
            
        })
       }
    }
    catch(err){
        res.json({
            message: "Error occurred while fetching",
            status:false,
            error:err.message,

        })
    }
}