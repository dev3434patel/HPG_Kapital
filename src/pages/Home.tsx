import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";
import heroHotel from "@/assets/hero-hotel.jpg";
import construction from "@/assets/construction.jpg";
import hotelInterior from "@/assets/hotel-interior.jpg";
import meetingRoom from "@/assets/meeting-room.jpg";
import commercialBuilding from "@/assets/commercial-building.jpg";
import citySkyline from "@/assets/city-skyline.jpg";
import globalNetwork from "@/assets/global-network.jpg";
import { Building2, TrendingUp, Zap, DollarSign, FileCheck, Leaf, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { useCsrfToken } from "@/hooks/useCsrfToken";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [heroParallaxOffset, setHeroParallaxOffset] = useState(0);
  const heroParallaxRef = useRef<number>(0);
  const heroRafIdRef = useRef<number | null>(null);
  const csrfToken = useCsrfToken();

  // Ultra-smooth parallax effect for Hero section (5-10% scroll speed)
  useEffect(() => {
    const updateParallax = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Only apply parallax within hero section
      if (currentScrollY < heroHeight) {
        // Target parallax offset: 7.5% of scroll (between 5-10%)
        const targetOffset = currentScrollY * 0.075;
        
        // Ultra-smooth interpolation (exponential smoothing)
        const diff = targetOffset - heroParallaxRef.current;
        heroParallaxRef.current += diff * 0.12; // Smooth interpolation factor
        
        setHeroParallaxOffset(heroParallaxRef.current);
      } else {
        // Lock to max when scrolled past hero
        const maxOffset = heroHeight * 0.075;
        if (heroParallaxRef.current < maxOffset) {
          heroParallaxRef.current = maxOffset;
          setHeroParallaxOffset(maxOffset);
        }
      }
      
      // Continue animation loop
      heroRafIdRef.current = requestAnimationFrame(updateParallax);
    };

    const handleScroll = () => {
      // Trigger animation frame if not already running
      if (heroRafIdRef.current === null) {
        heroRafIdRef.current = requestAnimationFrame(updateParallax);
      }
    };

    // Start the smooth animation loop
    heroRafIdRef.current = requestAnimationFrame(updateParallax);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (heroRafIdRef.current !== null) {
        cancelAnimationFrame(heroRafIdRef.current);
        heroRafIdRef.current = null;
      }
    };
  }, []);

  // Warn before leaving page with unsaved form data
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && (formData.name || formData.email || formData.message)) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges, formData]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name': {
        if (!value.trim()) return 'Name is required';
        if (value.trim().length > 100) return 'Name must be less than 100 characters';
        return '';
      }
      case 'email': {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Invalid email format';
        return '';
      }
      case 'message': {
        if (!value.trim()) return 'Message is required';
        if (value.trim().length > 5000) return 'Message must be less than 5000 characters';
        return '';
      }
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setHasUnsavedChanges(true);
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'phone') {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    // In development, allow form submission even without CSRF token
    if (!csrfToken && import.meta.env.PROD) {
      toast.error("Security token not loaded. Please refresh the page.");
      return;
    }

    setLoading(true);
    
    try {
      if (!navigator.onLine) {
        toast.error("You are offline. Please check your connection.");
        setLoading(false);
        return;
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      // Only add CSRF token if available
      if (csrfToken && csrfToken !== 'dev-bypass') {
        headers['X-CSRF-Token'] = csrfToken;
      } else if (csrfToken === 'dev-bypass') {
        headers['X-CSRF-Token'] = 'dev-bypass';
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success(data.message || "Thank you! We'll be in touch soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
        setHasUnsavedChanges(false);
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error("Server unavailable. Please try again later.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pt-16">
      {/* Hero Section with Smooth Parallax (5-10% scroll speed) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Image - Scrolls at 7.5% speed */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroHotel})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            transform: `translate3d(0, ${heroParallaxOffset}px, 0) scale(1.05)`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            perspective: '1000px',
            WebkitPerspective: '1000px',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            zIndex: 0,
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-royal-blue/90 to-navy/95 z-0" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
              Hospitality Finance, Engineered for Growth
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-10 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0">
              At HPG Kapital, we specialize in hospitality financing, delivering customized capital solutions that fuel your vision from concept to completion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Button asChild size="lg" className="bg-luxury-red hover:bg-luxury-red/90 text-white font-semibold uppercase tracking-wider text-sm px-6 sm:px-8 py-5 sm:py-6 min-h-[44px] touch-target w-full sm:w-auto">
                <Link to="/hospitality-financing">Explore Hospitality Financing</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-navy hover:bg-white/90 font-semibold uppercase tracking-wider text-sm px-6 sm:px-8 py-5 sm:py-6 min-h-[44px] touch-target w-full sm:w-auto">
                <Link to="/contact">Talk to Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hospitality Financing Solutions */}
      <section className="py-12 sm:py-16 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Our Hospitality Financing Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive capital solutions designed specifically for the hospitality industry
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="CMBS Loans"
              description="Long-term, fixed-rate financing for stabilized hospitality assets."
              image={commercialBuilding}
              icon={<Building2 className="w-6 h-6" />}
              delay={0}
            />
            <ServiceCard
              title="Ground-Up Development"
              description="Capital for new hotel construction and expansion."
              image={construction}
              icon={<TrendingUp className="w-6 h-6" />}
              delay={0.1}
            />
            <ServiceCard
              title="Bridge Loans"
              description="Short-term, flexible funding to bridge gaps or reposition assets."
              image={meetingRoom}
              icon={<Zap className="w-6 h-6" />}
              delay={0.2}
            />
            <ServiceCard
              title="Soft & Hard Debt"
              description="Structured to match your project's risk profile and timeline."
              image={hotelInterior}
              icon={<DollarSign className="w-6 h-6" />}
              delay={0.3}
            />
            <ServiceCard
              title="SBA Loans"
              description="Government-backed financing for qualified hospitality ventures."
              image={commercialBuilding}
              icon={<FileCheck className="w-6 h-6" />}
              delay={0.4}
            />
            <ServiceCard
              title="PACE Financing"
              description="Energy-efficient funding that enhances sustainability and ROI."
              image={hotelInterior}
              icon={<Leaf className="w-6 h-6" />}
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Why HPG Kapital */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4 sm:mb-6">
                Why HPG Kapital?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We understand that hospitality financing requires specialized expertise and deep market knowledge. Our team brings decades of combined experience to help you navigate complex capital structures.
              </p>
            </AnimatedSection>

            <div className="space-y-6">
              <AnimatedSection delay={0.1}>
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-royal-blue mb-3">Tailored Loan Structures</h3>
                  <p className="text-muted-foreground">Built around your unique goals and project requirements</p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-royal-blue mb-3">Trusted Relationships</h3>
                  <p className="text-muted-foreground">Direct access to top-tier debt providers and lenders</p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-royal-blue mb-3">Hospitality-First Expertise</h3>
                  <p className="text-muted-foreground">Deep understanding of operational needs and industry dynamics</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Broader Services */}
      <section className="py-12 sm:py-16 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Comprehensive Capital Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Beyond hospitality, we offer a full suite of commercial real estate financing services
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all"
            >
              <div className="w-full h-40 mb-6 rounded-xl overflow-hidden">
                <img src={meetingRoom} alt="Capital Markets" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Capital Markets Advisory</h3>
              <p className="text-muted-foreground mb-4">Deep network of private funds, portfolio banks, CMBS providers, family offices & insurance companies.</p>
              <Link to="/capital-markets" className="text-royal-blue font-semibold hover:text-accent transition-colors">
                Learn More →
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all"
            >
              <div className="w-full h-40 mb-6 rounded-xl overflow-hidden">
                <img src={globalNetwork} alt="EB-5" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">EB-5 Advisory</h3>
              <p className="text-muted-foreground mb-4">HPG Kapital proudly serves as an EB-5 advisor to two regional centers.</p>
              <Link to="/eb5-advisory" className="text-royal-blue font-semibold hover:text-accent transition-colors">
                Learn More →
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all"
            >
              <div className="w-full h-40 mb-6 rounded-xl overflow-hidden">
                <img src={commercialBuilding} alt="Loan Products" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Loan Products</h3>
              <p className="text-muted-foreground mb-4">From CMBS to Construction to SBA loans, structured for maximum flexibility.</p>
              <Link to="/loan-products" className="text-royal-blue font-semibold hover:text-accent transition-colors">
                Learn More →
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all"
            >
              <div className="w-full h-40 mb-6 rounded-xl overflow-hidden">
                <img src={construction} alt="GC Referral" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Preferred GC Referral</h3>
              <p className="text-muted-foreground mb-4">We recommend trusted general contractors for ground-up and renovation projects.</p>
              <Link to="/gc-referral" className="text-royal-blue font-semibold hover:text-accent transition-colors">
                Learn More →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
              How We Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven process designed to deliver optimal financing solutions
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Project Assessment", description: "Comprehensive analysis of your project needs and financial goals" },
              { step: "02", title: "Capital Stack Engineering", description: "Strategic structuring to optimize your financing mix" },
              { step: "03", title: "Lender Matching", description: "Connecting you with the right capital partners" },
              { step: "04", title: "Closing Guidance", description: "Expert support through documentation and execution" },
            ].map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-6xl font-bold text-accent/20 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band with Fixed/Sticky Background */}
      <section 
        className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
        style={{
          backgroundImage: `url(${citySkyline})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-navy/90 z-0" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">
              Let's Build Something Exceptional
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Navigating hospitality finance doesn't have to be complex.
            </p>
            <Button asChild size="lg" className="bg-luxury-red hover:bg-luxury-red/90 text-white font-semibold uppercase tracking-wider min-h-[44px] touch-target px-6 sm:px-8 py-5 sm:py-6">
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground">Our team is ready to discuss your project</p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Form */}
            <AnimatedSection>
              <div className="bg-card rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-border/50">
                <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4 sm:mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <Label htmlFor="home-name" className="block text-sm font-semibold text-navy mb-2">
                      Name *
                    </Label>
                    <Input
                      id="home-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="Your full name"
                      className={`border-border ${errors.name ? 'border-destructive' : ''}`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'home-name-error' : undefined}
                      maxLength={100}
                    />
                    {errors.name && (
                      <p id="home-name-error" className="text-sm text-destructive mt-1" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="home-email" className="block text-sm font-semibold text-navy mb-2">
                      Email *
                    </Label>
                    <Input
                      id="home-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="your@email.com"
                      className={`border-border ${errors.email ? 'border-destructive' : ''}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'home-email-error' : undefined}
                      maxLength={255}
                    />
                    {errors.email && (
                      <p id="home-email-error" className="text-sm text-destructive mt-1" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="home-phone" className="block text-sm font-semibold text-navy mb-2">
                      Phone
                    </Label>
                    <Input
                      id="home-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className="border-border"
                      maxLength={20}
                    />
                  </div>

                  <div>
                    <Label htmlFor="home-message" className="block text-sm font-semibold text-navy mb-2">
                      Message *
                    </Label>
                    <Textarea
                      id="home-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="Tell us about your project..."
                      rows={5}
                      className={`border-border resize-none ${errors.message ? 'border-destructive' : ''}`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'home-message-error' : undefined}
                      maxLength={5000}
                    />
                    {errors.message && (
                      <p id="home-message-error" className="text-sm text-destructive mt-1" role="alert">
                        {errors.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.message.length}/5000 characters
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading || !csrfToken}
                    className="w-full bg-luxury-red hover:bg-luxury-red/90 text-white font-semibold uppercase tracking-wider min-h-[44px] touch-target"
                    aria-label="Submit contact form"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Inquiry'
                    )}
                  </Button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-navy mb-6">Direct Contacts</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Reach out directly to our principals for immediate assistance
                  </p>
                </div>

                {/* Paresh Govan */}
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
                  <h3 className="text-2xl font-bold text-navy mb-2">Paresh Govan</h3>
                  <p className="text-lg text-royal-blue font-semibold mb-4">President</p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-accent" />
                      <a href="tel:404-434-4932" className="text-muted-foreground hover:text-accent transition-colors">
                        404-434-4932
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-accent" />
                      <a href="mailto:kiwi@hpg-kapital.com" className="text-muted-foreground hover:text-accent transition-colors">
                        kiwi@hpg-kapital.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Office Location */}
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
                  <h3 className="text-2xl font-bold text-navy mb-4">Office Location</h3>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-accent mt-1" />
                    <div className="text-muted-foreground">
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=1651+Mt.+Vernon+Road,+3rd+Floor,+Dunwoody,+GA+30338"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-accent transition-colors"
                      >
                        <p className="font-semibold text-navy">1651 Mt. Vernon Road, 3rd Floor</p>
                        <p className="font-semibold text-navy">Dunwoody, GA 30338</p>
                      </a>
                      <p className="text-sm mt-2">Serving clients across the United States</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
