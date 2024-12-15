import React, { useState } from 'react';
import './AdminLogin.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const AdminLogin = () => {
  const [adminname, setAdminname] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log("admin", adminname);
    console.log("password", password);
  
    axios.post("http://localhost:3001/adminLogin", { adminname, password })
      .then((res) => {
        if (res.data.message === "success") {
          navigate('/adminHome')
        } else {
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('An error occurred during login.')
      });
  };
  

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              id="adminName" 
              value={adminname}
              onChange={(e) => setAdminname(e.target.value)}
              className="input-field"
              placeholder="Admin Name" 
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
              placeholder="Password" 
              required 
            />   
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
