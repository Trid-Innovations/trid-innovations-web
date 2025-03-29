import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import About from "./components/About";
import Articles from "./components/Articles";
import ArticlesPage from "./components/ArticlesPage";
import ArticleView from "./components/ArticleView";
import Login from "./components/auth/Login";
import Contact from "./components/Contact";
import CookieManager from "./components/CookieManager";
import ArticleEditor from "./components/dashboard/ArticleEditor.tsx";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServicePage from "./components/ServicePage";
import Services from "./components/Services";
import TopHeader from "./components/TopHeader";
import { Language } from "./types";
import { initGA, logPageView } from "./utils/analytics";

// Initialize GA
initGA();

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const HomePage = ({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: (lang: Language) => void;
}) => (
  <>
    <TopHeader language={language} />
    <Header language={language} setLanguage={setLanguage} />
    <Hero language={language} />
    <Services language={language} />
    <About language={language} />
    <Articles language={language} />
    <Contact language={language} />
    <Footer language={language} />
  </>
);

function App() {
  const [language, setLanguage] = useState<Language>("fr");

  return (
    <BrowserRouter>
      <CookieManager language={language} />
      <RouteTracker />
      <Routes>
        <Route
          path="/"
          element={<HomePage language={language} setLanguage={setLanguage} />}
        />
        <Route
          path="/services/:serviceId"
          element={
            <>
              <TopHeader language={language} />
              <Header language={language} setLanguage={setLanguage} />
              <ServicePage language={language} />
              <Footer language={language} />
            </>
          }
        />
        <Route
          path="/articles/:id"
          element={
            <>
              <TopHeader language={language} />
              <ArticleView />
            </>
          }
        />
        <Route path="/trids" element={<Login />} />
        <Route
          path="/articles"
          element={
            <>
              <TopHeader language={language} />
              <ArticlesPage language={language} />
            </>
          }
        />
        <Route
          path="/trids/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trids/dashboard/articles/new"
          element={
            <ProtectedRoute>
              <ArticleEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trids/dashboard/articles/:id"
          element={
            <ProtectedRoute>
              <ArticleEditor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/trids");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
}
export default App;
