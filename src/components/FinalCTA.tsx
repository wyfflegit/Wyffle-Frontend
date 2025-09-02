import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Trophy, Sparkles } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.15),transparent_40%)]"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center text-white">
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-14">
          {[
            { icon: <Star className="w-6 h-6 text-yellow-300" />, text: "4.9/5 Student Rating" },
            { icon: <Users className="w-6 h-6 text-green-300" />, text: "1000+ Alumni" },
            { icon: <Trophy className="w-6 h-6 text-orange-300" />, text: "95% Placement Rate" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-white/10 backdrop-blur-md shadow-md"
              whileHover={{ scale: 1.08 }}
            >
              {item.icon}
              <span className="text-lg font-semibold">{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Take the <span className="text-yellow-300">best decision</span>
          <br /> of your career 🚀
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-2xl mb-12 text-purple-100 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Don’t wait for opportunities. <span className="text-yellow-200">Create them with Wyffle</span>.  
          Your journey to success starts here!
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group relative bg-white text-purple-700 px-10 py-5 rounded-2xl font-bold text-lg flex items-center space-x-3 shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Register Now</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-all"></div>
          </motion.button>

          <motion.button
            className="border-2 border-white/40 px-10 py-5 rounded-2xl font-bold text-lg text-white/90 hover:bg-white/10 backdrop-blur-md transition-all"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className="mt-12 flex justify-center items-center gap-2 text-purple-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          <span>Next batch starts soon • Limited seats available • Apply now</span>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
