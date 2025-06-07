// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const RegisterStudent = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     gender: '',
//     passoutYear: '',
//     email: '',
//     password: '',
//     collegeName: '',
//     profilePic: '',
//     github: '',
//     linkedIn: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     if (!formData.fullName.trim()) return 'Full name is required.';
//     if (!formData.gender) return 'Gender is required.';
//     if (!formData.passoutYear.trim()) return 'Passout year is required.';
//     if (!/^\d{4}$/.test(formData.passoutYear)) return 'Passout year must be a valid 4-digit year.';
//     if (!formData.email.trim()) return 'Email is required.';
//     if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email.';
//     if (!formData.password.trim()) return 'Password is required.';
//     if (formData.password.length < 6) return 'Password must be at least 6 characters.';
//     if (!formData.collegeName.trim()) return 'College name is required.';
//     if (formData.github && !/^https?:\/\/(www\.)?github\.com\/.+$/.test(formData.github)) {
//       return 'Please enter a valid GitHub URL.';
//     }
//     if (formData.linkedIn && !/^https?:\/\/(www\.)?linkedin\.com\/.+$/.test(formData.linkedIn)) {
//       return 'Please enter a valid LinkedIn URL.';
//     }
//     if (formData.profilePic && !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(formData.profilePic)) {
//       return 'Please enter a valid image URL (jpg, jpeg, png, gif).';
//     }
//     return '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       setLoading(true);
//       const payload = {
//         role: 'student',
//         fullName: formData.fullName,
//         gender: formData.gender,
//         passoutYear: formData.passoutYear,
//         email: formData.email,
//         password: formData.password,
//         collegeName: formData.collegeName,
//         profilePic: formData.profilePic || undefined,
//         github: formData.github || undefined,
//         linkedIn: formData.linkedIn || undefined,
//       };
//       const res = await axios.post('http://localhost:5000/api/users/signup', payload);
//       setSuccess('Registered successfully! Awaiting admin approval.');
//       setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
//     } catch (error) {
//       console.error('Error during registration:', error);
//       setError(error.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
//         <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Register as Student</h2>
//         {error && (
//           <p className="text-red-600 text-sm mb-4" role="alert">
//             {error}
//           </p>
//         )}
//         {success && (
//           <p className="text-green-600 text-sm mb-4" role="status">
//             {success}
//           </p>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               id="fullName"
//               name="fullName"
//               type="text"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               aria-label="Full name"
//               disabled={loading}
//             />
//           </div>
//           <div>
//             <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
//               Gender
//             </label>
//             <select
//               id="gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               aria-label="Select gender"
//               disabled={loading}
//             >
//               <option value="">Select</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//           <div>
//             <label htmlFor="passoutYear" className="block text-sm font-medium text-gray-700">
//               Passout Year
//             </label>
//             <input
//               id="passoutYear"
//               name="passoutYear"
//               type="text"
//               value={formData.passoutYear}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               aria-label="Passout year"
//               disabled={loading}
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               aria-label="Email address"
//               disabled={loading}
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               aria-label="Password"
//               disabled={loading}
//             />
//           </div>
//           <div>
//             <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">
//               College Name
//             </label>
//             <input
//               id="collegeName"
//               name="collegeName"
//               type="text"
//               value={formData.collegeName}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               aria-label="College name"
//               disabled={loading}
//             />
//           </div>
//           <div>
//             <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
//               Profile Picture URL (Optional)
//             </label>
//             <input
//               id="profilePic"
//               name="profilePic"
//               type="url"
//               value={formData.profilePic}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               aria-label="Profile picture URL"
//               disabled={loading}
//             />
//           </div>
//           <div>
//             <label htmlFor="github" className="block text-sm font-medium text-gray-700">
//               GitHub URL (Optional)
//             </label>
//             <input
//               id="github"
//               name="github"
//               type="url"
//               value={formData.github}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               aria-label="GitHub URL"
//               disabled={loading}
//             />
//           </div>
//           <div>
//             <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">
//               LinkedIn URL (Optional)
//             </label>
//             <input
//               id="linkedIn"
//               name="linkedIn"
//               type="url"
//               value={formData.linkedIn}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               aria-label="LinkedIn URL"
//               disabled={loading}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
//             disabled={loading}
//             aria-label="Register as student"
//           >
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{' '}
//           <Link to="/login" className="text-blue-600 hover:underline" aria-label="Log in">
//             Log In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterStudent;


// import React, { useState } from 'react';

// function Register() {
//   const [formData, setFormData] = useState({
//     role: 'student',
//     fullName: '',
//     gender: '',
//     passoutYear: '',
//     email: '',
//     password: '',
//     collegeName: '',
//     profilePic: '',
//     github: '',
//     linkedIn: '',
//     company: '',
//     domains: '',
//     experience: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = { ...formData };
//     if (formData.role === 'student') {
//       delete payload.company;
//       delete payload.domains;
//       delete payload.experience;
//     } else {
//       payload.domains = payload.domains.split(',').map((d) => d.trim());
//     }

//     try {
//       const res = await fetch('http://localhost:5000/api/users/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert('Registered successfully! Awaiting approval.');
//       } else {
//         alert(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       alert('Error occurred');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Role:
//           <select name="role" value={formData.role} onChange={handleChange} required>
//             <option value="student">Student</option>
//             <option value="alumni">Alumni</option>
//           </select>
//         </label><br />

//         <label>
//           Full Name:
//           <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
//         </label><br />

