import { Editor } from "@tinymce/tinymce-react";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { Article, Language, TranslatedContent } from "../../types";
import { getTinyApi } from "../../utils";

const DEFAULT_TRANSLATED_CONTENT: TranslatedContent = {
  fr: "",
  en: "",
};

export default function ArticleEditor() {
  const { id } = useParams();
  const tinyApi = getTinyApi();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState<Language>("fr");
  const [formData, setFormData] = useState<Article>({
    id: "",
    title: { ...DEFAULT_TRANSLATED_CONTENT },
    summary: { ...DEFAULT_TRANSLATED_CONTENT },
    content: { ...DEFAULT_TRANSLATED_CONTENT },
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=3308&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Erco",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        const docRef = doc(db, "articles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            ...data,
            id: docSnap.id,
            title: data.title || { ...DEFAULT_TRANSLATED_CONTENT },
            summary: data.summary || { ...DEFAULT_TRANSLATED_CONTENT },
            content: data.content || { ...DEFAULT_TRANSLATED_CONTENT },
          } as Article);
        }
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate that at least one language has content
      if (!formData.title.fr && !formData.title.en) {
        alert(t('articles.editor.errors.titleRequired'));
        return;
      }
      if (!formData.summary.fr && !formData.summary.en) {
        alert(t('articles.editor.errors.summaryRequired'));
        return;
      }
      if (!formData.content.fr && !formData.content.en) {
        alert(t('articles.editor.errors.contentRequired'));
        return;
      }

      if (id) {
        await setDoc(doc(db, "articles", id), formData);
      } else {
        await addDoc(collection(db, "articles"), formData);
      }
      navigate("/trids/dashboard");
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const updateTranslatedField = (
    field: keyof Pick<Article, "title" | "summary" | "content">,
    value: string
  ) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [activeLanguage]: value,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/trids/dashboard")}
                className="mr-4 text-gray-600 hover:text-trid-teal"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-trid-teal">
                {id ? t('articles.editor.editArticle') : t('articles.editor.newArticle')}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setActiveLanguage("fr")}
                className={`px-3 py-1 rounded-md ${
                  activeLanguage === "fr"
                    ? "bg-trid-teal text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setActiveLanguage("en")}
                className={`px-3 py-1 rounded-md ${
                  activeLanguage === "en"
                    ? "bg-trid-teal text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-6 mx-auto max-w-4xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6 bg-white rounded-lg shadow-sm"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('articles.editor.title')}
              </label>
              <input
                type="text"
                value={formData.title[activeLanguage] || ""}
                onChange={(e) => updateTranslatedField("title", e.target.value)}
                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-trid-teal focus:ring-trid-teal sm:text-sm"
                placeholder={`${t('articles.editor.title')} (${activeLanguage.toUpperCase()})`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('articles.editor.summary')}
              </label>
              <input
                type="text"
                value={formData.summary[activeLanguage] || ""}
                onChange={(e) => updateTranslatedField("summary", e.target.value)}
                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-trid-teal focus:ring-trid-teal sm:text-sm"
                placeholder={`${t('articles.editor.summary')} (${activeLanguage.toUpperCase()})`}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {t('articles.editor.content')}
              </label>
              <Editor
                apiKey={tinyApi}
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help | image media | code",
                  content_style: "body { font-family: Inter, sans-serif; }",
                  image_title: true,
                  automatic_uploads: true,
                  file_picker_types: "image",
                  file_picker_callback: function (cb) {
                    const input = document.createElement("input");
                    input.setAttribute("type", "file");
                    input.setAttribute("accept", "image/*");

                    input.onchange = function () {
                      if (!input.files) return;
                      const file = input.files[0];

                      const reader = new FileReader();
                      reader.onload = function () {
                        if (typeof reader.result === "string") {
                          cb(reader.result, { title: file.name });
                        }
                      };
                      reader.readAsDataURL(file);
                    };

                    input.click();
                  },
                }}
                value={formData.content[activeLanguage] || ""}
                onEditorChange={(content) => updateTranslatedField("content", content)}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('articles.editor.imageUrl')}
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-trid-teal focus:ring-trid-teal sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('articles.editor.author')}
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-trid-teal focus:ring-trid-teal sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('articles.editor.date')}
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-trid-teal focus:ring-trid-teal sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-6 space-x-3">
              <button
                type="button"
                onClick={() => navigate("/trids/dashboard")}
                className="px-4 py-2 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50"
              >
                {t('articles.editor.cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white rounded-md bg-trid-teal hover:bg-trid-teal-dark"
              >
                {t('articles.editor.save')}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
