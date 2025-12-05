import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import construction from "@/assets/construction.jpg";
import commercialBuilding from "@/assets/commercial-building.jpg";
import { Building, CheckCircle, UserCheck, ClipboardCheck } from "lucide-react";

const GCReferral = () => {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${construction})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-royal-blue/90" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">
              Preferred General Contractor Referrals
            </h1>
            <p className="text-lg sm:text-xl text-white/90 px-4 sm:px-0">
              Trusted construction partners for ground-up and renovation projects
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why GC Referrals Matter */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 sm:mb-6">
                Why General Contractor Selection Matters
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  HPG Kapital also refers our clients with preferred general contractors for ground-up or renovation projects. The right GC can make the difference between a project that stays on budget and on schedule and one that doesn't.
                </p>
                <p>
                  We've cultivated relationships with experienced, reliable general contractors who understand the unique requirements of hospitality and commercial real estate construction. These partners bring proven track records, transparent pricing, and commitment to quality.
                </p>
                <p>
                  Our referral process is simple: we'll match your project with GCs who have relevant experience, competitive pricing, and the capacity to deliver on time.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={commercialBuilding}
                  alt="Construction Project"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">Project Types We Support</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our GC network specializes in hospitality and commercial real estate construction
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all text-center h-full"
              >
                <Building className="w-16 h-16 text-royal-blue mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-navy mb-4">Ground-Up Construction</h3>
                <p className="text-muted-foreground leading-relaxed">
                  New hotel and commercial developments from foundation to certificate of occupancy. Full-service GCs with hospitality expertise.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all text-center h-full"
              >
                <CheckCircle className="w-16 h-16 text-royal-blue mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-navy mb-4">Renovation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Property improvements, brand conversions, and modernization projects. Experienced with occupied property logistics and phasing.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all text-center h-full"
              >
                <UserCheck className="w-16 h-16 text-royal-blue mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-navy mb-4">Repositioning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Substantial property transformations including repositioning, adaptive reuse, and comprehensive upgrades to enhance value.
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">Our Referral Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple, straightforward connections to qualified construction partners
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <AnimatedSection delay={0.1}>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-accent">01</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Share Your Project</h3>
                <p className="text-muted-foreground">
                  Tell us about your construction needs, timeline, and project scope
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-accent">02</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Match GC Partners</h3>
                <p className="text-muted-foreground">
                  We identify general contractors with relevant experience and capacity
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-accent">03</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Facilitate Introduction</h3>
                <p className="text-muted-foreground">
                  We make the connection and you take it from there
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy mb-4">Benefits of Our GC Network</h2>
            </AnimatedSection>

            <div className="space-y-6">
              <AnimatedSection delay={0.1}>
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 flex items-start space-x-6">
                  <ClipboardCheck className="w-12 h-12 text-royal-blue flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Proven Track Records</h3>
                    <p className="text-muted-foreground">
                      All referred GCs have demonstrated success with similar projects and asset classes
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 flex items-start space-x-6">
                  <UserCheck className="w-12 h-12 text-royal-blue flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Hospitality Expertise</h3>
                    <p className="text-muted-foreground">
                      Specialized knowledge of hotel construction, FF&E coordination, and brand standards
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 flex items-start space-x-6">
                  <CheckCircle className="w-12 h-12 text-royal-blue flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Transparent Pricing</h3>
                    <p className="text-muted-foreground">
                      Competitive pricing structures with clear documentation and no surprises
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 flex items-start space-x-6">
                  <Building className="w-12 h-12 text-royal-blue flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Reliable Execution</h3>
                    <p className="text-muted-foreground">
                      Commitment to schedule adherence, quality standards, and proactive communication
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-royal-blue via-navy to-royal-blue">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">
              Request a GC Introduction
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Connect with our trusted general contractor partners for your next project
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

export default GCReferral;
