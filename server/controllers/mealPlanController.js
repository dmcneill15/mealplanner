'use strict';
import { MealPlan } from "../models/index.js"; // Adjust the path as necessary

const addRecipetToMealPlan = async (req, res) => {
    const { user_id, recipe_id, date, title } = req.body;

    try {
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

const updateRecipeInMealPlan = async (req, res) => {
    const { _id, date } = req.body;

    try {
        const updatedMealPlan = await MealPlan.findByIdAndUpdate(
            _id,
            { date: date },
            { new: true }
        );

        if (!updatedMealPlan) {
            return res.status(404).json({ result: 404, message: 'Meal plan entry not found' });
        }

        res.status(200).json({ result: 200, data: updatedMealPlan });
    } catch (err) {
        console.error('Error updating meal plan:', err);
        res.status(500).json({ result: 500, error: 'Failed to update meal plan' });
    }
};

//search for recipe based on _id
const deleteMealPlanEntry = async (req, res) => {
    const {_id} = req.body;
    //console.log(recipe);
    if (!_id) {
        return res.status(400).send({ result: 400, message: 'Meal Plan _id is required' });
    }

    MealPlan.findByIdAndDelete({_id})
        .then(data => {
            if (data) {
                res.send({ result: 200, data: data });
            } else {
                res.send({ result: 404, message: 'Meal Plan entry not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};


export {
    addRecipetToMealPlan,
    getUserMealPlan,
    updateRecipeInMealPlan,
    deleteMealPlanEntry
};