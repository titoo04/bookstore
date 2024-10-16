import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export default function Register() {
  const [errorcheck, seterrorcheck] = useState(false);
  const [success, setsuccess] = useState(false);
  const [isclicked, setisclicked] = useState(false);
  const navigate = useNavigate();
  const user = {
    fName: '',
    lName: '',
    email: '',
    password: '',
    rePassword: '',
  };

 
  async function registerdone(value) {
    try {
      setisclicked(true);

      // Call the backend's /register endpoint
      const response = await axios.post(
        'https://book-store-back-end-d-mohamedmostafa427s-projects.vercel.app/users/register',
        {
          fName: value.fName,
          lName: value.lName,
          email: value.email,
          password: value.password
        }
      );
      console.log(response);
      
     
      setsuccess(true);
      setisclicked(false);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      
      setisclicked(false);
      seterrorcheck(error.response?.data?.message || "An error occurred");
      setTimeout(() => {
        seterrorcheck(null);
      }, 2000);
    }
  }


  const formik = useFormik({
    initialValues: user,
    onSubmit: registerdone,
    validationSchema: yup.object().shape({
      fName: yup.string().required('First Name is Required').min(2, 'Minimum 2 Characters'),
      lName: yup.string().required('Last Name is Required').min(2, 'Minimum 2 Characters'),
      email: yup.string().email('Invalid email').required('Email is Required'),
      password: yup
        .string()
        .required()
        .matches(/^(?=.*[A-Z]).{8,}$/, 'Password must be at least 8 characters and contain an uppercase letter'),
      rePassword: yup
        .string()
        .required('Confirm Password is Required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    }),
  });

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: '#F5F3EE' }}>
      <form className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg" onSubmit={formik.handleSubmit}>
        <h2 className="font-serif pb-4">Register Now :</h2>

        {/* Error or Success Message */}
        {errorcheck ? (
          <div className="p-4 mb-4 text-sm text-white rounded-lg bg-red-600" role="alert">
            {errorcheck}
          </div>
        ) : success ? (
          <div className="p-4 mb-4 text-sm text-white rounded-lg bg-green-600" role="alert">
            <span className="font-medium">Success alert!</span> Congratulations!
          </div>
        ) : undefined}

        {/* Input Fields */}
        <div className="space-y-6">
          {/* First Name */}
          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="fName"
              id="fName"
              value={formik.values.fName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="fName"
              className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First Name
            </label>
            {formik.errors.fName && formik.touched.fName && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg" role="alert">
                {formik.errors.fName}
              </div>
            )}
          </div>

          {/* Last Name */}
          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="lName"
              id="lName"
              value={formik.values.lName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="lName"
              className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last Name
            </label>
            {formik.errors.lName && formik.touched.lName && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg" role="alert">
                {formik.errors.lName}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="relative z-0 w-full group">
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email Address
            </label>
            {formik.errors.email && formik.touched.email && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg" role="alert">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="relative z-0 w-full group">
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {formik.errors.password && formik.touched.password && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg" role="alert">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative z-0 w-full group">
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="rePassword"
              className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg" role="alert">
                {formik.errors.rePassword}
              </div>
            )}
          </div>

          {/* Submit Button */}
          {isclicked ? (
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-lg"
              disabled
            >
              <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="35" visible />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
