'use strict';
import { MealPlan } from "../models/index.js"; // Adjust the path as necessary

const addRecipetToMealPlan = async (req, res) => {
    const { user_id, recipe_id, date, title } = req.body;

    try {
        // Check for existing entry
       /* const existingMealPlan = await MealPlan.findOne({ user_id, recipe_id, date });

        if (existingMealPlan) {
            // If an existing entry is found, return a conflict response
            return res.status(409).json({ result: 409, message: 'This recipe is already added to your meal plan for this date.' });
        }*/

        // Create a new MealPlan entry
        const newMealPlan = new MealPlan({
            user_id,
            recipe_id,
            date,
            title
        });

        // Save the new meal plan
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