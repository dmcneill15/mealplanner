'use client' // client component, not server rendered
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row, Container, Modal, Button, Form } from 'react-bootstrap';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';

import { fetchRecipes } from '@/app/api/recipesApi'
import DeletePopup from './DeletePopup';
import { useDeletePopup } from '@/hooks/useDeletePopup';    //custom hook to handle delete popup
import RecipeDetailsPopup from './RecipeDetailsPopup';
import { useRecipeDetailsPopup } from '@/hooks/useRecipeDetailsPopup';
import AddRecipePopup from './AddRecipePopup';
import { useAddRecipePopup } from '@/hooks/useAddRecipePopup'
import UpdateRecipePopup from './UpdateRecipePopup';
import { useUpdateRecipePopup } from '@/hooks/useUpdateRecipePopup';

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
export default function RecipeCard({ recipes }) {
    const [currentRecipes, setCurrentRecipes] = useState(recipes || []);    //set initial state to recipes passed in or set to empty if no recipe data
    
    // Use useEffect to fetch recipes when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipesArray = await fetchRecipes(); // Call the API function
                setCurrentRecipes(recipesArray); // Set the state with the fetched recipes
            } catch (error) {
                console.error('Error loading recipes:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means it runs only once on mount

    //-------------------------------------REFACTORED DELETE - to a custom hook - able to use this hook in other components */
    // Use the custom hook, passing the fetchRecipes function
    const {
        showDelete,         //Hook returns the state of the modal popup - visible or not
        recipeTitle,        //Hook returns the title of the recipe to delete
        isDeleting,         //Hook returns the state of the deleting function
        handleShowDelete,   //Hook returns the function to trigger displaying the modal
        handleCloseDelete,  //Hook returns the function to handle closing the modal
        onDeleteSuccess,    //Hook returns the function to handle a successful delete - refetching the recipes
        handleDelete,       //Hook returns the function to handle the api calls to delete the recipe 
    } = useDeletePopup(setCurrentRecipes);  // Pass fetchRecipes to the hook
    //-------------------------------------REFACTORED DELETE */

    //-------------------------------------REFACTORED ADD - to a custom hook - able to use this hook in other components */
    const {
        newRecipe,
        setNewRecipe,
        showAddRecipe,
        handleCloseAddRecipe,
        handleShowAddRecipe,
        handleAddRecipe,
    } = useAddRecipePopup(setCurrentRecipes);
    //-------------------------------------REFACTORED ADD */

    //-------------------------------------REFACTORED ADD - to a custom hook - able to use this hook in other components */
    const {
        recipeToUpdate,
        showUpdateRecipe,
        updatedRecipe,
        handleCloseUpdateRecipe,
        handleShowUpdateRecipe,
        handleUpdateRecipe,
        setUpdatedRecipe,
    } = useUpdateRecipePopup(setCurrentRecipes);
    //-------------------------------------REFACTORED UPDATE */


    //-------------------------------------REFACTORED SHOW */
    const {
        showRecipeDetails,
        selectedRecipe,
        handleShowRecipeDetails,
        handleCloseRecipeDetails,
    } = useRecipeDetailsPopup();
    //-------------------------------------REFACTORED SHOW */

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
                                    alt={`${recipe.recipe_title} image`}
                                />
                                <Card.Body>
                                    <Card.Title className={`${fontCinzel.className} title center fs-5`}
                                        onClick={() => handleShowRecipeDetails(recipe)}
                                        style={{ cursor: 'pointer' }}
                                    >{recipe.recipe_title
                                        }</Card.Title>
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
            <DeletePopup
                show={showDelete}
                onHide={handleCloseDelete}
                recipeTitle={recipeTitle}
                handleDelete={handleDelete}
                isDeleting={isDeleting}
            />

            {/**ADD RECIPE Modal Pop UP */}
            <AddRecipePopup
                show={showAddRecipe}
                onHide={handleCloseAddRecipe}
                newRecipe={newRecipe}
                setNewRecipe={setNewRecipe}
                handleAddRecipe={handleAddRecipe}
            />

            {/**UPDATE RECIPE Modal Pop UP */}
            <UpdateRecipePopup
                show={showUpdateRecipe}
                onHide={handleCloseUpdateRecipe}
                handleUpdateRecipe={handleUpdateRecipe}
                updatedRecipe={updatedRecipe}
                setUpdatedRecipe={setUpdatedRecipe}
            />

            {/**SHOW RECIPE Modal Pop UP */}
            <RecipeDetailsPopup
                show={showRecipeDetails}
                onHide={handleCloseRecipeDetails}
                recipe={selectedRecipe}
            />

        </>
    )
} 