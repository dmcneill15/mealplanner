'use client' // client component, not server rendered
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row, Container, Modal, Button, Form } from 'react-bootstrap';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';

import { EB_Garamond, Cinzel, Fauna_One } from 'next/font/google';

const ebGaramond = EB_Garamond({
    weight: ['700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

const fontCinzel = Cinzel({
    weight: ['600'],
    style: ['normal'],
    subsets: ['latin'],
});

const faunaOne = Fauna_One({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
});


//Recipe card takes delete function as a prop which is actioned on the delete icon press
export default function RecipeCard({ recipes, baseURL }) {
    const [currentRecipes, setCurrentRecipes] = useState(recipes || []);    //set initial state to recipes passed in or set to empty if no recipe data
    const [showDelete, setShowDelete] = useState(false);
    const [showAddRecipe, setShowAddRecipe] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState(null);
    const [recipeTitle, setRecipeTitle] = useState(null);
    const [recipeToUpdate, setRecipeToUpdate] = useState(null);
    const [showUpdateRecipe, setShowUpdateRecipe] = useState(false);


    // State for new recipe
    const [newRecipe, setNewRecipe] = useState({ recipe_title: '', method: '', servings: '', image: '' });
    // State for updated recipe
    const [updatedRecipe, setUpdatedRecipe] = useState({ recipe_title: '', method: '', servings: '', image: '' });

    //handle the modal popup
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (recipeTitle) => {
        setRecipeToDelete(recipeTitle);
        setRecipeTitle(recipeTitle);
        setShowDelete(true);
    }

    const handleCloseAddRecipe = () => {
        setShowAddRecipe(false);
        setNewRecipe({ recipe_title: '', method: '', servings: '', image: '' }); // Reset input fields
    };
    const handleShowAddRecipe = () => setShowAddRecipe(true);

    const handleCloseUpdateRecipe = () => {
        setShowUpdateRecipe(false);
        setUpdatedRecipe({ recipe_title: '', method: '', servings: '', image: '' }); // Reset input fields
    }
    const handleShowUpdateRecipe = (recipe) => {
        console.log(recipe);
        setRecipeToUpdate(recipe.recipe_title);
        setUpdatedRecipe({ recipe_title: recipe.recipe_title, method: recipe.method, servings: recipe.servings, image: recipe.image || '' });
        setShowUpdateRecipe(true);
    }

    const addRecipe = async (e) => {
        e.preventDefault(); //prevent the browser from refreshing when handling a form

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
                fetchRecipes();
            } else {
                console.error('Failed to add recipe');
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
        } finally {
            handleCloseAddRecipe();
        }
    };

    const deleteRecipe = async () => {
        //e.preventDefault(); //prevent the browser from refreshing when handling a form

        if (recipeToDelete) {
            try {
                const response = await fetch(`${baseURL}/api/recipes/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ recipe_title: recipeToDelete })
                });

                if (response.ok) {
                    fetchRecipes();
                } else {
                    console.error('Failed to delete recipe');
                }
            }
            catch (error) {
                console.error('Error deleting recipe:', error);
            }
            finally {
                handleCloseDelete();
            }
        }
    };

    const updateRecipe = async (e) => {
        e.preventDefault(); //prevent the browser from refreshing when handling a form

        // Only send updated fields to db
        const recipeUpdates = {};
        if (updatedRecipe.recipe_title !== recipeToUpdate) recipeUpdates.new_title = updatedRecipe.recipe_title;
        if (updatedRecipe.method) recipeUpdates.new_method = updatedRecipe.method;
        if (updatedRecipe.servings) recipeUpdates.new_servings = updatedRecipe.servings;
        if (updatedRecipe.image) recipeUpdates.new_image = updatedRecipe.image;

        try {
            const response = await fetch(`${baseURL}/api/recipes/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipe_title: recipeToUpdate,
                    ...recipeUpdates,
                }),
            });

            if (response.ok) {
                await fetchRecipes();
            } else {
                console.error('Failed to update recipe');
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
        } finally {
            handleCloseUpdateRecipe();
        }
    }


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
        <>
            {currentRecipes.length === 0 ? (
                <Container className='justify-content-center align-items-center'>
                    <Row xs={1} sm={1} md={1} className="g-4 justify-content-center">
                        <Col className="center g-4 justify-content-center">
                            <p>No recipes added yet</p>
                        </Col>
                    </Row>
                    <div className="center">
                        <Button variant="outline-dark" onClick={handleShowAddRecipe}> + Add Recipe </Button>
                    </div>
                </Container>
            ) : (
                <div className="center">
                    <a className={`${faunaOne.className} title center custom-btn btn btn-outline-dark mt-2 mb-2`} href="#" role="button" onClick={handleShowAddRecipe}> + Add Recipe</a>
                </div>
            )}
            <Container className='justify-content-center align-items-center'>
                <Row xs={1} sm={2} md={5} className="justify-content-center">
                    {currentRecipes.map(recipe => (
                        <Col key={recipe.recipe_id} className="g-3 justify-content-center">
                            <Card className=' border-2 text-center'>
                                <Card.Img
                                    className="mx-auto pt-2"
                                    src={recipe.image ? recipe.image : "/images/plate.png"}
                                    alt={recipe.recipe_title}
                                />
                                <Card.Body>
                                    <Card.Title className={`${fontCinzel.className} title center fs-5`}>{recipe.recipe_title}</Card.Title>
                                    <Tooltip title="Add to Meal Plan" arrow>
                                        <a className="btn btn-link btn-floating btn-outline-dark btn-lg text-dark icon-button" href="#!" role="button">
                                            <PlaylistAddIcon className='custom-icon' /></a>
                                    </Tooltip>
                                    <Tooltip title="Edit Recipe" arrow>
                                        <a className="btn btn-link btn-floating btn-outline-dark btn-lg text-dark icon-button" href="#!" role="button"
                                            onClick={() => handleShowUpdateRecipe(recipe)}>
                                            <EditNoteIcon className='custom-icon' /></a>
                                    </Tooltip>
                                    <Tooltip title="Delete Recipe" arrow>
                                        <a className="btn btn-link btn-floating btn-outline-dark btn-lg text-dark icon-button" href="#!" role="button"
                                            onClick={() => handleShowDelete(recipe.recipe_title)}>
                                            <DeleteForeverIcon className='custom-icon' /></a>
                                    </Tooltip>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container >

            {/*DELET: Modal Pop Up */}
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {recipeTitle}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteRecipe}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/**ADD RECIPE Modal Pop UP */}
            <Modal show={showAddRecipe} onHide={handleCloseAddRecipe}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a New Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addRecipe}>
                        <Form.Group controlId="formRecipeTitle">
                            <Form.Label>Recipe Title*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title (required)"
                                value={newRecipe.recipe_title}
                                onChange={(e) => setNewRecipe({ ...newRecipe, recipe_title: e.target.value })}
                                required
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group controlId="formRecipeMethod" className="mt-3">
                            <Form.Label>Method</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3} // Set the number of visible rows
                                placeholder="Method (optional)"
                                value={newRecipe.method}
                                onChange={(e) => setNewRecipe({ ...newRecipe, method: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRecipeServings" className="mt-3">
                            <Form.Label>Servings</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Servings (optional)"
                                value={newRecipe.servings}
                                onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })}
                            />
                        </Form.Group>
                        {/*} <Form.Group controlId="formRecipeImage" className="mt-3">
                            <Form.Label>Recipe Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image URL"
                                value={newRecipe.image}
                                onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
                            />
                        </Form.Group>*/}
                        <Button variant="outline-dark" type="submit" className="mt-3">
                            Add Recipe
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/**UPDATE RECIPE Modal Pop UP */}
            <Modal show={showUpdateRecipe} onHide={handleCloseUpdateRecipe}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateRecipe}>
                        <Form.Group controlId="formUpdateRecipeTitle">
                            <Form.Label>Recipe Title*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title (required)"
                                value={updatedRecipe.recipe_title}
                                onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, recipe_title: e.target.value })}
                                required
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group controlId="formUpdateRecipeMethod" className="mt-3">
                            <Form.Label>Method</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3} // Set the number of visible rows
                                placeholder="Method (optional)"
                                value={updatedRecipe.method}
                                onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, method: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formUpdateRecipeServings" className="mt-3">
                            <Form.Label>Servings</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Servings (optional)"
                                value={updatedRecipe.servings}
                                onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, servings: e.target.value })}
                            />
                        </Form.Group>
                        {/* Uncomment if you need to update the recipe image */}
                        {/* <Form.Group controlId="formUpdateRecipeImage" className="mt-3">
                        <Form.Label>Recipe Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image URL"
                            value={updatedRecipe.image}
                            onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, image: e.target.value })}
                        />
                    </Form.Group> */}
                        <Button variant="outline-dark" type="submit" className="mt-3">
                            Update Recipe
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
} 