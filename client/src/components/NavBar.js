import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    
    <Navbar class="d-flex" bg="light" expand="lg" sticky='top'>
      <Container>
        <Navbar.Brand href="#home">Recipes</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
          <Nav className="me-auto container-fluid">
            <Nav.Item>
            <Nav.Link href="#home">Home</Nav.Link></Nav.Item>
            <Nav.Item>
            <Nav.Link href="#link">Login</Nav.Link></Nav.Item>
            <Nav.Item>
            <Nav.Link href="#link">Register</Nav.Link></Nav.Item>
            <Nav.Item className="ms-auto">
            <Nav.Link  href="#link">Logout</Nav.Link></Nav.Item>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}

export default NavBar;