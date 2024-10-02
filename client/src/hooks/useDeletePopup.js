import { useState } from 'react';
import { deleteRecipe, fetchRecipes } from '../app/api/recipesApi';

export const useDeletePopup = (setCurrentRecipes, deleteRecipeFromMealPlan) => {
    const [showDelete, setShowDelete] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState('');
    const [recipeTitle, setRecipeTitle] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);    //state can be used to give user feedback iof progress(spinning wheel)

    const handleShowDelete = (recipe) => {
        setRecipeToDelete(recipe);
        setRecipeTitle(recipe.recipe_title);    //Title for display
        setShowDelete(true);                    //Show the popup
    };

    const handleShowDeleteMealPlanEntry = (entry) => {
        setRecipeToDelete(entry);
        setRecipeTitle(entry.title);    //Title for display
        setShowDelete(true);                    //Show the popup
    }

    const handleCloseDelete = () => {
        setShowDelete(false);
        setRecipeToDelete('');
        setRecipeTitle('');
    };

    const onDeleteSuccess = () => {
        fetchRecipes();  // Fetch recipes after the delete is successful
        handleCloseDelete();
    };

    const handleDelete = async () => {
        if (!recipeToDelete) return;

        const { _id, recipe_title } = recipeToDelete;
        setIsDeleting(true);

        const result = await deleteRecipe(_id);
        setIsDeleting(false);

        if (result.success) {
            const updatedRecipes = await fetchRecipes();
            const sortedRecipes = updatedRecipes.sort((a, b) => a.recipe_title.localeCompare(b.recipe_title)); // Sort alphabetically
            setCurrentRecipes([...sortedRecipes]);
        } else {
            console.error(`Failed to delete recipe: ${recipe_title}`);
        }
        handleCloseDelete();  // Close the modal
    };

    const handleDeleteMealPlanEntry = async () => {
        if (!recipeToDelete) return;

        console.log(`useDeletePopup recipe to delete: ${recipeToDelete}`);

        const { id, title } = recipeToDelete;
        setIsDeleting(true);

        try {
            await deleteRecipeFromMealPlan(id); // Call the function to delete the recipe from the meal plan
            setIsDeleting(false);
            handleCloseDelete(); // Close the modal
        } catch (error) {
            console.error(`Failed to delete recipe from meal plan: ${title}`, error);
            setIsDeleting(false);
        }
    };

    return {
        showDelete,
        recipeToDelete,
        recipeTitle,
        isDeleting,
        handleShowDelete,
        handleShowDeleteMealPlanEntry,
        handleCloseDelete,
        onDeleteSuccess,
        handleDelete,
        handleDeleteMealPlanEntry
    };
};