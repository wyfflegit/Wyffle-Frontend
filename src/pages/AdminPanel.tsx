import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  CreditCard,
  Settings,
  Search,
  Filter,
  Mail,
  CheckCircle,
  AlertTriangle,
  Plus,
  Eye,
  Edit,
  X,
  Download,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../Assets/Logo-BG.jpg";

// Interface definitions
interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  institute: string;
  course: string;
  branch: string;
  year: string;
  status: string;
  paymentStatus: string;
  resumeUploaded: boolean;
  joinDate: string;
  progress: number;
  project: string;
  mentor: string;
  skills: string[];
  address: string;
    // Add new optional fields for uploads
  offerLetter?: File | null;
  certificate?: File | null;
  invoice?: File | null;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StatItem {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("students");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [editedStudent, setEditedStudent] = useState<Student | null>(null);

  const students: Student[] = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@iitd.ac.in",
      phone: "+91 9876543210",
      institute: "IIT Delhi",
      course: "Computer Science Engineering",
      branch: "CSE",
      year: "3rd Year",
      status: "active",
      paymentStatus: "paid",
      resumeUploaded: true,
      joinDate: "2025-01-15",
      progress: 75,
      project: "E-commerce Website",
      mentor: "Dr. Rajesh Kumar",
      skills: ["React", "Node.js", "MongoDB"],
      address: "New Delhi, India",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul.kumar@nitt.edu",
      phone: "+91 9876543211",
      institute: "NIT Trichy",
      course: "Electronics and Communication",
      branch: "ECE",
      year: "4th Year",
      status: "shortlisted",
      paymentStatus: "pending",
      resumeUploaded: true,
      joinDate: "2025-01-18",
      progress: 0,
      project: "IoT Smart Home",
      mentor: "Prof. Sunita Patel",
      skills: ["Python", "IoT", "Embedded Systems"],
      address: "Chennai, India",
    },
    {
      id: 3,
      name: "Ananya Patel",
      email: "ananya.patel@bits-pilani.ac.in",
      phone: "+91 9876543212",
      institute: "BITS Pilani",
      course: "Computer Science",
      branch: "CS",
      year: "2nd Year",
      status: "completed",
      paymentStatus: "paid",
      resumeUploaded: true,
      joinDate: "2024-10-15",
      progress: 100,
      project: "AI Chatbot",
      mentor: "Dr. Amit Verma",
      skills: ["Python", "ML", "NLP"],
      address: "Pilani, India",
    },
  ];

  const tabs: Tab[] = [
    { id: "students", label: "Students", icon: Users },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const statusOptions: string[] = [
    "shortlisted",
    "active",
    "completed",
    "rejected",
    "pending",
  ];
  const paymentStatusOptions: string[] = [
    "paid",
    "pending",
    "failed",
    "not selected",
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "active":
        return "text-blue-700 bg-blue-100";
      case "shortlisted":
        return "text-yellow-700 bg-yellow-100";
      case "completed":
        return "text-green-700 bg-green-100";
      case "pending":
        return "text-gray-700 bg-gray-100";
      case "rejected":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getPaymentStatusColor = (status: string): string => {
    switch (status) {
      case "paid":
        return "text-green-700 bg-green-100";
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      case "failed":
        return "text-red-700 bg-red-100";
      case "not selected":
        return "text-gray-700 bg-gray-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const filteredStudents: Student[] = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.institute.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus && student.resumeUploaded;
  });

  const handleViewStudent = (student: Student): void => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleEditStudent = (student: Student): void => {
    setSelectedStudent(student);
    setEditedStudent({ ...student });
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (): void => {
    // Here you would typically update the database
    console.log("Saving changes:", editedStudent);
    setIsEditModalOpen(false);
    setSelectedStudent(null);
    setEditedStudent(null);
  };

  const handleSendEmail = (email: string): void => {
    window.open(
      `mailto:${email}?subject=Update from Wyffle Internship Program`,
      "_blank"
    );
  };

  const handleDownloadResume = (student: Student): void => {
    // Simulate resume download
    console.log("Downloading resume for:", student.name);
    // Actual implementation would download the file
  };

  // Modal Components
  const ViewStudentModal: React.FC = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Student Details
            </h3>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {selectedStudent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">
                    {selectedStudent.name}
                  </h4>
                  <p className="text-gray-600">{selectedStudent.email}</p>
                  <p className="text-gray-600">{selectedStudent.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold mb-3">Academic Information</h5>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-500">Institute:</span>{" "}
                      {selectedStudent.institute}
                    </p>
                    <p>
                      <span className="text-gray-500">Course:</span>{" "}
                      {selectedStudent.course}
                    </p>
                    <p>
                      <span className="text-gray-500">Branch:</span>{" "}
                      {selectedStudent.branch}
                    </p>
                    <p>
                      <span className="text-gray-500">Year:</span>{" "}
                      {selectedStudent.year}
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-3">Program Details</h5>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-500">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-sm ${getStatusColor(
                          selectedStudent.status
                        )}`}
                      >
                        {selectedStudent.status}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-500">Payment:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-sm ${getPaymentStatusColor(
                          selectedStudent.paymentStatus
                        )}`}
                      >
                        {selectedStudent.paymentStatus}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-500">Project:</span>{" "}
                      {selectedStudent.project}
                    </p>
                    <p>
                      <span className="text-gray-500">Mentor:</span>{" "}
                      {selectedStudent.mentor}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-3">Skills & Address</h5>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedStudent.skills.map(
                    (skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
                <p>
                  <span className="text-gray-500">Address:</span>{" "}
                  {selectedStudent.address}
                </p>
              </div>

              <div className="flex space-x-4 pt-4">
                <motion.button
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleDownloadResume(selectedStudent)}
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </motion.button>
                <motion.button
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleSendEmail(selectedStudent.email)}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Email</span>
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  const EditStudentModal: React.FC = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Edit Student</h3>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

       {editedStudent && (
  <div className="space-y-4">
    {/* Status */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
      <select
        value={editedStudent.status}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
          setEditedStudent({...editedStudent, status: e.target.value})
        }
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
      >
        {statusOptions.map((option: string) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>

    {/* Payment Status */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
      <select
        value={editedStudent.paymentStatus}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
          setEditedStudent({...editedStudent, paymentStatus: e.target.value})
        }
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
      >
        {paymentStatusOptions.map((option: string) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>

    {/* Progress */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
      <input
        type="number"
        min="0"
        max="100"
        value={editedStudent.progress}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
          setEditedStudent({...editedStudent, progress: parseInt(e.target.value) || 0})
        }
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
      />
    </div>

    {/* File Uploads */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Offer Letter</label>
      <input
        type="file"
        accept=".pdf,.jpg,.png"
        onChange={(e) =>
          setEditedStudent({
            ...editedStudent,
            offerLetter: e.target.files ? e.target.files[0] : null
          })
        }
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Certificate</label>
      <input
        type="file"
        accept=".pdf,.jpg,.png"
        onChange={(e) =>
          setEditedStudent({
            ...editedStudent,
            certificate: e.target.files ? e.target.files[0] : null
          })
        }
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Invoice</label>
      <input
        type="file"
        accept=".pdf,.jpg,.png"
        onChange={(e) =>
          setEditedStudent({
            ...editedStudent,
            invoice: e.target.files ? e.target.files[0] : null
          })
        }
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
    </div>

    {/* Save + Cancel */}
    <div className="flex space-x-4 pt-4">
      <motion.button
        className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold"
        whileHover={{ scale: 1.02 }}
        onClick={handleSaveChanges}
      >
        Save Changes
      </motion.button>
      <motion.button
        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsEditModalOpen(false)}
      >
        Cancel
      </motion.button>
    </div>
  </div>
)}

        </div>
      </motion.div>
    </div>
  );

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case "students":
        return (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStatusFilter(e.target.value)
                  }
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  {statusOptions.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Students List */}
            <div className="space-y-4">
              {filteredStudents.map((student: Student, index: number) => (
                <motion.div
                  key={student.id}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {student.name}
                          </h3>
                          <p className="text-gray-600">{student.email}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Institute</p>
                          <p className="font-medium text-gray-900">
                            {student.institute}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Course</p>
                          <p className="font-medium text-gray-900">
                            {student.course}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Year</p>
                          <p className="font-medium text-gray-900">
                            {student.year}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            student.status
                          )}`}
                        >
                          {student.status}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(
                            student.paymentStatus
                          )}`}
                        >
                          Payment: {student.paymentStatus}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          Progress: {student.progress}%
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <motion.button
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleViewStudent(student)}
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditStudent(student)}
                      >
                        <Edit className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSendEmail(student.email)}
                      >
                        <Mail className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h3>
            <p className="text-gray-600">This section is under development.</p>
          </motion.div>
        );
    }
  };

  const stats: StatItem[] = [
    {
      label: "Total Students",
      value: students.filter((s) => s.resumeUploaded).length,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Active Interns",
      value: students.filter((s) => s.status === "active").length,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Pending Payments",
      value: students.filter((s) => s.paymentStatus === "pending").length,
      icon: AlertTriangle,
      color: "from-yellow-500 to-orange-500",
    },
    {
      label: "Completed",
      value: students.filter((s) => s.status === "completed").length,
      icon: CheckCircle,
      color: "from-purple-500 to-violet-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <img src={logo} alt="logo" className="rounded-md" />
                </div>
                <span className="text-2xl font-bold gradient-text">Wyffle</span>
              </Link>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 font-medium">Admin Panel</span>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Student</span>
              </motion.button>

              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat: StatItem, index: number) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

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
                {tabs.map((tab: Tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:bg-gray-50"
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

      {/* Modals */}
      {isViewModalOpen && <ViewStudentModal />}
      {isEditModalOpen && <EditStudentModal />}
    </div>
  );
};

export default AdminPanel;
