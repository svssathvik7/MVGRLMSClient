import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from "../store/store";
// import { logout } from '../actions/teacherActions';
import { persistStore } from "redux-persist";
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';
import { codeContext } from '../contexts/CodeValidityContext';
import { logOutUser } from '../features/user/userSlice';
import Logo from "../assets/img/logo.jpg"

const persistor = persistStore(store);

function Navbar() {

  const { isValid } = useContext(codeContext);

  const history = useHistory();

  const dispatch = useDispatch();

  const userLogged = useSelector(state => state.user.logged);

  const userData = useSelector(state => state.user.userData);

  const handleLogOut = () => {
    dispatch(logOutUser());
    persistor.purge();
    history.push('/');
  }

  const validateToken = async () => {

    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/validate_token`,
          {}, // empty body as we are only sending the token in headers
          {
            headers: {
              'Authorization': `Bearer ${token}`, // Send token in the Authorization header
            },
          }
        );
      } catch (error) {
        handleLogOut();
        console.error('Error validating token');
      }
    } else {
      persistor.purge();
      console.log('No token found in localStorage');
    }
  }


  useEffect(() => {
    if (userLogged) {
      validateToken();
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
        <div className="container">
          <NavLink className="navbar-brand fs-3 fw-bold" to="/" exact>
            <img className='navbar-logo' src={Logo} alt='logo'/>
            <span className="text-dark">M</span>
            <span className="text-primary">V</span>
            <span className="text-dark">G</span>
            <span className="text-primary">R</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/" exact>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" exact>About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/courses" exact>Courses</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tests" exact>Tests</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" exact>Contact</NavLink>
              </li>
            </ul>
            <div className="navbar align-self-center d-flex">

              {userLogged ? (
                <>
                  <NavLink className="nav-link text-primary" to={userData.isadmin === true ? '/teacher_dashboard' : '/'} exact title="Dashboard">
                    Hi, <strong>{userData?.fname}</strong>
                  </NavLink>
                  <NavLink className="nav-link" to="/notices" exact title="Notices">
                    <i className="bi-bell icon-primary" role="img"></i>
                  </NavLink>
                  {userData.isadmin && <NavLink className="nav-link" to="/user_register" exact title="Student">
                    <i className="bi-person-badge icon-primary" role="img"></i>
                  </NavLink>}
                  <NavLink className="nav-link" onClick={handleLogOut} to="" title="Logout">
                    <i className="bi-box-arrow-right text-danger icon-primary" role="img"></i>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className="nav-link" to="/notices" exact title="Notices">
                    <i className="bi-bell icon-primary" role="img"></i>
                  </NavLink>
                  <NavLink className="nav-link" to="/user_login" exact title="User">
                    <i className="bi-person-badge icon-primary" role="img"></i>
                  </NavLink>
                  {isValid &&
                    <NavLink className="nav-link" to="/admin_register" exact title="Teacher">
                      <i className="bi-person-circle text-success" role="img"></i>
                    </NavLink>
                  }
                </>
              )}

            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
