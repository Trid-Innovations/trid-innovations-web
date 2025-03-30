import { motion } from "framer-motion";
import { ArrowLeft, Brain, CheckCircle2, Link, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";

const serviceIcons = {
  technical: Wrench,
  integration: Link,
  custom: Brain,
};

const serviceBanners = {
  technical:
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=2070&q=80",
  integration:
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2070&q=80",
  custom:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2070&q=80",
};

export default function ServicePage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!serviceId || !Object.keys(serviceIcons).includes(serviceId)) {
    return <div>Service not found</div>;
  }

  const Icon = serviceIcons[serviceId as keyof typeof serviceIcons];
  const serviceDescriptions = t(`services.${serviceId}.description`, {
    returnObjects: true,
  }) as string[];
  return (
    <>
      <div className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={serviceBanners[serviceId as keyof typeof serviceBanners]}
            alt={t(`services.${serviceId}.title`)}
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
            <button
              onClick={() => navigate("/")}
              className="flex items-center mb-6 transition-colors text-white/80 hover:text-white"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              {t("nav.home")}
            </button>
            <div className="flex items-center mb-6">
              <Icon className="mr-4 w-12 h-12" />
              <h1 className="text-5xl font-bold">
                {t(`services.${serviceId}.title`)}
              </h1>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <div className="prose prose-lg">
              {serviceDescriptions.map((paragraph: string, index: number) => (
                <p key={index} className="mb-6 leading-relaxed text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid gap-8 mt-12 md:grid-cols-2">
              {[1, 2, 3, 4].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <CheckCircle2 className="flex-shrink-0 mt-1 w-6 h-6 text-trid-lime" />
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-800">
                      Feature {index + 1}
                    </h3>
                    <p className="text-gray-600">
                      Detailed explanation of this specific feature and how it
                      benefits your business.
                    </p>
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
