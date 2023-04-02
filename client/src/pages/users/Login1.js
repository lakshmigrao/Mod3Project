import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo, userLogin } from '../../services/userService'
import React from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';



let emptyForm = {
    username: '',
    password: '',
    email: ''
}

function Login({ setUser }) {

    const navigate = useNavigate();

    let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        const token = await userLogin(form)

        if (!token) {
            setForm(emptyForm)
            return
        }

        localStorage.setItem("token", token)

        const user = await userInfo()
        setUser(user)

        navigate('/')

    }
    return (

        <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        {/* <MDBCol col='10' md='6'>
          <img src='https://www.diabetesfoodhub.org/system/user_files/Images/1837-diabetic-pecan-crusted-chicken-breast_JulAug20DF_clean-simple_061720.jpg' class="img-fluid" alt="Sample image" />
        </MDBCol> */}

        <MDBCol col='8' md='6'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
          </div>

        </MDBCol>

      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>

        <div>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='twitter' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='google' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='linkedin-in' size="md"/>
          </MDBBtn>

        </div>

      </div>

    </MDBContainer>
        // <div className="user-auth">
            
        //     <form style={{ width: "300px" }} onSubmit={handleSubmit} className="register">
        //     <h3 style={{ marginLeft: "75px", marginTop: "50px", color:"darkgray"}}>Login</h3>
        //         <br /><br />
        //         <div className="row">
        //             <div class="col">
        //                 <input type="text" class="form-control" placeholder="username" name='username' onChange={handleChange} value={form.username} />
        //             </div>
        //         </div>
        //         <br /><br />
        //         <div className="row">
        //             <div class="col">
        //                 <input type="password" class="form-control" placeholder="password" name='password' onChange={handleChange} value={form.password} />
        //             </div>
        //         </div>
        //         <br /><br /><br />
        //         <button style={{ marginLeft: "75px",marginBottom:"20px" }}  type="submit">Login</button>
        //     </form>
        // </div>
    )
}

export default Login