import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Heart,
  Code,
  MessageCircle,
  Award,
  Target
} from 'lucide-react';

const WhyWyffle = () => {
  const features = [
    {
      icon: Briefcase,
      title: 'Real Projects',
      description: 'Work on actual industry projects that matter, building your portfolio while gaining practical experience.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a vibrant community of like-minded students, sharing knowledge and growing together.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'Mentorship',
      description: 'Get guidance from industry experts who care about your growth and career development.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Award,
      title: 'Career Growth',
      description: 'Fast-track your career with certificates, recommendations, and direct placement opportunities.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const achievements = [
    { icon: Code, label: 'Real-World Projects' },
    { icon: MessageCircle, label: 'Freelancing' },
    { icon: Target, label: 'Industry Ready' },
    { icon: Heart, label: 'Student First' }
  ];

  return (
    <section id="why-wyffle" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Story Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Story & <span className="gradient-text">Proof</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Born from hackathon victories and student success stories, Wyffle has become 
            the premier platform for turning academic knowledge into industry expertise.
          </p>
          
          {/* Achievement Tags */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <achievement.icon className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-700">{achievement.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Wyffle */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="gradient-text">Wyffle?</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're not just another internship platform. We're your partner in professional growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg card-hover group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h4>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWyffle;