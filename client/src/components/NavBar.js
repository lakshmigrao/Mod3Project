import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar({ user, setUser }) {
//console.log(user.id)
  const logout = () => {
    localStorage.removeItem("token")
    setUser({})
  }
  return (<>
    {user ?
      <Navbar className="d-flex navbar" bg="light" expand="lg" sticky='top' >
        <Container>
          <Navbar.Brand >Welcome {user}</Navbar.Brand>
          <Navbar.Brand >Recipes</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto container-fluid">
              <Nav.Item>
                <Nav.Link href="/" className='tab'>Home</Nav.Link></Nav.Item>
                <Nav.Item>
                 <Nav.Link href={`/myrecipes/${user}`} className='tab'>My Recipes</Nav.Link></Nav.Item>
                 <Nav.Item >
                <Nav.Link href="/profile" className='tab'>Profile</Nav.Link></Nav.Item>
              <Nav.Item className="ms-auto">
                <Nav.Link href="/login" className='tab' onClick={logout}>Logout</Nav.Link></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      :
      <Navbar className="d-flex navbar" bg="light" expand="lg" sticky='top' >
        <Container>
          <Navbar.Brand href="#home">Recipes</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto container-fluid">
              <Nav.Item>
                <Nav.Link href="/" className='tab'>Home</Nav.Link></Nav.Item>
              <Nav.Item>
                <Nav.Link href="/login" className='tab'>Login</Nav.Link></Nav.Item>
              <Nav.Item>
                <Nav.Link href="/register" className='tab'>Register</Nav.Link></Nav.Item>
              {/* <Nav.Item className="ms-auto">
                <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link></Nav.Item> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    }
  </>);
}

export default NavBar;

{/* <nav className="navbar navbar-expand-lg nav">
      <div className="container-fluid">
       
        
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
      {user ? 
        <>
          <li className="nav-item">Welcome {user}!</li>
          <li className="nav-item">
            <Link className="nav-link" to="/places">Places</Link>
          </li>
          <li className="nav-item" onClick={logout}>
            <Link  className="nav-link" to="/login">Logout</Link>
          </li>
        </>
       : 
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/places">Places</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link signup" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link  className="nav-link" to="/register">Register</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to='/help'>
                <div>About</div>
              </Link>
            </li>
        </>
      }
    </ul>
        </div>
      </div>
    </nav> */}