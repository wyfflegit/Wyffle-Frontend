import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Apply = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    location: "",
    college: "",
    degree: "",
    graduation: "",
    skills: "",
    field: "",
    resumeFile: null as File | null,
    resumeLink: "",
    motivation: "",
    availability: "",
    hearAbout: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted ✅", formData);
    toast.success("Application submitted successfully! 🎉");
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100  flex items-center py-24 justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
           Internship Program Registration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone / WhatsApp Number"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* DOB */}
          <input
            type="date"
            name="dob"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.location}
            onChange={handleChange}
          />

          {/* Education */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="college"
              placeholder="College"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.college}
              onChange={handleChange}
            />
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.degree}
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="graduation"
            placeholder="Year of Graduation"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.graduation}
            onChange={handleChange}
          />

          {/* Skills */}
          <textarea
            name="skills"
            placeholder="Your Skills (comma separated)"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={2}
            value={formData.skills}
            onChange={handleChange}
          />

          {/* Interested Field */}
          <select
            name="field"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.field}
            onChange={handleChange}
            required
          >
            <option value="">Select Interested Field</option>
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="AI/ML">AI / ML</option>
            <option value="UI/UX Design">UI / UX Design</option>
            <option value="Marketing">Marketing</option>
          </select>

          {/* Resume File */}
          <input
            type="file"
            name="resumeFile"
            accept=".pdf,.doc,.docx"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
          />

          {/* Resume Link */}
          <input
            type="url"
            name="resumeLink"
            placeholder="Resume / Portfolio Link"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.resumeLink}
            onChange={handleChange}
          />

          {/* Motivation */}
          <textarea
            name="motivation"
            placeholder="Why do you want to join Wyffle?"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
            value={formData.motivation}
            onChange={handleChange}
            required
          />

          {/* Availability */}
          <input
            type="text"
            name="availability"
            placeholder="Availability (e.g. 4 hours/day, full-time)"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.availability}
            onChange={handleChange}
          />

          {/* Hear About */}
          <input
            type="text"
            name="hearAbout"
            placeholder="How did you hear about us? (Optional)"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.hearAbout}
            onChange={handleChange}
          />

          {/* Submit */}
          <motion.button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Submit Application
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Apply;
