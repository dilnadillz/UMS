import { useState } from 'react';
import './Login.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../features/authSlice';
// import { useUser } from '../../../context/userContext';

const Login = () => {

    // const {setUser} = useUser()
    const [signState, setSignState] = useState("Sign In")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister = (e) => {
      e.preventDefault();
      console.log("dfggdf")
      console.log("image", image);
      console.log("name", name)
      console.log("email", email)
      console.log("password", password)
  
    
  
      axios.post("http://localhost:3001/signup", {name, email, password,image})
      .then((res) => {
          toast.error(res.data.message)
          console.log(res)
          setSignState("Sign In")
      })
      .catch((err) => console.log(err))
  };
  

    const handleLogin = (e) => {
        e.preventDefault()
      console.log("email",email)
      console.log("pass",password)
        axios.post("http://localhost:3001/login" , {email, password})
        .then((res) => {
            console.log("res coming",res)
            if(res.data.message === "success"){
              console.log("hwhwhw")
              // setUser(res.data.user)
              dispatch(loginSuccess(res.data.user))
                navigate("/home")
            }else{
                toast.error(res.data.message)
            }
        })
        .catch((err) => console.log(err))
    }

    const imageCloud =(e)=>{
      console.log("imagecloud coming",e)

      const data = new FormData()
      data.append("pics",e)
      data.append("file",e)
      data.append("upload_preset","ml_default")
      data.append("cloud_name","dajv6bt0y")

      fetch("https://api.cloudinary.com/v1_1/dajv6bt0y/image/upload",{
        method:'post',
        body:data
      })
      .then((res)=>res.json())
      .then((data)=>{
        setImage(data.url.toString())
        console.log("data coming",data)
      })
      .catch((err)=>{
        console.log("err",err)
      })
    }

    return (
        <div className="login">
          <div className="login-form">
            <h1>{signState}</h1>
            {signState === "Sign In" ? (
                ""
            ) : (
              <div className="form-group">
                <input 
                  type="text" 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name" 
                  required 
                />  
              </div>
            )}
           
            <div className="form-group">
              <input 
                 type="text" 
                 id="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="Email" required 
               />
            </div>
            <div className="form-group">    
              <input
                 type="password" 
                 id="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="Password" required 
               />   
            </div>
            {signState === "Sign Up" &&(
              <div className='form-group'>
                <input
                  type='file'
                  onChange={(e) => imageCloud(e.target.files[0])}
                  required
                />
              </div>
            )}
            <button type="submit" onClick={signState === "Sign In" ? handleLogin :handleRegister} className="login-button">
              {signState}
            </button>
            {signState === "Sign In" ? (
              <p className="form-switch">
                Don't have an account?
                <span onClick={() => setSignState("Sign Up")} className="register">
                     Sign Up
                </span>
              </p>
            ) : (
              <p className="form-switch">
                Have an account?
                <span onClick={() => setSignState("Sign In")} className="register">
                     Sign In
                </span>
              </p>
            )}
            
          </div>
        </div>
      );
      
}

export default Login
