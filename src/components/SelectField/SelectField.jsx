import { useField } from 'formik';
import { useContext } from 'react';
import { userContext } from '../../context/User.context';

const SelectField = ({ options = [], ...props }) => {
  const [field, meta] = useField(props);
  const {role} = useContext(userContext)
  return (
    <div className="space-y-1 mb-4">
      <select {...field} {...props} className="inner-input">
        { role == "admin"&&<option value="" disabled hidden> Select a course</option> }
         {role == "doctor" && props.name == "courseId" && <option value="" disabled hidden> Select a course</option> }
        {role == "doctor" && props.name == "courseTitle" && <option value="" disabled hidden> Select a course title</option> }
        {role == "doctor" && props.name == "videoType" && <option value="" disabled hidden> Select a topic type</option> } 
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm">{meta.error}</div>
      )}
    </div>
  );
};

export default SelectField;
