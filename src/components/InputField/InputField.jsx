import { useField } from 'formik';

export default function InputField({ placeholder, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <input
        {...field}
        {...props}
        placeholder={placeholder}
        className="inner-input"
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
}
