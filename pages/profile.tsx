import { useState } from "react";
import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "classnames";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import FormField from "../src/components/common/FormField";

import Layout from "../src/components/common/Layout";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values: any) => {};

  return (
    <Layout>
      <div className="px-4 w-full mt-10">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="text-white font-normal text-lg py-2">Profile information</div>
              <div className="mt-5 space-y-5">
                <FormField
                  label="Email"
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  errors={errors}
                  touched={touched}
                />
                <FormField
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  errors={errors}
                  touched={touched}
                />
              </div>
              <button
                type="submit"
                className="h-[50px] text-lg font-bold rounded-[5px] text-white normal-case btn bg-custom-default hover:bg-custom-default border-custom-default focus:border-custom-default mt-6 w-full"
              >
                {isLoading && <FaSpinner className="animate-spin transition duration-1000" />}
                Update
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}
