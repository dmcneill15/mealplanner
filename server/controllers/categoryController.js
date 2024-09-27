'use strict';
import { Category } from "../models/index.js"; // Adjust the path as necessary

const getCategory = (res) => {
    // finds all recipes
    Category.find({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const createCategory = async (data, res) => {
    try {
        // Check if the category already exists
        const existingCategory = await Category.findOne({ name: data.name });
        if (existingCategory) {
            return res.status(400).send({ result: 400, error: 'Category already exists' });
        }

        // Create a new category
        const newCategory = new Category(data);
        const savedCategory = await newCategory.save();
        res.send({ result: 200, data: savedCategory });
    } catch (err) {
        console.log(err);
        res.send({ result: 500, error: err.message });
    }
};

export {
    getCategory,
    createCategory,
};