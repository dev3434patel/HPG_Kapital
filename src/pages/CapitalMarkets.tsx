import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import meetingRoom from "@/assets/meeting-room.jpg";
import commercialBuilding from "@/assets/commercial-building.jpg";
import { Building, TrendingUp, LineChart, Users, ArrowRight, CheckCircle2, DollarSign, Shield } from "lucide-react";

const CapitalMarkets = () => {
  const lenders = [
    {
      title: "Private Funds",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Direct access to private equity and debt funds specializing in commercial real estate"
    },
    {
      title: "Portfolio Banks",
      icon: <Building className="w-8 h-8" />,
      description: "Regional and national banks with dedicated CRE lending platforms"
    },
    {
      title: "Family Offices",
      icon: <Users className="w-8 h-8" />,
      description: "Sophisticated family office capital for strategic real estate investments"
    },
    {
      title: "Insurance Companies",
      icon: <LineChart className="w-8 h-8" />,
      description: "Life insurance companies providing long-term, fixed-rate financing"
    },
    {
      title: "CMBS Providers",
      icon: <Building className="w-8 h-8" />,
      description: "Commercial mortgage-backed securities lenders for stabilized assets"
    },
    {
      title: "Life Companies",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Life insurance companies offering competitive long-term debt solutions"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${meetingRoom})` }}
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
              Capital Markets Advisory
            </h1>
            <p className="text-lg sm:text-xl text-white/90 px-4 sm:px-0">Debt Solutions Engineered for Success</p>
          </motion.div>
        </div>
      </section>

      {/* Lender Network - 3x2 Grid */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-navy mb-4 sm:mb-6">Our Lender Network</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Direct access to an extensive network of sophisticated capital providers
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lenders.map((lender, index) => (
              <AnimatedSection key={lender.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all h-full flex flex-col"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-royal-blue/20 rounded-2xl flex items-center justify-center text-royal-blue mb-6">
                    {lender.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">{lender.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {lender.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insight */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full">
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">Market Intelligence</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">Real-Time Market Intelligence</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our team maintains daily engagement with top-tier CRE lenders, providing us with real-time insight into market dynamics, lending appetite, and rate environments.
                </p>
                <div className="space-y-4 pt-4">
                  {[
                    "Daily engagement with top-tier CRE lenders",
                    "Real-time insight into market dynamics and lending appetite",
                    "Anticipate market shifts and identify emerging opportunities",
                    "Engineer optimal capital solutions by understanding both sides"
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
                  alt="Market Analysis"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">Our Advisory Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A systematic approach to delivering optimal debt solutions
            </p>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-royal-blue hidden md:block" />
              <div className="space-y-12">
                {[
                  { step: "01", title: "Project Assessment", desc: "Comprehensive analysis of your project, financial position, and strategic objectives to understand exactly what you need" },
                  { step: "02", title: "Capital Stack Engineering", desc: "Strategic structuring of your entire capital stack: debt positioning, tranching, and timing to optimize leverage and terms" },
                  { step: "03", title: "Lender Matching", desc: "Identifying and connecting you with the right capital partners based on asset class, deal size, and lender appetite" },
                  { step: "04", title: "Closing Guidance", desc: "Expert support through documentation, underwriting, and closing to ensure seamless execution" }
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">
              Discuss Your Capital Strategy
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Let's explore how our capital markets expertise can optimize your next project
            </p>
            <Button asChild size="lg" className="bg-luxury-red hover:bg-luxury-red/90 text-white font-semibold uppercase tracking-wider px-8 py-6 text-lg">
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default CapitalMarkets;
