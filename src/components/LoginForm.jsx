'use client' // client component, not server rendered
import { Container, Card, Button, Form } from 'react-bootstrap';
import { ebGaramond, fontCinzel, faunaOne, montega } from '@/lib/fonts';

function LoginForm() {

    return (
        <Container className="mt-4">
            <Card  className='transparent-bg' style={{ width: '400px', margin: 'auto', border: "none" }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button className={`${faunaOne.className} center button-link`} variant="dark" type='submit'>Login</Button>
                </Form>
            </Card>
        </Container>
    )
}

export default LoginForm