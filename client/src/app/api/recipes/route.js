import { ResponseBuilder } from "../../lib/response-builder";
import recipes from './recipes'

//http://localhost:3000/api/recipes gets all the recipes
export function GET() {
    console.log("Request Recieved");
    return ResponseBuilder.successResponse(recipes);    //reuseable & unit testable
}

//adds a new recipe
export async function POST(req){
    const body = await req.json(); 
    const recipe = body;             //order will be in the body of the request

    //this validation can be moved into a separate function
    if(!recipe.recipe_id || !recipe.recipe_title){
        return ResponseBuilder.invalidRequest('Recipe is not complete', 400); 
    }

    recipes.push(recipe);
    return ResponseBuilder.successResponse({'message':'recipe added'}); 
}