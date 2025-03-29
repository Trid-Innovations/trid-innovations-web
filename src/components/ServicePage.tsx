import { useParams } from 'react-router-dom';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wrench, Link, Brain, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServicePageProps {
  language: Language;
}

const serviceIcons = {
  technical: Wrench,
  integration: Link,
  custom: Brain,
};

const serviceBanners = {
  technical: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=2070&q=80',
  integration: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2070&q=80',
  custom: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2070&q=80',
};

export default function ServicePage({ language }: ServicePageProps) {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  if (!serviceId || !Object.keys(serviceIcons).includes(serviceId)) {
    return <div>Service not found</div>;
  }

  const Icon = serviceIcons[serviceId as keyof typeof serviceIcons];

  return (
    <>
      <div className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={serviceBanners[serviceId as keyof typeof serviceBanners]}
            alt={t(`services.${serviceId}.title`)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <div className="container mx-auto px-4 relative text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('nav.home')}
            </button>
            <div className="flex items-center mb-6">
              <Icon className="w-12 h-12 mr-4" />
              <h1 className="text-5xl font-bold">{t(`services.${serviceId}.title`)}</h1>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="prose prose-lg">
              {t(`services.${serviceId}.description`, { returnObjects: true }).map((paragraph: string, index: number) => (
                <p key={index} className="text-gray-600 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-trid-lime flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Feature {index + 1}</h3>
                    <p className="text-gray-600">Detailed explanation of this specific feature and how it benefits your business.</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}