import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
//import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import Footer from '../components/Footer';
import { teacherLogin } from '../features/teacher/teacherSlice';

function TeacherLogin({ history }) {

  const [regd, setRegd] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  const teacherLogged = useSelector(state => state.teacher.logged);

  useEffect(() => {
    if (teacherLogged) {
      history.push('/teacher_dashboard');
    }
  }, [teacherLogged]);

  const submitHandler = (event) => {
    event.preventDefault()
    dispatch(teacherLogin({ regd, password }));
  }

  return (
    <div>
      <section>
        <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
          <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
            <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
              {/* {error && <Alert type='danger'>{error}</Alert>} */}
              <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">Teacher Login</h1>
              <div className="col-md-8 mx-auto my-5 text-dark">
                <form className="contact_form row" onSubmit={submitHandler}>
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="text" className="form-control form-control-lg light-300" value={regd} id="regd" name="regd"
                        placeholder="regd*" onChange={(event) => { setRegd(event.target.value) }} required />
                      <label for="regd light-300">I'd Number*</label>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="password" className="form-control form-control-lg light-300" value={password} id="password" name="password"
                        placeholder="Password*" onChange={(event) => { setPassword(event.target.value) }} required />
                      <label for="password light-300">Password*</label>
                    </div>
                  </div>
                  <div className="col-md-12 col-12 mx-auto my-3">
                    <button type="submit" className="btn btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300">Login</button>
                  </div>
                </form>
              </div>
              <div className="col-10 col-md-8 mx-auto my-5 d-flex justify-content-around">
                <NavLink to="/teacher_register" exact>
                  <button type="button" className="btn rounded-pill btn-outline-info px-4">Register Now</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default TeacherLogin
