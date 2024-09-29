'use client' // client component, not server rendered
//import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const RecipeDetailsModal = ({ show, recipe, onClose }) => (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>{recipe?.recipe_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img className="img-fluid mb-3" src={recipe?.image || "/images/plate.png"} alt={recipe?.recipe_title} />
            <p><strong>Method:</strong> {recipe?.method || 'No method added'}</p>
            <p><strong>Servings:</strong> {recipe?.servings || 'N/A'}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-dark" onClick={onClose}>Close</Button>
        </Modal.Footer>
    </Modal>
);

export default RecipeDetailsModal;

{/**SHOW RECIPE Modal Pop UP */ }
/*<Modal show={showRecipeDetails} onHide={handleCloseRecipeDetails}>
    <Modal.Header closeButton>
        <Modal.Title>{selectedRecipe?.recipe_title}</Modal.Title> 
    </Modal.Header>
    <Modal.Body>
        <img
            className="img-fluid mb-3"
            src={selectedRecipe?.image ? selectedRecipe.image : "/images/plate.png"}
            alt={selectedRecipe?.recipe_title}
        />
        <p><strong>Method:</strong> {selectedRecipe?.method || 'No method available'}</p>
        <p><strong>Servings:</strong> {selectedRecipe?.servings || 'N/A'}</p>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="outline-dark" onClick={handleCloseRecipeDetails}>
            Close
        </Button>
    </Modal.Footer>
</Modal>
*/



