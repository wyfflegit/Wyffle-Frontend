import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  FileText,
  Download,
  MessageCircle,
  Settings,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const studentData = {
    name: 'Priya Sharma',
    institute: 'IIT Delhi',
    course: 'Computer Science Engineering',
    branch: 'CSE',
    year: '3rd Year',
    status: 'Active Internship',
    progress: 75,
    joinDate: '2025-01-15'
  };

  const statusSteps = [
    { name: 'Application Submitted', status: 'completed', date: '2025-01-10' },
    { name: 'Resume Shortlisted', status: 'completed', date: '2025-01-12' },
    { name: 'Interview Completed', status: 'completed', date: '2025-01-14' },
    { name: 'Payment Processed', status: 'completed', date: '2025-01-15' },
    { name: 'Internship Active', status: 'active', date: '2025-01-15' },
    { name: 'Final Showcase', status: 'pending', date: 'TBD' },
    { name: 'Certificate Ready', status: 'pending', date: 'TBD' }
  ];

  const documents = [
    { name: 'Offer Letter', type: 'PDF', downloadable: true },
    { name: 'Payment Invoice', type: 'PDF', downloadable: true },
    { name: 'Completion Certificate', type: 'PDF', downloadable: false },
    { name: 'Project Portfolio', type: 'ZIP', downloadable: true }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'status', label: 'Status', icon: TrendingUp },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'mentorship', label: 'Mentorship', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Welcome Card */}
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-2xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-2">Welcome back, {studentData.name}! 👋</h2>
              <p className="text-purple-100">You're {studentData.progress}% through your internship journey. Keep up the great work!</p>
              
              {/* Progress Bar */}
              <div className="mt-6 bg-white/20 rounded-full h-3">
                <motion.div
                  className="bg-white rounded-full h-3"
                  initial={{ width: 0 }}
                  animate={{ width: `${studentData.progress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                ></motion.div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Calendar, label: 'Days Active', value: '45', color: 'from-blue-500 to-cyan-500' },
                { icon: Award, label: 'Projects', value: '3', color: 'from-green-500 to-emerald-500' },
                { icon: Clock, label: 'Hours Logged', value: '180', color: 'from-orange-500 to-red-500' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Current Status */}
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Current Status</h3>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-lg font-medium text-gray-700">Active Internship</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  On Track
                </span>
              </div>
            </motion.div>
          </div>
        );

      case 'profile':
        return (
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={studentData.name}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institute</label>
                <input
                  type="text"
                  value={studentData.institute}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <input
                  type="text"
                  value={studentData.course}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="text"
                  value={studentData.year}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <motion.button
              className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Update Profile
            </motion.button>
          </motion.div>
        );

      case 'status':
        return (
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Internship Progress</h3>
            <div className="space-y-4">
              {statusSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.status === 'completed' ? 'bg-green-100' : 
                    step.status === 'active' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {step.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {step.status === 'active' && <Clock className="w-5 h-5 text-blue-600" />}
                    {step.status === 'pending' && <AlertCircle className="w-5 h-5 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{step.name}</h4>
                    <p className="text-sm text-gray-500">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'documents':
        return (
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Documents & Downloads</h3>
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <FileText className="w-6 h-6 text-purple-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-500">{doc.type} Document</p>
                    </div>
                  </div>
                  
                  <motion.button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium ${
                      doc.downloadable 
                        ? 'bg-purple-600 text-white hover:bg-purple-700' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!doc.downloadable}
                    whileHover={doc.downloadable ? { scale: 1.02 } : {}}
                    whileTap={doc.downloadable ? { scale: 0.98 } : {}}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Coming Soon</h3>
            <p className="text-gray-600">This section is under development.</p>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">W</span>
                </div>
                <span className="text-2xl font-bold gradient-text">Wyffle</span>
              </Link>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 font-medium">Student Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{studentData.name}</p>
                <p className="text-sm text-gray-500">{studentData.institute}</p>
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">PS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    whileHover={{ x: activeTab === tab.id ? 0 : 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;