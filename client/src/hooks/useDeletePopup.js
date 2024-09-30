import { useState } from 'react';
import { deleteRecipe, fetchRecipes } from '../app/api/recipesApi';

export const useDeletePopup = (setCurrentRecipes) => {
    const [showDelete, setShowDelete] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState('');
    const [recipeTitle, setRecipeTitle] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);    //state can be used to give user feedback iof progress(spinning wheel)

    const handleShowDelete = (recipeTitle) => {
        setRecipeToDelete(recipeTitle);
        setRecipeTitle(recipeTitle);
        setShowDelete(true);
    };

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
        if (!recipeTitle) return;

        setIsDeleting(true);    

        const result = await deleteRecipe(recipeToDelete);
        setIsDeleting(false);

        if (result.success) {
            const updatedRecipes = await fetchRecipes();
            setCurrentRecipes(updatedRecipes);
        } else {
            console.error('Failed to delete recipe');
        }

        handleCloseDelete();  // Close the modal
    };

    return {
        showDelete,
        recipeToDelete,
        recipeTitle,
        isDeleting,
        handleShowDelete,
        handleCloseDelete,
        onDeleteSuccess,
        handleDelete
    };
};