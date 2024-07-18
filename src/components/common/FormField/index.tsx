import Image from "next/image";
import { Formik, Form, Field } from "formik";

export default function FormField({
  label,
  type,
  name,
  placeholder,
  errors,
  touched,
}: {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  errors: any;
  touched: any;
}) {
  return (
    <div>
      <div className="mb-5 text-white font-bold text-lg leading-[22px]">{label}</div>
      <Field
        type={type}
        name={name}
        className="text-[15px] font-normal h-[23px] field-input input w-full bg-transparent px-0 border-0 border-b border-custom-darkgrayfive focus:outline-none focus:border-b focus:border-custom-darkgrayfive rounded-none text-white"
        placeholder={placeholder}
      />
      {errors[name] && touched[name] ? (
        <div className="mt-1 text-red-500">{errors[name]}</div>
      ) : null}
    </div>
  );
}
