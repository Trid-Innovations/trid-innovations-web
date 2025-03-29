import { motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  Clock,
  History,
  Lightbulb,
  Rocket,
  Target,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    value: "10+",
    label: "Years Experience",
    icon: Clock,
    color: "text-trid-teal",
  },
  {
    value: "50+",
    label: "Projects Completed",
    icon: Award,
    color: "text-trid-lime",
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    icon: CheckCircle2,
    color: "text-trid-purple",
  },
  {
    value: "24/7",
    label: "Support Available",
    icon: Users,
    color: "text-trid-orange",
  },
];

const cards = [
  {
    icon: Lightbulb,
    color: "text-trid-lime bg-trid-lime/10",
    title: "mission",
  },
  {
    icon: Target,
    color: "text-trid-teal bg-trid-teal/10",
    title: "vision",
  },
  {
    icon: Rocket,
    color: "text-trid-purple bg-trid-purple/10",
    title: "approach",
  },
];

export default function About() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-trid-teal mb-4">
            {t("about.title")}
          </h2>
          <div className="w-24 h-1 bg-trid-lime mx-auto" />
        </motion.div>

        {/* Our Story Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-lg text-trid-teal bg-trid-teal/10">
                <History className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-trid-teal">
                {t("about.story.title")}
              </h3>
            </div>
            <div className="prose prose-lg max-w-none space-y-4">
              {t("about.story.content", { returnObjects: true }).map(
                (paragraph: string, index: number) => (
                  <p key={index} className="text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 sm:space-x-4"
              >
                <div
                  className={`p-2 sm:p-3 rounded-lg bg-opacity-10 ${stat.color} flex-shrink-0`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="min-w-0">
                  <div
                    className={`text-xl sm:text-2xl font-bold ${stat.color} mb-0.5 sm:mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-xs sm:text-sm truncate">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mission, Vision, Approach Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`p-3 rounded-lg ${card.color} inline-block mb-4`}>
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t(`about.${card.title}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`about.${card.title}.content`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
