import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FirebaseService } from "../services/firebase.service";
import { Article, Language } from "../types";
import ArticleCard from "./ArticleCard";
import Footer from "./Footer";
import Header from "./Header";

interface ArticlesPageProps {
  language: Language;
}

export default function ArticlesPage({ language }: ArticlesPageProps) {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await FirebaseService.articles.getAll({
          onlyActive: true,
          language,
        });
        setArticles(fetchedArticles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Handle search with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm) {
        try {
          setLoading(true);
          const searchResults = await FirebaseService.articles.search(
            searchTerm,
            {
              onlyActive: true,
              language,
            }
          );
          setArticles(searchResults);
        } catch (error) {
          console.error("Error searching articles:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // If search is cleared, reload all articles
        const fetchedArticles = await FirebaseService.articles.getAll({
          onlyActive: true,
          language,
        });
        setArticles(fetchedArticles);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, language]);

  return (
    <>
      <Header language={language} setLanguage={() => {}} />
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="container px-4 py-12 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 text-4xl font-bold text-trid-teal">
              {t("articles.allArticles")}
            </h1>
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t("articles.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-3 pr-4 pl-10 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-trid-teal/50"
                />
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="py-12 text-center">
              <div className="mx-auto w-12 h-12 rounded-full border-b-2 animate-spin border-trid-teal"></div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <ArticleCard key={index} article={article} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
