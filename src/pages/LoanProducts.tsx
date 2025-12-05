import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import commercialBuilding from "@/assets/commercial-building.jpg";
import construction from "@/assets/construction.jpg";
import { Building2, Clock, Shield, DollarSign, FileText, Percent, CheckCircle2 } from "lucide-react";

const LoanProducts = () => {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${commercialBuilding})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-royal-blue/90" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">Commercial Loan Products</h1>
            <p className="text-lg sm:text-xl text-white/90 px-4 sm:px-0">
              Comprehensive financing solutions structured for maximum flexibility
            </p>
          </motion.div>
        </div>
      </section>

      {/* CMBS Loans */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full">
                  <Building2 className="w-5 h-5 text-accent mr-2" />
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">CMBS Loans</span>
                </div>
                
                <h2 className="text-4xl font-bold text-navy">Commercial Mortgage-Backed Securities</h2>
                
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    CMBS loans provide long-term, fixed-rate financing for stabilized income-producing properties. These non-recourse, assumable loans offer predictable debt service and the ability to transfer the loan to a future buyer.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-light-gray rounded-xl p-6">
                    <h4 className="font-bold text-navy mb-2">Eligible Properties</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Multifamily</li>
                      <li>• Office</li>
                      <li>• Industrial</li>
                      <li>• Retail</li>
                      <li>• Self-Storage</li>
                      <li>• Hotels</li>
                    </ul>
                  </div>
                  
                  <div className="bg-light-gray rounded-xl p-6">
                    <h4 className="font-bold text-navy mb-2">Key Features</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Minimum $3M+</li>
                      <li>• Non-recourse</li>
                      <li>• Assumable</li>
                      <li>• Fixed rate</li>
                      <li>• Stabilized assets</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={commercialBuilding}
                  alt="CMBS Properties"
                  className="w-full h-[600px] object-cover"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Construction Loans */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={construction}
                  alt="Construction Projects"
                  className="w-full h-[600px] object-cover"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="order-1 lg:order-2">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full">
                  <Shield className="w-5 h-5 text-accent mr-2" />
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">Construction Loans</span>
                </div>
                
                <h2 className="text-4xl font-bold text-navy">Ground-Up & Major Renovation Financing</h2>
                
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Construction loans fund new development and substantial renovation projects. These facilities provide capital as work progresses, transitioning to permanent financing upon completion or stabilization.
                  </p>
                </div>

                <div className="space-y-4 mt-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-royal-blue/10 flex items-center justify-center flex-shrink-0">
                      <Percent className="w-6 h-6 text-royal-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy mb-1">Loan-to-Cost (LTC)</h4>
                      <p className="text-muted-foreground">Typically 70–75% LTC for qualified sponsors</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-royal-blue/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-royal-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy mb-1">Recourse Options</h4>
                      <p className="text-muted-foreground">Both recourse and non-recourse structures available</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-royal-blue/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-royal-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy mb-1">For Developers & Operators</h4>
                      <p className="text-muted-foreground">Designed for experienced sponsors with proven track records</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Bridge Loans */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full mb-6">
              <Clock className="w-5 h-5 text-accent mr-2" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Bridge Loans</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4 sm:mb-6">When Timing Matters</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bridge loans provide short-term, flexible funding to bridge gaps, execute acquisitions, or reposition assets before permanent financing.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedSection delay={0.1}>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 text-center">
                <DollarSign className="w-12 h-12 text-royal-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy mb-3">Quick Execution</h3>
                <p className="text-muted-foreground">
                  Faster closings than conventional debt when speed is critical
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 text-center">
                <Shield className="w-12 h-12 text-royal-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy mb-3">Flexible Structures</h3>
                <p className="text-muted-foreground">
                  Tailored terms that adapt to your project's unique timeline
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 text-center">
                <Clock className="w-12 h-12 text-royal-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy mb-3">Interim Solutions</h3>
                <p className="text-muted-foreground">
                  Perfect for acquisitions, refinance, or interim financing needs
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SBA Loans */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">SBA Loan Programs</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Government-backed financing with favorable terms for qualified businesses
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <AnimatedSection delay={0.1}>
              <div className="bg-card rounded-2xl p-10 shadow-xl border border-border/50 h-full">
                <h3 className="text-2xl font-bold text-navy mb-6">SBA 7(a) Loans</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <p><strong className="text-navy">Loan Amount:</strong> Up to $5 million</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <p><strong className="text-navy">Term:</strong> 25 years for real estate, 10 years for other assets</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <p><strong className="text-navy">Use:</strong> General business purposes including working capital and equipment</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <p><strong className="text-navy">Requirement:</strong> Property must be at least 51% owner-occupied</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-card rounded-2xl p-10 shadow-xl border border-border/50 h-full">
                <h3 className="text-2xl font-bold text-navy mb-6">SBA 504 Loans</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <p><strong className="text-navy">Loan Amount:</strong> Up to $13 million (combined)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <p><strong className="text-navy">Structure:</strong> 50% bank debt / 40% SBA / 10% equity</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <p><strong className="text-navy">Term:</strong> Fully amortized fixed rates</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <p><strong className="text-navy">Best For:</strong> Real estate (25 years) and machinery (10 years)</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-royal-blue via-navy to-royal-blue">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">
              Find Your Optimal Financing Solution
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Let's discuss which loan product best fits your project and strategic objectives
            </p>
            <Button asChild size="lg" className="bg-luxury-red hover:bg-luxury-red/90 text-white font-semibold uppercase tracking-wider px-8 py-6 text-lg">
              <Link to="/contact">Get Started</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default LoanProducts;
