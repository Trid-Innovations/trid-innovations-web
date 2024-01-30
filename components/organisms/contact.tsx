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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="pt-20 h-screen relative md:flex flex-col  text-center md:text-left max-w-7xl px-10 justify-between space-y-20 mx-auto items-center gap-5"
    >
      <div className="flex flex-col text-justify w-full gap-4">
        <p className="text-xs md:text-xl lg:text-2xl leading-8">
          {data.description[language.code]}
        </p>
        <p className="text-xs font-bold md:text-lg">{`${
          data.emailLabel[language.code]
        } : contact@tridinnovations.com`}</p>
      </div>
      <form className="flex  w-full gap-4">
        <div className="w-full">
          <label className="place-self-end">{data.title[language.code]}</label>

          {data.inputs.map((input) => (
            <Input
              key={input.name}
              name="voucherNumber"
              control={control}
              label={input.name}
              rules={{ ...input.validations }}
            />
          ))}

          <div className="place-self-end">
            <button
              disabled={!isValid}
              onClick={handleSubmit(apply)}
              className="gds_button--outline gds_text--rainier font-normal w-32"
            >
              {data.buttonLabel[language.code]}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

export default ContactForm;
