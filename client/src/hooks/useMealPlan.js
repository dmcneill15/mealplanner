import { useState, useEffect } from 'react';
import { addRecipeToMealPlan, getUserMealPlan, updateRecipeInMealPlan, deleteMealPlanEntry } from '../app/api/mealplanApi';


export function useMealPlan(userId) {
    const [recipeCalendar, setRecipeCalendar] = useState([]);

    useEffect(() => {
        const fetchMealPlan = async () => {
            try {
                const mealPlan = await getUserMealPlan(userId);
                if (mealPlan.data && Array.isArray(mealPlan.data)) {
                    const formattedEvents = mealPlan.data.map(item => ({
                        title: item.title,
                        id: item._id,
                        start: new Date(item.date),
                        allDay: true
                    })).sort((a, b) => a.title.localeCompare(b.title));
                    setRecipeCalendar(formattedEvents);
                } else {
                    console.log('No meal plans found for this user.');
                }
            } catch (error) {
                console.error('Error fetching meal plan:', error);
            }
        };
        fetchMealPlan();
    }, [userId]);

    const addEvent = async (data) => {
        if (!data || !data.draggedEl) {
            console.error('Invalid data structure:', data);
            return;
        }

        const { draggedEl, date } = data;
        const title = draggedEl.innerText;
        const recipeId = draggedEl.getAttribute("data-id");

        if (!recipeId) {
            console.error('Recipe ID not found in dragged element:', draggedEl);
            return;
        }

        const newMealPlanEntry = {
            user_id: userId,
            recipe_id: recipeId,
            date: date.toISOString(),
            title: title
        };

        try {
            await addRecipeToMealPlan(newMealPlanEntry);
            const newEvent = {
                title: title,
                start: date.toISOString(),
                allDay: true,
                id: recipeId
            };
            setRecipeCalendar(prevEvents => [...prevEvents, newEvent]);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert(error.response.data.message);
            } else {
                console.error('Error adding recipe to meal plan:', error);
            }
        }
    };

    const updateEvent = async (info) => {
        const { event } = info;
        const mealPlanId = event.id;
        const date = event.start;
    
        if (!mealPlanId) {
            console.error('Meal plan ID not found in event:', event);
            return;
        }
    
        const updatedMealPlanEntry = {
            _id: mealPlanId,
            date: date.toISOString(),
        };
    
        try {
            await updateRecipeInMealPlan(updatedMealPlanEntry); // Call the new API endpoint
            setRecipeCalendar(prevEvents => 
                prevEvents.map(event => 
                    event.id === mealPlanId ? { ...event, start: date.toISOString() } : event
                )
            );
        } catch (error) {
            console.error('Error updating recipe in meal plan:', error);
        }
    };

    const deleteRecipeFromMealPlan = async (mealPlanId) => {
        console.log(`useMealPlan ID: ${mealPlanId}`);
        try {
            await deleteMealPlanEntry(mealPlanId); // Call the API to delete the meal plan entry
            setRecipeCalendar(prevEvents => prevEvents.filter(event => event.id !== mealPlanId));
        } catch (error) {
            console.error('Error deleting recipe from meal plan:', error);
        }
    };


    return { recipeCalendar, addEvent, updateEvent, deleteRecipeFromMealPlan };
}


