'use client' // client component, not server rendered
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'; // Import List plugin
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
//import { useRecipes } from '@/hooks/useRecipes';
import { fetchRecipes } from '@/app/api/recipesApi';
import { addRecipeToMealPlan, getUserMealPlan } from '@/app/api/mealplanApi';
import { EventSourceInput } from '@fullcalendar/core/index.js'

import { useState, useEffect, Fragment } from 'react'

export default function Calendar() {

    const userId = "66f739adc717200fa34ac24b";
    const [events, setEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    //const [idToDelete, setIdToDelete] = useState(null)
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        allDay: false,
        id: 0
    })

    useEffect(() => {
        const fetchMealPlan = async () => {
            try {
                const mealPlan = await getUserMealPlan(userId);
                // Check if mealPlan.data exists and is an array
                if (mealPlan.data && Array.isArray(mealPlan.data)) {
                    const formattedEvents = mealPlan.data.map(item => ({
                        title: item.recipe_id.recipe_title, // Access title directly from item
                        id: item._id, // Access _id directly from item
                        start: new Date(item.date), // Parse date to Date object
                        allDay: true
                    }));
                    setAllEvents(formattedEvents);
                    console.log('Formatted Events:', formattedEvents); // Log formatted events
                } else {
                    console.log('No meal plans found for this user.');
                }
            } catch (error) {
                console.error('Error fetching meal plan:', error);
            }
        };
        fetchMealPlan();
    }, [userId]);

    // Fetch recipes when the component mounts
    useEffect(() => {
        const getRecipes = async () => {
            try {
                const recipes = await fetchRecipes();
                const formattedEvents = recipes.map(recipe => ({
                    title: recipe.recipe_title, // Assuming recipe has a 'name' property
                    id: recipe.recipe_id, // Assuming recipe has an 'id' property
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        getRecipes();
    }, []);

    useEffect(() => {
        let draggableEl = document.getElementById('draggable-el')
        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: ".fc-event",
                eventData: function (eventEl) {
                    let title = eventEl.getAttribute("title")
                    let id = eventEl.getAttribute("data")
                    let start = eventEl.getAttribute("start")
                    return { title, id, start }
                }
            })
        }
    }, [])

    function handleDateClick(arg) {
        setNewEvent({
            ...newEvent,
            start: arg.date,
            allDay: arg.allDay,
            id: new Date().getTime()
        });
        setShowModal(true);
    }

    function addEvent(data) {
        const event = { ...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: new Date().getTime() }
        setAllEvents([...allEvents, event])
    }

    /*function handleDeleteModal(data) {
        setShowDeleteModal(true);
        setIdToDelete(Number(data.event.id));
    }

    function handleDelete() {
        setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
        setShowDeleteModal(false)
        setIdToDelete(null)
    }

    function handleCloseModal() {
        setShowModal(false)
        setNewEvent({
            title: '',
            start: '',
            allDay: false,
            id: 0
        })
        setShowDeleteModal(false)
        setIdToDelete(null)
    }
*/
    const handleChange = (e) => {
        setNewEvent({
            ...newEvent,
            title: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const mealPlanData = {
                user_id: userId,
                recipe_id: newEvent.id,
                date: newEvent.start,
                title: newEvent.title
            };

            await addRecipeToMealPlan(mealPlanData);

            setAllEvents([...allEvents, newEvent]);
            setShowModal(false);
            setNewEvent({
                title: '',
                start: '',
                allDay: false,
                id: 0
            });
        } catch (error) {
            console.error('Error adding event to calendar:', error);
        }
    }


    return (
        <div style={styles.container}>
            <div style={styles.leftSide}>
                <div style={styles.calendarContainer}>
                    <FullCalendar
                        headerToolbar={{
                            left: 'today prev next',
                            center: 'title',
                            right: 'dayGridMonth,listMonth'
                        }}
                        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        events={allEvents}
                        nowIndicator={true}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        selectMirror={true}
                        dateClick={handleDateClick}
                        drop={(data) => addEvent(data)}
                        eventClick={(data) => handleDeleteModal(data)}
                    />
                    {/* Modal code for adding a new event */}
                    {showModal && (
                        <div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    placeholder="Recipe title"
                                />
                                <button type="submit">Add to Calendar</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <div style={styles.rightSide} id="draggable-el">
                <h2 style={styles.heading}>Add Your Recipes</h2>
                <div style={{ ...styles.content, display: 'block' }} >
                    {events.map(event => (
                        <div
                            className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto"
                            title={event.title}
                            key={event.id}
                            style={{ cursor: 'pointer' }}
                        >
                            {event.title}
                        </div>
                    ))}
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
        border: '2px solid blue', // Blue border instead of background
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
        color: 'black', // Text color for contrast
        border: '2px solid red',
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
