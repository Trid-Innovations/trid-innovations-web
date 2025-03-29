import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Article } from "../types";

interface ArticleCardProps {
  article: Article;
  index?: number;
  inView?: boolean;
}

export default function ArticleCard({
  article,
  index = 0,
  inView = true,
}: ArticleCardProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  console.log(article.id);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span>
            {new Date(article.date).toLocaleDateString(
              language === "fr" ? "fr-FR" : "en-US"
            )}
          </span>
          <span className="mx-2">•</span>
          <User className="w-4 h-4 mr-2" />
          <span>{article.author}</span>
        </div>
        <h3 className="text-xl font-semibold text-trid-teal mb-2 group-hover:text-trid-lime transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4">{article.summary}</p>
        <Link
          to={`/articles/${article.id}`}
          className="inline-flex items-center text-trid-teal hover:text-trid-lime transition-colors group"
        >
          {t("articles.readMore")}
          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}
