import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo, userRegister } from "../../services/userService";

let emptyForm = {
    username: '',
    password: '',
    email: '',
    fname: '',
    lname:'',
    country:''
}

function Register({ setUser }) {
    const navigate = useNavigate()

    let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = await userRegister(form)

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
        <div className="user-auth">
            <h1 style={{marginLeft : "300px",marginBottom : "20px"}}>Register</h1>
            <form style={{width:"500px"}} onSubmit={handleSubmit}>
                <div class="row">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="First name" name="fname" onChange={handleChange} value={form.fname}/>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Last name" name="lname" onChange={handleChange} value={form.lname}/>
                    </div>
                 </div>
                 <br /><br />
                 <div className="row">
                 <div class="col">
                    <input type="text" class="form-control" placeholder="Country of residence" name='country' onChange={handleChange} value={form.country}/>
                    </div>
                 </div>
                 
                 <br /><br />
                 <div className="row">
                 <div class="col">
                    <input type="text" class="form-control" placeholder="username" name='username' onChange={handleChange} value={form.username}/>
                    </div>
                 </div>
                 <br /><br />
                 <div className="row">
                 <div class="col">
                    <input type="email" class="form-control" placeholder="mail@mail.com" name='email' onChange={handleChange} value={form.email}/>
                    </div>
                 </div>
                 <br /><br />
                 <div className="row">
                 <div class="col">
                    <input type="password" class="form-control" placeholder="password" name='password' onChange={handleChange} value={form.password}/>
                    </div>
                 </div>
                 <br /><br /><br />
                 <button style={{marginLeft : "200px"}} class="btn btn-primary" type="submit">Register</button>
            </form>
            {/* <form onSubmit={handleSubmit}>
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
            </form> */}
        </div>
    )
}

export default Register