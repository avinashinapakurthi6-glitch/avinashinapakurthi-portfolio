import { Heart, Terminal, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-cyber-border">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-navy/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyber-cyan" />
              <span className="font-heading text-lg font-bold text-white">
                AVINASH<span className="text-cyber-cyan">.DEV</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm text-center md:text-left">
              Data Science Engineer & Full Stack Developer
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-400 hover:text-cyber-cyan transition-colors text-sm"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-400 hover:text-cyber-cyan transition-colors text-sm"
            >
              About
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-400 hover:text-cyber-cyan transition-colors text-sm"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-400 hover:text-cyber-cyan transition-colors text-sm"
            >
              Contact
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/avinashinapakurthi6-glitch"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-cyber-navy border border-cyber-border text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/avinash-inapakurthi-1a3871316/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-cyber-navy border border-cyber-border text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:avinashinapakurthi31@gmail.com"
              className="p-2 rounded-lg bg-cyber-navy border border-cyber-border text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-cyber-border to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Avinash Inapakurthi
          </p>
          
          <p className="text-gray-600 text-sm">
            © {currentYear} All rights reserved.
          </p>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group p-2 rounded-lg bg-cyber-navy border border-cyber-border text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
