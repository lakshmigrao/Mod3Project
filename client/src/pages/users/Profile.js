import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/userService";
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
            <p>Username : {user.username}</p>
            <p>Email : {user.email}</p>
            <p>First Name : {user.fname}</p>
            <p>Last Name : {user.lname}</p>
            <p>Country of Residence : {user.country}</p>

            <br /><br />
            <Link to={`/profile/edit`}>
            <button>Edit Profile</button> </Link>
            <button onClick={handleDelete} style={{marginLeft : "100px"}}>Delete Profile</button>
           
        </div>
        
     );
}

export default Profile;