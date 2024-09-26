import { ResponseBuilder } from "../../lib/response-builder";
import recipes from './recipes'

//http://localhost:3000/api/recipes gets all the recipes
export function GET() {
    console.log("Request Recieved");
    return ResponseBuilder.successResponse(recipes);    //reuseable & unit testable
}

//adds a new recipe
export async function POST(req) {
    const body = await req.json();
    const recipe = body;

    //this validation can be moved into a separate function
    if (!recipe.recipe_id || !recipe.recipe_title) {
        return ResponseBuilder.invalidRequest('Recipe is not complete', 400);
    }

    recipes.push(recipe);
    return ResponseBuilder.successResponse({ 'message': 'recipe added' });
}

//delete recipe by id passed through body
export async function DELETE(req) {
    const body = await req.json(); 
    let recipeId = parseInt(body.recipe_id);   

    let recipeIndex = recipes.findIndex(recipe => recipe.recipe_id == recipeId);

    if (recipeIndex !== -1) {
        recipes.splice(recipeIndex, 1);
        return ResponseBuilder.successResponse({ 'message': 'recipe deleted' });
    }
    else
        return ResponseBuilder.invalidRequest('Recipe could not be found. Not deleted', 400);
}

//updates a recipe by the id 
export async function PUT(req, res) {
    const body = await req.json(); 
    let updatedRecipe = body;
    let recipeId = parseInt(body.recipe_id);

    //search through all recipes to find the one to update
    let recipeIndex = recipes.findIndex(recipe => recipe.recipe_id == recipeId);
    
    if (recipeIndex !== -1) {

        recipes[recipeIndex] = {...recipes[recipeIndex], ...updatedRecipe}

        return ResponseBuilder.successResponse({ 'message': `${updatedRecipe.recipe_title} updated`});
    }
    else
        return ResponseBuilder.invalidRequest('Recipe could not be found. Not updated', 400);
}