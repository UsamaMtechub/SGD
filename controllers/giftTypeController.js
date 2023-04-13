
const mongoose = require('mongoose');
const giftTypeModel = require("../models/giftTypeModel");
const fs = require('fs')
exports.createGiftType = async (req,res)=>{
    try{
        let image;
        if (req.file) {
            image = req.file.path
        }

        console.log(req.file)

        const newGiftType = new giftTypeModel({
            _id:mongoose.Types.ObjectId(),
            name:req.body.name,
            category_id:req.body.category_id,
            image: image,
            for:req.body.for
        })
        const result = await newGiftType.save();

        if(result){
            res.json({
                message: "new giftType has been created",
                result: result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message: "Could not giftType",
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

exports.getAllGiftTypes = async(req,res)=>{
    try{
        const result = await giftTypeModel.find({}).populate("category_id");

        
        if(result){
            res.json({
                message: "gift types fetched",
                result: result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message: "Could not fetched gift types",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching gift types",
            status:false,
            error:err.message
        })
    }
}

exports.getGiftTypeById = async(req,res)=>{
    try{
        const giftType_id = req.query.giftType_id;
        const result = await giftTypeModel.findOne({_id: giftType_id}).populate("category_id");

        
        if(result){
            res.json({
                message: "giftType fetched",
                result: result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message: "Could not fetched giftType",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching giftType",
            status:false,
            error:err.message
        })
    }
}

exports.deleteGiftType = async (req,res)=>{
    try{
        const giftType_id = req.query.giftType_id;

        
        const foundResult = await giftTypeModel.findOne({ _id: giftType_id });

        if (foundResult) {
            if (foundResult.image) {
                fs.unlink(foundResult.image, (err) => {
                    if (!err) {
                        console.log('deleted previous image')
                    }
                    else {
                        console.log('Error occurred while deleting previous image')
                    }
                })
            }
        }
        const result = await giftTypeModel.deleteOne({_id: giftType_id});

        if(result.deletedCount>0){
            res.json({
                message: "giftType Deleted",
                result: result,
                status:true,
                
            })
        }
        else{
            res.json({
                message: "Could not delete giftType",
                status:false,
            })
        }
        
    }
    catch(err){
        res.json({
            message: "Error Occurred while deleting giftType",
            status:false,
            error:err.message
        })
    }
}

exports.updateGiftType = async (req,res)=>{
    try{
        const giftType_id = req.body.giftType_id;
        const name = req.body.name;
        const category_id= req.body.category_id;
        

        let image;

        if (req.file) {
            image = req.file.path;
            const foundResult = await giftTypeModel.findOne({ _id: giftType_id });


            if (foundResult) {
                if (foundResult.image) {
                    fs.unlink(foundResult.image, (err) => {
                        if (!err) {
                            console.log('deleted previous image')
                        }
                        else {
                            console.log('Error occurred while deleting previous image')
                        }
                    })
                }
            }

        }
        
        
        const result = await giftTypeModel.findOneAndUpdate({_id: giftType_id} , {name:name , category_id:category_id , for:req.body.for , image:image} , {new:true});

        if(result){
            res.json({
                message: "giftType updated successfully",
                result: result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message: "Could not update giftType",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while updating giftType",
            status:false,
            error:err.message
        })
    }
}

exports.getGiftTypesByCategory = async (req,res)=>{
    try{
        const category_id = req.query.category_id;
        console.log(category_id)
        const result = await giftTypeModel.find({category_id: category_id}).populate("category_id");

        
        if(result){
            res.json({
                message: "giftTypes fetched",
                result: result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message: "Could not fetched giftTypes",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching giftTypes",
            status:false,
            error:err.message
        })
    }
}