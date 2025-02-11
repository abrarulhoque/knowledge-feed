import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import "./App.css";
import ContentCard from "./components/ContentCard";

const SYSTEM_PROMPT = `Generate a concise, easy-to-understand knowledge snippet (4-5 lines) using everyday language that alternates between these themes:

Simple explanations about: how your body works (especially brain and body systems), why people behave certain ways, how to start a business, how to learn new skills, or how to manage money better.
Interesting facts about: how people make decisions, how money and markets work, new technology, or how our minds can trick us.
Stories from history or life lessons that show: how people behave, what makes people successful, how to be a good leader, or how societies work.
Tips for self-improvement about: how to focus better, building good habits, staying motivated for exercise, managing time better, or understanding emotions.

For each snippet:
- Include a surprising fact or something most people don't know
- Use real examples or stories from history
- Show how this knowledge can be used in daily life
- Explain 'how' and 'why' things work
- Use simple words that everyone knows

Format: Write like you're talking to a friend. Each snippet should take about 15-20 seconds to read.
Avoid: Basic advice everyone knows, complicated words, or technical language.`;

function App() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const touchStartY = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const generateContent = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://rough-lab-23f8.abrarul-hoque-toha.workers.dev/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4-turbo-preview",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: "Generate one knowledge snippet." },
            ],
            temperature: 0.7,
            max_tokens: 200,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      const newContent = data.choices[0].message.content;
      setContents((prev) => [...prev, newContent]);
      setError(null);
    } catch (err) {
      setError("Failed to generate content. Please try again later.");
      console.error("Error generating content:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartY.current) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;

    // Require a minimum swipe distance to trigger navigation
    if (Math.abs(deltaY) > 50) {
      if (deltaY < 0 && currentIndex < contents.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (deltaY > 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }

    touchStartY.current = null;
  };

  const handleNext = useCallback(() => {
    if (currentIndex < contents.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, contents.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    // Generate initial content
    if (contents.length === 0) {
      generateContent();
    }
  }, []);

  useEffect(() => {
    // Generate more content when user reaches the last card
    if (inView && !loading && currentIndex === contents.length - 1) {
      generateContent();
    }
  }, [inView, loading, currentIndex, contents.length]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center p-4">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button
            onClick={() => {
              setError(null);
              generateContent();
            }}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden touch-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="h-full flex items-center justify-center"
        >
          {contents[currentIndex] && (
            <ContentCard
              content={contents[currentIndex]}
              onNext={handleNext}
              onPrev={handlePrev}
              isFirst={currentIndex === 0}
              isLast={currentIndex === contents.length - 1}
            />
          )}
        </motion.div>
      </AnimatePresence>
      {loading && (
        <div className="absolute inset-x-0 bottom-4 flex justify-center">
          <div className="text-[var(--text-secondary)] bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
            Loading more knowledge...
          </div>
        </div>
      )}
      <div ref={ref} className="sr-only" />
    </div>
  );
}

export default App;
