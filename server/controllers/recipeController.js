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
    console.log(recipe);

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

const updateRecipe = (req, res) => {
    // updates the user matching the email from the param using JSON data POSTed in request body
    console.log(req.body);
    Recipe.findOneAndUpdate({ recipe_id: req.params.recipe_id }, req.body, { new: true })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const deleteRecipe = (req, res) => {
    console.log({ recipe_id: req.params.recipe_id });
    // deletes the user matching the email from the param
    Recipe.findOneAndDelete({ recipe_id: req.params.recipe_id })
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

export {
    getRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
};