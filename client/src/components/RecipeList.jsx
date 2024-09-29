//used to display a list of recipe cards
import { Row, Col, Container } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onRecipeClick }) => (
    <Container className="justify-content-center align-items-center">
        <Row xs={1} sm={2} md={5} className="justify-content-center">
            {recipes.map((recipe) => (
                <Col key={recipe.recipe_id} className="g-3 justify-content-center">
                    <RecipeCard recipe={recipe} onClick={onRecipeClick} />
                </Col>
            ))}
        </Row>
    </Container>
);

export default RecipeList;