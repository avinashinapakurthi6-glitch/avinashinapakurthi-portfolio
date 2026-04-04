import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Github, Linkedin, CheckCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Border corner draw animation
      gsap.fromTo(
        '.corner-line',
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Form fields slide up
      gsap.fromTo(
        '.form-field',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );

      // Contact info cards
      gsap.fromTo(
        '.contact-info-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setFormState('success');

    // Reset after showing success
    setTimeout(() => {
      setFormState('idle');
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'avinashinapakurthi31@gmail.com',
      href: 'mailto:avinashinapakurthi31@gmail.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+91 7702591626',
      href: 'tel:+917702591626',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'Vizianagaram, Andhra Pradesh, India',
      href: '#',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-sm mb-4">
            Initiate Transmission
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's connect and build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="contact-info lg:col-span-2 space-y-6">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="contact-info-card group flex items-center gap-4 p-4 rounded-xl bg-cyber-navy border border-cyber-border hover:border-cyber-cyan/50 transition-all hover:shadow-glow"
              >
                <div className="p-3 rounded-lg bg-cyber-cyan/10 text-cyber-cyan group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                  <p className="text-white group-hover:text-cyber-cyan transition-colors">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div className="pt-6">
              <p className="text-gray-500 text-sm mb-4">Follow me on</p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/avinashinapakurthi6-glitch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-cyber-navy border border-cyber-border text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all hover:shadow-glow"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/avinash-inapakurthi-1a3871316/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-cyber-navy border border-cyber-border text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all hover:shadow-glow"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="relative p-8 rounded-2xl bg-cyber-navy/50 border border-cyber-border">
              {/* Corner decorations with SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <line
                  className="corner-line"
                  x1="0"
                  y1="20"
                  x2="0"
                  y2="0"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
                <line
                  className="corner-line"
                  x1="20"
                  y1="0"
                  x2="0"
                  y2="0"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
                <line
                  className="corner-line"
                  x1="100%"
                  y1="20"
                  x2="100%"
                  y2="0"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
                <line
                  className="corner-line"
                  x1="calc(100% - 20px)"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
                <line
                  className="corner-line"
                  x1="0"
                  y1="calc(100% - 20px)"
                  x2="0"
                  y2="100%"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
                <line
                  className="corner-line"
                  x1="20"
                  y1="100%"
                  x2="0"
                  y2="100%"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
                <line
                  className="corner-line"
                  x1="100%"
                  y1="calc(100% - 20px)"
                  x2="100%"
                  y2="100%"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
                <line
                  className="corner-line"
                  x1="calc(100% - 20px)"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
              </svg>

              <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-6">
                {/* Name Field */}
                <div className="form-field">
                  <label className="block text-gray-400 text-sm mb-2">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-cyber-void border border-cyber-border text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan transition-colors"
                      placeholder="Enter your name"
                    />
                    <div 
                      className={`absolute bottom-0 left-0 h-0.5 bg-cyber-cyan transition-all duration-300 ${
                        focusedField === 'name' ? 'w-full' : 'w-0'
                      }`} 
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-field">
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-cyber-void border border-cyber-border text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan transition-colors"
                      placeholder="Enter your email"
                    />
                    <div 
                      className={`absolute bottom-0 left-0 h-0.5 bg-cyber-cyan transition-all duration-300 ${
                        focusedField === 'email' ? 'w-full' : 'w-0'
                      }`} 
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="form-field">
                  <label className="block text-gray-400 text-sm mb-2">Message</label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-cyber-void border border-cyber-border text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan transition-colors resize-none"
                      placeholder="Enter your message"
                    />
                    <div 
                      className={`absolute bottom-0 left-0 h-0.5 bg-cyber-cyan transition-all duration-300 ${
                        focusedField === 'message' ? 'w-full' : 'w-0'
                      }`} 
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formState !== 'idle'}
                  className={`form-field w-full py-4 rounded-lg font-heading font-bold flex items-center justify-center gap-2 transition-all ${
                    formState === 'success'
                      ? 'bg-green-500 text-white'
                      : 'bg-cyber-cyan text-cyber-void hover:shadow-glow-lg'
                  } disabled:opacity-70`}
                >
                  {formState === 'idle' && (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                  {formState === 'submitting' && (
                    <>
                      Sending...
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </>
                  )}
                  {formState === 'success' && (
                    <>
                      Message Sent!
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
