'use strict';
import mongoose from 'mongoose';
import { Recipe, User, Category, MealPlan } from "../models/index.js"; // Adjust the path as necessary


/*const getMealPlan = async (req, res) => {
    // Retrieves meal plans for a user within a specific date range
    try {
        const { user_id, startDate, endDate } = req.body;
        const user = await User.findOne({ user_id });
        if (!user) {
            return res.send({ result: 404, message: 'User not found.' });
        }

        const mealPlans = await MealPlan.find({
            user_id: user_id,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        })
        .populate('recipe_id')
        .populate('category_id');

        res.send({ result: 200, data: mealPlans, email:user.email_id });
    } catch (err) {
        console.log(err);
        res.send({ result: 500, error: err.message });
    }
};*/

/*
{
    "user_id": "66e7dcfd1111468702d30d68", // Replace with actual user_id
    "startDate": "2024-09-01",
    "endDate": "2024-09-30"
}
*/

/*const createMealPlan = async (req, res) => {
    // Creates a new meal plan using JSON data POSTed in request body
    try {
        const { email_id, recipe_id, category_id, date } = req.body;
 
        if (!mongoose.Types.ObjectId.isValid(recipe_id) || !mongoose.Types.ObjectId.isValid(category_id)) {
            return res.send({ result: 400, message: 'Invalid recipe or category ID.' });
        }


        const user = await User.findOne({ email_id });
        /*const recipe = await Recipe.findById(recipe_id);
        const category = await Category.findById(category_id);
        const recipe = await Recipe.findOne({ recipe_id: recipe_id });
        const category = await Category.findOne({ category_id: category_id });
        console.log(user);
        console.log(recipe);
        console.log(category);
        console.log(date);

        if (user && recipe && category) {
            const newMealPlan = new MealPlan({
                date,
                recipe_id: recipe._id,
                category_id: category._id,
                user_id: user.user_id // Link the meal plan to the user
            });

            const savedMealPlan = await newMealPlan.save();
            res.send({ result: 200, data: savedMealPlan });
        } else {
            res.send({ result: 404, message: 'User, Recipe, or Category not found. Meal plan could not be added.' });
        }
    } catch (err) {
        console.log(err);
        res.send({ result: 500, error: err.message });
    }
};
*/

const addRecipetToMealPlan = async (req, res) => {
    const { user_id, recipe_id, date, title } = req.body;

    try {
        const newMealPlan = new MealPlan({
            user_id,
            recipe_id,
            date,
            title
        });

        const savedMealPlan = await newMealPlan.save();
        res.status(200).json({ result: 200, data: savedMealPlan });
    } catch (err) {
        console.error('Error saving to meal plan:', err);
        res.status(500).json({ result: 500, error: 'Failed to add recipe to meal plan' });
    }
}

//Question: why use req.params?
//Does the find function work to get all the user recipes?
const getUserMealPlan = async (req, res) => {
    const { user_id } = req.params;

    try {
        const mealPlan = await MealPlan.find({ user_id }).populate('recipe_id');
        res.status(200).json({ result: 200, data: mealPlan });
    } catch (err) {
        console.error('Error fetching meal plan:', err);
        res.status(500).json({ result: 500, error: 'Failed to fetch meal plan' });
    }
}

export {
    addRecipetToMealPlan,
    getUserMealPlan,
};