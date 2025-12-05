import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import hotelInterior from "@/assets/hotel-interior.jpg";
import { Building2, TrendingUp, Zap, DollarSign, FileCheck, Leaf, ArrowRight, CheckCircle2, Users, Shield } from "lucide-react";

const HospitalityFinancing = () => {
  const solutions = [
    {
      title: "CMBS Loans",
      description: "Long-term, fixed-rate financing for stabilized hospitality assets. Non-recourse structures with predictable debt service and assumability.",
      icon: <Building2 className="w-8 h-8" />,
      features: ["Non-recourse structures", "Fixed-rate terms", "Assumable loans", "Predictable debt service"]
    },
    {
      title: "Ground-Up Development",
      description: "Capital for new hotel construction and expansion. Structured to fund projects from concept through completion and stabilization.",
      icon: <TrendingUp className="w-8 h-8" />,
      features: ["70-75% LTC available", "Flexible draw schedules", "Construction-to-permanent", "Completion funding"]
    },
    {
      title: "Bridge Loans",
      description: "Short-term, flexible funding to bridge gaps or reposition assets. Fast execution when timing is critical.",
      icon: <Zap className="w-8 h-8" />,
      features: ["Fast execution", "Flexible terms", "Repositioning support", "Quick closing"]
    },
    {
      title: "Soft & Hard Debt",
      description: "Structured to match your project's risk profile and timeline. Flexible layering for optimal capital stack outcomes.",
      icon: <DollarSign className="w-8 h-8" />,
      features: ["Risk-matched structures", "Flexible layering", "Optimal capital stack", "Customized terms"]
    },
    {
      title: "SBA Loans",
      description: "Government-backed financing for qualified hospitality ventures. Favorable terms for owner-occupied properties.",
      icon: <FileCheck className="w-8 h-8" />,
      features: ["Government-backed", "Favorable rates", "Owner-occupied focus", "Long terms"]
    },
    {
      title: "PACE Financing",
      description: "Energy-efficient funding that enhances sustainability and ROI. Long-term, non-dilutive capital for qualifying improvements.",
      icon: <Leaf className="w-8 h-8" />,
      features: ["100% financing", "20-30 year terms", "Non-dilutive", "Enhanced property value"]
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hotelInterior})` }}
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
              Hospitality Financing
            </h1>
            <p className="text-lg sm:text-xl text-white/90 px-4 sm:px-0">
              Comprehensive capital solutions designed specifically for the hospitality industry, delivering customized financing that fuels your vision from concept to completion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions - 3x2 Grid with Icons */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-navy mb-4 sm:mb-6">
              Financing Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive capital solutions designed specifically for the hospitality industry
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <AnimatedSection key={solution.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all h-full flex flex-col"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-royal-blue/20 rounded-2xl flex items-center justify-center text-royal-blue mb-6">
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">{solution.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {solution.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="ghost" className="text-royal-blue hover:text-accent p-0 h-auto font-semibold justify-start">
                    <Link to="/contact" className="flex items-center gap-2">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Side by Side */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full">
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">Why HPG Kapital</span>
                </div>
                <h2 className="text-5xl font-bold text-navy">
                  Hospitality-First Expertise
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We understand that hospitality financing requires specialized expertise and deep market knowledge. Our team brings decades of combined experience to help you navigate complex capital structures.
                </p>
                <div className="space-y-4 pt-4">
                  {[
                    "Tailored loan structures built around your unique goals",
                    "Direct access to top-tier debt providers with hospitality expertise",
                    "Deep understanding of operational needs and industry dynamics"
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
                  { title: "Tailored Structures", desc: "Built for your unique project requirements" },
                  { title: "Trusted Relationships", desc: "Top-tier lenders with hospitality expertise" },
                  { title: "Industry Expertise", desc: "Deep understanding of hotel operations" },
                  { title: "Fast Execution", desc: "Streamlined process from application to closing" }
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

      {/* Process Timeline */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl font-bold text-navy mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven approach to delivering optimal financing solutions
            </p>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-royal-blue hidden md:block" />
              <div className="space-y-12">
                {[
                  { step: "01", title: "Project Assessment", desc: "Comprehensive analysis of your project needs and financial goals" },
                  { step: "02", title: "Capital Stack Engineering", desc: "Strategic structuring to optimize your financing mix" },
                  { step: "03", title: "Lender Matching", desc: "Connecting you with the right capital partners" },
                  { step: "04", title: "Closing Guidance", desc: "Expert support through documentation and execution" }
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

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-royal-blue via-navy to-royal-blue">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Finance Your Hospitality Project?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Let's discuss how our specialized hospitality financing expertise can bring your vision to life
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

export default HospitalityFinancing;
