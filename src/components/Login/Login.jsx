import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { storeContext } from '../../data/storeContext';
import axios from 'axios'

const Login = ({setShowLogin }) => {
  const {url,setToken} = useContext(storeContext)
    const[currentState, setCurrentState]= useState("Login")
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })
    const onChangeHandler = (event) =>{
      const name = event.target.name
      const value = event.target.value
      setData(data=>({...data,[name]:value}))
    }

    useEffect(()=>{
      console.log(data)
    },[data])

    const onLogin = async (event) => {
      event.preventDefault();
      let newUrl = url;
      if(currentState=='Login'){
        newUrl += '/api/user/login'

      }
      else{
          newUrl += '/api/user/register'
      }
      const response = await axios.post(newUrl,data)
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
    }


  return (
    <div className='login'>
       <form onSubmit={onLogin} className="login-container">
       <div className="login-title">
        <h2>{currentState}</h2>
        <ClearOutlinedIcon
            onClick={() => setShowLogin(false)} 
            style={{width:"16px" , cursor:'pointer' }}
            />
       </div>
       <div className="login-inputs">
        
        {currentState==="Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name}  type='text' placeholder='Your Name' required></input> }
        <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required></input>
        <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Password' required></input>

       </div>
       <button type='submit'>{currentState==="Sign Up" ? "Create account" : "Login"}</button>
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
