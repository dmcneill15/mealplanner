import { useState } from 'react';
import { addRecipe, fetchRecipes, fetchUserRecipes } from '../app/api/recipesApi';

export const useAddRecipePopup = (setCurrentRecipes, user_id) => {
    
    const [newRecipe, setNewRecipe] = useState({recipe_title: '', method: '', servings: '', image: '',});
    const [showAddRecipe, setShowAddRecipe] = useState(false);

    const handleCloseAddRecipe = () => {
        setShowAddRecipe(false);
        setNewRecipe({ recipe_title: '', method: '', servings: '', image: '' }); // Reset input fields
    };

    const handleShowAddRecipe = () => setShowAddRecipe(true);

    const handleAddRecipe = async (e) => {
        e.preventDefault(); // Prevent the browser from refreshing when handling the form

        try {
            await addRecipe(newRecipe, user_id);
            //const updatedRecipes = await fetchRecipes();
            const updatedRecipes = await fetchUserRecipes(user_id);
            const sortedRecipes = updatedRecipes.sort((a, b) => a.recipe_title.localeCompare(b.recipe_title)); // Sort alphabetically
            setCurrentRecipes(sortedRecipes);
        } catch (error) {
            console.error('Error adding recipe:', error);
        } finally {
            handleCloseAddRecipe();
        }
    };

    return {
        newRecipe,
        setNewRecipe,
        showAddRecipe,
        handleCloseAddRecipe,
        handleShowAddRecipe,
        handleAddRecipe,
    };
};