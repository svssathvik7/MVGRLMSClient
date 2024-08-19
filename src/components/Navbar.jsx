import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from "../store/store";
// import { logout } from '../actions/teacherActions';
import UserData from './UserData';
import { persistStore } from "redux-persist";
import { NavLink } from "react-router-dom";
import { logOutTeacher } from '../features/teacher/teacherSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';
import { logOutStudent } from '../features/student/studentSlice';


const persistor = persistStore(store);

function Navbar() {

  const history = useHistory();

  const dispatch = useDispatch();

  const userData = UserData();

  // const teacherLoggedIn = useSelector(state => state.teacher.logged);

  // const studentLoggedIn = useSelector(state => state.student.logged)

  // const teacherData = useSelector(state => state.teacher.teacherData);

  // const studentData = useSelector(state => state.student.studentData);

  const handleLogOut = () => {
    if (userData.type === 'teacher') {
      dispatch(logOutTeacher());
    }
    else {
      dispatch(logOutStudent());
    }
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
    if (userData.isLoggedIn) {
      validateToken();
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
        <div className="container">
          <NavLink className="navbar-brand fs-3 fw-bold" to="/" exact>
            <i className='bi-building text-success'></i>
            <span className="text-dark">L</span>
            <span className="text-primary">E</span>
            <span className="text-dark">M</span>
            <span className="text-primary">N</span>
            <span className="text-primary">O</span>
            <span className="text-dark">S</span>
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

              {userData.isLoggedIn ? (
                <>
                  <NavLink className="nav-link text-success" to="/teacher_dashboard" exact title="Dashboard">
                    Hi, <strong>{userData?.data?.fname}</strong>
                  </NavLink>
                  <NavLink className="nav-link" to="/notices" exact title="Notices">
                    <i className="bi-bell text-primary" role="img"></i>
                  </NavLink>
                  <NavLink className="nav-link" to="/student_register" exact title="Student">
                    <i className="bi-person-badge text-primary" role="img"></i>
                  </NavLink>
                  <NavLink className="nav-link" onClick={handleLogOut} to="" title="Logout">
                    <i className="bi-box-arrow-right text-danger" role="img"></i>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className="nav-link" to="/notices" exact title="Notices">
                    <i className="bi-bell text-primary" role="img"></i>
                  </NavLink>
                  <NavLink className="nav-link" to="/student_login" exact title="Student">
                    <i className="bi-person-badge text-primary" role="img"></i>
                  </NavLink>
                  <NavLink className="nav-link" to="/teacher_login" exact title="Teacher">
                    <i className="bi-person-circle text-success" role="img"></i>
                  </NavLink>
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
