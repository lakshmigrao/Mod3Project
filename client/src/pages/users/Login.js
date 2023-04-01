import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo, userLogin } from '../../services/userService'


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
        <div className="user-auth">
            
            <form style={{ width: "300px" }} onSubmit={handleSubmit} className="register">
            <h3 style={{ marginLeft: "75px", marginTop: "50px", color:"darkgray"}}>Login</h3>
                <br /><br />
                <div className="row">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="username" name='username' onChange={handleChange} value={form.username} />
                    </div>
                </div>
                <br /><br />
                <div className="row">
                    <div class="col">
                        <input type="password" class="form-control" placeholder="password" name='password' onChange={handleChange} value={form.password} />
                    </div>
                </div>
                <br /><br /><br />
                <button style={{ marginLeft: "75px",marginBottom:"20px" }}  type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login