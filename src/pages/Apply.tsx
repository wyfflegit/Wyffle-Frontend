import { motion } from "framer-motion";
import { useState, ChangeEvent, FormEvent, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../Context/AuthContext";

// --- Reusable Input Group Component ---
interface InputGroupProps {
  label: string;
  name: string;
  required?: boolean;
  children: ReactNode;
}
const InputGroup = ({ label, name, required, children }: InputGroupProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

// --- Main Apply Component ---
const Apply = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      toast.error("Please log in to submit an application.");
      navigate("/login");
    } else {
      setFormData((prev) => ({ ...prev, email: currentUser.email || "" }));
    }
  }, [currentUser, navigate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          // 5MB limit
          toast.error("File size must not exceed 5MB.");
          return;
        }
        setFormData((prev) => ({ ...prev, resumeFile: file }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("Authentication error. Please log in again.");
      return;
    }

    // Check if either resume link or file is provided
    if (!formData.resumeLink.trim() && !formData.resumeFile) {
      toast.error(
        "Please provide either a Resume/Portfolio Link or upload a resume file."
      );
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      const token = await currentUser.getIdToken();
      let uploadedResumeURL = formData.resumeLink; // Start with the link

      // If a file is uploaded, use it instead of the link
      if (formData.resumeFile) {
        const file = formData.resumeFile;
        const storageRef = ref(
          storage,
          `resumes/${currentUser.uid}/${Date.now()}_${file.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Create a promise to handle the upload
        uploadedResumeURL = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(Math.round(progress));
            },
            (error) => {
              reject(error);
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url);
              } catch (error) {
                reject(error);
              }
            }
          );
        });
      }

      const payload = {
        ...formData,
        resumeFile: undefined, // Remove the file object from payload
        resumeURL: uploadedResumeURL,
        userId: currentUser.uid,
      };

      const response = await fetch("http://localhost:3000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit application.");
      }

      toast.success("Application submitted successfully!");
      setTimeout(() => {
        navigate("/student-dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const inputStyles =
    "w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition";

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center py-20 justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Internship Application
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <InputGroup label="Full Name" name="fullName" required>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className={inputStyles}
              />
            </InputGroup>
            <InputGroup label="Email" name="email" required>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputStyles}
                readOnly
              />
            </InputGroup>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <InputGroup label="Phone" name="phone" required>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={inputStyles}
              />
            </InputGroup>
            <InputGroup label="Date of Birth" name="dob" required>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className={inputStyles}
              />
            </InputGroup>
          </div>

          <InputGroup label="Current Location" name="location">
            <input
              type="text"
              name="location"
              placeholder="City, State"
              value={formData.location}
              onChange={handleChange}
              className={inputStyles}
            />
          </InputGroup>

          <div className="grid md:grid-cols-2 gap-5">
            <InputGroup label="College" name="college">
              <input
                type="text"
                name="college"
                placeholder="Your college name"
                value={formData.college}
                onChange={handleChange}
                className={inputStyles}
              />
            </InputGroup>
            <InputGroup label="Degree" name="degree">
              <input
                type="text"
                name="degree"
                placeholder="B.Tech, B.Sc., etc."
                value={formData.degree}
                onChange={handleChange}
                className={inputStyles}
              />
            </InputGroup>
          </div>

          <InputGroup label="Year of Graduation" name="graduation">
            <input
              type="text"
              name="graduation"
              placeholder="e.g., 2026"
              value={formData.graduation}
              onChange={handleChange}
              className={inputStyles}
            />
          </InputGroup>

          <InputGroup label="Skills" name="skills">
            <textarea
              name="skills"
              placeholder="e.g., React, Node.js, Figma (comma separated)"
              value={formData.skills}
              onChange={handleChange}
              className={inputStyles}
              rows={2}
            ></textarea>
          </InputGroup>

          <InputGroup label="Field of Interest" name="field" required>
            <select
              name="field"
              value={formData.field}
              onChange={handleChange}
              required
              className={inputStyles}
            >
              <option value="">Select a field</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="AI / ML">AI / ML</option>
              <option value="UI / UX Design">UI / UX Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </InputGroup>

          <InputGroup label="Linkedin / Portfolio Link" name="resumeLink">
            <input
              type="url"
              name="resumeLink"
              placeholder="https://linkedin.com/in/your-profile"
              value={formData.resumeLink}
              onChange={handleChange}
              className={inputStyles}
            />
            <p className="text-xs text-gray-500 mt-1">
              Provide a link OR upload a file below
            </p>
          </InputGroup>

          <InputGroup label="Upload Resume" name="resumeFile">
            <input
              type="file"
              name="resumeFile"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className={`${inputStyles} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200`}
            />
            {uploadProgress > 0 && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <p className="text-xs text-center mt-1">
                  {uploadProgress}% uploaded
                </p>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Max file size: 5MB (PDF, DOC, DOCX)
            </p>
          </InputGroup>

          <InputGroup
            label="Why do you want to join?"
            name="motivation"
            required
          >
            <textarea
              name="motivation"
              placeholder="Your motivation..."
              value={formData.motivation}
              onChange={handleChange}
              required
              className={inputStyles}
              rows={3}
            ></textarea>
          </InputGroup>

          <InputGroup label="Availability" name="availability">
            <input
              type="text"
              name="availability"
              placeholder="e.g., Full-time, 4 hours/day"
              value={formData.availability}
              onChange={handleChange}
              className={inputStyles}
            />
          </InputGroup>

          <InputGroup label="How did you hear about us?" name="hearAbout">
            <input
              type="text"
              name="hearAbout"
              placeholder="e.g., LinkedIn, college, friend"
              value={formData.hearAbout}
              onChange={handleChange}
              className={inputStyles}
            />
          </InputGroup>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-4 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl"
            whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
          >
            {isSubmitting
              ? `Submitting... ${
                  uploadProgress > 0 ? uploadProgress + "%" : ""
                }`
              : "Submit Application"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Apply;
