import { useState,useEffect,useRef} from "react"
import { Link, useNavigate } from "react-router-dom"
import { updateUserInfo, userInfo } from "../../services/userService"
import Form from 'react-bootstrap/Form'
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';

function EditProfile({user,setUser}){

    const navigate = useNavigate()
    const fnameRef = useRef()
    const lnameRef = useRef()
    const unameRef = useRef()
    const countryRef = useRef()
    const emailRef = useRef()
   
   useEffect(()=>{
        callGetUserProfile()
   },[])
    
   async function callGetUserProfile(){
    
        let userProfile = await userInfo()
        setUser(userProfile)
   }
        const handleSubmit = async (e) => {
            e.preventDefault()
    
            let newUser={
                username: unameRef.current.value, 
                email: emailRef.current.value,
                fname : fnameRef.current.value,
                lname : lnameRef.current.value,
                country : countryRef.current.value
            } 
 
            setUser(newUser)
            await updateUserInfo(newUser)
            alert(`Profile is successfully edited .`)
            navigate(`/profile`)
        }
    return (
        <div className="profile">
            <h1>Edit {user.username.toUpperCase()} 's Profile</h1>
            <br /><br />
            <Form style={{width:"500px"}}onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label> <strong>First Name</strong> </Form.Label>
                            <Form.Control type="fname" ref={fnameRef} defaultValue={user.fname} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label> <strong>Last Name</strong> </Form.Label>
                            <Form.Control type="lname" ref={lnameRef} defaultValue={user.lname} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" >
                    <Form.Label> <strong>Country of residence</strong> </Form.Label>
                    <Form.Control type="country" ref={countryRef} defaultValue={user.country} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label> <strong>Username</strong> </Form.Label>
                    <Form.Control type="username" ref={unameRef} defaultValue={user.username} disabled />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label> <strong>E-mail</strong> </Form.Label>
                    <Form.Control type="email" ref={emailRef} defaultValue={user.email}/>
                </Form.Group>
                <div style={{marginTop:"50px", display:"flex", justifyContent:"center"}}>
                    <button type="submit">Save <i style={{fontSize:"20px"}} class="fa-regular fa-floppy-disk"></i></button>
                    <Link to="/profile">
                        <button style={{marginLeft : "100px"}}>
                        <i class="fa-solid fa-circle-arrow-left" alt="Go Back"></i>Back</button>
                    </Link>
                </div>
            </Form> 
            <br /><br /> 
        </div>
    )
}

export default EditProfile