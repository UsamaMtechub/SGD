
const mongoose = require('mongoose');
const categoryModel = require("../models/categoryModel");
const fs = require('fs')

exports.createCategory = async (req, res) => {
    try {
        let image;
        if (req.file) {
            image = req.file.path
        }

        console.log(req.file)
        const newCategory = new categoryModel({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            image: image,
            for: req.body.for
        })
        const result = await newCategory.save();

        if (result) {
            res.json({
                message: "new Category has been created",
                result: result,
                status: true,
                statusCode: 201
            })
        }
        else {
            res.json({
                message: "Could not category",
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

exports.getAllCategories = async (req, res) => {
    try {
        const result = await categoryModel.find({});


        if (result) {
            res.json({
                message: "Categories fetched",
                result: result,
                status: true,
                statusCode: 201
            })
        }
        else {
            res.json({
                message: "Could not fetched categories",
                status: false,
            })
        }
    }
    catch (err) {
        res.json({
            message: "Error Occurred while fetching categories",
            status: false,
            error: err.message
        })
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const category_id = req.query.category_id;
        const result = await categoryModel.findOne({ _id: category_id });


        if (result) {
            res.json({
                message: "Category fetched",
                result: result,
                status: true,
                statusCode: 201
            })
        }
        else {
            res.json({
                message: "Could not fetched category",
                status: false,
            })
        }
    }
    catch (err) {
        res.json({
            message: "Error Occurred while fetching category",
            status: false,
            error: err.message
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category_id = req.query.category_id;


        const foundResult = await categoryModel.findOne({ _id: category_id });

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


        const result = await categoryModel.deleteOne({ _id: category_id });
        if (result.deletedCount > 0) {
            res.json({
                message: "Category Deleted",
                result: result,
                status: true,

            })
        }
        else {
            res.json({
                message: "Could not delete category",
                status: false,
            })
        }

    }
    catch (err) {
        res.json({
            message: "Error Occurred while deleting category",
            status: false,
            error: err.message
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const category_id = req.body.category_id;
        const name = req.body.name;
        let image;

        console.log(category_id)
        if (req.file) {
            image = req.file.path;
            const foundResult = await categoryModel.findOne({ _id: category_id });

            if (foundResult) {
                if (foundResult.image) {
                    fs.unlink(foundResult.image, (err, data) => {
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


        const result = await categoryModel.findOneAndUpdate({ _id: category_id }, { name: name, for: req.body.for, image: image }, { new: true });

        if (result) {
            res.json({
                message: "Category updated successfully",
                result: result,
                status: true,
                statusCode: 201
            })
        }
        else {
            res.json({
                message: "Could not update category",
                status: false,
            })
        }
    }
    catch (err) {
        res.json({
            message: "Error Occurred while updating category",
            status: false,
            error: err.message
        })
    }
}