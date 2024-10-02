export const addRecipeToMealPlan = async (mealPlanData) => {
    const baseURL = "http://localhost:8080"; // Define the base URL
    try {
        const response = await fetch(`${baseURL}/api/mealplan/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mealPlanData),
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to add recipe to meal plan');
        }
    } catch (error) {
        console.error('Error adding recipe to meal plan:', error);
        throw error;
    }
};

export const getUserMealPlan = async (user_id) => {
    const baseURL = "http://localhost:8080";
    try {
        const response = await fetch(`${baseURL}/api/mealplan/${user_id}`);

        if (response.ok) {
            //console.log("response was ok");
            //console.log(response);
            return response.json();
        } else {
            throw new Error('Failed to fetch meal plan');
        }
    } catch (error) {
        console.error('Error fetching meal plan:', error);
        throw error;
    }
};

export const updateRecipeInMealPlan = async (mealPlanData) => {
    const baseURL = "http://localhost:8080";
    try {
        const response = await fetch(`${baseURL}/api/mealplan/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mealPlanData),
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to update recipe in meal plan');
        }
    } catch (error) {
        console.error('Error updating recipe in meal plan:', error);
        throw error;
    }
};