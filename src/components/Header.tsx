import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import logo from "@/assets/HPG LOGO TP.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  const services = [
    { name: "Capital Markets Advisory", path: "/capital-markets" },
    { name: "EB-5 Advisory", path: "/eb5-advisory" },
    { name: "Loan Products", path: "/loan-products" },
    { name: "Hospitality Financing", path: "/hospitality-financing" },
    { name: "Preferred GC Referral", path: "/gc-referral" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-xl shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="HPG Kapital Home">
            <img 
              src={logo} 
              alt="HPG Kapital Logo" 
              className="h-16 w-auto object-contain"
              loading="eager"
              onError={(e) => {
                console.error('Logo failed to load');
                e.currentTarget.alt = 'HPG Kapital';
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-background/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 overflow-hidden"
                  >
                    {services.map((service, index) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block px-6 py-3 text-sm text-foreground hover:bg-accent/10 hover:text-primary transition-all"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/contact"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden lg:block">
            <Button asChild variant="default" className="bg-luxury-red hover:bg-luxury-red/90 text-white font-semibold uppercase text-xs tracking-wider">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground min-h-[44px] min-w-[44px] touch-target flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col space-y-4 pt-6 pb-4">
                <Link to="/" className="text-sm font-medium text-foreground hover:text-primary">
                  Home
                </Link>
                <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary">
                  About
                </Link>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Services</div>
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block pl-4 text-sm text-foreground hover:text-primary"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
                <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary">
                  Contact
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
