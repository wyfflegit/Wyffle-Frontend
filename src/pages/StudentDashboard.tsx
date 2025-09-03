// src/pages/StudentDashboard.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  Home,
  Camera,     
  Edit,        
  Save 
} from "lucide-react";
import { Link } from "react-router-dom";
import { MdPayment } from "react-icons/md";

// ----------------------
// Types
// ----------------------
interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  firstName?: string;
  lastName?: string;
}

interface StudentData {
  name: string;
  institute: string;
  course: string;
  branch: string;
  year: string;
  status: string;
  progress: number;
  joinDate: string;
  photoURL?: string;
}

interface StatusStep {
  name: string;
  status: "completed" | "active" | "pending";
  date: string;
}

interface Document {
  name: string;
  type: string;
  downloadable: boolean;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// ----------------------
// Component
// ----------------------
const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("not selected");
  const [coverImage, setCoverImage] = useState<string>("");

  // Removed unused coverImage state

const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      if (type === 'profile') {
        setStudentData(prev => prev
          ? { ...prev, photoURL: imageUrl }
          : {
              name: "",
              institute: "",
              course: "",
              branch: "",
              year: "",
              status: "",
              progress: 0,
              joinDate: "",
              photoURL: imageUrl
            }
        );
        // Update localStorage if needed
      } else {
        setCoverImage(imageUrl);
      }
    };
    reader.readAsDataURL(file);
  }
};

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      
      // Set student data based on user data
      setStudentData({
        name: parsedData.displayName || "Student",
        institute: "University",
        course: "Computer Science Engineering",
        branch: "CSE",
        year: "3rd Year",
        status: "Active Internship",
        progress: 75,
        joinDate: "2025-01-15",
        photoURL: parsedData.photoURL || "",
      });
    } else {
      // Redirect to login if no user data found
      window.location.href = "/login";
    }
  }, []);

  const inputField = ({ label, value, editable = false }: { label: string; value: string; editable?: boolean }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {editable ? (
      <input
        type="text"
        defaultValue={value}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    ) : (
      <input
        type="text"
        value={value}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
        readOnly
      />
    )}
  </div>
);

  const statusSteps: StatusStep[] = [
    { name: "Application Submitted", status: "completed", date: "2025-01-10" },
    { name: "Resume Shortlisted", status: "completed", date: "2025-01-12" },
    { name: "Interview Completed", status: "completed", date: "2025-01-14" },
    { name: "Payment Processed", status: "completed", date: "2025-01-15" },
    { name: "Internship Active", status: "active", date: "2025-01-15" },
    { name: "Final Showcase", status: "pending", date: "TBD" },
    { name: "Certificate Ready", status: "pending", date: "TBD" },
  ];

  const documents: Document[] = [
    { name: "Offer Letter", type: "PDF", downloadable: true },
    { name: "Payment Invoice", type: "PDF", downloadable: true },
    { name: "Completion Certificate", type: "PDF", downloadable: false },
    { name: "Project Portfolio", type: "ZIP", downloadable: true },
  ];

  const tabs: Tab[] = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "status", label: "Status", icon: TrendingUp },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "payments", label: "Payments", icon: MdPayment },
    { id: "mentorship", label: "Mentorship", icon: MessageCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // ----------------------
  // Utility: Get User Initials
  // ----------------------
  const getInitials = (fullName: string): string => {
    const names = fullName.split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  // ----------------------
  // Tab Content Renderer
  // ----------------------
  const renderTabContent = () => {
    if (!studentData) return null;
    
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Welcome Card */}
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-2xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {userData?.displayName || "Student"}! 👋
              </h2>
              <p className="text-purple-100">
                You're {studentData.progress}% through your internship journey.
                Keep up the great work!
              </p>

              {/* Progress Bar */}
              <div className="mt-6 bg-white/20 rounded-full h-3">
                <motion.div
                  className="bg-white rounded-full h-3"
                  initial={{ width: 0 }}
                  animate={{ width: `${studentData.progress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Calendar,
                  label: "Days Active",
                  value: "45",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Award,
                  label: "Projects",
                  value: "3",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Clock,
                  label: "Hours Logged",
                  value: "180",
                  color: "from-orange-500 to-red-500",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
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
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Current Status
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-lg font-medium text-gray-700">
                  {studentData.status}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  On Track
                </span>
              </div>
            </motion.div>
          </div>
        );

    case "profile":
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-600 relative">
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <motion.label 
            htmlFor="cover-upload"
            className="cursor-pointer bg-white bg-opacity-90 text-purple-700 px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit className="w-4 h-4" />
            <span>Change Cover</span>
            <input 
              id="cover-upload" 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'cover')}
            />
          </motion.label>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-8 pb-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center -mt-16">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg">
              {studentData.photoURL ? (
                <img 
                  src={studentData.photoURL} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-purple-600 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {getInitials(studentData.name)}
                  </span>
                </div>
              )}
            </div>
            <motion.label 
              htmlFor="profile-upload"
              className="absolute bottom-2 right-2 bg-purple-600 text-white p-2 rounded-full cursor-pointer shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Camera className="w-4 h-4" />
              <input 
                id="profile-upload" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'profile')}
              />
            </motion.label>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-4">
            {studentData.name}
          </h2>
          <p className="text-gray-600">{studentData.course} • {studentData.institute}</p>
        </div>

        {/* Profile Information */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Profile Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputField({ label: "Full Name", value: studentData.name, editable: true })}
            {inputField({ label: "Email", value: userData?.email || "Not provided", editable: true })}
            {inputField({ label: "Phone", value: "+91 9876543210", editable: true })}
            {inputField({ label: "Institute", value: studentData.institute, editable: true })}
            {inputField({ label: "Course", value: studentData.course, editable: true })}
            {inputField({ label: "Branch", value: studentData.branch, editable: true })}
            {inputField({ label: "Year", value: studentData.year, editable: true })}
            {inputField({ label: "Enrollment Date", value: studentData.joinDate, editable: false })}
          </div>

          {/* Additional Information */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputField({ label: "Date of Birth", value: "01/01/2000", editable: true })}
              {inputField({ label: "Location", value: "Bhopal, India", editable: true })}
              {inputField({ label: "Skills", value: "React, Node.js, Python", editable: true })}
              {inputField({ label: "Interests", value: "Web Development, AI, IoT", editable: true })}
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
              placeholder="Tell us about yourself..."
              defaultValue="Passionate developer with interest in web technologies and AI. Currently pursuing my degree in Computer Science."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <motion.button
              className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </motion.button>
            
            <motion.button
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

      case "status":
        return (
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Internship Progress
            </h3>
            <div className="space-y-4">
              {statusSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === "completed"
                        ? "bg-green-100"
                        : step.status === "active"
                        ? "bg-blue-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {step.status === "completed" && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {step.status === "active" && (
                      <Clock className="w-5 h-5 text-blue-600" />
                    )}
                    {step.status === "pending" && (
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                    )}
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

      case "documents":
        return (
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Documents & Downloads
            </h3>
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100"
                >
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
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
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

    case "payments":
     return (
      <motion.div
      className="bg-white p-8 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Payment Details
      </h3>
      
      {/* Batch Information */}
      <div className="mb-8 p-6 bg-purple-50 rounded-xl border border-purple-200">
        <h4 className="text-lg font-semibold text-purple-800 mb-2">Batch One: Web Development Internship</h4>
        <p className="text-gray-600">Join our exclusive web development program with hands-on projects and mentorship</p>
      </div>
      
      {/* Payment Status */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Payment Status</h4>
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
          <div className={`w-3 h-3 rounded-full ${
            paymentStatus === "not selected" ? "bg-gray-400" :
            paymentStatus === "pending" ? "bg-yellow-400" :
            "bg-green-400"
          }`}></div>
          <span className="font-medium text-gray-700 capitalize">{paymentStatus}</span>
          {paymentStatus === "not selected" && (
            <span className="ml-auto px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
              Action Required
            </span>
          )}
        </div>
      </div>
      
      {/* Pricing Information */}
      <div className="mb-8 p-6 bg-gray-50 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Pricing Details</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Program Fee</span>
            <span className="font-medium">₹399/-</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Top100 Discount</span>
            <span className="font-medium">-₹100</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-lg">
            <span>Total Amount</span>
            <span>₹299/-</span>
          </div>
        </div>
      </div>
      
      {/* Coupon Application */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Apply Coupon</h4>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <motion.button
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply
          </motion.button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Use code <span className="font-mono bg-gray-100 px-2 py-1 rounded">TOP100</span> for ₹100 instant discount</p>
      </div>
      
      {/* Payment Button */}
      {paymentStatus !== "payment success" && (
        <motion.button
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPaymentStatus("pending")}
        >
          Pay Now - ₹299/-
        </motion.button>
      )}
      
      {/* Payment Success Message */}
      {paymentStatus === "payment success" && (
        <motion.div
          className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">Payment successful! Your enrollment in Batch One is confirmed.</span>
          </div>
        </motion.div>
      )}
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
            <p className="text-gray-600">
              This section is under development.
            </p>
          </motion.div>
        );
    }
  };

  // ----------------------
  // Reusable Input Field
  // ----------------------
  // (Removed duplicate inputField declaration to fix redeclaration error)

  // Show loading state while data is being fetched
  if (!userData || !studentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

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
                <p className="text-sm text-gray-500">
                  {studentData.institute}
                </p>
              </div>
              {studentData.photoURL ? (
                <img
                  src={studentData.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {getInitials(studentData.name)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
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
    </div>
  );
};

export default StudentDashboard;