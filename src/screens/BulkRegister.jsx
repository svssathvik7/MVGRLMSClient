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
                        <div className="banner-content col-lg-8 col-12 text-center">
                            <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">Student Bulk Registration</h1>
                            <div className="col-10 col-md-10 mx-auto my-5 text-dark">
                                <form onSubmit={handleSubmit} className="contact_form row">
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

                                    <div className='container'>
                                        {formData.data !== null &&
                                            <table className="table-auto w-full border-collapse border border-gray-300 bg-white text-xs">
                                                <thead>
                                                    <tr>
                                                        <th className="border border-gray-300 px-2 py-1 font-bold text-center">FName</th>
                                                        <th className="border border-gray-300 px-2 py-1 font-bold text-center">LName</th>
                                                        <th className="border border-gray-300 px-2 py-1 font-bold text-center">Regd</th>
                                                        <th className="border border-gray-300 px-2 py-1 font-bold text-center">Email</th>
                                                        <th className="border border-gray-300 px-2 py-1 font-bold text-center">DOB</th>
                                                        <th className="border border-gray-300 px-2 py-1 font-bold text-center">Year</th>
                                                        <th className="border border-gray-300 px-2 py-1 font-bold text-center">Branch</th>
                                                        <th className="border border-gray-300 px-2 py-1 font-bold text-center">Admin</th>
                                                        <th className="border border-gray-300 px-2 py-1 font-bold text-center">CR</th>
                                                        <th className="border border-gray-300 px-2 py-1 font-bold text-center">Password</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {formData.data && formData.data.slice(0, 5).map((row, index) => (
                                                        <tr key={index} className="text-center">
                                                            <td className="border border-gray-300 px-2 py-1">{row.fname}</td>
                                                            <td className="border border-gray-300 px-2 py-1">{row.lname}</td>
                                                            <td className="border border-gray-300 px-2 py-1">{row.regd}</td>
                                                            <td className="border border-gray-300 px-2 py-1">{row.email}</td>
                                                            <td className="border border-gray-300 px-2 py-1">{row.dob}</td>
                                                            <td className="border border-gray-300 px-2 py-1">{row.year}</td>
                                                            <td className="border border-gray-300 px-2 py-1">{row.branch}</td>
                                                            <td className="border border-gray-300 px-2 py-1">{row.isAdmin ? 'Yes' : 'No'}</td>
                                                            <td className="border border-gray-300 px-2 py-1">{row.isCr ? 'Yes' : 'No'}</td>
                                                            <td className="border border-gray-300 px-2 py-1">{row.password}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        }
                                    </div>

                                    <div className=" d-flex align-items-center w-100 flex-column col-md-12 col-12 mx-auto my-3">
                                        <button type="submit" className="btn w-30 btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300">Register</button>
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
