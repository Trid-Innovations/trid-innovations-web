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
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-trid-teal mb-4">
              {t("articles.allArticles")}
            </h1>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t("articles.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-trid-teal/50"
                />
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trid-teal mx-auto"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
