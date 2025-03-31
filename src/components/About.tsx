import { motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  Clock,
  History,
  Lightbulb,
  Rocket,
  Target,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    key: "experience",
    icon: Clock,
    color: "text-trid-teal",
  },
  {
    key: "projects",
    icon: Award,
    color: "text-trid-lime",
  },
  {
    key: "satisfaction",
    icon: CheckCircle2,
    color: "text-trid-purple",
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
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-trid-teal">
            {t("about.title")}
          </h2>
          <div className="mx-auto w-24 h-1 bg-trid-lime" />
        </motion.div>

        {/* Our Story Section */}
        <div className="mx-auto mb-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden relative p-8 bg-white rounded-2xl shadow-lg"
          >
            <div className="flex items-center mb-6 space-x-4">
              <div className="p-3 rounded-lg text-trid-teal bg-trid-teal/10">
                <History className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-trid-teal">
                {t("about.story.title")}
              </h3>
            </div>
            <div className="space-y-4 max-w-none prose prose-lg">
              {t("about.story.content", { returnObjects: true }).map(
                (paragraph: string, index: number) => (
                  <p key={index} className="leading-relaxed text-gray-600">
                    {paragraph}
                  </p>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        {/* <div className="mx-auto mb-20 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="flex items-center p-4 space-x-3 bg-white rounded-xl shadow-lg transition-all duration-300 sm:p-6 hover:shadow-xl sm:space-x-4"
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
                    {t(`about.stats.${stat.key}.value`)}
                  </div>
                  <div className="text-xs text-gray-600 truncate sm:text-sm">
                    {t(`about.stats.${stat.key}.label`)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div> */}

        {/* Mission, Vision, Approach Cards */}
        <div className="grid gap-8 mx-auto max-w-6xl md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className={`p-3 rounded-lg ${card.color} inline-block mb-4`}>
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
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
