'use client' // client component, not server rendered
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


export default function Orders({ recipes }) {
    if (recipes.length === 0) {
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
                {recipes.map(recipe => (
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
                                    <a className="btn btn-link btn-floating btn-outline-dark btn-lg text-dark icon-button" href="#!" role="button">
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