import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const FeaturedProjects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack web application with React, Node.js, and MongoDB',
      image: 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      techs: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      student: 'Priya Sharma',
      institute: 'IIT Delhi'
    },
    {
      title: 'AI Chat Application',
      description: 'Real-time chat app with AI integration and modern UI',
      image: 'https://images.pexels.com/photos/207580/pexels-photo-207580.jpeg?auto=compress&cs=tinysrgb&w=800',
      techs: ['React', 'WebSocket', 'OpenAI', 'Firebase'],
      student: 'Rahul Kumar',
      institute: 'NIT Trichy'
    },
    {
      title: 'Food Delivery App',
      description: 'Mobile-first application with location tracking and payments',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      techs: ['React Native', 'Express', 'PostgreSQL', 'Maps API'],
      student: 'Ananya Patel',
      institute: 'BITS Pilani'
    },
    {
      title: 'Task Management Tool',
      description: 'Collaborative productivity app with team features',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      techs: ['Vue.js', 'Django', 'Redis', 'Docker'],
      student: 'Arjun Singh',
      institute: 'VIT Chennai'
    },
    {
      title: 'Learning Management System',
      description: 'Educational platform with video streaming and assessments',
      image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800',
      techs: ['Next.js', 'Prisma', 'AWS', 'Stripe'],
      student: 'Sneha Gupta',
      institute: 'DTU Delhi'
    },
    {
      title: 'IoT Dashboard',
      description: 'Real-time monitoring dashboard for IoT devices',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      techs: ['React', 'MQTT', 'InfluxDB', 'Grafana'],
      student: 'Karthik Reddy',
      institute: 'IIIT Hyderabad'
    }
  ];

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our students have built during their internships. Real projects, real impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    className="p-2 bg-white/90 rounded-full shadow-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ExternalLink className="w-4 h-4 text-gray-700" />
                  </motion.button>
                  <motion.button
                    className="p-2 bg-white/90 rounded-full shadow-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Github className="w-4 h-4 text-gray-700" />
                  </motion.button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techs.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Student Info */}
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{project.student}</p>
                  <p className="text-sm text-gray-500">{project.institute}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;