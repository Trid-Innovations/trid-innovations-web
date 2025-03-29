import { motion } from "framer-motion";
import { ArrowRight, Brain, CheckCircle2, Link2, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const services = [
  { icon: "Wrench", key: "technical" },
  { icon: "Link2", key: "integration" },
  { icon: "Brain", key: "custom" },
];

const features = [
  { title: "24/7 Support", icon: CheckCircle2 },
  { title: "Agile Methodology", icon: CheckCircle2 },
  { title: "Dedicated Team", icon: CheckCircle2 },
  { title: "Transparent Pricing", icon: CheckCircle2 },
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

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-trid-teal mb-4">
            {t("services.title")}
          </h2>
          <div className="w-24 h-1 bg-trid-lime mx-auto mb-8" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => {
            const Icon =
              IconComponent[service.icon as keyof typeof IconComponent];
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group flex flex-col items-start space-y-4 sm:space-y-6 p-6 sm:p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="p-3 sm:p-4 bg-gradient-to-br from-trid-lime/20 to-trid-teal/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-trid-teal" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-trid-teal group-hover:text-trid-lime transition-colors">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {
                    t(`services.${service.key}.description`, {
                      returnObjects: true,
                    })[0]
                  }
                </p>
                <Link
                  to={`/services/${service.key}`}
                  whileHover={{ x: 5 }}
                  className="flex items-center text-sm sm:text-base text-trid-teal hover:text-trid-lime transition-colors mt-2"
                >
                  {t("services.learnMore")}{" "}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid md:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <feature.icon className="w-5 h-5 text-trid-lime" />
              <span className="text-sm sm:text-base text-gray-700 font-medium">
                {feature.title}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
