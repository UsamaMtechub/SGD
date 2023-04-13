const mongoose = require('mongoose');
const fs = require("fs")
const card_headerModel = require("../models/card_header_imagesModel");




exports.addImage= async(req, res) => {
    try{
        const type = req.body.type ; 
        let image;
        
        if(!req.file){
            return(
                res.json({
                    message : "Please provide image as a file in form data",
                    status : false
                })
            )
            
        }


        if(req.file){
            image = req.file.path;
        }


        if(!type){
            return(
                res.json({
                    message: "Please Provide type",
                    status : false
                })
            )
        }

        const newImage =  new card_headerModel({
            _id : mongoose.Types.ObjectId(),
            image : image ,
            type : type 
        });

        const result =await newImage.save();

        if(result){
            res.json({
                message : "Image Added",
                status : true,
                result : result
            })
        }
        else{
            res.json({
                message: "Could not add image",
                status : false
            })
        }


    }
    catch(err){
        res.json({
            message: "Error Occurred",
            status : false,
            error : err.message
        })
    }
}

exports.getCardImages = async(req,res)=>{
    try{
        
        var result = await card_headerModel.find({type : "card"});

        let newArray = result.clone();

        newArray.forEach(element => {
            element.userLiked=false
        });


        result = newArray

        if(result){
            res.status(200).json({
                message: "All images of card Fetched",
                status : true,
                result:result
            })
        }
        else{
            res.status(404).json({
                message : "Could not Fetch images",
                status :false
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            status : false,
            error : err.message
        })
    }
}

exports.getHeaderImages = async(req,res)=>{
    try{
        
        const result = await card_headerModel.find({type : "header"});

        if(result){
            res.status(200).json({
                message: "All images of header Fetched",
                status : true,
                result:result
            })
        }
        else{
            res.status(404).json({
                message : "Could not Fetch images",
                status :false
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            status : false,
            error : err.message
        })
    }
}

exports.deleteImage = async(req,res)=>{
    try{
        const image_id = req.query.image_id;
        if(!image_id){
            return(
                res.json({
                    message : "Please provide image_id",
                    status : false
                })
            )
        }

        const foundResult = await card_headerModel.findOne({_id : image_id});

        if(foundResult){
            if(foundResult.image){
                fs.unlink(foundResult.image , (err)=>{
                    if(err){
                        console.log("could not deleted")
                    }
                    else{
                        console.log("deleted")
                    }
                })
            }
        }

        const result = await card_headerModel.deleteOne({_id : image_id});

        if(result.deletedCount>0){
            res.json({
                message : "Image deleted successfully",
                status : true,
                result:result
            })
        }
        else{
            res.json({
                message : "could not delete Image",
                status : false
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            status : false,
            error : err.message
        })
    }
}

