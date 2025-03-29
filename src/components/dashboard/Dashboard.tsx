import { motion } from "framer-motion";
import { Archive, ArrowLeft, Edit, LogOut, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseService } from "../../services/firebase.service";
import { Article } from "../../types";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const fetchedArticles = await FirebaseService.articles.getAll({
        onlyActive: true,
      });
      setArticles(fetchedArticles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/trids");
  };

  const openDeleteModal = (article: Article) => {
    setArticleToDelete(article);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setArticleToDelete(null);
  };

  const handleArchiveArticle = async () => {
    if (!articleToDelete) return;

    try {
      await FirebaseService.articles.archive(articleToDelete.id);

      // Update local state to remove the archived article
      setArticles(
        articles.filter((article) => article.id !== articleToDelete.id)
      );

      closeDeleteModal();

      // Show success notification (consider adding a toast notification here)
      console.log(`Article "${articleToDelete.title}" archived successfully`);
    } catch (error) {
      console.error("Error archiving article:", error);
      // Show error notification
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="mr-4">
                <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-trid-teal" />
              </Link>
              <h1 className="text-2xl font-bold text-trid-teal">
                Articles Dashboard
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-trid-teal transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Articles</h2>
            <Link
              to="/trids/dashboard/articles/new"
              className="flex items-center px-4 py-2 bg-trid-teal text-white rounded-md hover:bg-trid-teal-dark transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Article
            </Link>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-trid-teal"></div>
              </div>
            ) : articles.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No articles found. Create your first article!
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {articles.map((article) => (
                  <motion.li
                    key={article.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-6 py-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {article.summary}
                        </p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span>{article.author}</span>
                          <span className="mx-2">•</span>
                          <span>
                            {new Date(article.date).toLocaleDateString()}
                          </span>
                          <span className="mx-2">•</span>
                          <span className="uppercase">{article.language}</span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Link
                          to={`/trids/dashboard/articles/${article.id}`}
                          className="text-trid-teal hover:text-trid-teal-dark transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => openDeleteModal(article)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Archive className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleArchiveArticle}
        articleTitle={articleToDelete?.title || ""}
      />
    </div>
  );
}
