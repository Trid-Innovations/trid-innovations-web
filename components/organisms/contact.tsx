"use client";
import { useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../atoms/input";
import { ContactData } from "@/types/typings";
import { LanguageContext } from "@/context/languageContext";
import { motion } from "framer-motion";
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
  // const nameFilled = watch("name");
  // const nameFilled = watch("name");
  // const nameFilled = watch("name");
  // const nameFilled = watch("name");
  const apply: SubmitHandler<ContactInput> = async (data) => {
    console.log("here");
  };

  console.log({ data });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-[70vh] flex items-center  flex-wrap text-center md:text-left max-w-7xl gap-10 m-auto p-5 justify-between"
    >
      <div className="hidden w-full md:w-1/2 lg:w-[500px] md:flex flex-col text-left leading-10 gap-4">
        <p className="text-xs md:text-xl lg:text-xl">
          {data.description[language.code]}
        </p>
        <p className="text-xs font-bold md:text-lg">{`${
          data.emailLabel[language.code]
        } : contact@tridinnovations.com`}</p>
      </div>
      <div className="md:w-1/2 w-full md:place-self-center place-self-end py-5">
        <form className="flex gap-4">
          <div className="flex flex-col  w-full gap-4">
            <label className="text-right m-4 text-xl uppercase text-primary-trid font-extrabold">
              {data.title[language.code]}
            </label>

            <div className="flex flex-col gap-2 md:gap-5">
              {data.inputs.map((input) => (
                <Input
                  key={input.name}
                  name={input.name}
                  control={control}
                  label={input.label[language.code]}
                  rules={{ ...input.validations }}
                />
              ))}
            </div>

            <div className="place-self-end items-center justify-end">
              <button
                disabled={!isValid}
                onClick={handleSubmit(apply)}
                className="trid__button trid_text--rainier font-normal w-32"
              >
                {data.buttonLabel[language.code]}
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default ContactForm;
