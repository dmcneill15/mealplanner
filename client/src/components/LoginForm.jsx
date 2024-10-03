'use client' // client component, not server rendered
import { Container, Card, Button, Form } from 'react-bootstrap';

// Import  font
import { EB_Garamond, Cinzel, Fauna_One, Montaga } from 'next/font/google';

function LoginForm() {

    return (
        <Container className="mt-4">
            <Card  style={{ width: '400px', margin: 'auto', border: "none" }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button style={{ textDecoration: 'none' }} variant="outline-dark" type='submit'>Login</Button>
                </Form>
            </Card>
        </Container>
    )
}

export default LoginForm