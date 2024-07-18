import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "classnames";
import FormField from "../common/FormField";
import { signIn } from "next-auth/client";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginModal({
  open,
  hideModal,
  switchRegister,
}: {
  open: boolean;
  hideModal: Function;
  switchRegister: Function;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    const { email, password } = values;
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!result) {
      return;
    }

    if (!result.error) {
      //set some auth state

      // await getSession().then((session) => {
      //   setIsLoading(false);
      //   if (session) {
      //     // const reduxStore = initializeStore();
      //     // const { dispatch } = reduxStore;

      //     try {
      //       setUser(session.user);
      //       // dispatch({
      //       //   type: "SET_USER",
      //       //   user: session.user,
      //       // });
      //       setTimeout(() => {
      //         router.replace("/");
      //       }, 3000);
      //     } catch (err) {
      //       console.log("no user to dispatch");
      //     }
      //   }
      // });
      hideModal();

      toast.success(`you have been logged in!`);
      setIsLoading(false);
    } else {
      if (result.error === "CredentialsSignin") {
        toast.error("Email or password is incorrect.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={clsx("modal bg-custom-lightgraythree/90", open ? "modal-open" : "invisible")}>
      <div className="modal-box p-5 max-h-fit rounded-none w-full h-full lg:max-h-[calc(100vh-5em)] lg:h-fit lg:rounded lg:px-2 lg:pt-[30px] lg:pb-[90px] bg-custom-contentgray no-scrollbar">
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
            initialValues={{
              // email: "tajbsta22@gmail.com",
              // password: "Festival91",
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <Image src="/images/logo-1.png" width={180} height={59} alt="Logo" />
                </div>
                <div className="text-white font-normal text-lg py-2">
                  Want to start a chat? Log in, connect your wallet and buy a NFT to be part of a
                  new chat
                </div>
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
                <div className="flex justify-between mt-[18px]">
                  <label className="flex items-center">
                    <input type="checkbox" />
                    <span className="ml-1 text-xs text-custom-darkgrayone">Stay logged in?</span>
                  </label>
                  <span className="cursor-pointer text-xs text-custom-darkgrayone">
                    Forgot password?
                  </span>
                </div>
                <button
                  type="submit"
                  className="h-[50px] text-lg font-bold rounded-[5px] text-white normal-case btn bg-custom-default hover:bg-custom-default border-custom-default focus:border-custom-default mt-6 w-full"
                >
                  {isLoading && <FaSpinner className="animate-spin transition duration-1000" />}
                  Login
                </button>
                <div className="mt-6 text-center text-base font-normal text-white">
                  Don&apos;t have an account yet? Register{" "}
                  <span
                    className="cursor-pointer text-custom-default"
                    onClick={() => switchRegister()}
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
