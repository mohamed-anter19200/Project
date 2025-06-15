// pages/StudentForm.jsx
import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../../../components/InputField/InputField';
import { addDoctor } from '../../../../API/Admin/Lecturer/Lecturer';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import DashboardTitle from '../../../../components/DashboardTitle/DashboardTitle';

const LecturerSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  gmail: Yup.string().email('Invalid email').required('Email is required'),
});

export default function AddLecturer() {
  const queryClient = useQueryClient();
  return (
    <div className="container mx-auto px-4">
      <DashboardTitle title="Add New Lecturer" />
      <Formik
        initialValues={{ firstName: '', lastName: '', gmail: '' }}
        validationSchema={LecturerSchema}
        onSubmit={async (values, { resetForm }) => {
          await addDoctor(values, toast, queryClient);
          resetForm();  
        }}
      >
        <Form>
          <InputField name="firstName" placeholder="First Name" type="text" />
          <InputField name="lastName" placeholder="Last Name" type="text" />
          <InputField name="gmail" placeholder="Email" type="email" />
          <button type="submit" className="btn">Submit</button>
        </Form>
      </Formik>

    </div>
  );
}
