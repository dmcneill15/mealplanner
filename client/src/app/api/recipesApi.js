export const fetchRecipes = async () => {
    const baseURL = "http://localhost:8080"; // Define the base URL
    try {
        const response = await fetch(`${baseURL}/api/recipes`, { cache: 'no-cache' });
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const result = await response.json();
        const recipesArray = result.data;
        return recipesArray;
    } catch (error) {
        console.error('Failed to fetch recipes:', error);
        throw error; // Rethrow to handle in the component if needed
    }
};

export const deleteRecipe = async (recipeId) => {
    const baseURL = "http://localhost:8080"; // Define the base URL
    try {
        const response = await fetch(`${baseURL}/api/recipes/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: recipeId }),
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

export const addRecipe = async (newRecipe) => {
    const baseURL = "http://localhost:8080"; // Define the base URL

    const newRecipeWithId = {
        ...newRecipe,
        //recipe_id: uuidv4(), // Generate a unique ID - don't need to do this as mongoDB generates this for us as this is setup in the schema
        user_id: "66f739adc717200fa34ac24c",     //force in John's user ID for now
    };
    try {
        const response = await fetch(`${baseURL}/api/recipes/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipeWithId)
        });

        if (response.ok) {
            return response.json();
        } else {
            console.error('Failed to delete recipe');
            return { success: false };
        }
    } catch (error) {
        console.error('Error adding recipe:', error);
        throw error;
    }
};

export const updateRecipe = async (recipeToUpdateId, recipeUpdates) => {
    const baseURL = "http://localhost:8080"; // Define the base URL
    try {
        const response = await fetch(`${baseURL}/api/recipes/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: recipeToUpdateId,
                ...recipeUpdates,
            }),
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to update recipe');
        }
    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error; // Rethrow to handle in the component if needed
    }
}