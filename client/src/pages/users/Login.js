import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {userInfo, userLogin} from '../../services/userService'


let emptyForm = {
    username:'',
    password:'',
    email:''
}

function Login ({setUser}){

    const navigate = useNavigate();

    let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
    
        e.preventDefault()

        const token = await userLogin(form)

        if(!token){
            setForm(emptyForm)
            return
        }

        localStorage.setItem("token",token)

        const user = await userInfo()
        setUser(user)

        navigate('/')

    }
    return(
        <div className="user-auth">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username : </label>
                <br/>
                <input 
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={form.username} 
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
            </form>
        </div>
    )
}

export default Login