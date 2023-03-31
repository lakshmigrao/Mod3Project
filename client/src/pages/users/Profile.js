function Profile({ username, email, fname, lname, country }) {
    return ( 
        <div className="profile">
            <h1>Welcome to {username.toUpperCase()} 's Profile</h1>
            <br /><br />
            <p>Username : {username}</p>
            <p>Email : {email}</p>
            <p>First Name : {fname}</p>
            <p>Last Name : {lname}</p>
            <p>Country of Residence : {country}</p>

            <br /><br />
            <button>Edit Profile</button> 
            <button style={{marginLeft : "100px"}}>Delete Profile</button>
           
        </div>
        
     );
}

export default Profile;