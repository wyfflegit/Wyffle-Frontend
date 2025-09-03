import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: 'What makes Wyffle different from other internship platforms?',
      answer: 'Wyffle focuses on real-world projects with actual clients, providing mentorship from industry experts, and building a strong community of learners. We don\'t just offer internships; we offer career transformation.'
    },
    {
      question: 'Do I need prior experience to apply?',
      answer: 'No prior professional experience is required! We look for passion, willingness to learn, and basic understanding of your chosen field. Our program is designed to take you from student to professional.'
    },
    {
      question: 'What is the duration of the internship program?',
      answer: 'Our comprehensive internship program runs for 12 weeks, including onboarding, project work, mentorship sessions, and final showcase presentations.'
    },
    {
      question: 'Are the projects real or just practice exercises?',
      answer: 'All projects are real client work with actual deadlines and requirements. You\'ll be working on solutions that will be used by real businesses and users.'
    },
    {
      question: 'What kind of mentorship support do you provide?',
      answer: 'Each intern is paired with an industry mentor who provides weekly one-on-one sessions, code reviews, career guidance, and technical support throughout the program.'
    },
    {
      question: 'How does the payment structure work?',
      answer: 'We have a nominal program fee that covers mentorship, resources, and certification. Payment plans are available, and we also offer scholarship opportunities for deserving candidates.'
    },
    {
      question: 'Will I receive a certificate upon completion?',
      answer: 'Yes! You\'ll receive a verified completion certificate, project recommendations, and LinkedIn endorsements from your mentors upon successful completion of the program.'
    },
    {
      question: 'Is there job placement assistance?',
      answer: 'Absolutely! We have partnerships with 50+ companies and provide job placement assistance, interview preparation, and direct referrals to our top performers.'
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about the Wyffle internship experience.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleItem(index)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-purple-600" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Support Contact */}
        <motion.div
          className="text-center mt-16 p-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-lg mb-6 opacity-90">
            Our team is here to help you make the best decision for your career.
          </p>
          <motion.button
            className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;