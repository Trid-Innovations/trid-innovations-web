import { motion } from "framer-motion";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { trackUserAction } from "../utils/analytics";
import Input from "./atoms/Input";

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: ContactInput = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

interface ContactFormProps {
  inView: boolean;
}

export default function ContactForm({ inView }: ContactFormProps) {
  const { t } = useTranslation();
  const [loader, setLoader] = useState<boolean>(false);
  const { control, handleSubmit, reset } = useForm<ContactInput>({
    values: initialState,
  });

  const apply: SubmitHandler<ContactInput> = async (data) => {
    const toastId = new Date().getTime();

    setLoader(true);
    fetch(import.meta.env.VITE_EMAIL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Try to parse JSON, but don't fail if there's no JSON response
        const text = await response.text();
        trackUserAction.contact("form");
        return text ? JSON.parse(text) : {};
      })
      .then((_data) => {
        toast["success"](t("contact.toast.success"), {
          toastId,
        });
        setLoader(false);
        reset();
      })
      .catch((error) => {
        toast["error"](t("contact.toast.error"), {
          toastId,
        });

        console.error("Error sending message:", error);
        setLoader(false);
      });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-6"
      onSubmit={handleSubmit(apply)}
    >
      <div className="grid gap-6">
        <Input
          key="name"
          name="name"
          control={control}
          label={t("contact.form.name")}
          required={true}
        />
        <Input
          key="email"
          name="email"
          control={control}
          label={t("contact.form.email")}
          required={true}
        />
        <Input
          key="subject"
          name="subject"
          control={control}
          label={t("contact.form.subject")}
          required={true}
        />
      </div>
      <Input
        key="message"
        name="message"
        control={control}
        label={t("contact.form.message")}
        required={true}
        renderer={(onChange: any, value: string) => (
          <textarea
            value={value}
            className={`border-trid-gray-light border-2 mb-12 flex h-40 rounded-lg border-solid p-4 outline-none outline-0 w-full trid__input leading-6 ${
              false ? "border !border-tertiary-mars" : ""
            } m-0 bg-trid-gray-light`}
            onChange={onChange}
          />
        )}
      />
      <button
        disabled={loader}
        type="submit"
        className={`w-full px-6 py-3 bg-trid-teal-light text-white rounded-lg hover:bg-trid-teal transition-colors ${
          loader ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loader ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            {t("contact.form.sending")}
          </div>
        ) : (
          t("contact.form.submit")
        )}
      </button>
    </motion.form>
  );
}
