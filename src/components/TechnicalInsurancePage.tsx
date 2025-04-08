import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Shield, CheckCircle2, ArrowRight, Wrench, Clock, Zap, ShieldCheck, Cpu, Code, Database, Server, TestTube, BarChart2, UserCog } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { handleContactClick } from '../utils/contact';

interface Tier {
  name: string;
  price: string;
  hours: string;
  sla: string;
  features: string[];
}

const TechnicalInsurancePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lang]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=2070&q=80"
            alt="Technical Insurance"
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
            <div className="flex items-center mb-6 mt-6">
              <Shield className="mr-4 w-12 h-12" />
              <h1 className="text-5xl font-bold">
                {t('technicalInsurance.hero.title')}
              </h1>
            </div>
            <p className="mb-8 text-xl">
              {t('technicalInsurance.hero.subtitle')}
            </p>
            <a href="#plans" className="px-6 py-3 text-sm font-medium text-white bg-trid-teal rounded-md hover:bg-trid-lime transition-colors">
              {t('technicalInsurance.hero.cta')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* What is Technical Insurance Section */}
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
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-lg text-trid-teal bg-trid-teal/10">
                  <Shield className="w-8 h-8" />
                </div>
                <h2 className="ml-4 text-3xl font-bold text-trid-teal">
                  {t('technicalInsurance.whatIs.title')}
                </h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 mb-8">
                  {t('technicalInsurance.whatIs.description').split('\n\n')[0]}
                </p>
                
                <p className="text-xl text-gray-600 mb-8">
                  {t('technicalInsurance.whatIs.description').split('\n\n')[1]}
                </p>

                <div className="grid gap-6 mt-8 md:grid-cols-2">
                  {[
                    { icon: Wrench, color: "text-trid-teal bg-trid-teal/10" },
                    { icon: Clock, color: "text-trid-lime bg-trid-lime/10" },
                    { icon: Zap, color: "text-trid-purple bg-trid-purple/10" },
                    { icon: ShieldCheck, color: "text-trid-teal bg-trid-teal/10" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className={`p-2 rounded-lg ${item.color} flex-shrink-0`}>
                        {React.createElement(item.icon, { className: "w-6 h-6" })}
                      </div>
                      <p className="text-gray-600">
                        {t('technicalInsurance.whatIs.description').split('\n\n')[2].split('\n')[index + 1].replace('• ', '')}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <p className="mt-8 text-xl text-gray-600">
                  {t('technicalInsurance.whatIs.description').split('\n\n')[3]}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skillset Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-trid-teal">
              {t('technicalInsurance.skillset.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('technicalInsurance.skillset.subtitle')}
            </p>
          </motion.div>

          <div className="grid gap-8 mx-auto max-w-6xl md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Cpu, color: "text-trid-teal bg-trid-teal/10" },
              { icon: UserCog, color: "text-trid-lime bg-trid-lime/10" },
              { icon: Code, color: "text-trid-purple bg-trid-purple/10" },
              { icon: Server, color: "text-trid-teal bg-trid-teal/10" },
              { icon: TestTube, color: "text-trid-lime bg-trid-lime/10" },
              { icon: BarChart2, color: "text-trid-purple bg-trid-purple/10" },
              { icon: Database, color: "text-trid-teal bg-trid-teal/10" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className={`p-3 rounded-lg ${item.color} inline-block mb-4`}>
                  {React.createElement(item.icon, { className: "w-8 h-8" })}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {t(`technicalInsurance.skillset.roles.${index}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`technicalInsurance.skillset.roles.${index}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Plans Section */}
      <section className="py-20 bg-white" id="plans">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-trid-teal">
              {t('technicalInsurance.plans.title')}
            </h2>
          </motion.div>

          <div className="grid gap-8 mx-auto max-w-6xl md:grid-cols-3">
            {((t('technicalInsurance.plans.tiers', { returnObjects: true }) as unknown as Tier[]) || []).map((tier: Tier, index: number) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="relative p-8 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-trid-teal to-trid-lime rounded-t-xl" />
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                      {tier.name}
                    </h3>
                    <div className="mb-4 text-3xl font-bold text-trid-teal">
                      {tier.price}
                    </div>
                    <div className="mb-2 text-lg text-gray-600">
                      {tier.hours}
                    </div>
                    <div className="text-sm text-gray-500">
                      {tier.sla}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <ul className="space-y-3">
                      {tier.features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle2 className="mr-2 w-5 h-5 text-trid-lime" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p className="text-sm">
              {t('technicalInsurance.plans.note')}
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-trid-teal">
              {t('technicalInsurance.howItWorks.title')}
            </h2>
            <div className="mx-auto w-24 h-1 bg-trid-lime" />
          </motion.div>

          <div className="grid gap-8 mx-auto max-w-6xl md:grid-cols-4">
            {['step1', 'step2', 'step3', 'step4'].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-trid-teal/10 text-trid-teal">
                  <span className="text-2xl">{index + 1}</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {t(`technicalInsurance.howItWorks.${step}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`technicalInsurance.howItWorks.${step}.description`)}
                </p>
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
              {t('technicalInsurance.cta.title')}
            </h2>
            <p className="mb-8 text-xl">
              {t('technicalInsurance.cta.description')}
            </p>
            <button 
              onClick={(e) => handleContactClick(e, navigate, lang)}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-trid-teal bg-white rounded-md hover:bg-gray-100 transition-colors"
            >
              {t('technicalInsurance.cta.button')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TechnicalInsurancePage; 