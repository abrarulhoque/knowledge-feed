import { motion } from "framer-motion";

const ContentCard = ({ content, onNext, onPrev, isFirst, isLast }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative max-w-2xl mx-auto p-6 rounded-xl bg-[var(--card-bg)] shadow-xl m-4"
    >
      <div className="space-y-4">
        <p className="text-lg text-[var(--text-primary)] leading-relaxed">
          {content}
        </p>
        <div className="flex justify-between items-center text-[var(--text-secondary)] text-sm">
          <span>Use buttons to navigate</span>
          <span>AI Generated Content</span>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="w-24 h-12 flex items-center justify-center gap-2 rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black/50 disabled:active:scale-100"
          aria-label="Previous content"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">Prev</span>
        </button>

        <button
          onClick={onNext}
          disabled={isLast}
          className="w-24 h-12 flex items-center justify-center gap-2 rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black/50 disabled:active:scale-100"
          aria-label="Next content"
        >
          <span className="text-sm font-medium">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default ContentCard;
