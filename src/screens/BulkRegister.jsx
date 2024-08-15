import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import Papa from 'papaparse';
import { columnHeadings } from '../constants/bulkColumnsHeadings';
import Footer from '../components/Footer';
import axios from "axios";
function BulkRegister() {
    const [formData, setFormData] = useState({
        client_format: '',
        format: 'json',
        dataText: '',
        data: null,
        faculty_email: '',
        bulk: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleParsing = (e) => {

        if (formData.client_format === '') {
            console.log('CHOOSE THE FORMAT FIRST.');
            //notification to fill the format first before filling the text field.
        }
        else {

            const { name, value } = e.target;

            var columnH;

            if (formData.client_format === 'tsv') {
                columnH = columnHeadings.join('\t');
            }
            else {
                columnH = columnHeadings.join(',');
            }

            const bulkDataString = `${columnH}\n${value}`;

            Papa.parse(bulkDataString, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    console.log('Parsed Results:', results);     // Log the parsed results
                    setFormData({
                        ...formData,
                        [name]: results.data,
                        dataText: value
                    })
                },
                error: (error) => {
                    console.error('Parsing Error:', error); // Log any parsing errors
                }
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/register`, formData);
            console.log('Success:', response.data);
            setFormData({
                dataText: '',
                data: null,
                faculty_email: '',
                bulk: true,
                format: ''
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log(formData.data);


    return (
        <div>
            <section>
                <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
                    <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
                        <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
                            <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">Student Bulk Registration</h1>
                            <div className="col-10 col-md-10 mx-auto my-5 text-dark">
                                <form onSubmit={handleSubmit} className="contact_form row">
                                    {/* <div className="col-12">
                                        <div className="form-floating mb-4">
                                            <select className="form-select form-control form-control-lg light-300" id="client_format" name="client_format" value={formData.client_format || ""} onChange={handleChange} aria-label="Default select">
                                                <option value="client_format" disabled>Select File Format*</option>
                                                <option value="csv">CSV</option>
                                                <option value="tsv">TSV</option>
                                            </select>
                                            <label htmlFor="branch" className="light-300">Select File Format*</label>
                                        </div>
                                    </div> */}
                                    <div className="col-12">
                                        <div className="form-floating mb-4">
                                            <select className="form-select form-control form-control-lg light-300" id="client_format" name="client_format" value={formData.client_format} onChange={handleChange} aria-label="Default select">
                                                <option value="">Choose your file format*</option>
                                                <option value="csv">CSV</option>
                                                <option value="tsv">TSV</option>
                                            </select>
                                            <label htmlFor="branch" className="light-300">Select File Format*</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating mb-4">
                                            <input type="text" className="form-control form-control-lg light-300" id="faculty_email" name="faculty_email" value={formData.faculty_email} onChange={handleChange} placeholder="Faculty Email*" required />
                                            <label htmlFor="facutly_email" className="light-300">Faculty Email*</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating mb-4">
                                            <textarea cols="50" className="form-control h-20em-important col-lg form-control-lg light-300" id="data" name="data" value={formData.dataText} onChange={handleParsing} placeholder="Paste bulk data here*" required />
                                            <label htmlFor="data" className="light-300">Paste your file here*</label>
                                        </div>
                                    </div>

                                    <div className='col-12'>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>FName</th>
                                                    <th>LName</th>
                                                    <th>Regd</th>
                                                    <th>Email</th>
                                                    <th>DOB</th>
                                                    <th>Year</th>
                                                    <th>Branch</th>
                                                    <th>Admin</th>
                                                    <th>CR</th>
                                                    <th>Password</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formData.data && formData.data.slice(0, 5).map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{row.fname}</td>
                                                        <td>{row.lname}</td>
                                                        <td>{row.regd}</td>
                                                        <td>{row.email}</td>
                                                        <td>{row.dob}</td>
                                                        <td>{row.year}</td>
                                                        <td>{row.branch}</td>
                                                        <td>{row.isAdmin ? 'Yes' : 'No'}</td>
                                                        <td>{row.isCr ? 'Yes' : 'No'}</td>
                                                        <td>{row.password}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className=" d-flex align-items-center w-100 flex-column col-md-12 col-12 mx-auto my-3">
                                        <button type="submit" className="btn w-30 btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300">Register</button>
                                    </div>
                                    <div>
                                        {/* <div className="col-lg-6 mb-4">
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
                                            <label htmlFor="facutly_email" className="light-300">Faculty Email*</label>
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
                                            <select className="form-select form-control form-control-lg light-300" id="iscr" name="iscr" value={formData.iscr} onChange={handleChange} aria-label="Default select">
                                                <option value="" disabled>Is a CR?*</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                            <label htmlFor="iscr" className="light-300">Choose privilege*</label>
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
                                        <NavLink to="/student_bulk_register" className=' text-white m-1'>Register Students in Bulk?</NavLink>
                                    </div> */}
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
            <Footer />
        </div>
    );
}

export default BulkRegister;
