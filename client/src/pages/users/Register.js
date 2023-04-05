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
    const checkRef = useRef()

    let [form, setForm] = useState(emptyForm)

    // const handleChange = (e) => {
    //     setForm({ ...form, [e.target.name]: e.target.value })
    // }
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
        alert(`${user.username} created.`)

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
              {isChecked && (<button style={{ marginTop: "50px", width: "400px" }} type="submit">Register</button>)
              
              } 
               
           
           
            <br /><br /><br /><br />
        </Form>

    </div>)
}
// <div className="user-auth">
//     <form style={{width:"375px"}} onSubmit={handleSubmit} className="register">
//     <h3 style={{marginLeft : "100px",marginBottom : "10px",color:"darkgray"}}>Register</h3>
//         <div class="row">
//             <div class="col">
//                 <input type="text" class="form-control" placeholder="First name" name="fname" onChange={handleChange} value={form.fname}/>
//             </div>
//             <div class="col">
//                 <input type="text" class="form-control" placeholder="Last name" name="lname" onChange={handleChange} value={form.lname}/>
//             </div>
//          </div>
//          <br /><br />
//          <div className="row">
//          <div class="col">
//             <input type="text" class="form-control" placeholder="Country of residence" name='country' onChange={handleChange} value={form.country}/>
//             </div>
//          </div>

//          <br /><br />
//          <div className="row">
//          <div class="col">
//             <input type="text" class="form-control" placeholder="username" name='username' onChange={handleChange} value={form.username}/>
//             </div>
//          </div>
//          <br /><br />
//          <div className="row">
//          <div class="col">
//             <input type="email" class="form-control" placeholder="mail@mail.com" name='email' onChange={handleChange} value={form.email}/>
//             </div>
//          </div>
//          <br /><br />
//          <div className="row">
//          <div class="col">
//             <input type="password" class="form-control" placeholder="password" name='password' onChange={handleChange} value={form.password}/>
//             </div>
//          </div>
//          <br /><br />
//          <button style={{marginLeft : "100px",marginBottom:"20px"}} type="submit">Register</button>
//     </form>
/* <form onSubmit={handleSubmit}>
    <label htmlFor="username">Username : </label>
    <br />
    <input 
    type="text"
    id="username"
    name="username"
    onChange={handleChange}
    value={form.username}
     />
     <br /><br />
     <label htmlFor="email">Email : </label>
     <br />
     <input 
        type="email"
        id="email"
        name="email"
        onChange={handleChange}
        value={form.email}
         />
         <br /><br />
         <label htmlFor="password">Password : </label>
        <br />
        <input 
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
        value={form.password}
         />
         <br /><br />
         <button>Submit</button>
</form> */
//  </div>
//)


export default Register