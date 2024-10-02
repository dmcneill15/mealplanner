'use client' // client component, not server rendered
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'; // Import List plugin
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
//import { useRecipes } from '@/hooks/useRecipes';
import { fetchRecipes } from '@/app/api/recipesApi';
import AddRecipePopup from './AddRecipePopup';
import DeletePopup from './DeletePopup';
import { useAddRecipePopup } from '@/hooks/useAddRecipePopup'
import { useMealPlan } from '@/hooks/useMealPlan';
import { useDeletePopup } from '@/hooks/useDeletePopup';
import { EventSourceInput } from '@fullcalendar/core/index.js'


import { useState, useEffect, useRef } from 'react'

import { EB_Garamond, Cinzel, Fauna_One } from 'next/font/google';
const faunaOne = Fauna_One({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
});

export default function Calendar() {

    const userId = "66f739adc717200fa34ac24b";      //use hardcoded id for now
    const [recipeList, setRecipeList] = useState([]);   //list of all users recipes
    const [refresh, setRefresh] = useState(false);      //flag to refresh the calendar display

    const draggableInitialized = useRef(false); // Track Draggable initialization

    const forceRerender = () => {
        setRefresh(prev => !prev);
    };

    //-------------------------------------REFACTORED ADD RECIPE TO MEALPLAN - to a custom hook - able to use this hook in other components */
    const {
        recipeCalendar,
        addEvent,
        updateEvent,
        deleteRecipeFromMealPlan
    } = useMealPlan(userId);
    //-------------------------------------REFACTORED ADD RECIPE TO MEALPLAN

    //-------------------------------------REFACTORED ADD RECIPE TO RECIPE CATALOG- to a custom hook - able to use this hook in other components */
    const {
        newRecipe,
        setNewRecipe,
        showAddRecipe,
        handleCloseAddRecipe,
        handleShowAddRecipe,
        handleAddRecipe,
    } = useAddRecipePopup(setRecipeList, forceRerender);
    //-------------------------------------REFACTORED ADD */

    const {
        showDelete,
        recipeToDelete,
        isDeleting,
        handleShowDeleteMealPlanEntry,
        handleCloseDelete,
        handleDeleteMealPlanEntry,
    } = useDeletePopup(setRecipeList, deleteRecipeFromMealPlan);

    // Fetch recipes when the component mounts to display list on the right hand side
    useEffect(() => {
        const getRecipes = async () => {
            try {
                const recipes = await fetchRecipes();
                const formattedRecipes = recipes.map(recipe => ({
                    title: recipe.recipe_title,
                    id: recipe.recipe_id,
                })).sort((a, b) => a.title.localeCompare(b.title)); //Sort alphabetically
                setRecipeList(formattedRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        getRecipes();
    }, [refresh]);  //can't use recipeList here as it may cause infinte loop. Rather use a flag to refresh recipe display on calendar 

    useEffect(() => {
        if (!draggableInitialized.current) {
            let draggableEl = document.getElementById('draggable-el');
            if (draggableEl) {
                new Draggable(draggableEl, {
                    itemSelector: ".fc-event",
                    eventData: function (eventEl) {
                        let title = eventEl.getAttribute("title");
                        let id = eventEl.getAttribute("data");
                        return { title, id };
                    }
                });
                draggableInitialized.current = true; // Mark as initialized
            }
        }
    }, []);

    const handleEventReceive = async (info) => {
        try {
            const dropInfo = {
                draggedEl: info.draggedEl,
                date: info.event.start, // Convert to UTC
            };
            await addEvent(dropInfo);
        } catch (error) {
            console.error('Error during event receive:', error);
            info.revert();
        }
    };

    const handleEventDrop = async (info) => {
        console.log(`Info:${info}`);
        try {
            await updateEvent(info);
        } catch (error) {
            console.error('Error during event drop:', error);
            info.revert();
        }
    };

    const handleEventClick = (info) => {
        const recipe = {
            id: info.event.id,
            title: info.event.title
        };
        handleShowDeleteMealPlanEntry(recipe);
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSide} className={`${faunaOne.className}`}>
                <div style={styles.calendarContainer} >
                    <FullCalendar
                        headerToolbar={{
                            left: 'today prev next',
                            center: 'title',
                            right: 'dayGridMonth,listMonth'
                        }}
                        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        timeZone="local"
                        events={recipeCalendar}
                        //nowIndicator={true}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        //dateClick={handleDateClick}
                        eventReceive={handleEventReceive}   //handles when external recipe is added
                        eventDrop={handleEventDrop}         //handles when exisiting recipe is moved
                        eventClick={handleEventClick}       //handles removing the entry from the mealplan
                    />
                </div>
            </div>
            <div style={styles.rightSide} id="draggable-el">
                <h4 className={`${faunaOne.className} title center`} style={styles.heading}>Add Your Recipes</h4>
                <div className="center">
                    <a className={`${faunaOne.className} title center custom-btn btn btn-outline-dark mt-2 mb-2`} href="#" role="button" onClick={handleShowAddRecipe}> + New Recipe</a>
                </div>
                <div style={{ ...styles.content, display: 'block' }} >
                    {recipeList.map(recipe => (
                        <div
                            className={`${faunaOne.className} fc-event border-2 p-1 m-2 w-full rounded-md ml-auto`}
                            title={recipe.title}
                            data-id={recipe.id}
                            key={recipe.id}
                            style={{ cursor: 'pointer' }}
                        >
                            {recipe.title}
                        </div>
                    ))}
                </div>
            </div>
            {/**ADD RECIPE Modal Pop UP */}
            <AddRecipePopup
                show={showAddRecipe}
                onHide={handleCloseAddRecipe}
                newRecipe={newRecipe}
                setNewRecipe={setNewRecipe}
                handleAddRecipe={handleAddRecipe}
            />
            <DeletePopup
                show={showDelete}
                onHide={handleCloseDelete}
                recipeTitle={recipeToDelete?.title}
                handleDelete={handleDeleteMealPlanEntry} // Use the new function for deleting meal plan entry
                isDeleting={isDeleting}
            />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100vh', // Full viewport height
        margin: '0 20px', // Equal margin on left and right
    },
    leftSide: {
        flex: 3, // Left side takes up 2/3 of the available space
        display: 'flex',
        flexDirection: 'column', // Stack heading and calendar vertically
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'center',
        //border: '2px solid blue', // Blue border instead of background
        padding: '10px', // Padding inside the border
        borderRadius: '10px', // Optional: rounded corners for the border
    },
    calendarContainer: {
        flexGrow: 1, // Allow the calendar container to grow
        width: '80%', // Full width of the left side
        height: 0, // Set to 0 to allow for height based on aspect ratio
        paddingBottom: '80%', // Set padding to maintain aspect ratio (1:1)
        position: 'relative', // Positioning context for the calendar
    },
    calendarStyle: {
        position: 'absolute', // Position it absolutely within the container
        top: 0, // Align to the top
        left: 0, // Align to the left
        right: 0, // Stretch to the right
        bottom: 0, // Stretch to the bottom
        height: '100%', // Ensure it fills the container height
    },
    rightSide: {
        flex: 1, // Right side takes up 1/3 of the available space
        display: 'flex',
        flexDirection: 'column', // Stack heading and content vertically
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'center',
        color: 'black', // Text color for contrast
        //border: '2px solid red',
        //fontSize: '24px',
        //fontWeight: 'bold',
        padding: '20px', // Optional padding for aesthetics
    },
    heading: {
        marginBottom: '20px', // Space below the heading
        textAlign: 'center', // Center the heading text
        //fontSize: '20px', // Adjust font size as needed
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Fill the remaining space
    },
};

//https://github.com/NikValdez/NextJSCalendarTut/blob/main/app/page.tsx