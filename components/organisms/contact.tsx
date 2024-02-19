"use client";
import { Fragment, useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../atoms/input";
import { ContactData, Validation } from "@/types/typings";
import { LanguageContext } from "@/context/languageContext";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactOptions, { Option } from "../molecules/contactOptions";
import { envs } from "@/functions/utils/config";
import Loader from "../atoms/loader";
import { convertValidationsToRules } from "@/functions/utils";

type Props = {
  data: ContactData;
};
export type ContactInput = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
};
const initialState: ContactInput = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
};
const { CONTACT_EMAIL_URL } = envs;
function ContactForm({ data }: Props) {
  const { language } = useContext(LanguageContext);
  const [loader, setLoader] = useState<boolean>(false);
  const { control, handleSubmit, reset } = useForm<ContactInput>({
    values: initialState,
  });
  const apply: SubmitHandler<ContactInput> = async (data) => {
    const toastId = new Date().getTime();

    console.log({ CONTACT_EMAIL_URL, data });
    const url: any = CONTACT_EMAIL_URL;
    setLoader(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast["success"](
          language.code === "en"
            ? "Email sent, thank you for contacting us"
            : "Email envoyé merci de nous avoir contacté",
          {
            toastId,
          }
        );
        setLoader(false);
        reset();
      })
      .catch((error) => {
        toast["error"](
          language.code === "en"
            ? "Error while sending email, please try again latter"
            : "Une erreur d'est produite veuillez reessayer plutard",
          {
            toastId,
          }
        );

        console.error("Error sending message:", error);
        setLoader(false);
      });
  };

  return (
    <Fragment>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="trid__page--section px-10"
      >
        <h3 className="uppercase tracking-[10px] text-gray-500 text-lg md:text-xl lg:text-2xl">
          {data.title[language.code]}
        </h3>

        <div className="gap-5 grid grid-cols-1  items-center lg:grid-cols-[40%_60%]  ">
          <div className="w-full flex flex-col text-left leading-10 gap-4 bg-white rounded-lg h-full p-5">
            <label className="text-primary-trid font-bold">
              TRID Innovations
            </label>
            <ContactOptions />
            <p className="text-xs md:text-base text-justify my-10">
              {data.description[language.code]}
            </p>
          </div>
          <div className="w-full py-5 bg-white p-5 rounded-lg relative ">
            {loader && <Loader />}
            <form
              className="flex gap-2 flex-col  w-full"
              onSubmit={handleSubmit(apply)}
            >
              <div className="flex flex-col gap-2 md:gap-5">
                {data.inputs.map((input) =>
                  input.name !== "message" ? (
                    <Input
                      key={input.name}
                      name={input.name}
                      control={control}
                      label={input.label[language.code]}
                      rules={convertValidationsToRules(
                        input.validations,
                        language.code
                      )}
                    />
                  ) : (
                    <Input
                      key={input.name}
                      name={input.name}
                      control={control}
                      label={input.label[language.code]}
                      rules={convertValidationsToRules(
                        input.validations,
                        language.code
                      )}
                      renderer={(onChange: any, value: string) => (
                        <textarea
                          value={value}
                          className={`mb-12 flex h-40  rounded-lg border-solid p-4 outline-none outline-0 w-full trid__input leading-6 ${
                            false ? "border !border-tertiary-mars" : ""
                          } m-0`}
                          onChange={onChange}
                        />
                      )}
                    />
                  )
                )}
              </div>

              <div className="place-self-end items-center justify-end p-1">
                <button
                  type="submit"
                  className="trid__button trid_text--rainier font-normal w-32 "
                >
                  {data.buttonLabel[language.code]}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

export default ContactForm;
