import {useParams ,Link} from 'react-router-dom'
import { useState } from 'react'
import {retriveHelloWorldPathVariable } from './api/HelloWorldApiService'
import { useAuth } from './security/AuthContext'

export default function WelcomeComponent(){

    const {username}=useParams()
    console.log(username)

    const [message,setMessage]=useState(null)

    const authContext=useAuth()

    function callHelloWorldRestApi(){
      console.log('called')
      //axios
      // axios.get('http://localhost:8080/hello-world')
      //      .then((response)=>successfulResponse(response))
      //      .catch((error)=>errorResponse(error))
      //      .finally(()=>console.log('cleanUp'))
          

          // retriveHelloWorldBean()
          //     .then((response)=>successfulResponse(response))
          //     .catch((error)=>errorResponse(error))
          //     .finally(()=>console.log('cleanUp'))    
              
          retriveHelloWorldPathVariable('guri',authContext.token)
              .then((response)=>successfulResponse(response))
              .catch((error)=>errorResponse(error))
              .finally(()=>console.log('cleanUp'))           

       
    }

    function successfulResponse(response){
      console.log(response)
      setMessage(response.data.message)
    }

    function errorResponse(error){
      console.log(error)
    }

    return(
    <div className="WelcomeComponent">
        <h1>Welcome {username} !!</h1>
         <div>
           Manage Your Todos - <Link to="/todos">Go Here</Link>
         </div>
         <div>
             <button className='btn btn-success m-5' onClick={callHelloWorldRestApi}>
              Call Hello World</button>
         </div>
             <div className='text-info'>{message}</div>
    </div>
    )
    }