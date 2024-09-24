'use client' // client component, not server rendered
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, ListGroup, Button } from 'react-bootstrap';

// Import  font
import { EB_Garamond, Cinzel, Fauna_One, Montaga } from 'next/font/google';

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

const ebGaramond = EB_Garamond({
    weight: ['400'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

const montega = Montaga({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
});

function ProfileCard({ user }) {

    const handleAction = (item) => {
        console.log(`Action for ${item} clicked`);
        // Add your action handling logic here
    };

    const aboutItems = [
        'Username: ',
        'Email: ',
        'Password: ',
    ];

    return (
        <Container>
            <h2 className={`${montega.className} title center`}>Hello, {user.user_name}!</h2>

            <Card className="text-center mt-4" style={{ width: '500px', margin: 'auto' }}>
                <Card.Header className={`${fontCinzel.className} title center`}>Settings</Card.Header>
                <Card.Body>
                    <ListGroup>
                        <ListGroup.Item className={`${faunaOne.className} d-flex justify-content-between align-items-center`}>
                            Username: {user.user_name}
                            <a className={`${faunaOne.className} title center custom-btn btn btn-outline-dark`} onClick={() => handleAction(user.user_name)}>Update</a>
                        </ListGroup.Item>
                        <ListGroup.Item className={`${faunaOne.className} d-flex justify-content-between align-items-center`}>
                            Email: {user.email}
                            <a className={`${faunaOne.className} title center custom-btn btn btn-outline-dark`} onClick={() => handleAction(user.email)}>Update</a>
                        </ListGroup.Item>
                        <ListGroup.Item className={`${faunaOne.className} d-flex justify-content-between align-items-center`}>
                            Password: {'*'.repeat(user.password.length)} {/* Display asterisks for length of password */}
                            <a className={`${faunaOne.className} title center custom-btn btn btn-outline-dark`} onClick={() => handleAction('password')}>Update</a>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProfileCard;