import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const {user} = useSelector((state) => state.auth)
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

 

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
      dispatch(updateUserProfile({image: data.url.toString()}))
      console.log("Dispatched updateUserProfile action")
      navigate('/home')
    })
    .catch((err)=>{
      console.log("err",err)
    })
  }
  
//  const handleUpdate =() =>{
//   console.log("profile updated", image)
//  }
  

  return (
    <div className="container">
      <div className="user-details">
          <>
           <h2 className="welcome-message">Edit Profile</h2>
           
            <div className="image-container">
               {user?.image &&(
                <img src={user.image} alt="User Avatar" className="user-avatar" />
              )}
            </div>
            <div className="form-group">
              <input
                type="file"
                id="file"
                className="form-control"
                accept="image/*"  
                onChange={(e) => imageCloud(e.target.files[0])}
              />
            </div>
            {/* <button type="submit" className="btn btn-primary" onClick={handleUpdate}>Update</button> */}
          </>
      
      </div>
    </div>
  );
}

export default Profile
