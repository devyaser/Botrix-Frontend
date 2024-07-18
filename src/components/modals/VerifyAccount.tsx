import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "classnames";
import FormField from "../common/FormField";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { verifyUser } from "../../helper/fetch-data.helper";

const VerifyAccountSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
});

export default function VerifyAccountModal({
  open,
  hideModal,
  switchLogin,
}: {
  open: boolean;
  hideModal: Function;
  switchLogin: Function;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const { code } = values;
      const res = await verifyUser(code);
      setIsLoading(false);
      toast.success(`Verified Successfully!`);
      switchLogin();
    } catch (err) {
      setIsLoading(false);
      toast.error(`${err}`);
    }
  };

  return (
    <div className={clsx("modal bg-custom-lightgraythree/90", open ? "modal-open" : "invisible")}>
      <div className="modal-box p-5 max-h-fit rounded-none w-full h-full lg:h-fit lg:max-h-[calc(100vh-5em)] lg:rounded lg:px-2 lg:pt-[30px] lg:pb-[90px] bg-custom-contentgray no-scrollbar">
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
        <div className="w-[370px] m-auto">
          <Formik
            initialValues={{
              code: "",
            }}
            validationSchema={VerifyAccountSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <Image src="/images/logo.png" width={180} height={59} alt="Logo" />
                </div>
                <div className="text-white font-normal text-base py-2">
                  Need Registration Verification
                </div>
                <div className="mt-5">
                  <FormField
                    label="Enter Code"
                    type="text"
                    name="code"
                    placeholder="Enter code"
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <button
                  type="submit"
                  className="h-[50px] text-lg font-bold rounded-[5px] text-white normal-case btn bg-custom-default hover:bg-custom-default border-custom-default focus:border-custom-default mt-6 w-full"
                >
                  {isLoading && <FaSpinner className="animate-spin transition duration-1000" />}
                  Verify
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
