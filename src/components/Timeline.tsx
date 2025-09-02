import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Code, 
  Trophy, 
  FileCheck,
  Sparkles
} from 'lucide-react';

const Timeline = () => {
  const journeySteps = [
    {
      icon: BookOpen,
      title: 'Onboarding',
      description: 'Comprehensive orientation program, resource access, and team introductions',
      duration: 'Week 1',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Mentorship',
      description: 'Paired with industry experts for personalized guidance and weekly check-ins',
      duration: 'Week 2-4',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Code,
      title: 'Projects',
      description: 'Hands-on work on real client projects with cutting-edge technologies',
      duration: 'Week 5-10',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Trophy,
      title: 'Final Showcase',
      description: 'Present your work to industry professionals and receive feedback',
      duration: 'Week 11',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: FileCheck,
      title: 'Certificates',
      description: 'Receive verified completion certificates and LinkedIn recommendations',
      duration: 'Week 12',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Internship Program <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A structured 12-week program designed to transform you from a student into an industry-ready professional.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-300 to-indigo-300 hidden lg:block"></div>

          <div className="space-y-16 lg:space-y-24">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Content */}
                <div className="flex-1 lg:max-w-lg">
                  <motion.div
                    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                        <span className="text-purple-600 font-semibold text-sm">
                          {step.duration}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <motion.div
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                  </motion.div>
                </motion.div>

                {/* Spacer for alignment */}
                <div className="flex-1 lg:max-w-lg hidden lg:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;