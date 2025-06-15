import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup"; 
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { sendDataToSignUp } from '../../API/Auth/Auth';
import { useContext } from "react";
import { userContext } from "../../context/User.context";
import toast from 'react-hot-toast';

export default function SignUp() {
  const navigate = useNavigate();
  const { setToken } = useContext(userContext);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().required("Email is required").email("Email is invalid"),
      password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: (values) => sendDataToSignUp(values, navigate, setToken, toast),
  });

  return (
    <>
      <div className="h-screen bg-gray-50 flex justify-center items-center">
        <motion.div
          className="container w-[90%] mx-auto md:w-1/3 bg-white md:p-8 p-5 rounded-lg shadow-2xl"
          initial={{ opacity: 0, y: -300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-center text-2xl font-semibold text-gray-600 mb-6">Tanta University</h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="relative mb-3">
              <input
                type="text"
                id="firstName"
                className="form-control"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <p className="text-red-500">*{formik.errors.firstName}</p>
              ) : null}
            </div>

            <div className="relative mb-3">
              <input
                type="text"
                id="lastName"
                className="form-control"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <p className="text-red-500">*{formik.errors.lastName}</p>
              ) : null}
            </div>

            <div className="relative mb-3">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500">*{formik.errors.email}</p>
              ) : null}
            </div>

            <div className="relative mb-3">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="form-control"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500">*{formik.errors.password}</p>
              ) : null}
            </div>

            <button type="submit" className="btn w-full">Sign Up</button>
            <div className="text-center mt-4">
              <Link to='/login' className="text-blue-600 hover:underline">Already have an account? Log in</Link>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
