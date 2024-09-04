import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from './security/AuthContext';

export default function LoginComponent(){

    const [username, setUsername]= useState('gurpreet')
    const [password, setPassword]= useState('')
    const navigate=useNavigate();

    const authContext=useAuth()
    
    const [showErrorMessage, setShowErrorMessage]=useState(false)

     function handleUsernameChange(event){
          // console.log(event.target.value)
            setUsername(event.target.value)

     }

     function handlePasswordChange(event){
       //console.log(event.target.value)
         setPassword(event.target.value)

  }

   async function handleSubmit(){
        if(await authContext.login(username,password)){
        navigate(`/welcome/${username}`)
    } else{
        setShowErrorMessage(true)
    }
    }


return(
     <div className="Login">
        <h1>Time To Login !!</h1>
         <div className="LoginForm">
             {showErrorMessage && <div className="errorMessage">Authention Failed. Please Check Your Credentials</div> } 
            <div>
                <label>UserName</label>
                <input type='text' name="username" value={username} onChange={handleUsernameChange}/>
            </div>
            <div>
                <label>Password</label>
                <input type='password' name="password" value={password} onChange={handlePasswordChange}/>
            </div>
            <div>
                <button type="button" name="login" onClick={handleSubmit}>Login</button> 
            </div>
         </div> 
     </div>
)
}