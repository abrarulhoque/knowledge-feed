import { motion } from "framer-motion";

const ContentCard = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto p-6 rounded-xl bg-[var(--card-bg)] shadow-xl m-4"
    >
      <div className="space-y-4">
        <p className="text-lg text-[var(--text-primary)] leading-relaxed">
          {content}
        </p>
        <div className="flex justify-between items-center text-[var(--text-secondary)] text-sm">
          <span>Swipe for more knowledge ↓</span>
          <span>AI Generated Content</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentCard;
