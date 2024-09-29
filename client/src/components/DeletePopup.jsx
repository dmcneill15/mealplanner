import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteRecipe } from '../app/api/recipesApi'

const DeleteModal = ({ show, onHide, recipeTitle, onDeleteSuccess, baseURL }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!recipeTitle)
            return;

        setIsDeleting(true);

        const result = await deleteRecipe(baseURL, recipeTitle);
        setIsDeleting(false);

        if (result.success) {
            onDeleteSuccess();  // Callback to notify the parent component of success
        } else {
            console.error('Failed to delete recipe');
        }
        onHide();  // Close the modal regardless of success or failure
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {recipeTitle}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;