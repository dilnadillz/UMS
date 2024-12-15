import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/admin/adminLogin/AdminLogin';
import Home from './pages/user/Home/Home';
import Login from './pages/user/Login/Login';
import Profile from './pages/user/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import AdminHome from './pages/admin/adminHome/AdminHome'
import EditUser from './pages/admin/editUser/EditUser';
import CreateUser from './pages/admin/createUser/CreateUser';

const App = () => {
  return (
    <div className="main_div">
      
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/editProfile' element={<Profile />} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/adminHome' element={<AdminHome />} />
        <Route path='/adminHome/editUser' element={<EditUser />} />
        <Route path='/adminHome/createUser' element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
