import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import Footer from '../components/Footer';
import axios from "axios";
import { nContext } from '../contexts/NotificationContext';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
function UserRegister() {

    const dispatch = useDispatch()

    // const teacherLoggedIn = useSelector(state => state.teacher.logged);

    const userLoggedIn = useSelector(state => state.user.logged);
    const userData = useSelector(state => state.user.userData);


    const { notify } = useContext(nContext);
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        regd: '',
        email: '',
        dob: '',
        year: '',
        branch: '',
        iscr: '',
        password1: '',
        password2: '',
        password: '',
        faculty_email: '',
        bulk: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            if (formData.password1 === formData.password2) {
                formData.password = formData.password1;
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/register`, formData);
                console.log('Success:', response.data);
                setFormData({
                    fname: '',
                    lname: '',
                    regd: '',
                    email: '',
                    dob: '',
                    year: '',
                    branch: '',
                    isadmin: false,
                    iscr: false,
                    password1: '',
                    password2: '',
                    password: '',
                    faculty_email: '',
                    bulk: false
                });
                notify(response.message);
            }
            else {
                notify("Passwords should match");
            }
        } catch (error) {
            notify("There is some error, Please try again.");
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} theme="dark" />
            <section>
                <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
                    <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
                        <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
                            <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">User Registration</h1>

                            {(!userLoggedIn || !userData.isadmin) ? <p className="banner-body py-3 text-white">
                                Only Admin can register students.
                            </p> :
                                <div className="col-10 col-md-10 mx-auto my-5 text-dark">
                                    <form onSubmit={handleSubmit} className="contact_form row">
                                        <div className="col-lg-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" className="form-control form-control-lg light-300" id="fname" name="fname" value={formData.fname} onChange={handleChange} placeholder="Your Name*" required />
                                                <label htmlFor="fname" className="light-300">First Name*</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" className="form-control form-control-lg light-300" id="lname" name="lname" value={formData.lname} onChange={handleChange} placeholder="Your Name*" required />
                                                <label htmlFor="lname" className="light-300">Last Name*</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" className="form-control form-control-lg light-300" id="regd" name="regd" value={formData.regd} onChange={handleChange} placeholder="Your Registration Number*" required />
                                                <label htmlFor="regd" className="light-300">Registration Number*</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <div className="form-floating">
                                                <input type="email" className="form-control form-control-lg light-300" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email*" required />
                                                <label htmlFor="email" className="light-300">Email ID*</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <div className="form-floating">
                                                <input type="date" className="form-control form-control-lg light-300" id="dob" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date Of Birth*" required />
                                                <label htmlFor="dob" className="light-300">Date Of Birth*</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <div className="form-floating">
                                                <input type="number" min={1} max={4} className="form-control form-control-lg light-300" id="year" name="year" value={formData.year} onChange={handleChange} required />
                                                <label htmlFor="year" className="light-300">Year Of Study*</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-4">
                                                <input type="text" className="form-control form-control-lg light-300" id="faculty_email" name="faculty_email" value={formData.faculty_email} onChange={handleChange} placeholder="Faculty Email*" required />
                                                <label htmlFor="facutly_email" className="light-300">Authorizer Email*</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-4">
                                                <select className="form-select form-control form-control-lg light-300" id="branch" name="branch" value={formData.branch} onChange={handleChange} aria-label="Default select">
                                                    <option value="" disabled>Select Stream*</option>
                                                    <option value="cse">CSE</option>
                                                    <option value="ece">ECE</option>
                                                    <option value="eee">EEE</option>
                                                    <option value="csd">CSD</option>
                                                    <option value="mech">MECH</option>
                                                    <option value="che">Chemical</option>
                                                    <option value="civ">Civil</option>
                                                </select>
                                                <label htmlFor="branch" className="light-300">Select Branch*</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-4">
                                                <select className="form-select form-control form-control-lg light-300" id="iscr" name="iscr" onChange={(e) => {
                                                    const res = e.target.value;
                                                    if (res === "yes") {
                                                        setFormData((prev) => {
                                                            return { ...prev, iscr: true }
                                                        });
                                                    }
                                                    else {
                                                        setFormData((prev) => {
                                                            return { ...prev, iscr: false }
                                                        });
                                                    }
                                                }} aria-label="Default select">
                                                    <option value="" disabled>Is a CR?*</option>
                                                    <option value="no">No</option>
                                                    <option value="yes">Yes</option>
                                                </select>
                                                <label htmlFor="iscr" className="light-300">Is a CR?*</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <div className="form-floating">
                                                <input type="password" className="form-control form-control-lg light-300" id="password1" name="password1" value={formData.password1} onChange={handleChange} placeholder="Your Password*" required />
                                                <label htmlFor="password1" className="light-300">Password*</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <div className="form-floating">
                                                <input type="password" className="form-control form-control-lg light-300" id="password2" name="password2" value={formData.password2} onChange={handleChange} placeholder="Confirm Password*" required />
                                                <label htmlFor="password2" className="light-300">Confirm Password*</label>
                                            </div>
                                        </div>
                                        <div className=" d-flex align-items-center w-100 flex-column col-md-12 col-12 mx-auto my-3">
                                            <button type="submit" className="btn w-30 btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300">Register</button>
                                            <NavLink to="/bulk_register" className=' text-white m-1'>Register in Bulk?</NavLink>
                                        </div>
                                    </form>
                                </div>
                            }
                            <div className="col-10 col-md-8 mx-auto my-5 d-flex justify-content-around">
                                <NavLink to="/user_login" exact>
                                    <button type="button" className="btn rounded-pill btn-light px-4">User Login</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default UserRegister;
