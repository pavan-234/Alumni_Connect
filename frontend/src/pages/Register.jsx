// export default Register;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  AtSign,
  Lock,
  School,
  Github,
  Linkedin,
  Image,
  Building,
  BadgeInfo,
  Briefcase,
  Calendar,
  ChevronLeft,
  UserCheck,
} from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    role: "student",
    fullName: "",
    gender: "",
    passoutYear: "",
    email: "",
    password: "",
    collegeName: "",
    // profilePic: "",
    github: "",
    linkedIn: "",
    company: "",
    domains: "",
    experience: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };
    if (formData.role === "student") {
      delete payload.company;
      delete payload.domains;
      delete payload.experience;
    } else {
      payload.domains = payload.domains.split(",").map((domain) => domain.trim());
    }

    try {
      const response = await fetch("https://alumni-connect-six.vercel.app/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registered successfully! Awaiting approval.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel (Register Form) */}
      <div className="w-full md:w-1/2 bg-gray-900 text-white flex flex-col px-10 py-12 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition"
        >
          <ChevronLeft size={18} /> Back
        </button>

        <h2 className="text-4xl font-bold mb-10 text-center mt-8">Register</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Role */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold">
              <UserCheck size={18} /> Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>

          {/* Full Name */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold">
              <User size={18} /> Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold">
              <BadgeInfo size={18} /> Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Passout Year */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold">
              <Calendar size={18} /> Passout Year
            </label>
            <input
              type="text"
              name="passoutYear"
              value={formData.passoutYear}
              onChange={handleChange}
              required
              placeholder="Enter your passout year"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold">
              <AtSign size={18} /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold">
              <Lock size={18} /> Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter a password"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* College Name */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold">
              <School size={18} /> College Name
            </label>
            <input
              type="text"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              required
              placeholder="Enter your college"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold">
              <Github size={18} /> GitHub URL
            </label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold">
              <Linkedin size={18} /> LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
{/* 
          Profile Picture */}
          {/* <div className="md:col-span-2">
            <label className="flex items-center gap-2 mb-2 font-semibold">
              <Image size={18} /> Profile Picture URL
            </label>
            <input
              type="url"
              name="profilePic"
              value={formData.profilePic}
              onChange={handleChange}
              placeholder="Link to your profile picture"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div> */}

          {/* Alumni-only fields */}
          {formData.role === "alumni" && (
            <>
              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold">
                  <Building size={18} /> Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Where do you work?"
                  className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold">
                  <BadgeInfo size={18} /> Domains (comma separated)
                </label>
                <input
                  type="text"
                  name="domains"
                  value={formData.domains}
                  onChange={handleChange}
                  required
                  placeholder="e.g. AI, Web Dev, Cloud"
                  className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 mb-2 font-semibold">
                  <Briefcase size={18} /> Experience (years)
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
                  placeholder="Number of years"
                  className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-8">
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white px-10 py-3 rounded-xl font-semibold transition"
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center mt-8">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel (Welcome) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white flex-col justify-center items-center p-16">
        <h1 className="text-5xl font-extrabold mb-6">Welcome!!!</h1>
        <p className="text-xl font-light max-w-md text-center">
          Connect with alumni and students, explore opportunities, and grow your career with us.
        </p>
        <div className="mt-12 w-64 h-64 bg-purple-700 rounded-lg flex items-center justify-center opacity-60">
          <img
            src="../../undraw_sign-up_z2ku.png"
            alt="Register Illustration"
            className="w-64 h-64 opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
