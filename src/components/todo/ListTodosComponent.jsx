import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { deleteTodoApi, retriveAllTodosForUsernameApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";

export default function ListTodosComponent(){

    const today=new Date();
    const targetDate= new Date(today.getFullYear()+12,today.getMonth(),today.getDay());

    const authContext=useAuth()

    const username=authContext.username

    const navigate=useNavigate();
    

    const [todos,setTodos]=useState([])

    const[message,setMessage]=useState(null)
    
    // const todos=[
    //             {id:1,description:'Learn AWS',done:false,targetDate:targetDate},
    //             {id:2,description:'Learn Full Stack',done:false,targetDate:targetDate},
    //             {id:3,description:'Learn Azure',done:false,targetDate:targetDate}
    //             ]
    
    useEffect(()=>refreshTodos(),[])


     function refreshTodos(){
         retriveAllTodosForUsernameApi(username)
         .then( (response)=>{ setTodos(response.data) } )
         .catch((error)=>console.log(error))
     }
    
     function deleteTodo(id){
         console.log('clicked '+id)
         deleteTodoApi(username,id)
         .then( 
               ()=>{
                  setMessage(`Delete of todo with ID =${id} is Successful`)
                  refreshTodos()

               }
           )
         .catch((error)=>console.log(error))
     }

     function updateTodo(id){
      console.log('clicked '+id)
      navigate(`/todo/${id}`)
  }

     function addNewTodo(){
      console.log('clicked ')
      navigate(`/todo/-1`)
  }


    return(
         <div className="container">
           <h1>Your Working Planned Todos </h1>
             {message && <div className='alert alert-warning'>{message}</div>}
           <div>
              <table className="table">
                 <thead>
                    <tr>
                        {/* <td>Id</td> */}
                        <th>Description</th> 
                        <th>Is Done ?</th>
                        <th>Target Date</th>
                        <th>Delete</th>  
                        <th>Update</th> 
                        
                    </tr> 
                </thead>
                 <tbody>
                  { todos.map(
                       todo=>(
                        <tr key={todo.id}>
                           {/* <td>{todo.id}</td> */}
                           <td>{todo.description}</td>
                           <td>{todo.done.toString()}</td>
                           {/* <td>{todo.targetDate.toDateString()}</td> */}
                           <td>{todo.targetDate.toString()}</td>
                           <td><button className="btn btn-warning"
                            onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                            <td><button className="btn btn-success"
                            onClick={()=>updateTodo(todo.id)}>Update</button></td>

                        </tr>

                       ) 
                   )}
                 </tbody>
             </table>
           </div>
           <div>
            <button className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</button>
           </div>
         </div>
    )
    } 