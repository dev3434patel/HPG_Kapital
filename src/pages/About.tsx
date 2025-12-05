import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import commercialBuilding from "@/assets/commercial-building.jpg";
import meetingRoom from "@/assets/meeting-room.jpg";
import { Building2, Target, Award, Users, Phone, Mail } from "lucide-react";

const About = () => {
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">About HPG Kapital</h1>
            <p className="text-lg sm:text-xl text-white/90 px-4 sm:px-0">
              Delivering precision-engineered capital solutions across the United States
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 sm:mb-6">Who We Are</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  HPG Kapital is a commercial real estate capital advisory firm headquartered in Dunwoody, GA, serving clients across the United States. We specialize in structuring debt and EB-5 placement solutions tailored to the unique needs of property investors, developers, and owners.
                </p>
                <p>
                  With deep expertise in hospitality financing and a comprehensive understanding of the commercial real estate landscape, we provide strategic guidance that maximizes value while minimizing complexity.
                </p>
                <p>
                  Our approach combines precision capital stack engineering with an extensive network of top-tier lenders, enabling us to deliver optimal financing solutions for projects of all sizes and asset classes.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={meetingRoom}
                  alt="HPG Kapital Team"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Philosophy */}
      <section className="py-12 sm:py-16 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="bg-card rounded-2xl p-10 shadow-xl border border-border/50 h-full">
                <Target className="w-12 h-12 text-royal-blue mb-6" />
                <h3 className="text-3xl font-bold text-navy mb-4">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To empower real estate investors and developers with strategic capital solutions that fuel growth, optimize returns, and transform visions into reality through expert guidance and trusted partnerships.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="bg-card rounded-2xl p-10 shadow-xl border border-border/50 h-full">
                <Award className="w-12 h-12 text-royal-blue mb-6" />
                <h3 className="text-3xl font-bold text-navy mb-4">Our Philosophy</h3>
                <ul className="space-y-3 text-lg text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-accent">•</span>
                    <span><strong className="text-navy">Precision:</strong> Every detail matters in capital structuring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-accent">•</span>
                    <span><strong className="text-navy">Sponsor Aligned:</strong> Your success is our success</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-accent">•</span>
                    <span><strong className="text-navy">Value Maximizing:</strong> Optimizing returns at every stage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-accent">•</span>
                    <span><strong className="text-navy">Transparent Engagement:</strong> Clear communication throughout</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Edge */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">The HPG Advantage</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              What sets us apart in the competitive landscape of commercial real estate financing
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-10 h-10" />,
                title: "Deep Lender Network",
                description: "Direct relationships with top-tier CRE lenders, private funds, and institutional capital providers",
                image: meetingRoom,
              },
              {
                icon: <Building2 className="w-10 h-10" />,
                title: "Market Intelligence",
                description: "Real-time insight into market dynamics and lending appetite across all asset classes",
                image: commercialBuilding,
              },
              {
                icon: <Target className="w-10 h-10" />,
                title: "Capital Engineering",
                description: "Sophisticated structuring expertise that optimizes your entire capital stack",
                image: meetingRoom,
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Hospitality Focus",
                description: "Specialized knowledge of hospitality financing and operational considerations",
                image: commercialBuilding,
              },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl transition-all h-full"
                >
                  <div className="h-40 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <div className="text-royal-blue mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-12 sm:py-16 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">Leadership Team</h2>
            <p className="text-xl text-muted-foreground">
              Experienced professionals dedicated to your success
            </p>
          </AnimatedSection>

          <div className="flex justify-center max-w-4xl mx-auto">
            <AnimatedSection delay={0.1}>
              <div className="bg-card rounded-2xl p-12 shadow-xl border border-border/50">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-navy mb-3">Paresh Govan</h3>
                  <p className="text-xl text-royal-blue font-semibold">President</p>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-border/50">
                  <div className="flex items-center justify-center gap-4">
                    <Phone className="w-5 h-5 text-royal-blue" />
                    <a href="tel:404-434-4932" className="text-lg text-navy hover:text-royal-blue transition-colors font-medium">
                      404-434-4932
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <Mail className="w-5 h-5 text-royal-blue" />
                    <a href="mailto:kiwi@hpg-kapital.com" className="text-lg text-navy hover:text-royal-blue transition-colors font-medium">
                      kiwi@hpg-kapital.com
                    </a>
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

export default About;
