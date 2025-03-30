import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useInView } from "react-intersection-observer";

const features = [
  { title: "24/7 Support", icon: CheckCircle2 },
  { title: "Agile Methodology", icon: CheckCircle2 },
  { title: "Dedicated Team", icon: CheckCircle2 },
  { title: "Transparent Pricing", icon: CheckCircle2 },
];

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mt-20 grid md:grid-cols-4 gap-8"
    >
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-2 sm:space-x-3">
          <feature.icon className="w-5 h-5 text-trid-lime" />
          <span className="text-sm sm:text-base text-gray-700 font-medium">
            {feature.title}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
