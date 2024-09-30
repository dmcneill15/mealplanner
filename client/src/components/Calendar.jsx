'use client' // client component, not server rendered
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'; // Import List plugin
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'

import { useState, useEffect } from 'react'

export default function Calendar() {

    const [events, setEvents] = useState([
        { title: 'Sample Event 1', date: '2024-09-30' },
        { title: 'Sample Event 2', date: '2024-10-02' },
        // Add more initial events here
    ]);

    return (
        <div style={styles.container}>
            <div style={styles.leftSide}>
                <div style={styles.calendarContainer}>
                    <FullCalendar
                        headerToolbar={{
                            left: 'today prev next',
                            center: 'title',
                            right: 'dayGridMonth listMonth'
                        }}
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]} // Use the day grid plugin
                        initialView="dayGridMonth" // Start with the month view
                        events={events} // Set the events
                        style={styles.calendarStyle} // Ensure it fills the height
                    />
                </div>
            </div>
            <div style={{ ...styles.rightSide, backgroundColor: 'red' }}>
                <h2 style={styles.heading}>Add Your Recipes</h2>
                <div style={styles.content}>
                    {/* Add more content here as needed */}
                    Right Side Content
                </div>
            </div>
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
        border: '5px solid blue', // Blue border instead of background
        padding: '20px', // Padding inside the border
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
        color: 'white', // Text color for contrast
        fontSize: '24px',
        fontWeight: 'bold',
        padding: '20px', // Optional padding for aesthetics
    },
    heading: {
        marginBottom: '20px', // Space below the heading
        textAlign: 'center', // Center the heading text
        fontSize: '20px', // Adjust font size as needed
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Fill the remaining space
    },
};
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
