import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Zap, Heart } from 'lucide-react';

const Community = () => {
  const communityFeatures = [
    {
      icon: MessageCircle,
      title: '24/7 Discord Support',
      description: 'Get instant help from peers and mentors anytime'
    },
    {
      icon: Users,
      title: 'Study Groups',
      description: 'Join focused study sessions and collaborative learning'
    },
    {
      icon: Zap,
      title: 'Live Events',
      description: 'Weekly tech talks, workshops, and networking sessions'
    },
    {
      icon: Heart,
      title: 'Peer Support',
      description: 'Connect with students from top colleges across India'
    }
  ];

  return (
    <section id="community" className="py-20 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our <span className="text-yellow-300">Community</span>
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Be part of India's most vibrant student tech community. Learn, grow, and succeed together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <feature.icon className="w-8 h-8 text-yellow-300" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-purple-100 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Community Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { number: '1000+', label: 'Active Members' },
            { number: '50+', label: 'Daily Messages' },
            { number: '20+', label: 'Weekly Events' },
            { number: '100%', label: 'Support Rate' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.h3
                className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-purple-100 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center space-x-3 mx-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-6 h-6" />
            <span>Join Discord Community</span>
          </motion.button>
          <p className="text-purple-200 mt-4">
            Free to join • 1000+ active members • 24/7 support
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;