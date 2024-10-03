'use client' // client component, not server rendered
import { usePathname } from 'next/navigation'
import Image from "next/image";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Import  font
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


function NavBar() {
    const path = usePathname(); // hook to check current path

    return (
        <div>
            <Image></Image>
            <header>
                <h1 className={`${fontCinzel.className} title center`}>Plan to Plate</h1>
                <h5 className={`${faunaOne.className} slogan center`}>meal prep made easy</h5>
            </header>

            <br></br>
            <Navbar collapseOnSelect data-bs-theme="light" className="mb-0">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className={`${faunaOne.className} me-auto`}>
                            <Nav.Link className={`${faunaOne.className} nav-link me-2`} eventKey={0} href="/">Home</Nav.Link>
                            <Nav.Link className={`${faunaOne.className} nav-link me-2`} eventKey={1} href="/mealplan">Meal Plan</Nav.Link>
                            <Nav.Link className={`${faunaOne.className} nav-link`} eventKey={2} href="/recipes">Recipes</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link className={`${faunaOne.className} nav-link`} eventKey={3} href="/profile">Profile</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default NavBar