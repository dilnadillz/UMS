import { useLocation, useNavigate } from 'react-router-dom'
import './EditUser.css'
import { useState } from 'react'
import axios from 'axios'

const EditUser = () => {

    const location = useLocation() //to get current location object
    const navigate = useNavigate()

    const user = location.state.user //accesing data from prevs route

    const [name, setName] = useState(user.name)
    const [email,setEmail] = useState(user.email)

    const handleEditUser = (e) =>{
      e.preventDefault()

      axios.post("http://localhost:3001/adminHome/editUser", {id: user._id, name, email})
      .then((response) => {
        if(response.status===200){
          navigate('/adminHome')
        }
      })
      .catch((err) => console.log(err))
    }

    return (
        <div className="edit-user-container">
          <h1>Edit User</h1>
{/*         
            <div className="form-group">
              <label>ID</label>
              <input type="text" name="_id"  readOnly />
            </div> */}
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                id="email"  
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="save-btn" onClick={handleEditUser}>Save</button>
            <button type="button" className="cancel-btn" >Cancel</button>
      
        </div>
    )
}

export default EditUser
