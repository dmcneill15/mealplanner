'use strict';
import { Recipe, User } from "../models/index.js"; // Adjust the path as necessary

const getRecipes = (res) => {
    // finds all recipes
    Recipe.find({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

/*const body = await req.json();
    const recipe = body;

    //this validation can be moved into a separate function
    if (!recipe.recipe_id || !recipe.recipe_title) {
        return ResponseBuilder.invalidRequest('Recipe is not complete', 400);
    }

    recipes.push(recipe);
    return ResponseBuilder.successResponse({ 'message': 'recipe added' });
*/
const createRecipe = async (req, res) => {
    // Creates a new recipe using JSON data POSTed in request body
    const recipe = req.body;
    //console.log(recipe);

    try {
        //const user = await User.findOne({ user_id: req.params.email_id });
        const user = await User.findOne({ user_id: recipe.user_id });

        if (user) {
            const newRecipe = new Recipe({
                ...req.body,
                //user_id: user._id // Link the recipe to the user
            });

            const savedRecipe = await newRecipe.save();
            res.send({ result: 200, data: savedRecipe });
        } else {
            res.send({ result: 404, message: 'User not found - Ghost cannot create recipe' });
        }
    } catch (err) {
        console.log(err);
        res.send({ result: 500, error: err.message });
    }
};

//search for recipe based on title & delete
const deleteRecipe = async (req, res) => {
    const recipe = req.body;
    //console.log(recipe);

    Recipe.findOneAndDelete({ recipe_title: recipe.recipe_title })
        .then(data => {
            if (data) {
                res.send({ result: 200, data: data });
            } else {
                res.send({ result: 404, message: 'Recipe not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const updateRecipe = (req, res) => {
    const { recipe_title, new_title, new_method, new_servings, new_image } = req.body;

    // First, check if the recipe exists
    Recipe.findOne({ recipe_title })
        .then(recipe => {
            if (!recipe) {
                // Recipe not found
                return res.status(404).json({ result: 404, error: 'Recipe not found' });
            }

            // Create an update object dynamically based on what has changes
            const updatedRecipe = {};
            if (new_title) updatedRecipe.recipe_title = new_title;
            if (new_method) updatedRecipe.method = new_method;
            if (new_servings) updatedRecipe.servings = new_servings;
            if (new_image) updatedRecipe.image = new_image;

            // Update the recipe with only the changed fields
            return Recipe.findOneAndUpdate({ recipe_title }, updatedRecipe, { new: true });
        })
        .then(updatedRecipe => {
            if (updatedRecipe) {
                return res.status(200).json({ result: 200, data: updatedRecipe });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ result: 500, error: 'Failed to update recipe' });
        });
};


export {
    getRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
};