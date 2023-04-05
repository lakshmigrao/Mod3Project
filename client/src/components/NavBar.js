import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function NavBar({ user, setUser }) {
  const logout = () => {
    localStorage.removeItem("token")
    setUser({})
  }
  return (<>
    {user ?
      <Navbar  bg="dark" variant="dark" expand="lg" sticky='top' style={{fontSize : "25px"}} >
        <Container>
          <Navbar.Brand >{user.charAt(0).toUpperCase()+user.slice(1)}'s   </Navbar.Brand>
          <Navbar.Brand className="fontHindi" style={{fontSize:"30px", color:"gold"}}>Recipe World</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav justify variant="pills" className="me-auto container-fluid">
              <Nav.Item>
                <Link to="/" className='tab'>Home</Link></Nav.Item>
                <Nav.Item>
                 <Link to="/myrecipes" className='tab'>My Recipes</Link></Nav.Item>
                 <Nav.Item >
                <Link to="/profile" className='tab'>Profile</Link></Nav.Item>
              <Nav.Item className="ms-auto">
                <Link to="/login" className='tab' onClick={logout}>Logout</Link></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      :
      <Navbar  bg="dark" variant="dark" expand="lg" sticky='top' style={{fontSize : "25px"}} >
        <Container>
          <Navbar.Brand className="fontHindi" style={{fontSize:"30px", color:"gold"}}>Recipe World</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav justify variant="pills" className="me-auto container-fluid">
              <Nav.Item>
                <Link to="/" className='tab'>Home</Link></Nav.Item>
              <Nav.Item>
                <Link to="/login" className='tab'>Login</Link></Nav.Item>
              <Nav.Item>
                <Link to="/register" className='tab'>Register</Link></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    }
  </>);
}

export default NavBar;
