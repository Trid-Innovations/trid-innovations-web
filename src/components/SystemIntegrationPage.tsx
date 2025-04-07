import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, CheckCircle2, Cpu, Zap, Code, Database, Server, BarChart2, UserCog } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { handleContactClick } from '../utils/contact';

interface DifferentItem {
  title: string;
  description: string;
}

interface SystemIntegration {
  different: {
    items: DifferentItem[];
  };
  expertise: {
    items: string[];
  };
  whyChoose: {
    items: string[];
  };
}

const SystemIntegrationPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const systemIntegration = t('systemIntegration', { returnObjects: true }) as SystemIntegration;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2070&q=80"
            alt="System Integration"
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
              {t('systemIntegration.hero.title')}
            </h1>
            <p className="mb-8 text-xl">
              {t('systemIntegration.hero.subtitle')}
            </p>
            <a 
              href="#contact" 
              onClick={(e) => handleContactClick(e, navigate, lang)}
              className="px-6 py-3 text-sm font-medium text-white bg-trid-teal rounded-md hover:bg-trid-lime transition-colors"
            >
              {t('systemIntegration.hero.cta')}
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
                {t('systemIntegration.promise.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('systemIntegration.promise.description')}
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
              {t('systemIntegration.different.title')}
            </h2>
          </motion.div>

          <div className="grid gap-8 mx-auto max-w-6xl md:grid-cols-2">
            {systemIntegration.different.items.map((item, index) => (
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center text-gray-600"
          >
            <p className="text-xl">
              {t('systemIntegration.different.note')}
            </p>
          </motion.div>
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
              {t('systemIntegration.expertise.title')}
            </h2>
          </motion.div>

          <div className="grid gap-8 mx-auto max-w-6xl md:grid-cols-2 lg:grid-cols-3">
            {systemIntegration.expertise.items.map((item, index) => (
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center text-gray-600"
          >
            <p className="text-xl">
              {t('systemIntegration.expertise.note')}
            </p>
          </motion.div>
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
              {t('systemIntegration.whyChoose.title')}
            </h2>
          </motion.div>

          <div className="grid gap-8 mx-auto max-w-6xl md:grid-cols-2">
            {systemIntegration.whyChoose.items.map((item, index) => (
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
              {t('systemIntegration.cta.title')}
            </h2>
            <p className="mb-8 text-xl">
              {t('systemIntegration.cta.description')}
            </p>
            <button 
              onClick={(e) => handleContactClick(e, navigate, lang)}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-trid-teal bg-white rounded-md hover:bg-gray-100 transition-colors"
            >
              {t('systemIntegration.cta.button')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SystemIntegrationPage; 