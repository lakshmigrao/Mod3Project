import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/userService";
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';

function Profile({ user,setUser }) {

    const navigate = useNavigate()
    async function handleDelete(){

        await deleteUser()
        localStorage.removeItem("token")
        localStorage.removeItem(user.username)
        setUser({})
        alert("Profile deleted.")
        navigate('/login')
    }
    return ( 
        <div className="profile">
            <h1>Welcome to {user.username.toUpperCase()} 's Profile</h1>
            <br /><br />
            <Form>
                <Row>
                    <Col>
            <Form.Group className="mb-3" >
                <Form.Label>First Name</Form.Label>
                <Form.Control type="fname" placeholder={user.fname} disabled/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="lname" placeholder={user.lname} disabled/>
            </Form.Group>
            </Col>
            </Row>
            <Form.Group className="mb-3" >
                <Form.Label>Country of residence</Form.Label>
                <Form.Control type="country" placeholder={user.country} disabled/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder={user.username} disabled/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" placeholder={user.email} disabled/>
            </Form.Group>
     
            </Form>
              
            <br /><br />
            <div style={{display:"flex", justifyContent:"center"}}>
            <Link to={`/profile/edit`}>
            <button ><i style={{fontSize:"25px"}}class="fa-solid fa-pen-to-square"></i>Edit Profile</button> </Link>
            <button onClick={handleDelete} style={{marginLeft : "100px",fontSize:"15px"}}><i class="fa-solid fa-trash"></i>Delete Profile</button>
           </div>
        </div>
        
     );
}

export default Profile;