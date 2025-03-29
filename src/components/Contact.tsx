import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { toast, ToastContainer } from "react-toastify";
import { trackUserAction } from "../utils/analytics";
import Input from "./atoms/Input";

const contactInfo = [
  {
    icon: Mail,
    key: "email",
    value: "contact@tridinnovations.com",
    color: "bg-trid-lime/10 text-trid-lime",
  },
  {
    icon: MapPin,
    key: "address",
    value: "Québec, QC, Canada",
    color: "bg-trid-purple/10 text-trid-purple",
  },
  {
    icon: Phone,
    key: "phone",
    value: "+1 (418) 555-0123",
    color: "bg-trid-teal/10 text-trid-teal",
  },
];
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

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [loader, setLoader] = useState<boolean>(false);
  const { control, handleSubmit, reset } = useForm<ContactInput>({
    values: initialState,
  });
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
        toast["success"](
          i18n.language === "en"
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
          i18n.language === "en"
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
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-trid-teal mb-16 text-center">
            {t("contact.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className={`p-4 rounded-full ${info.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t(`contact.${info.key}`)}
                  </h3>
                  <p className="text-gray-600">{info.value}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 max-w-2xl mx-auto space-y-6"
            onSubmit={handleSubmit(apply)}
          >
            <div className="grid  gap-6">
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
                  className={`mb-12 flex h-40  rounded-lg border-solid p-4 outline-none outline-0 w-full trid__input leading-6 ${
                    false ? "border !border-tertiary-mars" : ""
                  } m-0`}
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
                  {i18n.language === "en" ? "Sending..." : "Envoi en cours..."}
                </div>
              ) : (
                t("contact.form.submit")
              )}
            </button>
          </motion.form>
          <ToastContainer position="bottom-right" />
        </motion.div>
      </div>
    </section>
  );
}
