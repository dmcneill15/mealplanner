'use client' // client component, not server rendered
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row, Container, Modal, Button } from 'react-bootstrap';
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
    const [currentRecipes, setCurrentRecipes] = useState(recipes);
    const [showModal, setShowModal] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState(null);
    const [recipeTitle, setRecipeTitle] = useState(null);

    //handle the modal popup
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (recipeId, recipeTitle) => {
        setRecipeToDelete(recipeId);
        setRecipeTitle(recipeTitle);
        setShowModal(true);
    }

    //add this function to refetch the data from the server once a delete/update/add has been performed
    const fetchRecipes = async () => {
        try {
            const response = await fetch(`${baseURL}/api/recipes`, { cache: 'no-cache' });
            const recipesArray = await response.json();
            setCurrentRecipes(recipesArray);
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
        }
    };

    const deleteRecipe = async () => {
        if (recipeToDelete) {
            try {
                const response = await fetch(`${baseURL}/api/recipes`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ recipe_id: recipeToDelete })
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
                handleCloseModal();
            }
        }
    };

    if (currentRecipes.length === 0) {
        return (
            <Container className=' justify-content-center align-items-center'>
                <Row xs={1} sm={1} md={1} className="g-4 justify-content-center">
                    <Col className="center g-4 justify-content-center">
                        <p className={`${faunaOne.className} center mt-4`}>
                            No recipes added yet<br></br>
                        </p>
                    </Col>
                </Row>
                <div>
                    <a className={`${faunaOne.className} title center custom-btn btn btn-outline-light`} href="#" role="button"> +Add a Recipe</a>
                </div>
            </Container>
        );
    }

    return (
        <div>
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
                                        <a className="btn btn-link btn-floating btn-outline-dark btn-lg text-dark icon-button" href="#!" role="button">
                                            <EditNoteIcon className='custom-icon' /></a>
                                    </Tooltip>
                                    <Tooltip title="Delete Recipe" arrow>
                                        <a className="btn btn-link btn-floating btn-outline-dark btn-lg text-dark icon-button" href="#!" role="button"
                                            onClick={() => handleShowModal(recipe.recipe_id, recipe.recipe_title)}>
                                            <DeleteForeverIcon className='custom-icon' /></a>
                                    </Tooltip>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container >

            {/*Modal Pop Up */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {recipeTitle}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteRecipe}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
} 