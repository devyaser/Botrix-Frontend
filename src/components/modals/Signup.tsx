import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "classnames";
import FormField from "../common/FormField";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useCallback, useState } from "react";
import { createUser } from "../../helper/fetch-data.helper";
import ReCAPTCHA from "react-google-recaptcha";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  birthday: Yup.string()
    .required("Birthday is required")
    .matches(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/, "Date must be in format mm/dd/yyyy"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  cf_password: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
});

export default function SignupModal({
  open,
  hideModal,
  switchLogin,
}: {
  open: boolean;
  hideModal: Function;
  switchLogin: Function;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const { username, email, birthday, password } = values;
      const res = await createUser(username, email, birthday, password);
      setIsLoading(false);
      toast.success(res.message);
      switchLogin();
    } catch (err) {
      setIsLoading(false);
      toast.error(`${err}`);
    }
  };

  const onChangeCaptcha = (value: string | null) => {
    setCaptcha(value);
  };

  return (
    <div className={clsx("modal bg-custom-lightgraythree/90", open ? "modal-open" : "invisible")}>
      <div className="modal-box p-5 max-h-fit rounded-none w-full h-full lg:max-h-[calc(100vh-5em)] lg:rounded lg:px-2 lg:pt-[30px] lg:pb-[90px] bg-custom-contentgray no-scrollbar">
        <div className="flex justify-end mb-5">
          <button
            className="lg:hidden btn h-auto p-0 min-h-fit font-normal btn-ghost text-white"
            onClick={(e) => {
              e.preventDefault();
              hideModal();
            }}
          >
            <Image src="/icons/close-mobile.svg" width={25} height={25} alt="Close" />
          </button>
          <button
            className="hidden lg:block mr-8 btn h-auto p-0 min-h-fit font-normal btn-ghost text-white"
            onClick={(e) => {
              e.preventDefault();
              hideModal();
            }}
          >
            <Image src="/icons/close-mobile.svg" width={40} height={40} alt="Close" />
          </button>
        </div>
        <div className="w-full lg:w-[370px] m-auto">
          <Formik
            enableReinitialize
            initialValues={{
              username: "",
              email: "",
              birthday: "",
              password: "",
              cf_password: "",
              // username: "tajforwork",
              // email: "tajforwork@gmail.com",
              // username: "tajbsta22",
              // email: "tajbsta22@gmail.com",
              // birthday: "06/11/1990",
              // password: "Festival91",
              // cf_password: "Festival91",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched, submitCount }) => (
              <Form>
                <div className="mb-4">
                  <Image src="/images/logo.png" width={180} height={59} alt="Logo" />
                </div>
                <div className="text-white font-normal text-base py-2">
                  Want to start a chat? Register, connect your wallet and buy a NFT to be part of a
                  new chat
                </div>
                <div className="mt-5 space-y-5">
                  <FormField
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="Choose your username"
                    errors={errors}
                    touched={touched}
                  />
                  <FormField
                    label="Email"
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    errors={errors}
                    touched={touched}
                  />
                  <FormField
                    label="Your Birthday"
                    type="text"
                    name="birthday"
                    placeholder="Enter your birthday mm/dd/yyyy"
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
                  <FormField
                    label="Confirm Password"
                    type="password"
                    name="cf_password"
                    placeholder="Retype your password"
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className="mt-4">
                  <ReCAPTCHA
                    sitekey={process.env.RECAPTCHA_SITE_KEY ?? ""}
                    onChange={onChangeCaptcha}
                  />
                  {captcha === null && submitCount > 0 && (
                    <div className="mt-1 text-red-500">Please confirm you are not a robot.</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="h-[50px] text-lg font-bold rounded-[5px] text-white disabled:bg-custom-default/50 disabled:cursor-not-allowed disabled:text-white normal-case btn bg-custom-default hover:bg-custom-default border-custom-default hover:border-custom-default mt-6 w-full"
                  disabled={!captcha}
                >
                  {isLoading && <FaSpinner className="animate-spin transition duration-1000" />}
                  Register
                </button>
                <div className="mt-6 text-center text-base font-normal text-white">
                  Have an account? Login&nbsp;
                  <span
                    className="cursor-pointer text-custom-default"
                    onClick={() => switchLogin()}
                  >
                    here
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
