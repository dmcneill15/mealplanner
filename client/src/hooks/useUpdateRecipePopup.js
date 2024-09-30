import { useState } from 'react';
import { updateRecipe } from '../app/api/recipesApi';

export const useUpdateRecipePopup = (fetchRecipes) => {
    const [recipeToUpdate, setRecipeToUpdate] = useState(null);
    const [showUpdateRecipe, setShowUpdateRecipe] = useState(false);
    const [updatedRecipe, setUpdatedRecipe] = useState({ recipe_title: '', method: '', servings: '', image: '' });

    const handleCloseUpdateRecipe = () => {
        setShowUpdateRecipe(false);
        setUpdatedRecipe({ recipe_title: '', method: '', servings: '', image: '' }); // Reset input fields
    };

    const handleShowUpdateRecipe = (recipe) => {
        setRecipeToUpdate(recipe.recipe_title);
        setUpdatedRecipe({
            recipe_title: recipe.recipe_title,
            method: recipe.method,
            servings: recipe.servings,
            image: recipe.image || '',
        });
        setShowUpdateRecipe(true);
    };

    const handleUpdateRecipe = async (e) => {
        e.preventDefault(); // Prevent the browser from refreshing when handling a form

        // Only send updated fields to the API
        const recipeUpdates = {};
        if (updatedRecipe.recipe_title !== recipeToUpdate) recipeUpdates.new_title = updatedRecipe.recipe_title;
        if (updatedRecipe.method) recipeUpdates.new_method = updatedRecipe.method;
        if (updatedRecipe.servings) recipeUpdates.new_servings = updatedRecipe.servings;
        if (updatedRecipe.image) recipeUpdates.new_image = updatedRecipe.image;

        try {
            await updateRecipe(recipeToUpdate, recipeUpdates); // Call the API function
            await fetchRecipes(); // Update recipe list after successful update
        } catch (error) {
            console.error('Error updating recipe:', error);
        } finally {
            handleCloseUpdateRecipe();
        }
    };

    return {
        recipeToUpdate,
        showUpdateRecipe,
        updatedRecipe,
        handleCloseUpdateRecipe,
        handleShowUpdateRecipe,
        handleUpdateRecipe,
        setUpdatedRecipe,
    };
};