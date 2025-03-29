import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Lightbulb, Code } from 'lucide-react';

interface TeamProps {
  language: Language;
}

const teamValues = [
  {
    icon: Users,
    key: 'collaboration',
    color: 'bg-trid-orange/10 text-trid-orange',
  },
  {
    icon: Lightbulb,
    key: 'innovation',
    color: 'bg-trid-purple/10 text-trid-purple',
  },
  {
    icon: Code,
    key: 'excellence',
    color: 'bg-trid-teal/10 text-trid-teal',
  },
];

export default function Team({ language }: TeamProps) {
  const { t, i18n } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-trid-purple mb-16 text-center">
            {t('team.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {teamValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className={`p-4 rounded-full ${value.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {t(`team.values.${value.key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`team.values.${value.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}