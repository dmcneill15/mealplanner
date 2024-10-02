import { useState, useEffect } from 'react';
import { addRecipeToMealPlan, getUserMealPlan } from '../app/api/mealplanApi';


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

    return { recipeCalendar, addEvent };
}