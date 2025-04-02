import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { Link, useParams } from "react-router-dom";
import { FirebaseService } from "../services/firebase.service";
import { Article, Language } from "../types";
import { getLanguageAwarePath } from "../utils/navigation";
import ArticleCard from "./ArticleCard";

interface ArticlesProps {
  language?: Language;
}

export default function Articles({ language }: ArticlesProps) {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await FirebaseService.articles.getAll({
          onlyActive: true,
          limitCount: 3,
          language: language,
        });
        setArticles(fetchedArticles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [language]);

  return (
    <section
      id="articles"
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-bold text-trid-teal">
            {t("articles.title")}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">{t("articles.subtitle")}</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full border-b-2 animate-spin border-trid-teal"></div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to={getLanguageAwarePath("articles", lang as "fr" | "en")}
            className="inline-flex items-center px-6 py-3 text-white transition-colors bg-trid-teal rounded-lg hover:bg-trid-teal-dark"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            {t("articles.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
