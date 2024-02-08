"use client";
import { useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../atoms/input";
import { ContactData, Validation } from "@/types/typings";
import { LanguageContext } from "@/context/languageContext";
import { motion } from "framer-motion";
import { mailSenderPayload, sendEmailAndAppend } from "@/utils/sendEmail";
import ContactOptions, { Option } from "../molecules/contactOptions";
type Props = {
  data: ContactData;
};
export type ContactInput = {
  name: string;
  email: string;
  number: string;
  message: string;
};
const initialState: ContactInput = {
  name: "",
  email: "",
  number: "",
  message: "",
};
function ContactForm({ data }: Props) {
  const { language } = useContext(LanguageContext);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ContactInput>({
    values: initialState,
  });

  const apply: SubmitHandler<ContactInput> = async (data) => {
    console.log("here", data);
    const payload: mailSenderPayload = {
      senderEmail: "patrice.diouf@tridinnovations.com",
      senderPassword: "j4JAT3j*yXzrK2!s",
      recipientEmail: "trispa88@gmail.com",
      subject: "Subject test",
      body: "test message",
    };
    // await sendEmailAndAppend(payload);
  };

  const contactOptions: Option[] = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="sm:w-6 sm:h-6 w-4 h-4 text-[#E5B25A]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      ),
      label: "Mail",
      value: "contact@tridinnovations.com",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="sm:w-6 sm:h-6 w-4 h-4 text-[#CFD02B]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>
      ),
      label: language.code === "en" ? "Phone Number" : "Téléphone",
      value: "+1 (581) 980 9150",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="sm:w-6 sm:h-6 w-4 h-4 text-[#5DAD78]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      ),
      label: "Trid innovations Québec",
      value: "7254 rue de l'apogée, Ville de Québec, G3D0K1",
    },
  ];
  return (
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
          <ContactOptions options={contactOptions} />
          <p className="text-xs md:text-base text-justify my-10">
            {data.description[language.code]}
          </p>
        </div>
        <div className="w-full py-5 bg-white p-5 rounded-lg ">
          <form className="flex gap-2 flex-col  w-full">
            <div className="flex flex-col gap-2 md:gap-5">
              {data.inputs.map((input) =>
                input.name !== "message" ? (
                  <Input
                    key={input.name}
                    name={input.name}
                    control={control}
                    label={input.label[language.code]}
                    rules={{
                      required: "test",
                    }}
                  />
                ) : (
                  <Input
                    key={input.name}
                    name={input.name}
                    control={control}
                    label={input.label[language.code]}
                    rules={{ ...input.validations }}
                    renderer={(onChange: any) => (
                      <textarea
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
                disabled={!isValid}
                onClick={() => handleSubmit(apply)}
                className="trid__button trid_text--rainier font-normal w-32"
              >
                {data.buttonLabel[language.code]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactForm;
