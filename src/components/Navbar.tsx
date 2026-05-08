import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import logo from "../assets/hotspot_theta_v2.svg"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#0E0B14]/90 backdrop-blur-md shadow-lg shadow-black/5 py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-16 h-16 rounded-xl  flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <img src={logo} alt="logo" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-orange-400">Tether</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-white/70 hover:text-orange-400 transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <Link to="/about">
            <span className="text-sm font-medium text-white/70 hover:text-orange-400 transition-colors duration-300">
              About
            </span>
          </Link>
          <Link to="/contact">
            <span className="text-sm font-medium text-white/70 hover:text-orange-400 transition-colors duration-300">
              Contact
            </span>
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to={"/login"}>
            <span className="text-sm font-medium px-5 py-2.5 rounded-full text-white/80 hover:text-white transition-all duration-300">
              Log In
            </span>
          </Link>
          <Link to={"/signup"}>
            <span className="text-sm font-semibold px-6 py-2.5 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14] shadow-md shadow-orange-300/40 hover:shadow-orange-300/60 hover:scale-105 transition-all duration-300 inline-block">
              Get Started Free
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-[#0E0B14]/95 backdrop-blur-md shadow-xl transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-white/70 font-medium py-2 border-b border-white/10 hover:text-orange-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <span className="text-white/70 font-medium py-2 border-b border-white/10 hover:text-orange-400 transition-colors block">
              About
            </span>
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            <span className="text-white/70 font-medium py-2 border-b border-white/10 hover:text-orange-400 transition-colors block">
              Contact
            </span>
          </Link>
          <div className="flex flex-col gap-3 pt-2">
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <span className="text-center text-white/70 font-medium py-2.5 rounded-full border border-white/10 hover:border-orange-300 transition-all block">
                Log In
              </span>
            </Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              <span className="text-center font-semibold py-2.5 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14] shadow-md block">
                Get Started Free
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
