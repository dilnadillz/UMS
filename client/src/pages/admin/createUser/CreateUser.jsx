import React, { useState } from 'react'
import './CreateUser.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image,setImage] = useState("")

    const navigate = useNavigate()

    const handleCreateUser = (e) => {
        e.preventDefault()
        console.log("name",name)
        console.log("email",email)
        console.log("password",password)
        console.log("image",image)

        axios.post("http://localhost:3001/signup", {name, email, password, image})
        .then((response) => {
            if(response.status === 200){
                navigate('/adminHome')
            }
        })
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
        <div className="admin-login-container">
          <div className="admin-login-form">
            <h1>Add User</h1>
            <form >
              <div className="form-group">
                <input 
                  type="text" 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="Add Name" 
                  required 
                />  
              </div>
              <div className="form-group">    
                <input
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="Add Email" 
                  required 
                />   
              </div>
              <div className="form-group">    
                <input
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="Add Password" 
                  required 
                />   
              </div>
              <div className='form-group'>
                <input
                  type='file'
                  onChange={(e) => imageCloud(e.target.files[0])}
                  required
                />
              </div>
              <button type="submit" className="submit-btn" onClick={handleCreateUser}>
                Add
              </button>
            </form>
          </div>
        </div>
    );
}

export default CreateUser
