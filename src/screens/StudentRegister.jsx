import React from 'react';
import { NavLink } from "react-router-dom";
import Footer from '../components/Footer';

function StudentRegister() {
  return (
    <div>
      <section>
        <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
          <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
            <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
              <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">Student Registration</h1>
              <div className="col-10 col-md-10 mx-auto my-5 text-dark">
                <form className="contact_form row" method="post" action="#">
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="text" className="form-control form-control-lg light-300" id="fname" name="fname" placeholder="Your Name*" required/>
                      <label for="name light-300">First Name*</label>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="text" className="form-control form-control-lg light-300" id="lname" name="lname" placeholder="Your Name*" required/>
                      <label for="name light-300">Last Name*</label>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="text" className="form-control form-control-lg light-300" id="regd" name="regd" placeholder="Your Email*" required/>
                      <label for="email light-300">Registration Number*</label>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="email" className="form-control form-control-lg light-300" id="email" name="email" placeholder="Your Email*" required/>
                      <label for="email light-300">Email ID*</label>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="date" className="form-control form-control-lg light-300" id="dob" name="dob" placeholder="Your Phone*" required/>
                      <label for="phone light-300">Date Of Birth*</label>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="number" min={1} max={4} className="form-control form-control-lg light-300" id="study_year" name="study_year" required/>
                      <label for="phone light-300">Year Of Study*</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating mb-4">
                      <select className="form-select form-control form-control-lg light-300" id="branch" name="branch" aria-label="Default select">
                        <option selected>Select Stream*</option>
                        <option value="cse">CSE</option>
                        <option value="ece">ECE</option>
                        <option value="eee">EEE</option>
                        <option value="csd">CSD</option>
                        <option value="mech">MECH</option>
                        <option value="che">Chemical</option>
                        <option value="civ">Civil</option>
                      </select>
                      <label for="subject light-300">Select Branch*</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating mb-4">
                      <select className="form-select form-control form-control-lg light-300" id="iscr" name="iscr" aria-label="Default select">
                        <option selected>Is a CR?*</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label for="subject light-300">Choose previlege*</label>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="password" className="form-control form-control-lg light-300" id="password1" name="password1" placeholder="Your Password*" required/>
                      <label for="password1 light-300">Password*</label>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="password" className="form-control form-control-lg light-300" id="password2" name="password2" placeholder="Confirm Password*" required/>
                      <label for="password2 light-300">Confirm Password*</label>
                    </div>
                  </div>
                  <div className="col-md-12 col-12 mx-auto my-3">
                    <button type="submit" className="btn btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300">Register</button>
                  </div>
                </form>
              </div>
              <div className="col-10 col-md-8 mx-auto my-5 d-flex justify-content-around">
                <NavLink to="/student_login" exact>
                  <button type="button" className="btn rounded-pill btn-light px-4">Student Login</button>
                </NavLink>
                <NavLink to="/teacher_login" exact>
                  <button type="button" className="btn rounded-pill btn-outline-info px-4">Teacher Login</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default StudentRegister
