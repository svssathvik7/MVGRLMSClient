import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import Papa from 'papaparse';
import { columnHeadings } from '../constants/bulkColumnsHeadings';
import Footer from '../components/Footer';
import axios from "axios";
import mobileStyles from '../constants/mobileStyles';
import { nContext } from '../contexts/NotificationContext';
import { ToastContainer } from 'react-toastify';

function BulkRegister() {
    const { notify } = useContext(nContext);
    const [formData, setFormData] = useState({
        client_format: '',
        format: 'json',
        dataText: '',
        data: null,
        faculty_email: '',
        bulk: true,
    });

    const [mobileSize, setMobileSize] = useState(false);

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
            notify("Choose file format first");
        }
        else {

            const { name, value } = e.target;

            var columnH;
            var formattedValue;

            if (formData.client_format === 'tsv') {
                columnH = columnHeadings.join('\t');
                formattedValue = value.replace(/ {4}/g, '\t');
            }
            else {
                columnH = columnHeadings.join(',');
                formattedValue = value;
            }

            const bulkDataString = `${columnH}\n${formattedValue}`;

            Papa.parse(bulkDataString, {
                header: true,
                skipEmptyLines: true,
                delimiter: formData.client_format === 'tsv' ? '\t' : ',',
                complete: (results) => {
                    console.log('Parsed Results:', results);     // Log the parsed results
                    setFormData({
                        ...formData,
                        [name]: results.data,
                        dataText: value
                    })
                },
                error: (error) => {
                    notify("Parsing error, Please check your data.")
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
            //based on backend handling we can add a toast here.
            notify(response.message);
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
    const checkScreenSize = () => {
        const width = window.innerWidth;
        setMobileSize(width < 768); // Adjust the breakpoint as needed
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);


    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} theme="dark" />
            <section>
                <div id="page_banner2" className="banner-wrapper d-flex flex-column align-items-center justify-content-center bg-light w-fit py-5 position-relative">
                    <div className="container w-fit m-0 text-light d-flex justify-content-center align-items-center py-5 p-0">
                        <div className="banner-content col-lg-8 col-12 text-center w-fit">
                            <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">Bulk Registration</h1>
                            <div className="col-10 col-md-10 mx-auto my-5 text-dark w-fit">
                                <form onSubmit={handleSubmit} className="contact_form row w-fit">
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
                                            <textarea cols="50" style={{ fontSize: '1em' }} className="form-control h-20em-important text-base form-control-lg light-300" id="data" name="data" value={formData.dataText} onChange={handleParsing} placeholder="Paste bulk data here*" required />
                                            <label htmlFor="data" className="light-300">Paste your file here*</label>
                                        </div>
                                    </div>

                                    <div className='contact_form w-fit d-flex flex-column justify-content-between align-items-center mt-5 mb-5'>
                                        {formData.data !== null &&
                                            <>
                                                <h6 className="banner-heading text-white display-5 mb-2 pb-5 semi-bold-400 typo-space-line-center">Top 5 records as a reference to ensure you store the data correctly</h6>
                                                <div style={mobileSize ? mobileStyles : {}} className='overflow-x-auto '>
                                                    <table style={{ width: "80vw" }} className="table-auto w-[80vw] mt-5 border-collapse border rounded border-gray-300 bg-white text-xs">
                                                        <thead>
                                                            <tr>
                                                                <th className="border bg-body-secondary border-gray-300 px-2 py-2 font-bold text-center">FName</th>
                                                                <th className="border bg-body-secondary border-gray-300 px-2 py-2 font-bold text-center">LName</th>
                                                                <th className="border bg-body-secondary border-gray-300 px-2 py-2 font-bold text-center">Regd</th>
                                                                <th className="border bg-body-secondary border-gray-300 px-2 py-2 font-bold text-center">Email</th>
                                                                <th className="border bg-body-secondary border-gray-300 px-2 py-2 font-bold text-center">DOB</th>
                                                                <th className="border bg-body-secondary border-gray-300 px-2 py-2 font-bold text-center">Year</th>
                                                                <th className="border bg-body-secondary border-gray-300 px-2 py-2 font-bold text-center">Branch</th>
                                                                <th className="border bg-body-secondary border-gray-300 px-2 py-2 font-bold text-center">Admin</th>
                                                                <th className="border bg-body-secondary border-gray-300 px-2 py-2 font-bold text-center">CR</th>
                                                                <th className="border bg-body-secondary border-gray-300 px-2 py-2 font-bold text-center">Password</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {formData.data && formData.data.slice(0, 5).map((row, index) => (
                                                                <tr key={index} className="text-center">
                                                                    <td className="border border-gray-300 px-2 py-2">
                                                                        {row?.fname ? (row.fname.length > 10 ? row.fname.substring(0, 10) + '...' : row.fname) : ''}
                                                                    </td>
                                                                    <td className="border border-gray-300 px-2 py-2">
                                                                        {row?.lname ? (row.lname.length > 10 ? row.lname.substring(0, 10) + '...' : row.lname) : ''}
                                                                    </td>
                                                                    <td className="border border-gray-300 px-2 py-2">
                                                                        {row?.regd ? (row.regd.length > 10 ? row.regd.substring(0, 10) + '...' : row.regd) : ''}
                                                                    </td>
                                                                    <td className="border border-gray-300 px-2 py-2">
                                                                        {row?.email ? (row.email.length > 10 ? row.email.substring(0, 10) + '...' : row.email) : ''}
                                                                    </td>
                                                                    <td className="border border-gray-300 px-2 py-2">
                                                                        {row?.dob ? (row.dob.length > 10 ? row.dob.substring(0, 10) + '...' : row.dob) : ''}
                                                                    </td>
                                                                    <td className="border border-gray-300 px-2 py-2">
                                                                        {row?.year ? (row.year.length > 10 ? row.year.substring(0, 10) + '...' : row.year) : ''}
                                                                    </td>
                                                                    <td className="border border-gray-300 px-2 py-2">
                                                                        {row?.branch ? (row.branch.length > 10 ? row.branch.substring(0, 10) + '...' : row.branch) : ''}
                                                                    </td>
                                                                    <td className="border border-gray-300 px-2 py-2">
                                                                        {row?.isAdmin ? 'Yes' : 'No'}
                                                                    </td>
                                                                    <td className="border border-gray-300 px-2 py-2">
                                                                        {row?.isCr ? 'Yes' : 'No'}
                                                                    </td>
                                                                    <td className="border border-gray-300 px-2 py-1">
                                                                        {row?.password ? (row.password.length > 10 ? row.password.substring(0, 10) + '...' : row.password) : ''}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </>
                                        }
                                    </div>

                                    <div className=" d-flex align-items-center w-100 flex-column col-md-12 col-12 mx-auto my-3">
                                        <button type="submit" className="btn w-30 btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300">Register All</button>
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
