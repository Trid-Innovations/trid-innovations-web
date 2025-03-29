import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

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
    color: "bg-trid-accent/10 text-trid-accent",
  },
  {
    icon: Phone,
    key: "phone",
    value: "+1 (581) 980-9150",
    color: "bg-trid-teal/10 text-trid-teal",
  },
];

interface ContactInfoProps {
  inView: boolean;
}

export default function ContactInfo({ inView }: ContactInfoProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col  space-y-12 bg-white rounded-lg h-full p-5">
      <h2 className="text-2xl text-trid-teal font-semibold">
        {t("contact.info.title")}
      </h2>

      {contactInfo.map((info, index) => {
        const Icon = info.icon;
        return (
          <motion.div
            key={info.key}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex items-center space-x-4"
          >
            <div className={`p-4 rounded-full ${info.color} flex-shrink-0`}>
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xs sm:text-base font-bold">
                {t(`contact.${info.key}`)}
              </h3>
              <p className="text-gray-600">{info.value}</p>
            </div>
          </motion.div>
        );
      })}
      <p className="text-xs md:text-base text-justify my-10">
        {t("contact.info.description")}
      </p>
    </div>
  );
}
