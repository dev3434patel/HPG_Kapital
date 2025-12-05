import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/HPG LOGO TP.png";

const Footer = () => {
  return (
    <footer className="bg-white text-navy">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and Description - Centered on mobile */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-block mb-4">
              <img 
                src={logo} 
                alt="HPG Kapital" 
                className="h-[94px] w-auto mx-auto md:mx-0"
              />
            </Link>
            <p className="text-sm leading-relaxed opacity-80 max-w-xs mx-auto md:mx-0">
              Commercial real estate capital advisory firm specializing in debt and EB-5 placement solutions.
            </p>
          </div>

          {/* Quick Links - Centered on mobile */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-navy/80 hover:text-navy hover:font-semibold transition-all inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-navy/80 hover:text-navy hover:font-semibold transition-all inline-block">
                  About
                </Link>
              </li>
              <li>
                <Link to="/hospitality-financing" className="text-sm text-navy/80 hover:text-navy hover:font-semibold transition-all inline-block">
                  Hospitality Financing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-navy/80 hover:text-navy hover:font-semibold transition-all inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services - Centered on mobile */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/capital-markets" className="text-sm text-navy/80 hover:text-navy hover:font-semibold transition-all inline-block">
                  Capital Markets Advisory
                </Link>
              </li>
              <li>
                <Link to="/eb5-advisory" className="text-sm text-navy/80 hover:text-navy hover:font-semibold transition-all inline-block">
                  EB-5 Advisory
                </Link>
              </li>
              <li>
                <Link to="/loan-products" className="text-sm text-navy/80 hover:text-navy hover:font-semibold transition-all inline-block">
                  Loan Products
                </Link>
              </li>
              <li>
                <Link to="/gc-referral" className="text-sm text-navy/80 hover:text-navy hover:font-semibold transition-all inline-block">
                  GC Referral
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Centered on mobile */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start justify-center md:justify-start space-x-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgb(2 39 64)' }} />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1651+Mt.+Vernon+Road,+3rd+Floor,+Dunwoody,+GA+30338"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-navy/80 hover:text-navy hover:font-semibold transition-all text-left"
                >
                  <div>1651 Mt. Vernon Road, 3rd Floor</div>
                  <div>Dunwoody, GA 30338</div>
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" style={{ color: 'rgb(2 39 64)' }} />
                <span className="opacity-80 text-sm">404-434-4932</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" style={{ color: 'rgb(2 39 64)' }} />
                <a href="mailto:info@hpg-kapital.com" className="text-sm text-navy/80 hover:text-navy hover:font-semibold transition-all">
                  info@hpg-kapital.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-current/20 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
          <p className="opacity-60 text-sm">
            © {new Date().getFullYear()} HPG Kapital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
