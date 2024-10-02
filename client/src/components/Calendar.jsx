'use client' // client component, not server rendered
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'; // Import List plugin
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
//import { useRecipes } from '@/hooks/useRecipes';
import { fetchRecipes } from '@/app/api/recipesApi';
import AddRecipePopup from './AddRecipePopup';
import { useAddRecipePopup } from '@/hooks/useAddRecipePopup'
import { useMealPlan } from '@/hooks/useMealPlan';
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
        updateEvent
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


/*export default function Calendar({recipes}) {
    const baseURL = "http://localhost:8080";

    const [currentRecipes, setCurrentRecipes] = useState(recipes || []);    //set initial state to recipes passed in or set to empty if no recipe data
    //add this function to refetch the data from the server once a delete/update/add has been performed
    const fetchRecipes = async () => {
        try {
            const response = await fetch(`${baseURL}/api/recipes`, { cache: 'no-cache' });
            const result = await response.json();
            const recipesArray = result.data;
            console.log(recipesArray)
            setCurrentRecipes(recipesArray);
            console.log(currentRecipes);
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
        }
    };

    // Use useEffect to fetch recipes when the component mounts
    useEffect(() => {
        fetchRecipes();
    }, []); // Empty dependency array means it runs only once on mount

    return (
        <div className="flex flex-col items-center justify-between p-4" style={{ margin: 'auto', maxWidth: '900px' }}>
            <div className="flex flex-row justify-between w-full">
                <div className="flex-1">
                    <FullCalendar
                        headerToolbar={{
                            left: 'today next prev',
                            center: 'title',
                            right: 'dayGridMonth timeGridWeek'
                        }}
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        events={recipes}
                        eventTextColor="black"
                        eventDisplay="block"
                        eventBorderColor="green"
                        displayEventTime={false}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        //dateClick={handleDateClick}
                        drop={(data) => addRecipe(data)}
                        //recipeclick={(data) => handleDeleteModal(data)}
                        style={{ maxWidth: '100%', height: 'auto' }} // Ensure the calendar is responsive
                    />
                </div>
                <div className="w-1/4 ml-4 border-2 p-2 rounded-md mt-4 bg-violet-50">
                    <h1 className="font-bold">Add recipes to your plan</h1>
                    {recipes.map((recipe) => (
                        <div
                            className="fc-event border-2 p-1 m-1 w-full rounded-md text-center bg-white"
                            title={recipe.title}
                            key={recipe.id}
                        >
                            {recipe.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}*/
