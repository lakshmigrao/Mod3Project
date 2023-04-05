import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo, userLogin } from '../../services/userService'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


let emptyForm = {
    username: '',
    password: '',
    email: ''
}

function Login({ setUser }) {

    const navigate = useNavigate();

    const userRef = useRef()
    const passRef = useRef()

    let [form, setForm] = useState(emptyForm)

    // const handleChange = (e) => {
    //     setForm({ ...form, [e.target.name]: e.target.value })
    // }

    const handleSubmit = async (e) => {

        e.preventDefault()
        let newform = {
            username: userRef.current.value,
            password: passRef.current.value
        }
        setForm(newform)
        const token = await userLogin(newform)

        if (!token) {
            setForm(emptyForm)
            return
        }

        localStorage.setItem("token", token)

        const user = await userInfo()
        setUser(user)

        navigate('/')

    }
    return (<div className="loginpage">
        <div style={{marginTop: "25px", color: "white", textAlign:"center" }}>
            <h3>Sign in with : </h3> <br />
            <a href="#"><i className="fa-brands fa-facebook loginsm"></i></a>
            <a href="#"><i className="fa-brands fa-github loginsm"></i></a>
            <a href="#"><i className="fa-brands fa-google loginsm"></i></a>
            <a href="#"><i className="fa-brands fa-twitter loginsm"></i></a>
            <h3 style={{ color: "white",marginTop:"20px", marginBottom: "0px" }}>OR</h3>
        </div>
        <br />
        
        <Form onSubmit={handleSubmit} style={{ width: "250px", marginTop: "0px" }}>
            <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
            >
                <Form.Control ref={userRef} type="username" placeholder="Username" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password"> 
                <Form.Control ref={passRef} type="password" placeholder="Password" />
            </FloatingLabel>
            <div style={{ display: "flex", textAlign:"center" }}>
                <Form.Check
                    style={{ marginTop: "75px", fontSize: "20px", color: "white", width: "200px" }}
                    type='checkbox'
                    id='default-checkbox'
                    label='Remember Me'
                />
                <br />
                <a href="#" style={{ marginTop: "75px", fontSize: "20px"}} className="login" ><strong>Forgot Password?</strong></a></div>
            {/* <Button variant="primary" type="submit">
        Submit
      </Button> */}

            <button style={{ marginTop: "75px", width: "250px" }} type="submit">Login</button>
            <br /><br /><br /><br />
            <h5 style={{ textAlign:"center", color: "white" }}>Not a member? <a href="/register" className="login"><strong>Register</strong></a></h5>
        </Form>

    </div>)
    {/*<div className="user-auth">
            
             <form style={{ width: "300px" }} onSubmit={handleSubmit} className="register">
            <h3 style={{ marginLeft: "75px", marginTop: "50px", color:"darkgray"}}>Login</h3>
                <br /><br />
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="username" name='username' onChange={handleChange} value={form.username} />
                    </div>
                </div>
                <br /><br />
                <div className="row">
                    <div className="col">
                        <input type="password" className="form-control" placeholder="password" name='password' onChange={handleChange} value={form.password} />
                    </div>
                </div>
                <br /><br /><br />
                <button style={{ marginLeft: "75px",marginBottom:"20px" }}  type="submit">Login</button>
            </form>
        </div> */}
    //)
}

export default Login