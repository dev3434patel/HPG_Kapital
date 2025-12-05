import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  delay?: number;
  icon?: ReactNode;
}

const ServiceCard = ({ title, description, image, delay = 0, icon }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {icon && (
          <div className="absolute top-4 right-4 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
