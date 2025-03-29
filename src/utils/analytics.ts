import ReactGA from "react-ga4";

// Initialize GA4
export const initGA = () => {
  const ga = import.meta.env.VITE_MEASUREMENT_ID;
  ReactGA.initialize(ga);
};

// Page view tracking
export const logPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Custom events
export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

// User interactions
export const trackUserAction = {
  contact: (method: string) => {
    logEvent("Contact", "Interaction", method);
  },
  service: (serviceName: string) => {
    logEvent("Service", "View", serviceName);
  },
  article: (articleId: string, title: string) => {
    logEvent("Article", "Read", `${articleId} - ${title}`);
  },
  language: (language: string) => {
    logEvent("Language", "Switch", language);
  },
  cookiePreference: (preference: string) => {
    logEvent("Cookies", "Preference", preference);
  },
};
