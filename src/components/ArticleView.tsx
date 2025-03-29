import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Article } from '../types';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';

export default function ArticleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        const docRef = doc(db, 'articles', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const articleData = { ...docSnap.data(), id: docSnap.id } as Article;
          setArticle(articleData);
          i18n.changeLanguage(articleData.language);
        }
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, i18n]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trid-teal"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article not found</h2>
          <button
            onClick={() => navigate('/articles')}
            className="text-trid-teal hover:text-trid-teal-dark"
          >
            Return to articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header language={article.language} setLanguage={() => {}} />
      <div className="min-h-screen bg-gray-50 pt-24">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate('/articles')}
              className="flex items-center text-trid-teal hover:text-trid-teal-dark mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('articles.allArticles')}
            </button>

            <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-4xl font-bold text-white mb-4">{article.title}</h1>
                <div className="flex items-center text-white/80 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(article.date).toLocaleDateString(
                        article.language === 'fr' ? 'fr-FR' : 'en-US'
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{article.author}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 mb-8 font-medium">
                  {article.summary}
                </p>
                <div
                  className="prose prose-lg prose-trid-teal max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </div>
          </motion.div>
        </article>
      </div>
      <Footer language={article.language} />
    </>
  );
}