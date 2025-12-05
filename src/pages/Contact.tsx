import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import handshake from "@/assets/handshake.jpg";
import { Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { useCsrfToken } from "@/hooks/useCsrfToken";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const csrfToken = useCsrfToken();

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

  // Input validation
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name': {
        if (!value.trim()) return 'Name is required';
        if (value.trim().length > 100) return 'Name must be less than 100 characters';
        if (!/^[a-zA-Z\s\-'.]+$/.test(value.trim())) return 'Name contains invalid characters';
        return '';
      }
      case 'email': {
        if (!value.trim()) return 'Email is required';
        if (value.trim().length > 255) return 'Email must be less than 255 characters';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Invalid email format';
        return '';
      }
      case 'phone': {
        if (value && value.trim().length > 20) return 'Phone must be less than 20 characters';
        if (value && !/^[\d\s\-()+.]+$/.test(value.trim())) return 'Invalid phone format';
        return '';
      }
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length > 5000) return 'Message must be less than 5000 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setHasUnsavedChanges(true);
    
    // Clear error when user starts typing
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
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
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
      // Check if online
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
        // Handle validation errors from server
        if (data.errors && Array.isArray(data.errors)) {
          const serverErrors: Record<string, string> = {};
          data.errors.forEach((err: string) => {
            if (err.includes('Name')) serverErrors.name = err;
            else if (err.includes('Email')) serverErrors.email = err;
            else if (err.includes('Phone')) serverErrors.phone = err;
            else if (err.includes('Message')) serverErrors.message = err;
          });
          setErrors(serverErrors);
        }
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error("Server unavailable. Please try again later.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${handshake})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-royal-blue/90" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">Get in Touch</h1>
            <p className="text-lg sm:text-xl text-white/90 px-4 sm:px-0">
              Let's discuss how we can help finance your next project
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <AnimatedSection>
              <div className="bg-card rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-border/50">
                <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4 sm:mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <Label htmlFor="contact-name" className="block text-sm font-semibold text-navy mb-2">
                      Name *
                    </Label>
                    <Input
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="Your full name"
                      className={`border-border ${errors.name ? 'border-destructive' : ''}`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      maxLength={100}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-destructive mt-1" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="contact-email" className="block text-sm font-semibold text-navy mb-2">
                      Email *
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="your@email.com"
                      className={`border-border ${errors.email ? 'border-destructive' : ''}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      maxLength={255}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-destructive mt-1" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="contact-phone" className="block text-sm font-semibold text-navy mb-2">
                      Phone
                    </Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="(555) 123-4567"
                      className={`border-border ${errors.phone ? 'border-destructive' : ''}`}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      maxLength={20}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-sm text-destructive mt-1" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="contact-message" className="block text-sm font-semibold text-navy mb-2">
                      Message *
                    </Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="Tell us about your project..."
                      rows={5}
                      className={`border-border resize-none ${errors.message ? 'border-destructive' : ''}`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      maxLength={5000}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-sm text-destructive mt-1" role="alert">
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

export default Contact;
