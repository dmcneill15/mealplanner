import express from "express";
import { recipeController } from "../controllers/index.js"; // Adjust the path as necessary
//import { ResponseBuilder } from '../lib/response-builder.js'

const router = express.Router();

// Adds a GET route to return all recipes
router.get('/', (req, res) => {
    recipeController.getRecipes(res);
});

// Adds a POST route to create a new recipe
router.post('/create', (req, res) => {
    recipeController.createRecipe(req, res);
});

// Route to UPDATE a recipe
router.put('/update/:recipe_id', (req, res) => {
    recipeController.updateRecipe(req, res);
});

// Route to DELETE a recipe
router.delete('/delete', (req, res) => {
    console.log("Delete Recieved")
    recipeController.deleteRecipe(req, res);
});

export default router;