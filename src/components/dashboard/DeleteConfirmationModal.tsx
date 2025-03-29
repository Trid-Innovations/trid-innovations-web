import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  articleTitle: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  articleTitle,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Archive Article
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                <p className="text-gray-600">
                  Are you sure you want to archive the article{" "}
                  <span className="font-medium text-gray-900">
                    "{articleTitle}"
                  </span>
                  ? This article will be hidden from public view but can be
                  restored later.
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-end px-6 py-4 bg-gray-50 rounded-b-lg gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-trid-teal-light focus:ring-opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
                >
                  Archive Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
