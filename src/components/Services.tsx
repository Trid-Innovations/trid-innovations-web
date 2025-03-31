import { motion } from "framer-motion";
import { ArrowRight, Brain, Link2, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const services = [
  { icon: "Wrench", key: "technical" },
  { icon: "Link2", key: "integration" },
  { icon: "Brain", key: "custom" },
];

const IconComponent = {
  Wrench,
  Link2,
  Brain,
};

export default function Services() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate();

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-trid-teal">
            {t("services.title")}
          </h2>
          <div className="mx-auto mb-8 w-24 h-1 bg-trid-lime" />
          <p className="mx-auto max-w-2xl text-gray-600">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon =
              IconComponent[service.icon as keyof typeof IconComponent];
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onClick={() => navigate(`/services/${service.key}`)}
                className="flex flex-col items-start p-6 space-y-4 bg-white rounded-2xl border border-gray-100 shadow-lg transition-all duration-300 cursor-pointer group sm:space-y-6 sm:p-8 hover:shadow-xl"
              >
                <div className="p-3 bg-gradient-to-br rounded-xl transition-transform duration-300 sm:p-4 from-trid-lime/20 to-trid-teal/20 group-hover:scale-110">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-trid-teal" />
                </div>
                <h3 className="text-xl font-semibold transition-colors sm:text-2xl text-trid-teal group-hover:text-trid-lime">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  {
                    t(`services.${service.key}.description`, {
                      returnObjects: true,
                    })[0]
                  }
                </p>
                <div
                  whileHover={{ x: 5 }}
                  className="flex items-center mt-2 text-sm transition-colors sm:text-base text-trid-teal hover:text-trid-lime"
                >
                  {t("services.learnMore")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* <Features /> */}
      </div>
    </section>
  );
}
