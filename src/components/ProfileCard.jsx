'use client'
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Card, Container, ListGroup } from 'react-bootstrap';
import { fontCinzel, faunaOne, montega } from '@/lib/fonts';

function ProfileCard() {
    const { data: session, status } = useSession(); // Use the status of the active session to display loading wheel if still busy loading
    const [loading, setLoading] = useState(true);

    const handleAction = (item) => {
        console.log(`Action for ${item} clicked`);
        // Add action handling button logic here
    };

    useEffect(() => {
        if (status === 'authenticated') {
            setLoading(false);
        }
    }, [status]);

    const user = session?.user; // Get the current user from the session
    if (!user) {
        return <p>No user information available. Please log in.</p>; // Handle case where user is not available
    }

    return (
        <Container>
            <h2 className={`${montega.className} title center sub-head`}>Hello, {user.username}!</h2>
            <Card className="text-center mt-4" style={{ maxWidth: '500px', margin: 'auto' }}>
                <Card.Header className={`${fontCinzel.className} slogan center`}>Settings</Card.Header>
                <Card.Body>
                    <ListGroup>
                        <ListGroup.Item className={`${faunaOne.className} d-flex justify-content-between align-items-center`}>
                            Username: {user.username}
                            <a className={`${faunaOne.className} center custom-btn btn btn-outline-dark`} onClick={() => handleAction(user.username)}>Update</a>
                        </ListGroup.Item>
                        <ListGroup.Item className={`${faunaOne.className} d-flex justify-content-between align-items-center`}>
                            Email: {user.email_id}
                            <a className={`${faunaOne.className} center custom-btn btn btn-outline-dark`} onClick={() => handleAction(user.email_id)}>Update</a>
                        </ListGroup.Item>
                        <ListGroup.Item className={`${faunaOne.className} d-flex justify-content-between align-items-center`}>
                            Password: {'*'.repeat(user?.password?.length || 0)} {/* Display asterisks for length of password */}
                            <a className={`${faunaOne.className} center custom-btn btn btn-outline-dark`} onClick={() => handleAction('password')}>Update</a>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProfileCard;