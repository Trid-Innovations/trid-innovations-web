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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        className="fixed bottom-4 left-4 z-50 p-2 text-white rounded-full shadow-lg transition-colors bg-trid-teal hover:bg-trid-teal-dark"
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
        <div className="fixed right-0 bottom-0 left-0 z-50 bg-white border-t border-gray-200 shadow-lg animate-slide-up">
          <div className="container px-4 py-6 mx-auto">
            <div className="flex flex-col gap-4 justify-between items-start md:flex-row md:items-center">
              <div className="flex items-center space-x-4">
                <Cookie className="w-8 h-8 text-trid-teal" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("cookies.title")}
                  </h3>
                  <p className="max-w-2xl text-gray-600">
                    {t("cookies.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={rejectNonEssential}
                  className="px-4 py-2 text-gray-600 transition-colors hover:text-gray-900"
                >
                  {t("cookies.rejectAll")}
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 rounded-lg border transition-colors border-trid-teal text-trid-teal hover:bg-trid-teal hover:text-white"
                >
                  {t("cookies.customize")}
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 text-white rounded-lg transition-colors bg-trid-teal hover:bg-trid-teal-dark"
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
        <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Settings className="w-6 h-6 text-trid-teal" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {t("cookies.preferences")}
                  </h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 transition-colors hover:text-gray-600"
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
                  <p className="mt-2 text-sm text-gray-600">
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
                  <p className="mt-2 text-sm text-gray-600">
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
                  <p className="mt-2 text-sm text-gray-600">
                    {t("cookies.marketing.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end p-6 space-x-4 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 transition-colors hover:text-gray-900"
              >
                {t("cookies.cancel")}
              </button>
              <button
                onClick={() => savePreferences(preferences)}
                className="px-4 py-2 text-white rounded-lg transition-colors bg-trid-teal hover:bg-trid-teal-dark"
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
