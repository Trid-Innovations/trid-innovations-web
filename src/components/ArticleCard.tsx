import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Article } from "../types";
import { getLanguageAwarePath } from "../utils/navigation";

interface ArticleCardProps {
  article: Article;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const language = i18n.language;
  console.log(article.id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link
        to={getLanguageAwarePath(`articles/${article.id}`, lang as "fr" | "en")}
        className="block"
      >
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            {article.title}
          </h3>
          <p className="mb-4 text-gray-600">{article.summary}</p>
          <div className="flex items-center text-sm text-gray-500">
            <User className="mr-2 w-4 h-4" />
            <span className="mr-4">{article.author}</span>
            <Calendar className="mr-2 w-4 h-4" />
            <span>
              {new Date(article.date).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
