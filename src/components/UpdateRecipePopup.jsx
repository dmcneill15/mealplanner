import { Modal, Button, Form } from 'react-bootstrap';

const UpdateRecipePopup = ({ show, onHide, handleUpdateRecipe, updatedRecipe, setUpdatedRecipe }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdateRecipe}>
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
    );
}

export default UpdateRecipePopup;


