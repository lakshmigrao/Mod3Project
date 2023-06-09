import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/userService";
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
// import { confirm } from "react-confirm-box";

function Profile({ user,setUser }) {

    const navigate = useNavigate()
    async function handleDelete(){
        let ans = window.confirm("Are you sure you want to delete your account?")
        if(ans){
            await deleteUser()
            localStorage.removeItem("token")
            localStorage.removeItem(user.username)
            setUser({})
            alert("We will miss you.")
            navigate('/login')
        }
    }
    return ( 
        <div className="profile">
            <h1>Welcome to {user.username.toUpperCase()} 's Profile</h1>
            <br /><br />
            <Form style={{width:"500px"}}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label> <strong>First Name</strong></Form.Label>
                            <Form.Control type="fname" placeholder={user.fname} disabled/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label> <strong>Last Name</strong></Form.Label>
                            <Form.Control type="lname" placeholder={user.lname} disabled/>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" >
                    <Form.Label> <strong>Country of residence</strong></Form.Label>
                    <Form.Control type="country" placeholder={user.country} disabled/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label> <strong>Username</strong> </Form.Label>
                    <Form.Control type="username" placeholder={user.username} disabled/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label> <strong>E-mail</strong> </Form.Label>
                    <Form.Control type="email" placeholder={user.email} disabled/>
                </Form.Group>
            </Form>    
            <br /><br />
            <div style={{display:"flex", justifyContent:"center"}}>
                <Link to={`/profile/edit`}>
                    <button ><i style={{fontSize:"25px"}}class="fa-solid fa-pen-to-square"></i>Edit Profile</button> 
                </Link>
                <button onClick={handleDelete} style={{marginLeft : "100px",fontSize:"15px"}}><i class="fa-solid fa-trash"></i>Delete Profile</button>
           </div>
        </div>
    );
}

export default Profile;