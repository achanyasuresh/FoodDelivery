import React, { useState } from 'react'
import './Login.css'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';


const Login = ({setShowLogin }) => {
    const[currentState, setCurrentState]= useState("Login")
  return (
    <div className='login'>
       <form  className="login-container">
       <div className="login-title">
        <h2>{currentState}</h2>
        <ClearOutlinedIcon
            onClick={() => setShowLogin(false)} 
            style={{width:"16px" , cursor:'pointer' }}
            />
       </div>
       <div className="login-inputs">
        
        {currentState==="Login" ? <></> : <input type='text' placeholder='Your Name' required></input> }
        <input type='email' placeholder='Your email' required></input>
        <input type='password' placeholder='Password' required></input>

       </div>
       <button>{currentState==="Sign Up" ? "Create account" : "Login"}</button>
       <div className='login-condition'>
        <input type='checkbox' required />
        <p>By continuing, i agree to the terms of use & privacy pilicy.</p>
       </div>
       {currentState==="Login" ? 
       <p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")} > Click here</span></p>
       :
       <p>Already have an account ? <span  onClick={()=>setCurrentState("Login")}>Login here</span></p>
         }
       </form>
      
    </div>
  )
}

export default Login
