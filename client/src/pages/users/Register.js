import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo, userRegister } from "../../services/userService";
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';

let emptyForm = {
    username: '',
    password: '',
    email: '',
    fname: '',
    lname: '',
    country: ''
}

function Register({ setUser }) {
    const navigate = useNavigate()
    const fnameRef = useRef()
    const lnameRef = useRef()
    const unameRef = useRef()
    const countryRef = useRef()
    const emailRef = useRef()
    const passRef = useRef()

    let [form, setForm] = useState(emptyForm)

    const [isChecked, setIsChecked] = useState(false);
    
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let newForm = {
            username: unameRef.current.value,
            password: passRef.current.value,
            email: emailRef.current.value,
            fname: fnameRef.current.value,
            lname: lnameRef.current.value,
            country: countryRef.current.value
        }

        const token = await userRegister(newForm)

        if (!token) {
            setForm(emptyForm)
            return
        }
        localStorage.setItem("token", token)

        const user = await userInfo()
        setUser(user)
        alert(`Welcome ${user.username} to recipe world.`)

        navigate('/')
    }
    let buttonActive = false;

    return (<div className="register">
        <div style={{textAlign:"center", marginTop: "25px", color: "white" }}>
            <h3>Sign up with : </h3> <br />
            <a href="#"><i className="fa-brands fa-facebook loginsm"></i></a>
            <a href="#"><i className="fa-brands fa-github loginsm"></i></a>
            <a href="#"><i className="fa-brands fa-google loginsm"></i></a>
            <a href="#"><i className="fa-brands fa-twitter loginsm"></i></a>

            <h3 style={{ color: "white", marginBottom: "0px" }}>OR</h3>
        </div>
        
        <Form onSubmit={handleSubmit} style={{ width: "400px", marginTop: "20px" }}>
            <Row className="g-2">
                <Col md>
                    <FloatingLabel
                        controlId="floatingFname"
                        label="First Name"
                        className="mb-3"
                    >
                        <Form.Control size="lg" ref={fnameRef} type="fname" placeholder="First Name" />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel
                        controlId="floatingLname"
                        label="Last Name"
                        className="mb-3"
                    >
                        <Form.Control size="lg" ref={lnameRef} type="lname" placeholder="Last Name" />
                    </FloatingLabel>
                </Col>
            </Row>
            <FloatingLabel
                controlId="floatingCountry"
                label="Country"
                className="mb-3"
            >
                <Form.Control size="lg" ref={countryRef} type="country" placeholder="Country of residence" />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingEmail"
                label="E-mail"
                className="mb-3"
            >
                <Form.Control size="lg" ref={emailRef} type="email" placeholder="email@example.com" />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingUsername"
                label="Username"
                className="mb-3"
            >
                <Form.Control size="lg" ref={unameRef} type="username" placeholder="Username" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control size="sm" ref={passRef} type="password" placeholder="Password" />
            </FloatingLabel>
            <Form.Check
                    style={{ marginTop: "50px", fontSize: "20px", color: "white" }}
                    type='checkbox'
                    id='default-checkbox'
                    label='I have read and agree to the terms '
                    onChange={handleCheckboxChange}
                />
              {
              isChecked && (<button style={{ marginTop: "50px", width: "400px" }} type="submit">Register</button>)
              } 
            <br /><br /><br /><br />
        </Form>

    </div>)
}

export default Register