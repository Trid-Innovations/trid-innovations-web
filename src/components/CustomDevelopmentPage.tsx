import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, CheckCircle2, Code, Cpu, Zap, Database, Server, BarChart2, UserCog } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { handleContactClick } from '../utils/contact';

interface DifferentItem {
  title: string;
  description: string;
}

interface CustomDevelopment {
  different: {
    items: DifferentItem[];
  };
  expertise: {
    items: string[];
    ai: {
      title: string;
      description: string;
    };
    approach: {
      title: string;
      description: string;
    };
  };
  whyChoose: {
    items: string[];
  };
}

const CustomDevelopmentPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const customDevelopment = t('customDevelopment', { returnObjects: true }) as CustomDevelopment;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2070&q=80"
            alt="Custom Development"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>

        <div className="container relative px-4 mx-auto text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 text-5xl font-bold">
              {t('customDevelopment.hero.title')}
            </h1>
            <p className="mb-8 text-xl">
              {t('customDevelopment.hero.subtitle')}
            </p>
            <a 
              href="#contact" 
              onClick={(e) => handleContactClick(e, navigate, lang)}
              className="px-6 py-3 text-sm font-medium text-white bg-trid-teal rounded-md hover:bg-trid-lime transition-colors"
            >
              {t('customDevelopment.hero.cta')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <div className="overflow-hidden relative p-8 bg-white rounded-2xl shadow-lg">
              <h2 className="mb-4 text-3xl font-bold text-trid-teal">
                {t('customDevelopment.promise.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('customDevelopment.promise.description')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Different Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-trid-teal">
              {t('customDevelopment.different.title')}
            </h2>
          </motion.div>

          <div className="grid gap-8 mx-auto max-w-6xl md:grid-cols-2 lg:grid-cols-3">
            {customDevelopment.different.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-trid-teal">
              {t('customDevelopment.expertise.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('customDevelopment.expertise.subtitle')}
            </p>
          </motion.div>

          <div className="grid gap-8 mx-auto max-w-6xl md:grid-cols-2 lg:grid-cols-3">
            {customDevelopment.expertise.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center">
                  <CheckCircle2 className="mr-4 w-6 h-6 text-trid-lime" />
                  <p className="text-gray-600">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-8 mt-16 mx-auto max-w-6xl md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 bg-white rounded-xl shadow-lg"
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                {t('customDevelopment.expertise.ai.title')}
              </h3>
              <p className="text-gray-600">
                {t('customDevelopment.expertise.ai.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-6 bg-white rounded-xl shadow-lg"
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                {t('customDevelopment.expertise.approach.title')}
              </h3>
              <p className="text-gray-600">
                {t('customDevelopment.expertise.approach.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-trid-teal">
              {t('customDevelopment.whyChoose.title')}
            </h2>
          </motion.div>

          <div className="grid gap-8 mx-auto max-w-6xl md:grid-cols-2">
            {customDevelopment.whyChoose.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center">
                  <CheckCircle2 className="mr-4 w-6 h-6 text-trid-lime" />
                  <p className="text-gray-600">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-trid-teal">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="mb-4 text-4xl font-bold">
              {t('customDevelopment.cta.title')}
            </h2>
            <p className="mb-8 text-xl">
              {t('customDevelopment.cta.description')}
            </p>
            <button 
              onClick={(e) => handleContactClick(e, navigate, lang)}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-trid-teal bg-white rounded-md hover:bg-gray-100 transition-colors"
            >
              {t('customDevelopment.cta.button')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CustomDevelopmentPage; 