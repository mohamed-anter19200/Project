// pages/CourseForm.jsx
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../../../components/InputField/InputField';
import { addCourse } from '../../../../API/Admin/Course/Course';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import DashboardTitle from '../../../../components/DashboardTitle/DashboardTitle';
import { useAllDoctors } from '../../../../hooks/Admin/Lecturer/index';
import SelectField from '../../../../components/SelectField/SelectField';

const CourseSchema = Yup.object({
  courseName: Yup.string().required('Course name is required'),
  courseCode: Yup.string().required('Course code is required'),
  doctorId: Yup.string().required('Doctor ID is required'),
 level: Yup.string()
  .required('Level is required'),
  semster: Yup.string()
  .oneOf(['first', 'second'], 'Semester must be either first or second')
  .required('Semester is required'),

});

export default function AddCourse() {
  const queryClient = useQueryClient();
  const {data} = useAllDoctors();
  return (
    <>
    <DashboardTitle title="Add New Course" />
    <Formik
      initialValues={{
        courseName: '',
        courseCode: '',
        doctorId: '',
        level: '',
        semster: ''
      }}
      validationSchema={CourseSchema}
      onSubmit={async (values, { resetForm }) => {
        await addCourse(values, queryClient, toast);
        resetForm();
      }}
    >
      <Form>
        <InputField name="courseName" placeholder="Course Name" type="text" />
        <InputField name="courseCode" placeholder="Course Code" type="text" />
        <InputField name="level" type="text" placeholder="Level example: Level 2" />
        <InputField name="semster" type="text" placeholder="Semester example: first" />
        <SelectField
          name="doctorId"
          options={
            data?.doctors?.map((doctor) => ({
              value: doctor._id,
              label: `${doctor.firstName} ${doctor.lastName}`
            })) || []
          }
        />
        <button type="submit" className="btn">Submit</button>
      </Form>
    </Formik>
</>
  );
}
