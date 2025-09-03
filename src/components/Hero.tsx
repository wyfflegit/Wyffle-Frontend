import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, Briefcase, Award } from "lucide-react";
import Home from "../Assets/Home.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [text, setText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const navigate = useNavigate();

  const firstPart = "Turn Your Skills Into";
  const phrases = [
    "Real-World Experience",
    "Career Growth",
    "Professional Success",
    "Industry Impact",
    "Valuable Expertise",
    "Job Opportunities",
  ];

  // Typewriter effect for the first part
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= firstPart.length) {
        setText(firstPart.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  // Rotating phrases effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) =>
        prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  const stats = [
    { icon: Users, value: "1000+", label: "Students Trained" },
    { icon: Briefcase, value: "500+", label: "Projects Completed" },
    { icon: Award, value: "50+", label: "Partner Companies" },
  ];

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-purple-50 px-6 lg:px-12 pt-24">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-center md:text-left"
        >
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            {text}
            <br />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentPhraseIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-purple-600 text-4xl"
              >
                {phrases[currentPhraseIndex]}
              </motion.span>
            </AnimatePresence>
          </h1>

          {/* Subtext */}
          <motion.p
            className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto md:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
          >
            Wyffle connects you with{" "}
            <span className="text-purple-600 font-semibold">
              projects, mentors, and peers
            </span>
            . Not just an internship—you <strong>grow</strong>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.6 }}
          >
            <motion.button
              className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span onClick={() => navigate("/apply")}>Apply Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Community
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-6 mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 0.8 }}
          >
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={i}
                className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition text-center"
                whileHover={{ y: -4 }}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 mx-auto mb-3">
                  <Icon className="w-6 h-6 text-purple-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{value}</h3>
                <p className="text-gray-600 text-sm">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src={Home}
            alt="Students collaborating on projects"
            className="w-full max-w-xl rounded-3xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
