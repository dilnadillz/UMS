import React, { useEffect, useState } from 'react'
import './AdminHome.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AdminHome = () => {

  const [users, setUsers] = useState([])
  const [search, setSearch] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3001/getUser")
    .then((response) =>{
      setUsers(response.data)
    })
    .catch((err) => console.log(err))
  },[])

  const handleDelete = (userId) =>{
    console.log('deleting user id',userId)
    axios.get(`http://localhost:3001/deleteUser?id=${userId}`)//passing id as query parameter
    .then((response)=>{
      setUsers(response.data)
    })
    .catch((err) => console.log(err))
  }

  const handleEdit = (userId) => {
    console.log("to edit",userId)
    axios.get(`http://localhost:3001/adminHome/editUser?id=${userId}`)
    .then((response)=>{
      if(response){
        navigate('/adminHome/editUser', {state: {user:response.data}}) //passing data to EditUser component
      }
    })
    .catch((err) => console.log(err))
  }

  const handleSearch = async(e) => {
    e.preventDefault()

    try{
      const response = await axios.get(`http://localhost:3001/getUser?search=${search}`)
      setUsers(response.data)
    }catch(err){
      console.log(err)
    }
  }
  

    return (
        <div className="admin-home-container">
          <h1>Admin Home Page</h1>
          <form onSubmit={handleSearch}>
          <div className="search-container">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user here.."
              className="search-input"
            />
          </div>
          <button>Search</button>
          <button className="add-user-btn" onClick={() => navigate("/adminHome/createUser")}>Add User</button>
         
          </form>
           <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
             
                {users.map((user,ind)=>(
                 <tr key={user._id}>
                 <td>{user._id}</td> 
                 <td>
                   <img className="user-image" src={user.image} alt={user.name} /> {/* Ensure 'imageUrl' is correct */}
                 </td>
                 <td>{user.name}</td>
                 <td>{user.email}</td>
                 <td>
                   <button className="edit-btn" onClick={()=>handleEdit(user._id)}>Edit</button>
                   <button className="delete-btn" onClick={()=>handleDelete(user._id)}>Delete</button>
                 </td>
               </tr>
                ))}

            </tbody>
          </table>
        </div>
      );
    };

export default AdminHome
