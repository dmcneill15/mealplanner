'use client' // client component, not server rendered
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row, Container, CardFooter } from 'react-bootstrap';
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

    const deleteRecipe = async (recipeId) => {
        try {
            const response = await fetch(`${baseURL}/api/recipes`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recipe_id: recipeId })
            });

            if (response.ok) {
                //setCurrentRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.recipe_id !== recipeId));
                fetchRecipes();
            } else {
                console.error('Failed to delete recipe');
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
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
                                        onClick={() => deleteRecipe(recipe.recipe_id)}>
                                        <DeleteForeverIcon className='custom-icon' /></a>
                                </Tooltip>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container >
    )
} 