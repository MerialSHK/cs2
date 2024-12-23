import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cloud, Shield, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const features = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: 'Custom Development',
    description: 'Tailored solutions built with cutting-edge technology',
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: 'Cloud Solutions',
    description: 'Scalable and secure cloud infrastructure',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Security First',
    description: 'Enterprise-grade security measures',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'High Performance',
    description: 'Optimized for speed and efficiency',
  },
];

export function Features() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}