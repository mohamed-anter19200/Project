import React from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import { Formik, Form, Field } from 'formik';
import InputField from '../../../components/InputField/InputField';
import { toast } from 'react-hot-toast';
import SelectField from '../../../components/SelectField/SelectField';
import useLecturerCourses from '../../../hooks/Lecturer/useLecturerCourses';
import * as Yup from 'yup';
import { addTopic } from '../../../API/Lecturer/Lecturer';

const AddTopic = () => {
  const { data } = useLecturerCourses();
  console.log(data);

  const validationSchema = Yup.object().shape({
    attachment: Yup.mixed().required('Attachment file is required'),
    fileName: Yup.string().required('Topic name is required'),
    courseTitle: Yup.string().required('Course title is required'),
    videoType: Yup.string().required('Topic type is required'),
    courseId: Yup.string().required('Course selection is required'),
    videoUrl: Yup.string().required('Video URL is required'),
    numOfLec: Yup.string().required('Number of lecture or section is required'),
  });

  return (
    <div className="p-6">
      <DashboardTitle title="Add New Lecture or Section" />
      <Formik
        initialValues={{
          attachment: '',
          fileName: '',
          courseTitle: '',
          videoType: '',
          courseId: '',
          numOfLec: '',
          videoUrl: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await addTopic(values, toast);
          resetForm();
        }}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form>
            <InputField name="fileName" placeholder="Name" type="text" />

            <SelectField
              name="courseTitle"
              options={
                data?.map((course) => ({
                  value: course.courseName,
                  label: `${course.courseName} (${course.courseCode})`,
                })) || []
              }
            />

            <SelectField
              name="videoType"
              options={[
                { value: 'lec', label: 'Lecture' },
                { value: 'sec', label: 'Section' },
              ]}
            />

            <SelectField
              name="courseId"
              options={
                data?.map((course) => ({
                  value: course._id,
                  label: `${course.courseName} (${course.courseCode})`,
                })) || []
              }
            />

            <InputField name="videoUrl" placeholder="Video URL" type="text" />
            <InputField
              name="numOfLec"
              placeholder="Number of lecture or section"
              type="text"
              inputMode="numeric"
            />

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Attachment File
              </label>
              <input
                name="attachment"
                type="file"
                onChange={(event) => {
                  setFieldValue('attachment', event.currentTarget.files[0]);
                }}
                className="inner-input"
              />
              {errors.attachment && touched.attachment && (
                <div className="text-red-500 text-sm">{errors.attachment}</div>
              )}
            </div>

            <button type="submit" className="btn">
              Add Topic
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTopic;
