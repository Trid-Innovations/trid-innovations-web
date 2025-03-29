import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TopHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
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

  return (
    <div
      className="fixed w-full bg-trid-teal text-white py-2 z-50 top-0"
      style={{ height: "40px" }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-4 md:space-x-6">
            <a
              href="mailto:contact@tridinnovations.com"
              className="flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden md:inline text-sm">
                contact@tridinnovations.com
              </span>
            </a>
            <a href="tel:+15819809150" className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="hidden md:inline text-sm">
                +1 (581) 980 9150
              </span>
            </a>
            <div className="hidden md:flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Ville de Quebec, Quebec</span>
            </div>
          </div>
          <a
            href="#contact"
            onClick={handleContactClick}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-2 md:px-4 py-1 rounded-full transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden md:inline text-sm font-medium">
              Let's Talk
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
