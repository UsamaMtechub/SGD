
const mongoose = require('mongoose');
const imageSuggestionModel = require("../models/imageSuggestionsModel");
const fs = require('fs')

exports.createsuggestionImage = async (req, res) => {
    try {
        let image;
        if (req.file) {
            image = req.file.path
        }

        console.log(req.file)
        const newImageSuggestion = new imageSuggestionModel({
            _id: mongoose.Types.ObjectId(),
            message: req.body.message,
            image: image,
        })
        const result = await newImageSuggestion.save();

        if (result) {
            res.json({
                message: "new suggestionImage has been created",
                result: result,
                status: true,
                statusCode: 201
            })
        }
        else {
            res.json({
                message: "Could not suggestionImage",
                status: false,
            })
        }
    }
    catch (err) {
        res.json({
            message: "Error",
            status: false,
            error: err.message
        })
    }
}

exports.getAllImageSuggestions = async (req, res) => {
    try {
        const result = await imageSuggestionModel.find({});


        if (result) {
            res.json({
                message: "image Suggestions fetched",
                result: result,
                status: true,
                statusCode: 201
            })
        }
        else {
            res.json({
                message: "Could not fetched image Suggestions ",
                status: false,
            })
        }
    }
    catch (err) {
        res.json({
            message: "Error Occurred while fetching image Suggestions ",
            status: false,
            error: err.message
        })
    }
}

exports.getsuggestionImageById = async (req, res) => {
    try {
        const suggestionImage_id = req.query.suggestionImage_id;
        const result = await imageSuggestionModel.findOne({ _id: suggestionImage_id });


        if (result) {
            res.json({
                message: "suggestionImage fetched",
                result: result,
                status: true,
                statusCode: 201
            })
        }
        else {
            res.json({
                message: "Could not fetched suggestionImage",
                status: false,
            })
        }
    }
    catch (err) {
        res.json({
            message: "Error Occurred while fetching suggestionImage",
            status: false,
            error: err.message
        })
    }
}

exports.deleteSuggestionImage = async (req, res) => {
    try {
        const suggestionImage_id = req.query.suggestionImage_id;


        const foundResult = await imageSuggestionModel.findOne({ _id: suggestionImage_id });

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


        const result = await imageSuggestionModel.deleteOne({ _id: suggestionImage_id });
        if (result.deletedCount > 0) {
            res.json({
                message: "suggestionImage Deleted",
                result: result,
                status: true,

            })
        }
        else {
            res.json({
                message: "Could not delete suggestionImage",
                status: false,
            })
        }

    }
    catch (err) {
        res.json({
            message: "Error Occurred while deleting suggestionImage",
            status: false,
            error: err.message
        })
    }
}

exports.updatesuggestionImage = async (req, res) => {
    try {
        const suggestionImage_id = req.body.suggestionImage_id;
        const message = req.body.message;
        let image;

        console.log(suggestionImage_id)
        if (req.file) {
            image = req.file.path;
            const foundResult = await imageSuggestionModel.findOne({ _id: suggestionImage_id });

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


        const result = await imageSuggestionModel.findOneAndUpdate({ _id: suggestionImage_id }, { message: message, image:image }, { new: true });

        if (result) {
            res.json({
                message: "suggestionImage updated successfully",
                result: result,
                status: true,
                statusCode: 201
            })
        }
        else {
            res.json({
                message: "Could not update suggestionImage",
                status: false,
            })
        }
    }
    catch (err) {
        res.json({
            message: "Error Occurred while updating suggestionImage",
            status: false,
            error: err.message
        })
    }
}