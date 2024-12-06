import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


const navBar = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">intersectionAll</Navbar.Brand>
                <Nav className = "me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Contributions</Nav.Link>
                    <Button>Contribute a marker!</Button>
                </Nav>
            </Container>
        </Navbar>
    )
}


export default navBar;
