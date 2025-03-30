import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ArticlesPage from "./components/ArticlesPage";
import ArticleView from "./components/ArticleView";
import Login from "./components/auth/Login";
import CookieManager from "./components/CookieManager";
import ArticleEditor from "./components/dashboard/ArticleEditor.tsx";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ServicePage from "./components/ServicePage";
import TopHeader from "./components/TopHeader";
import Home from "./page/home";
import { Language } from "./types";
import { initGA, logPageView } from "./utils/analytics";

// Initialize GA
initGA();

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname + location.search);

    // Handle hash fragment scrolling
    if (location.hash) {
      const id = location.hash.substring(1); // remove the # character
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (location.pathname === "/") {
      // Scroll to top when on home page without hash
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

function App() {
  const [language, setLanguage] = useState<Language>("fr");

  return (
    <BrowserRouter>
      <CookieManager />
      <RouteTracker />
      <Routes>
        <Route
          path="/"
          element={<Home language={language} setLanguage={setLanguage} />}
        />
        <Route
          path="/services/:serviceId"
          element={
            <>
              <TopHeader />
              <Header language={language} setLanguage={setLanguage} />
              <ServicePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/articles/:id"
          element={
            <>
              <TopHeader />
              <ArticleView />
            </>
          }
        />
        <Route path="/trids" element={<Login />} />
        <Route
          path="/articles"
          element={
            <>
              <TopHeader />
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
