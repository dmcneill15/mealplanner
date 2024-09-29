/*const baseURL = process.env.BASE_URL || 'http://localhost:8080';

export const fetchRecipes = async () => {
    try {
        const response = await fetch(`${baseURL}/api/recipes`);
        if (!response.ok) throw new Error('Failed to fetch recipes');
        return response.json();
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};


export const updateRecipe = async (recipeTitle, updatedRecipe) => {
    try {
        const response = await fetch(`${baseURL}/api/recipes/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_title: recipeTitle, ...updatedRecipe })
        });
        if (!response.ok) throw new Error('Failed to update recipe');
    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error;
    }
};*/

/*export const fetchRecipes = async (baseURL) => {
    try {
        const response = await fetch(`${baseURL}/api/recipes`, { cache: 'no-cache' });
        const result = await response.json();
        return result.data;  // Return the recipes array
    } catch (error) {
        console.error('Failed to fetch recipes:', error);
        throw error;  // Re-throw the error so it can be handled in the calling component
    }
};*/

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