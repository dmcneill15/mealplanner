'use client' // client component, not server rendered
import { usePathname } from 'next/navigation'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { fontCinzel, faunaOne } from '@/lib/fonts';

function NavBar() {
    const pathname = usePathname(); // Hook to check current active path

    return (
        <div className={`mb-4 `}>
            <header>
                <h1 className={`${fontCinzel.className} title center pt-4`}>Plan to Plate</h1>
                <h5 className={`${faunaOne.className} slogan center`}>meal prep made easy</h5>
            </header>

            <br></br>
            <Navbar collapseOnSelect  className="mb-0">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className={`${faunaOne.className} me-auto`}>
                            <Nav.Link href="/" className={`${faunaOne.className} nav-link me-2 ${pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
                            <Nav.Link href="/mealplan" className={`${faunaOne.className} nav-link me-2 ${pathname === '/mealplan' ? 'active' : ''}`}>Meal Plan</Nav.Link>
                            <Nav.Link href="/recipes" className={`${faunaOne.className} nav-link ${pathname === '/recipes' ? 'active' : ''}`}>Recipes</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/profile" className={`${faunaOne.className} nav-link ${pathname === '/profile' ? 'active' : ''}`}>Profile</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default NavBar