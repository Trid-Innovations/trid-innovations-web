import { Language } from '../types';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import ArticleCard from './ArticleCard';

interface ArticlesProps {
  language: Language;
}

export default function Articles({ language }: ArticlesProps) {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchArticles = async () => {
      const q = query(
        collection(db, 'articles'),
        orderBy('date', 'desc'),
        limit(3)
      );
      const querySnapshot = await getDocs(q);
      const fetchedArticles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Article));
      setArticles(fetchedArticles);
    };

    fetchArticles();
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <section id="articles" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-trid-teal mb-4">
            {t('articles.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('articles.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              article={article}
              language={language}
              index={index}
              inView={inView}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="/articles"
            className="inline-flex items-center px-6 py-3 bg-trid-teal text-white rounded-lg hover:bg-trid-teal-dark transition-colors"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            {t('articles.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}