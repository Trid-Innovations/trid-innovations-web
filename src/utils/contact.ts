import { useNavigate } from "react-router-dom";
import { getLanguageAwarePath } from "./navigation";

export const handleContactClick = (e: React.MouseEvent, navigate: ReturnType<typeof useNavigate>, lang?: string) => {
  e.preventDefault();
  if (location.pathname !== "/en" && location.pathname !== "/fr") {
    navigate(getLanguageAwarePath("", lang as "fr" | "en"));
    // Wait for navigation to complete before scrolling
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  } else {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }
}; 