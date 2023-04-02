import { useState,useEffect,useRef} from "react"
import { Link, useNavigate } from "react-router-dom"
import { updateUserInfo, userInfo } from "../../services/userService"


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
    
            navigate(`profile/${user.username}`)
        }
    return (
        <div className="user-auth">
            <h1 style={{marginLeft : "300px",marginBottom : "20px"}}>Edit Profile</h1>
            <form style={{width:"500px"}} onSubmit={handleSubmit}>
                <div class="row">
                    <div class="col">
                        <label htmlFor="fnam">First Name : </label>
                        <input type="text" id="fnam" ref={fnameRef} class="form-control" placeholder="First name" name="fname" defaultValue= {user.fname}  />
                    </div>
                    <div class="col">
                    <label htmlFor="lnam">Last Name : </label>
                        <input type="text" id="lnam" ref={lnameRef} class="form-control" placeholder="Last name" name="lname" defaultValue= {user.lname} />
                    </div>
                 </div>
                 <br /><br />
                 <div className="row">
                 <div class="col">
                 <label htmlFor="cntry">Country of residence : </label>
                    <input type="text" id="cntry" ref={countryRef} class="form-control" placeholder="Country of residence" name='country' defaultValue= {user.country}  />
                    </div>
                 </div>
                 
                 <br /><br />
                 <div className="row">
                 <div class="col">
                 <label htmlFor="unam">Username : </label>
                    <input type="text" id="unam" ref={unameRef} class="form-control" name='username' defaultValue= {user.username} disabled />
                    </div>
                 </div>
                 <br /><br />
                 <div className="row">
                 <div class="col">
                 <label htmlFor="eml">Email  </label>
                    <input type="email" id="eml" ref={emailRef} class="form-control" placeholder="mail@mail.com" name='email' defaultValue= {user.email} />
                    </div>
                 </div>
                 {/* <br /><br />
                 <div className="row">
                 <div class="col">
                    <input type="password" class="form-control" placeholder="password" name='password'  />
                    </div>
                 </div> */}
                 <br /><br /><br />
                 <button style={{marginLeft : "200px"}} type="submit">Save</button>
                 <Link to="/profile"><button>Back</button></Link>
            </form>
            </div>)

}


export default EditProfile