import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div 
      className="feature-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="feature-icon">
        <Icon size={32} />
      </div>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h3>
      <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
