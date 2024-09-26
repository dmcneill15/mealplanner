'use client' // client component, not server rendered
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useState, useEffect } from 'react'


export default function Calendar() {

    const [recipes, setRecipe] = useState([
        { title: 'recipe 1', id: '1' },
        { title: 'recipe 2', id: '2' },
        { title: 'recipe 3', id: '3' },
    ]);

    const [allRecipes, setAllRecipes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [newRecipe, setNewRecipe] = useState([]);

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
    }, []);

    function handleDateClick(date, allDay) {
        setNewRecipe({ ...newRecipe, start: date, allDay: allDay, id: new Date().getTime() })
        setShowModal(true);
    }

    function addRecipe(data) {
        const recipe = { ...newRecipe, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDaty, id: new Date().getTime() }
        setAllRecipes([...allRecipes, recipe]);
    }

    function handleDeleteModal(data) {
        setShowDeleteModal(true)
        setIdToDelete(Number(data.event.id))
    }

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
                        events={allRecipes}
                        eventTextColor="black"
                        eventDisplay="block"
                        eventBorderColor="green"
                        displayEventTime={false}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        dateClick={handleDateClick}
                        drop={(data) => addRecipe(data)}
                        recipeclick={(data) => handleDeleteModal(data)}
                        style={{ maxWidth: '100%', height: 'auto' }} // Ensure the calendar is responsive
                    />
                </div>
                <div className="w-1/4 ml-4 border-2 p-2 rounded-md mt-4 bg-violet-50">
                    <h1 className="font-bold text-center">Drag Recipes to Plan</h1>
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
}
