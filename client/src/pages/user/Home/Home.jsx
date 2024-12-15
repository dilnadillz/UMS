import { Link, useNavigate } from 'react-router-dom'
import './Home.css' 
import { logout } from '../../../features/authSlice';

import { useDispatch, useSelector } from 'react-redux';

 
const Home = () => {

  const {user, isAuthenticated} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
    console.log("loggout",logout)
  }

  return (
    <div className="container">
      <div className="user-details">
      
        <Link to="/editProfile" className="edit-profile">
          Edit Profile
        </Link>
        {isAuthenticated  &&(
          <>
            <h2 className="welcome-message">Welcome, {user.name}</h2>
            <div className="image-container">
              <img src={user.image} alt="User Avatar" className="user-avatar" />
            </div>
            <p className="user-email">Email: {user.email}</p>
            <button onClick={handleLogout} className='logout-button '>Logout</button>
          </>
        ) }
      </div>
    </div>
  );
};

export default Home;
