export const deleteRecipe = async (baseURL, recipeTitle) => {
    try {
        const response = await fetch(`${baseURL}/api/recipes/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipe_title: recipeTitle }),
        });

        if (response.ok) {
            return { success: true };
        } else {
            console.error('Failed to delete recipe');
            return { success: false };
        }
    } catch (error) {
        console.error('Error deleting recipe:', error);
        return { success: false, error };
    }
};

