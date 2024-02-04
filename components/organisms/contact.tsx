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
      className="justify-center   h-screen items-center flex flex-col text-center md:text-left max-w-7xl gap-10 m-auto p-5"
    >
      <label className="md:text-right text-center m-4 md:text-xl text-xs uppercase text-primary-trid font-extrabold">
        {data.title[language.code]}
      </label>
      <div className=" grid grid-cols-1  items-center lg:grid-cols-[40%_60%]  ">
        <div className="hidden w-full md:flex flex-col text-left leading-10 gap-4">
          <p className="text-xs md:text-xl lg:text-xl">
            {data.description[language.code]}
          </p>
          <p className="text-xs font-bold md:text-lg">{`${
            data.emailLabel[language.code]
          } : contact@tridinnovations.com`}</p>
        </div>
        <div className="w-full py-5 bg-white p-5 rounded-lg">
          <form className="flex gap-2 flex-col  w-full">
            <div className="flex flex-col gap-2 md:gap-5">
              {data.inputs.map((input) =>
                input.name !== "message" ? (
                  <Input
                    key={input.name}
                    name={input.name}
                    control={control}
                    label={input.label[language.code]}
                    rules={{ ...input.validations }}
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
                onClick={handleSubmit(apply)}
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
