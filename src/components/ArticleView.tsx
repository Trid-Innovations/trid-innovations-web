import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { Article, Language } from "../types";
import { trackUserAction } from "../utils/analytics";
import Footer from "./Footer";
import Header from "./Header";

export default function ArticleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        const docRef = doc(db, "articles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const articleData = { ...docSnap.data(), id: docSnap.id } as Article;
          setArticle(articleData);
          trackUserAction.article(articleData.id, articleData.title);
          i18n.changeLanguage(articleData.language);
        }
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, i18n]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-b-2 animate-spin border-trid-teal"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Article not found
          </h2>
          <button
            onClick={() => navigate("/articles")}
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
      <Header language={article.language as Language} setLanguage={() => {}} />
      <Helmet>
        <title>{article.title} | TRID INNOVATIONS</title>
        <meta name="description" content={article.summary} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:image" content={article.image} />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:locale"
          content={article.language === "fr" ? "fr_FR" : "en_US"}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.summary} />
        <meta name="twitter:image" content={article.image} />

        {/* Language alternates */}
        <link rel="canonical" href={window.location.href} />
        {article && (
          <link
            rel="alternate"
            href={`${window.location.origin}/articles/${article.id}`}
            hrefLang={article.language}
          />
        )}
      </Helmet>
      <div className="pt-24 min-h-screen bg-gray-50">
        <article className="px-4 py-12 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate("/articles")}
              className="flex items-center mb-8 text-trid-teal hover:text-trid-teal-dark"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              {t("articles.allArticles")}
            </button>

            <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
              <img
                src={article.image}
                alt={article.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/60" />
              <div className="absolute right-0 bottom-0 left-0 p-8">
                <h1 className="mb-4 text-4xl font-bold text-white">
                  {article.title}
                </h1>
                <div className="flex items-center space-x-4 text-white/80">
                  <div className="flex items-center">
                    <Calendar className="mr-2 w-4 h-4" />
                    <span>
                      {new Date(article.date).toLocaleDateString(
                        article.language === "fr" ? "fr-FR" : "en-US"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <User className="mr-2 w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-sm">
              <div className="max-w-none prose prose-lg">
                <p className="mb-8 text-xl font-medium text-gray-600">
                  {article.summary}
                </p>
                <div
                  className="max-w-none prose prose-lg prose-trid-teal"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </div>
          </motion.div>
        </article>
      </div>
      <Footer />
    </>
  );
}
