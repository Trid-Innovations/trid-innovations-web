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
import { getLanguageAwarePath } from "../utils/navigation";
import Footer from "./Footer";
import Header from "./Header";

export default function ArticleView() {
  const { id, lang } = useParams<{ id: string; lang: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const currentLang = (lang as Language) || "fr";

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        const docRef = doc(db, "articles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const articleData = { ...docSnap.data(), id: docSnap.id } as Article;
          setArticle(articleData);
          // Use the current language for tracking
          const titleForTracking = articleData.title[currentLang] || articleData.title.fr || "";
          trackUserAction.article(articleData.id, titleForTracking);
          i18n.changeLanguage(currentLang);
        }
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, i18n, currentLang]);

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
            {t("articles.notFound")}
          </h2>
          <button
            onClick={() => navigate(getLanguageAwarePath("articles", currentLang))}
            className="text-trid-teal hover:text-trid-teal-dark"
          >
            {t("articles.backToArticles")}
          </button>
        </div>
      </div>
    );
  }

  // Get the content in the current language, fallback to French if not available
  const title = article.title[currentLang] || article.title.fr || "";
  const summary = article.summary[currentLang] || article.summary.fr || "";
  const content = article.content[currentLang] || article.content.fr || "";

  return (
    <>
      <Header language={currentLang} setLanguage={() => {}} />
      <Helmet>
        <title>{title} | TRID INNOVATIONS</title>
        <meta name="description" content={summary} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={summary} />
        <meta property="og:image" content={article.image} />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:locale"
          content={currentLang === "fr" ? "fr_FR" : "en_US"}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:image" content={article.image} />

        {/* Language alternates */}
        <link rel="canonical" href={window.location.href} />
        <link
          rel="alternate"
          href={`${window.location.origin}${getLanguageAwarePath(`articles/${article.id}`, "fr")}`}
          hrefLang="fr"
        />
        <link
          rel="alternate"
          href={`${window.location.origin}${getLanguageAwarePath(`articles/${article.id}`, "en")}`}
          hrefLang="en"
        />
        <link
          rel="alternate"
          href={`${window.location.origin}${getLanguageAwarePath(`articles/${article.id}`, currentLang)}`}
          hrefLang="x-default"
        />
      </Helmet>

      <main className="pt-24 min-h-screen bg-gray-50">
        <div className="container px-4 py-12 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <button
              onClick={() => navigate(getLanguageAwarePath("articles", currentLang))}
              className="flex items-center mb-8 text-trid-teal hover:text-trid-teal-dark"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t("articles.backToArticles")}
            </button>

            <img
              src={article.image}
              alt={title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />

            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              {title}
            </h1>

            <div className="flex items-center mb-8 text-gray-500">
              <User className="w-5 h-5 mr-2" />
              <span className="mr-4">{article.author}</span>
              <Calendar className="w-5 h-5 mr-2" />
              <span>
                {new Date(article.date).toLocaleDateString()}
              </span>
            </div>

            <div className="prose max-w-none">
              {content}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
