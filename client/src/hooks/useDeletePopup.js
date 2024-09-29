import { useState } from 'react';

export const useDeletePopup = (fetchRecipes) => {
    const [showDelete, setShowDelete] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState('');
    const [recipeTitle, setRecipeTitle] = useState('');

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

    return {
        showDelete,
        recipeToDelete,
        recipeTitle,
        handleShowDelete,
        handleCloseDelete,
        onDeleteSuccess,
    };
};