import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, Briefcase, Award, CheckCircle } from "lucide-react";
import Home from "../Assets/Home-Page1.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [text, setText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const navigate = useNavigate();

  const firstPart = "Turn your skills into";
  const phrases = [
    "Real-World Experience",
    "Career Growth",
    "Professional Success",
    "Industry Impact",
    "Valuable Expertise",
    "Job Opportunities",
  ];

  // Typewriter effect for heading
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
    { icon: Briefcase, value: "50+", label: "Projects Completed" },
    { icon: Award, value: "50+", label: "Students Placed" },
  ];

  const highlights = [
    "Work on real world projects",
    "Industry level mentors",
    "Working environment",
  ];

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-purple-50 px-6 lg:px-12 pt-24">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        {/* LEFT: Text Content */}
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y- text-center md:text-left"
          >
            <div className="flex items-center mb-5 gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-sm w-fit">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="font-medium  text-sm">Not just an internship</p>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
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

            {/* Highlights with green ticks */}
            <div className="space-y-1 text-left mt-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 text-black text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * i, duration: 0.5 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {/* Apply Now */}
              <motion.button
                className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold text-base flex items-center space-x-2 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/apply")}
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Join Community */}
              <motion.button
                className="border-2 border-purple-600 text-purple-600 px-5 py-2 rounded-lg font-bold text-base hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  window.open("https://discord.gg/W4jpq2fBdq", "_blank")
                }
              >
                Join Community
              </motion.button>
            </motion.div>

            {/* Urgency text */}
            <motion.p
              className="text-red-600 font-semibold text-lg mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              ⚡ Only few seats left!
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              {stats.map(({ icon: Icon, value, label }, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition text-center"
                  whileHover={{ y: -3 }}
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-100 mx-auto mb-2">
                    <Icon className="w-4 h-4 text-purple-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {value}
                  </h3>
                  <p className="text-gray-600 text-xs">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT: Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="md:col-span-3 flex justify-center"
        >
          <img
            src={Home}
            alt="Students collaborating on projects"
            className="w-full max-w-5xl mt-[-50px] h-full rounded-3xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
