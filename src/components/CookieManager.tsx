import { Cookie, Settings, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { trackUserAction } from "../utils/analytics";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
};

export default function CookieManager() {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Check if user has already made their choice
    const savedPreferences = localStorage.getItem("cookiePreferences");
    if (!savedPreferences) {
      setShowBanner(true);
    } else {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookiePreferences", JSON.stringify(prefs));
    setPreferences(prefs);
    trackUserAction.cookiePreference(
      Object.entries(prefs)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(",")
    );
    setShowBanner(false);
    setShowModal(false);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const rejectNonEssential = () => {
    savePreferences(defaultPreferences);
  };

  if (!showBanner && !showModal) {
    return (
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 left-4 z-50 p-2 bg-trid-teal text-white rounded-full shadow-lg hover:bg-trid-teal-dark transition-colors"
        aria-label="Cookie Settings"
      >
        <Cookie className="w-6 h-6" />
      </button>
    );
  }

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200 animate-slide-up">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Cookie className="w-8 h-8 text-trid-teal" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("cookies.title")}
                  </h3>
                  <p className="text-gray-600 max-w-2xl">
                    {t("cookies.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={rejectNonEssential}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {t("cookies.rejectAll")}
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 border border-trid-teal text-trid-teal hover:bg-trid-teal hover:text-white transition-colors rounded-lg"
                >
                  {t("cookies.customize")}
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 bg-trid-teal text-white hover:bg-trid-teal-dark transition-colors rounded-lg"
                >
                  {t("cookies.acceptAll")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="w-6 h-6 text-trid-teal" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {t("cookies.preferences")}
                  </h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Necessary Cookies */}
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="w-4 h-4 text-trid-teal"
                    />
                    <span className="font-semibold text-gray-900">
                      {t("cookies.necessary.title")}
                    </span>
                  </label>
                  <p className="mt-2 text-gray-600 text-sm">
                    {t("cookies.necessary.description")}
                  </p>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          analytics: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-trid-teal"
                    />
                    <span className="font-semibold text-gray-900">
                      {t("cookies.analytics.title")}
                    </span>
                  </label>
                  <p className="mt-2 text-gray-600 text-sm">
                    {t("cookies.analytics.description")}
                  </p>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          marketing: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-trid-teal"
                    />
                    <span className="font-semibold text-gray-900">
                      {t("cookies.marketing.title")}
                    </span>
                  </label>
                  <p className="mt-2 text-gray-600 text-sm">
                    {t("cookies.marketing.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t("cookies.cancel")}
              </button>
              <button
                onClick={() => savePreferences(preferences)}
                className="px-4 py-2 bg-trid-teal text-white hover:bg-trid-teal-dark transition-colors rounded-lg"
              >
                {t("cookies.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
