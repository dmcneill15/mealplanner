import { useState } from 'react';
import { addRecipe } from '../app/api/recipesApi';

export const useAddRecipePopup = (fetchRecipes) => {
    
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
            await addRecipe(newRecipe);
            fetchRecipes(); // Re-fetch recipes after adding
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