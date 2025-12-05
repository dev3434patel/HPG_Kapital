import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import globalNetwork from "@/assets/global-network.jpg";
import commercialBuilding from "@/assets/commercial-building.jpg";
import { Globe, FileCheck, Users, TrendingUp, Shield, ArrowRight, CheckCircle2, Building2, DollarSign } from "lucide-react";

const EB5Advisory = () => {
  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Below-Market Rates",
      description: "Access capital at rates significantly lower than conventional debt"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Flexible Terms",
      description: "Longer maturities and interest-only periods compared to traditional loans"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Job Creation Credit",
      description: "Fulfills EB-5 requirements while supporting local economic development"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Non-Recourse Structure",
      description: "Typically structured without personal guarantees or sponsor recourse"
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Subordinate Position",
      description: "Can sit junior to senior debt, improving overall project leverage"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Strategic Capital",
      description: "Fills equity gaps and enhances returns to project sponsors"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${globalNetwork})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-royal-blue/90" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">EB-5 Advisory Services</h1>
            <p className="text-lg sm:text-xl text-white/90 px-4 sm:px-0">
              Strategic guidance for projects seeking foreign direct investment through the EB-5 program
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full">
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">EB-5 Expertise</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">EB-5 Expertise</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  HPG Kapital proudly serves as an EB-5 advisor to two regional centers, providing strategic counsel on capital formation and compliance for projects seeking foreign direct investment.
                </p>
                <div className="space-y-4 pt-4">
                  {[
                    "Strategic counsel on capital formation and compliance",
                    "Deep understanding of EB-5 regulations and CRE financing",
                    "Structure compliant, attractive offerings that raise capital",
                    "Maintain project economics while meeting EB-5 requirements"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={commercialBuilding}
                  alt="EB-5 Projects"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Key Benefits - 3x2 Grid */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-navy mb-4 sm:mb-6">Why Consider EB-5 Capital?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Unique advantages of EB-5 financing for qualifying projects
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all h-full flex flex-col"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-royal-blue/20 rounded-2xl flex items-center justify-center text-royal-blue mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {benefit.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">Our EB-5 Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Navigating EB-5 compliance and capital formation with expert guidance
            </p>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-royal-blue hidden md:block" />
              <div className="space-y-12">
                {[
                  { step: "01", title: "Project Evaluation", desc: "Assess EB-5 suitability and job creation potential" },
                  { step: "02", title: "Structuring", desc: "Design compliant capital structure and investor terms" },
                  { step: "03", title: "Capital Sourcing", desc: "Connect with regional centers and investor networks" },
                  { step: "04", title: "USCIS Documentation", desc: "Support preparation of required immigration filings" },
                  { step: "05", title: "Monitoring", desc: "Ongoing compliance tracking and investor relations" }
                ].map((item, index) => (
                  <AnimatedSection key={item.step} delay={index * 0.1}>
                    <div className="relative flex items-start gap-8">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent to-royal-blue rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                        {item.step}
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className="text-2xl font-bold text-navy mb-2">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why HPG */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full">
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">Why HPG for EB-5</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">Why Choose HPG for EB-5?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our unique combination of EB-5 expertise and commercial real estate financing knowledge delivers optimal outcomes.
                </p>
                <div className="space-y-4 pt-4">
                  {[
                    "Direct advisor to two USCIS-designated regional centers",
                    "Unique ability to integrate EB-5 capital with conventional debt",
                    "End-to-end guidance from evaluation through monitoring"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "Regional Centers", desc: "Direct advisor to two USCIS-designated centers" },
                  { title: "CRE Expertise", desc: "Integrate EB-5 with conventional debt" },
                  { title: "Comprehensive Support", desc: "End-to-end guidance and monitoring" },
                  { title: "Proven Track Record", desc: "Successful capital formation and compliance" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="bg-card rounded-xl p-6 shadow-lg border border-border/50 hover:shadow-xl transition-all"
                  >
                    <div className="text-3xl font-bold text-royal-blue mb-2">{String(idx + 1).padStart(2, '0')}</div>
                    <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
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
              Start an EB-5 Conversation
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Explore whether EB-5 capital could enhance your project's financing strategy
            </p>
            <Button asChild size="lg" className="bg-luxury-red hover:bg-luxury-red/90 text-white font-semibold uppercase tracking-wider px-8 py-6 text-lg">
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default EB5Advisory;