//         <label>
//           Gender:
//           <select name="gender" value={formData.gender} onChange={handleChange} required>
//             <option value="">--Select--</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </label><br />

//         <label>
//           Passout Year:
//           <input type="text" name="passoutYear" value={formData.passoutYear} onChange={handleChange} required />
//         </label><br />

//         <label>
//           Email:
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </label><br />

//         <label>
//           Password:
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </label><br />

//         <label>
//           College Name:
//           <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} required />
//         </label><br />

//         <label>
//           GitHub:
//           <input type="url" name="github" value={formData.github} onChange={handleChange} />
//         </label><br />

//         <label>
//           LinkedIn:
//           <input type="url" name="linkedIn" value={formData.linkedIn} onChange={handleChange} />
//         </label><br />

//         <label>
//           Profile Picture URL:
//           <input type="url" name="profilePic" value={formData.profilePic} onChange={handleChange} />
//         </label><br />

//         {formData.role === 'alumni' && (
//           <>
//             <label>
//               Company:
//               <input type="text" name="company" value={formData.company} onChange={handleChange} required />
//             </label><br />

//             <label>
//               Domains (comma separated):
//               <input type="text" name="domains" value={formData.domains} onChange={handleChange} required />
//             </label><br />

//             <label>
//               Experience (in years):
//               <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
//             </label><br />
//           </>
//         )}

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;


// import React, { useState } from 'react';

// function Register() {
//   const [formData, setFormData] = useState({
//     role: 'student',
//     fullName: '',
//     gender: '',
//     passoutYear: '',
//     email: '',
//     password: '',
//     collegeName: '',
//     profilePic: '',
//     github: '',
//     linkedIn: '',
//     company: '',
//     domains: '',
//     experience: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = { ...formData };

//     if (formData.role === 'student') {
//       delete payload.company;
//       delete payload.domains;
//       delete payload.experience;
//     } else {
//       payload.domains = payload.domains.split(',').map((d) => d.trim());
//     }

//     try {
//       const res = await fetch('http://localhost:5000/api/users/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert('Registered successfully! Awaiting approval.');
//       } else {
//         alert(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       alert('Error occurred');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 flex items-center justify-center px-4">
//       <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-3xl p-8 text-white border border-white/20">
//         <h2 className="text-3xl font-bold text-center mb-8">Register</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Role */}
//           <div>
//             <label className="block mb-1 font-semibold">Role</label>
//             <select name="role" value={formData.role} onChange={handleChange}
//               className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
//               <option value="student">Student</option>
//               <option value="alumni">Alumni</option>
//             </select>
//           </div>

//           {/* Full Name */}
//           <div>
//             <label className="block mb-1 font-semibold">Full Name</label>
//             <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
//               className="w-full p-2 rounded bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
//           </div>

//           {/* Gender */}
//           <div>
//             <label className="block mb-1 font-semibold">Gender</label>
//             <select name="gender" value={formData.gender} onChange={handleChange}
//               className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400" required>
//               <option value="">--Select--</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* Passout Year */}
//           <div>
//             <label className="block mb-1 font-semibold">Passout Year</label>
//             <input type="text" name="passoutYear" value={formData.passoutYear} onChange={handleChange}
//               className="w-full p-2 rounded bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block mb-1 font-semibold">Email</label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange}
//               className="w-full p-2 rounded bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-1 font-semibold">Password</label>
//             <input type="password" name="password" value={formData.password} onChange={handleChange}
//               className="w-full p-2 rounded bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
//           </div>

//           {/* College Name */}
//           <div>
//             <label className="block mb-1 font-semibold">College Name</label>
//             <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange}
//               className="w-full p-2 rounded bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
//           </div>

//           {/* GitHub */}
//           <div>
//             <label className="block mb-1 font-semibold">GitHub</label>
//             <input type="url" name="github" value={formData.github} onChange={handleChange}
//               className="w-full p-2 rounded bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400" />
//           </div>

//           {/* LinkedIn */}
//           <div>
//             <label className="block mb-1 font-semibold">LinkedIn</label>
//             <input type="url" name="linkedIn" value={formData.linkedIn} onChange={handleChange}
//               className="w-full p-2 rounded bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400" />
//           </div>

//           {/* Profile Pic */}
//           <div className="md:col-span-2">
//             <label className="block mb-1 font-semibold">Profile Picture URL</label>
//             <input type="url" name="profilePic" value={formData.profilePic} onChange={handleChange}
//               className="w-full p-2 rounded bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400" />
//           </div>

//           {/* Alumni Specific Fields */}
//           {formData.role === 'alumni' && (
//             <>
//               <div>
//                 <label className="block mb-1 font-semibold">Company</label>
//                 <input type="text" name="company" value={formData.company} onChange={handleChange}
//                   className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400" required />
//               </div>

//               <div>
//                 <label className="block mb-1 font-semibold">Domains (comma separated)</label>
//                 <input type="text" name="domains" value={formData.domains} onChange={handleChange}
//                   className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400" required />
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block mb-1 font-semibold">Experience (in years)</label>
//                 <input type="number" name="experience" value={formData.experience} onChange={handleChange}
//                   className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400" />
//               </div>
//             </>
//           )}

//           {/* Submit Button */}
//           <div className="md:col-span-2 text-center mt-4">
//             <button type="submit"
//               className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold text-white shadow-md">
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

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
    role: "",
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
      const response = await fetch("http://localhost:5000/api/users/signup", {
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
