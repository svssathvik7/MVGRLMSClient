import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { studentLogin } from '../features/student/studentSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function StudentLogin() {

  const [regd, setRegd] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const dispatch = useDispatch();

  const studentLoggedIn = useSelector(state => state.student.logged);

  const handleLogIn = (e) => {
    e.preventDefault();
    dispatch(studentLogin({ regd, password }));
  }

  useEffect(() => {
    if (studentLoggedIn) {
      history.push('/');
    }
  }, []);

  return (
    <div>
      <section>
        {studentLoggedIn === false &&
          <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
            <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
              <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
                <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">Student Login</h1>
                <div className="col-md-8 mx-auto my-5 text-dark">
                  <form className="contact_form row" method="post" onSubmit={handleLogIn}>
                    <div className="col-lg-6 mb-4">
                      <div className="form-floating">
                        <input type="text" className="form-control form-control-lg light-300" id="regd" name="regd" onChange={(e) => setRegd(e.target.value)} placeholder="Regd No*" required />
                        <label for="email light-300">Regd No*</label>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="form-floating">
                        <input type="password" className="form-control form-control-lg light-300" id="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password*" required />
                        <label for="password light-300">Password*</label>
                      </div>
                    </div>
                    <div className="col-md-12 col-12 mx-auto my-3">
                      <button type="submit" className="btn btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300">Login</button>
                    </div>
                  </form>
                </div>
                <div className="col-10 col-md-8 mx-auto my-5 d-flex justify-content-around">
                  <NavLink to="/teacher_login" exact>
                    <button type="button" className="btn rounded-pill btn-light px-4">Teacher Login</button>
                  </NavLink>
                  <NavLink to="/student_register" exact>
                    <button type="button" className="btn rounded-pill btn-outline-info px-4">Register Now</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        }
      </section>
      <Footer />
    </div>
  )
}

export default StudentLogin
