// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const StudentUpdateProfile = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const role = localStorage.getItem('role');

//   const getToken = () => {
//     const role = localStorage.getItem('role');
//     const token =
//       role === 'student'
//         ? localStorage.getItem('student_token')
//         : role === 'alumni'
//         ? localStorage.getItem('alumni_token')
//         : role === 'admin'
//         ? localStorage.getItem('admin_token')
//         : null;
//     console.log(`Token for role ${role}:`, token);
//     return token;
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setError('');
//         setSuccess('');
//         const token = getToken();

//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         const res = await axios.get('http://localhost:5000/api/users/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = res.data || {};
//         setFormData({
//           fullName: data.fullName || '',
//           gender: data.gender || '',
//           passoutYear: data.passoutYear || '',
//           collegeName: data.collegeName || '',
//           github: data.github || '',
//           linkedIn: data.linkedIn || '',
//           profilePic: data.profilePic || '',
//           experience: data.experience || '',
//         });
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError('Failed to load profile. Please log in again.');
//         if (err.response?.status === 401) {
//           localStorage.removeItem(`${role}_token`);
//           navigate('/login');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate, role]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     if (!formData.fullName?.trim()) return 'Full name is required.';
//     if (!formData.gender) return 'Gender is required.';
//     if (!formData.passoutYear?.trim()) return 'Passout year is required.';
//     if (!/^\d{4}$/.test(formData.passoutYear)) return 'Passout year must be a 4-digit year.';
//     if (!formData.collegeName?.trim()) return 'College name is required.';
//     if (!formData.profilePic?.trim()) return 'Profile picture URL is required.';
//     if (formData.github && !/^https?:\/\/(www\.)?github\.com\/.+$/.test(formData.github)) {
//       return 'Invalid GitHub URL.';
//     }
//     if (formData.linkedIn && !/^https?:\/\/(www\.)?linkedin\.com\/.+$/.test(formData.linkedIn)) {
//       return 'Invalid LinkedIn URL.';
//     }
//     if (formData.profilePic && !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(formData.profilePic)) {
//       return 'Profile picture must be an image URL.';
//     }
//     if (role === 'alumni' && !formData.experience?.trim()) {
//       return 'Experience is required for alumni.';
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
//       setSubmitting(true);
//       const token = getToken();
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       await axios.put(
//         'http://localhost:5000/api/users/profile',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       setSuccess('Profile updated successfully!');
//     } catch (err) {
//       console.error('Update error:', err);
//       setError(err.response?.data?.message || 'Failed to update profile.');
//       if (err.response?.status === 401) {
//         localStorage.removeItem(`${role}_token`);
//         navigate('/login');
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-600 text-lg">Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-8 shadow-md rounded-md w-full max-w-lg">
//         <h2 className="text-2xl font-bold mb-4 text-center">Update Profile ({role})</h2>

//         {error && <p className="text-red-600 mb-2">{error}</p>}
//         {success && <p className="text-green-600 mb-2">{success}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName || ''}
//             onChange={handleChange}
//             placeholder="Full Name"
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />

//           <select
//             name="gender"
//             value={formData.gender || ''}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>

//           <input
//             type="text"
//             name="passoutYear"
//             value={formData.passoutYear || ''}
//             onChange={handleChange}
//             placeholder="Passout Year (YYYY)"
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />

//           <input
//             type="text"
//             name="collegeName"
//             value={formData.collegeName || ''}
//             onChange={handleChange}
//             placeholder="College Name"
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />

//           <input
//             type="text"
//             name="github"
//             value={formData.github || ''}
//             onChange={handleChange}
//             placeholder="GitHub Profile URL"
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />

//           <input
//             type="text"
//             name="linkedIn"
//             value={formData.linkedIn || ''}
//             onChange={handleChange}
//             placeholder="LinkedIn Profile URL"
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />

//           <input
//             type="text"
//             name="profilePic"
//             value={formData.profilePic || ''}
//             onChange={handleChange}
//             placeholder="Profile Picture URL"
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />

//           {role === 'alumni' && (
//             <input
//               type="text"
//               name="experience"
//               value={formData.experience || ''}
//               onChange={handleChange}
//               placeholder="Experience"
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           )}

//           <div className="flex gap-4">
//             <button
//               type="submit"
//               disabled={submitting}
//               className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
//             >
//               {submitting ? 'Saving...' : 'Save Profile'}
//             </button>
//             <Link
//               to={role === 'alumni' ? '/alumni-dashboard/profile' : '/student-dashboard/profile'}
//               className="flex-1 text-center bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
//             >
//               Cancel
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentUpdateProfile;


// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import {
//   User,
//   Link2,
//   Image as ImageIcon,
//   Save,
//   XCircle,
//   Loader2,
//   AlertTriangle,
//   Users, // For Gender
//   University, // For College
//   CalendarCheck, // For Passout Year
//   Briefcase, // For Experience (Alumni)
//   CheckCircle2, // For Success Message
//   ChevronDown, // For Select Field
// } from 'lucide-react';

// // --- Reusable UI Helper Components (for consistency) ---
// const LoadingState = ({ message = "Loading profile for editing..." }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-blue-200 py-10">
//     <Loader2 className="animate-spin h-16 w-16 text-purple-400 mb-6" />
//     <h2 className="text-2xl font-semibold text-white mb-2">Fetching Your Data</h2>
//     <p className="text-blue-300">{message}</p>
//   </div>
// );

// const ErrorMessage = ({ message }) => {
//     if (!message) return null;
//     return (
//         <div className="flex items-start p-3.5 rounded-md bg-red-900/40 border border-red-700/50 text-red-300 text-sm mb-6 animate-fadeInUp">
//             <AlertTriangle size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-red-400" />
//             <span>{message}</span>
//         </div>
//     );
// };

// const SuccessMessage = ({ message }) => {
//     if (!message) return null;
//     return (
//         <div className="flex items-start p-3.5 rounded-md bg-green-900/40 border border-green-700/50 text-green-300 text-sm mb-6 animate-fadeInUp">
//             <CheckCircle2 size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-green-400" />
//             <span>{message}</span>
//         </div>
//     );
// };

// // Styled Input Field Component
// const InputField = ({ icon: Icon, name, type = "text", placeholder, value, onChange, error, readOnly = false, ...props }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
//       {placeholder}
//     </label>
//     <div className="relative">
//       {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />}
//       <input
//         id={name}
//         name={name}
//         type={type}
//         value={value || ''}
//         onChange={onChange}
//         placeholder={`Enter ${placeholder.toLowerCase()}`}
//         readOnly={readOnly}
//         className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 
//                     text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm
//                     ${Icon ? 'pl-10' : 'pl-4'} pr-4 
//                     ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'}
//                     ${readOnly ? 'bg-slate-600/50 cursor-not-allowed' : ''}`}
//         {...props}
//       />
//     </div>
//     {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
//   </div>
// );

// // Styled Select Field Component
// const SelectField = ({ icon: Icon, name, placeholder, value, onChange, error, options, ...props }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
//       {placeholder}
//     </label>
//     <div className="relative">
//       {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />}
//       <select
//         id={name}
//         name={name}
//         value={value || ''}
//         onChange={onChange}
//         className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 
//                     text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm appearance-none
//                     ${Icon ? 'pl-10' : 'pl-4'} pr-10 
//                     ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'}
//                     ${!value ? 'text-slate-400' : 'text-white'}`}
//         {...props}
//       >
//         <option value="" disabled className="text-slate-500">{`Select ${placeholder}`}</option>
//         {options.map(opt => <option key={opt.value} value={opt.value} className="text-black bg-white">{opt.label}</option>)}
//       </select>
//       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
//     </div>
//     {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
//   </div>
// );


// // --- Main UpdateProfile Component ---
// const StudentUpdateProfile = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '', gender: '', passoutYear: '', collegeName: '', 
//     github: '', linkedIn: '', profilePic: '', experience: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [fieldErrors, setFieldErrors] = useState({}); // For individual field validation errors
//   const [success, setSuccess] = useState('');
//   const role = localStorage.getItem('role');

//   const getToken = () => {
//     const currentRole = localStorage.getItem('role'); // Use a fresh value inside function
//     const token =
//       currentRole === 'student'
//         ? localStorage.getItem('student_token')
//         : currentRole === 'alumni'
//         ? localStorage.getItem('alumni_token')
//         : currentRole === 'admin'
//         ? localStorage.getItem('admin_token')
//         : null;
//     // console.log(`Token for role ${currentRole}:`, token); // Kept for your debugging
//     return token;
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setError(''); setSuccess(''); setFieldErrors({});
//         const token = getToken();
//         if (!token) { navigate('/login'); return; }

//         const res = await axios.get('http://localhost:5000/api/users/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = res.data || {};
//         // Populate only the fields that exist in your original formData state
//         setFormData({
//           fullName: data.fullName || '',
//           gender: data.gender || '',
//           passoutYear: data.passoutYear || '',
//           collegeName: data.collegeName || '',
//           github: data.github || '',
//           linkedIn: data.linkedIn || '',
//           profilePic: data.profilePic || '',
//           experience: data.experience || '',
//           // Ensure email is also fetched if needed for display (though not editable here)
//           email: data.email || '', 
//         });
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError('Failed to load profile. Please log in again.');
//         if (err.response?.status === 401) {
//           localStorage.removeItem(`${role}_token`); // Use role from closure
//           localStorage.removeItem('userId'); // Good practice to clear related items
//           localStorage.removeItem('role');
//           // navigate('/login');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [navigate, role]); // role dependency is fine for useEffect

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (fieldErrors[name]) {
//         setFieldErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   // Original validation logic
//   const validateForm = () => {
//     const errors = {};
//     if (!formData.fullName?.trim()) errors.fullName = 'Full name is required.';
//     if (!formData.gender) errors.gender = 'Gender is required.';
//     if (!formData.passoutYear?.trim()) errors.passoutYear = 'Passout year is required.';
//     else if (!/^\d{4}$/.test(formData.passoutYear) || parseInt(formData.passoutYear) < 1950 || parseInt(formData.passoutYear) > new Date().getFullYear() + 10) {
//         errors.passoutYear = 'Enter a valid 4-digit year.';
//     }
//     if (!formData.collegeName?.trim()) errors.collegeName = 'College name is required.';
//     if (!formData.profilePic?.trim()) errors.profilePic = 'Profile picture URL is required.';
//     else if (formData.profilePic && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(formData.profilePic)) {
//         errors.profilePic = 'Profile picture must be a valid image URL.';
//     }

//     if (formData.github && !/^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(formData.github)) {
//       errors.github = 'Invalid GitHub URL format.';
//     }
//     if (formData.linkedIn && !/^https?:\/\/(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(formData.linkedIn)) {
//       errors.linkedIn = 'Invalid LinkedIn URL format.';
//     }
    
//     if (role === 'alumni' && !formData.experience?.trim()) {
//       errors.experience = 'Experience is required for alumni.';
//     }
//     setFieldErrors(errors); // Update field-specific errors
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); setSuccess('');
//     if (!validateForm()) {
//       setError("Please correct the errors highlighted below."); // General error message
//       return;
//     }

//     try {
//       setSubmitting(true);
//       const token = getToken();
//       // if (!token) { navigate('/login'); return; }

//       // Create a payload with only the fields your backend expects for update.
//       // This avoids sending extra fields like 'email' if it's not part of the update DTO.
//       const updatePayload = {
//         fullName: formData.fullName,
//         gender: formData.gender,
//         passoutYear: formData.passoutYear,
//         collegeName: formData.collegeName,
//         github: formData.github,
//         linkedIn: formData.linkedIn,
//         profilePic: formData.profilePic,
//         ...(role === 'alumni' && { experience: formData.experience }), // Conditionally add experience
//       };


//       await axios.put(
//         'http://localhost:5000/api/users/profile',
//         updatePayload, // Send the cleaned payload
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       setSuccess('Profile updated successfully! Redirecting...');
//       setTimeout(() => {
//         const profileViewLink = role === 'alumni' ? '/alumni-dashboard/profile' : '/student-dashboard/profile';
//         navigate(profileViewLink);
//       }, 2000);

//     } catch (err) {
//       console.error('Update error:', err);
//       const serverError = err.response?.data?.message || 'Failed to update profile. Please try again.';
//       setError(serverError);
//       // If backend provides field-specific errors in err.response.data.errors
//       if (err.response?.data?.errors && typeof err.response.data.errors === 'object') {
//         setFieldErrors(prev => ({ ...prev, ...err.response.data.errors }));
//       }
//       // if (err.response?.status === 401) {
//       //   localStorage.removeItem(`${role}_token`); navigate('/login');
//       // }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <LoadingState />;

//   const cancelLink = role === 'alumni' ? '/alumni-dashboard/profile' : '/student-dashboard/profile';

//   return (
//     <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
//       <header className="mb-10 text-center">
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
//             Update Your Profile
//           </span>
//         </h1>
//         <p className="mt-3 text-lg text-blue-200 max-w-xl mx-auto capitalize">
//           Editing Profile as {role}
//         </p>
//       </header>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-slate-800/70 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700/60"
//         noValidate // Prevent browser default validation, use ours
//       >
//         <ErrorMessage message={error && !Object.keys(fieldErrors).find(key => fieldErrors[key]) ? error : null} />
//         <SuccessMessage message={success} />
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
//           {/* Display email as read-only if fetched */}
//           {/* {formData.email && (
//             <InputField icon={Mail} name="email" placeholder="Email" value={formData.email} readOnly={true} className="md:col-span-2"/>
//           )} */}
//           <InputField icon={User} name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} error={fieldErrors.fullName} />
//           <SelectField icon={Users} name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} error={fieldErrors.gender}
//             options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}, {value: 'other', label: 'Other'}]}
//           />
//           <InputField icon={CalendarCheck} name="passoutYear" placeholder="Passout Year (YYYY)" value={formData.passoutYear} onChange={handleChange} error={fieldErrors.passoutYear} type="number" />
//           <InputField icon={University} name="collegeName" placeholder="College Name" value={formData.collegeName} onChange={handleChange} error={fieldErrors.collegeName} />
//           <InputField icon={Link2} name="github" placeholder="GitHub Profile URL" value={formData.github} onChange={handleChange} error={fieldErrors.github} />
//           <InputField icon={Link2} name="linkedIn" placeholder="LinkedIn Profile URL" value={formData.linkedIn} onChange={handleChange} error={fieldErrors.linkedIn} />
          
//           {/* Profile Picture URL input (as per original logic) */}
//           <div className="md:col-span-2">
//             <InputField icon={ImageIcon} name="profilePic" placeholder="Profile Picture URL" value={formData.profilePic} onChange={handleChange} error={fieldErrors.profilePic} />
//             {formData.profilePic && (
//                 <div className="mt-3 text-center">
//                     <img src={formData.profilePic} alt="Profile preview" className="w-24 h-24 rounded-full object-cover inline-block border-2 border-slate-600" 
//                          onError={(e) => e.target.style.display='none'} // Hide if URL is broken
//                          onLoad={(e) => e.target.style.display='inline-block'} // Show if URL is valid
//                     />
//                 </div>
//             )}
//           </div>


//           {role === 'alumni' && (
//             <div className="md:col-span-2">
//               <InputField icon={Briefcase} name="experience" placeholder="Experience (e.g., Years, Key Roles)" value={formData.experience} onChange={handleChange} error={fieldErrors.experience} />
//             </div>
//           )}
//         </div>

//         <div className="mt-10 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-end gap-4">
//           <Link
//             to={cancelLink}
//             className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-sm font-medium rounded-lg shadow-sm text-slate-200 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500 transition-colors"
//           >
//             <XCircle size={18} className="mr-2" />
//             Cancel
//           </Link>
//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-70 disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {submitting ? <Loader2 className="animate-spin h-5 w-5 mr-2.5" /> : <Save size={18} className="mr-2.5" />}
//             {submitting ? 'Saving Changes...' : 'Save Profile'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default StudentUpdateProfile;










// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import {
//   User,
//   Link2,
//   Image as ImageIcon,
//   Save,
//   XCircle,
//   Loader2,
//   AlertTriangle,
//   Users as GenderIcon, // Renamed for clarity
//   University,
//   CalendarCheck,
//   Briefcase,
//   CheckCircle2,
//   ChevronDown,
// } from 'lucide-react';

// // --- Reusable UI Helper Components (Keep as is) ---
// const LoadingState = ({ message = "Loading profile for editing..." }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-blue-200 py-10">
//     <Loader2 className="animate-spin h-16 w-16 text-purple-400 mb-6" />
//     <h2 className="text-2xl font-semibold text-white mb-2">Fetching Your Data</h2>
//     <p className="text-blue-300">{message}</p>
//   </div>
// );

// const ErrorMessage = ({ message }) => {
//     if (!message) return null;
//     return (
//         <div className="flex items-start p-3.5 rounded-md bg-red-900/40 border border-red-700/50 text-red-300 text-sm mb-6 animate-fadeInUp">
//             <AlertTriangle size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-red-400" />
//             <span>{message}</span>
//         </div>
//     );
// };

// const SuccessMessage = ({ message }) => {
//     if (!message) return null;
//     return (
//         <div className="flex items-start p-3.5 rounded-md bg-green-900/40 border border-green-700/50 text-green-300 text-sm mb-6 animate-fadeInUp">
//             <CheckCircle2 size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-green-400" />
//             <span>{message}</span>
//         </div>
//     );
// };

// const InputField = ({ icon: Icon, name, type = "text", placeholder, value, onChange, error, readOnly = false, ...props }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
//       {placeholder}
//     </label>
//     <div className="relative">
//       {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />}
//       <input
//         id={name} name={name} type={type} value={value || ''} onChange={onChange}
//         placeholder={`Enter ${placeholder.toLowerCase()}`} readOnly={readOnly}
//         className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm ${Icon ? 'pl-10' : 'pl-4'} pr-4 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'} ${readOnly ? 'bg-slate-600/50 cursor-not-allowed' : ''}`}
//         {...props}
//       />
//     </div>
//     {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
//   </div>
// );

// const SelectField = ({ icon: Icon, name, placeholder, value, onChange, error, options, ...props }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
//       {placeholder}
//     </label>
//     <div className="relative">
//       {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />}
//       <select
//         id={name} name={name} value={value || ''} onChange={onChange}
//         className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm appearance-none ${Icon ? 'pl-10' : 'pl-4'} pr-10 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'} ${!value ? 'text-slate-400' : 'text-white'}`}
//         {...props}
//       >
//         <option value="" disabled className="text-slate-500">{`Select ${placeholder}`}</option>
//         {options.map(opt => <option key={opt.value} value={opt.value} className="text-black bg-white">{opt.label}</option>)}
//       </select>
//       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
//     </div>
//     {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
//   </div>
// );
// // --- End Reusable UI Helper Components ---


// // --- Main UpdateProfile Component ---
// const StudentUpdateProfile = () => {
//   const navigate = useNavigate();
//   // Ensure initial state matches exactly what your backend might return or expect
//   const [formData, setFormData] = useState({
//     fullName: '',
//     gender: '',
//     passoutYear: '',
//     collegeName: '',
//     github: '',
//     linkedIn: '',
//     profilePic: '', // This is the URL field from your original logic
//     experience: '', // Alumni specific
//     // Add any other fields that are part of the profile object but not directly editable here
//     // e.g., email, if you display it (even if read-only)
//     email: '', // Example: fetched but not part of updatePayload unless editable
//   });
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [fieldErrors, setFieldErrors] = useState({});
//   const [success, setSuccess] = useState('');
  
//   // Storing role in state for consistency within the component lifecycle after initial load
//   const [currentUserRole, setCurrentUserRole] = useState(localStorage.getItem('role'));

//   // Original getToken function (ensure it uses the component's current understanding of role)
//   const getToken = () => {
//     const roleForToken = currentUserRole; // Use state variable for role
//     const token =
//       roleForToken === 'student'
//         ? localStorage.getItem('student_token')
//         : roleForToken === 'alumni'
//         ? localStorage.getItem('alumni_token')
//         : roleForToken === 'admin'
//         ? localStorage.getItem('admin_token')
//         : null;
//     console.log(`[getToken] Role: ${roleForToken}, Token: ${token ? '******' : null}`);
//     return token;
//   };

//   useEffect(() => {
//     // Update currentUserRole if localStorage changes (e.g., after a re-login on another tab)
//     const storedRole = localStorage.getItem('role');
//     if (storedRole !== currentUserRole) {
//         setCurrentUserRole(storedRole);
//     }

//     const fetchProfile = async () => {
//       console.log('[fetchProfile] Attempting to fetch profile...');
//       try {
//         setError(''); setSuccess(''); setFieldErrors({});
//         const token = getToken();
//         // if (!token) {
//         //   console.log('[fetchProfile] No token found, navigating to login.');
//         //   navigate('/login'); return;
//         // }

//         const res = await axios.get('http://localhost:5000/api/users/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log('[fetchProfile] API response received:', res);
//         const data = res.data || {};
//         console.log('[fetchProfile] Profile data from API:', data);
//         setFormData({
//           fullName: data.fullName || '',
//           gender: data.gender || '',
//           passoutYear: data.passoutYear || '',
//           collegeName: data.collegeName || '',
//           github: data.github || '',
//           linkedIn: data.linkedIn || '',
//           profilePic: data.profilePic || '', // This is the URL field
//           experience: data.experience || '',
//           email: data.email || '', // Store email if fetched
//         });
//       } catch (err) {
//         console.error('[fetchProfile] Fetch error:', err.response || err);
//         setError('Failed to load profile. Please try again or log back in.');
//         if (err.response?.status === 401) {
//           console.log('[fetchProfile] Unauthorized (401), clearing token and navigating to login.');
//           localStorage.removeItem(`${currentUserRole}_token`); // Use state role
//           localStorage.removeItem('userId');
//           localStorage.removeItem('role');
//           // navigate('/login');
//         }
//       } finally {
//         setLoading(false);
//         console.log('[fetchProfile] Fetch attempt finished.');
//       }
//     };
//     fetchProfile();
//   }, [navigate, currentUserRole]); // Depend on currentUserRole from state

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (fieldErrors[name]) {
//         setFieldErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   // Original validation logic
//   const validateForm = () => {
//     const errors = {};
//     if (!formData.fullName?.trim()) errors.fullName = 'Full name is required.';
//     // ... (keep all your other original validation rules for each field) ...
//     if (!formData.gender) errors.gender = 'Gender is required.';
//     if (!formData.passoutYear?.trim()) errors.passoutYear = 'Passout year is required.';
//     else if (!/^\d{4}$/.test(formData.passoutYear) || parseInt(formData.passoutYear) < 1950 || parseInt(formData.passoutYear) > new Date().getFullYear() + 10) {
//         errors.passoutYear = 'Enter a valid 4-digit year.';
//     }
//     if (!formData.collegeName?.trim()) errors.collegeName = 'College name is required.';
    
//     // Original profilePic validation (URL based)
//     if (!formData.profilePic?.trim()) {
//         errors.profilePic = 'Profile picture URL is required.';
//     } else if (formData.profilePic && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(formData.profilePic)) {
//         errors.profilePic = 'Profile picture must be a valid image URL (ending in .jpg, .png, etc.).';
//     }

//     if (formData.github && !/^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(formData.github)) {
//       errors.github = 'Invalid GitHub URL format.';
//     }
//     if (formData.linkedIn && !/^https?:\/\/(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(formData.linkedIn)) {
//       errors.linkedIn = 'Invalid LinkedIn URL format.';
//     }
    
//     if (currentUserRole === 'alumni' && !formData.experience?.trim()) {
//       errors.experience = 'Experience is required for alumni.';
//     }

//     console.log('[validateForm] Validation errors:', errors);
//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('[handleSubmit] Form submission initiated.');
//     setError(''); setSuccess('');
    
//     if (!validateForm()) {
//       console.log('[handleSubmit] Validation failed.');
//       setError("Please correct the errors highlighted below.");
//       return;
//     }
//     console.log('[handleSubmit] Validation passed.');

//     try {
//       setSubmitting(true);
//       const token = getToken();
//       // if (!token) {
//       //   console.log('[handleSubmit] No token, navigating to login.');
//       //   navigate('/login'); return;
//       // }

//       // DEBUG: Construct the exact payload your backend expects.
//       // Your original code sent the entire formData.
//       // If backend only wants specific fields, list them here.
//       const payloadToSubmit = {
//         fullName: formData.fullName,
//         gender: formData.gender,
//         passoutYear: formData.passoutYear,
//         collegeName: formData.collegeName,
//         github: formData.github,
//         linkedIn: formData.linkedIn,
//         profilePic: formData.profilePic, // This is the URL
//         ...(currentUserRole === 'alumni' && { experience: formData.experience }),
//       };
//       console.log('[handleSubmit] Payload to be sent:', payloadToSubmit);


//       const response = await axios.put( // Capture response
//         'http://localhost:5000/api/users/profile',
//         payloadToSubmit, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       console.log('[handleSubmit] API PUT response:', response);

//       setSuccess('Profile updated successfully! Redirecting...');
//       setTimeout(() => {
//         const profileViewLink = currentUserRole === 'alumni' ? '/alumni-dashboard/profile' : '/student-dashboard/profile';
//         navigate(profileViewLink);
//       }, 2000);

//     } catch (err) {
//       console.error('[handleSubmit] Update error:', err.response || err);
//       const serverError = err.response?.data?.message || 'Failed to update profile. Please try again.';
//       setError(serverError);
//       if (err.response?.data?.errors && typeof err.response.data.errors === 'object') {
//         setFieldErrors(prev => ({ ...prev, ...err.response.data.errors }));
//       }
//       if (err.response?.status === 401) {
//         console.log('[handleSubmit] Unauthorized (401) during update, clearing token and navigating to login.');
//         localStorage.removeItem(`${currentUserRole}_token`); navigate('/login');
//       }
//     } finally {
//       setSubmitting(false);
//       console.log('[handleSubmit] Submission attempt finished.');
//     }
//   };

//   if (loading) return <LoadingState />;

//   const cancelLink = currentUserRole === 'alumni' ? '/alumni-dashboard/profile' : '/student-dashboard/profile';

//   return (
//     <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
//       <header className="mb-10 text-center">
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
//             Update Your Profile
//           </span>
//         </h1>
//         <p className="mt-3 text-lg text-blue-200 max-w-xl mx-auto capitalize">
//           Editing Profile as {currentUserRole}
//         </p>
//       </header>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-slate-800/70 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700/60"
//         noValidate
//       >
//         <ErrorMessage message={error && !Object.keys(fieldErrors).find(key => fieldErrors[key]) ? error : null} />
//         <SuccessMessage message={success} />
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
//           {/* Email display (if fetched and non-editable) */}
//           {formData.email && (
//             <div className="md:col-span-2">
//                  <InputField icon={Mail} name="email" placeholder="Email" value={formData.email} onChange={() => {}} readOnly={true} />
//             </div>
//           )}
//           <InputField icon={User} name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} error={fieldErrors.fullName} />
//           <SelectField icon={GenderIcon} name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} error={fieldErrors.gender}
//             options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}, {value: 'other', label: 'Other'}]}
//           />
//           <InputField icon={CalendarCheck} name="passoutYear" placeholder="Passout Year (YYYY)" value={formData.passoutYear} onChange={handleChange} error={fieldErrors.passoutYear} type="number" />
//           <InputField icon={University} name="collegeName" placeholder="College Name" value={formData.collegeName} onChange={handleChange} error={fieldErrors.collegeName} />
//           <InputField icon={Link2} name="github" placeholder="GitHub Profile URL" value={formData.github} onChange={handleChange} error={fieldErrors.github} />
//           <InputField icon={Link2} name="linkedIn" placeholder="LinkedIn Profile URL" value={formData.linkedIn} onChange={handleChange} error={fieldErrors.linkedIn} />
          
//           <div className="md:col-span-2">
//             <InputField icon={ImageIcon} name="profilePic" placeholder="Profile Picture URL" value={formData.profilePic} onChange={handleChange} error={fieldErrors.profilePic} />
//             {formData.profilePic && !fieldErrors.profilePic && ( // Only show preview if URL is valid and no error
//                 <div className="mt-3 text-center">
//                     <img src={formData.profilePic} alt="Profile preview" className="w-24 h-24 rounded-full object-cover inline-block border-2 border-slate-600" 
//                          onError={(e) => { e.target.style.display='none'; /* Optionally set a field error if URL breaks */ }} 
//                          onLoad={(e) => { e.target.style.display='inline-block'; }}
//                     />
//                 </div>
//             )}
//           </div>

//           {currentUserRole === 'alumni' && (
//             <div className="md:col-span-2">
//               <InputField icon={Briefcase} name="experience" placeholder="Experience (e.g., Years, Key Roles)" value={formData.experience} onChange={handleChange} error={fieldErrors.experience} />
//             </div>
//           )}
//         </div>

//         <div className="mt-10 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-end gap-4">
//           <Link
//             to={cancelLink}
//             className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-sm font-medium rounded-lg shadow-sm text-slate-200 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500 transition-colors"
//           >
//             <XCircle size={18} className="mr-2" />
//             Cancel
//           </Link>
//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-70 disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {submitting ? <Loader2 className="animate-spin h-5 w-5 mr-2.5" /> : <Save size={18} className="mr-2.5" />}
//             {submitting ? 'Saving Changes...' : 'Save Profile'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// // Import Mail icon if you plan to display email
// import { Mail } from 'lucide-react';

// export default StudentUpdateProfile;








import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  User,
  Link2,
  Image as ImageIcon,
  Save,
  XCircle,
  Loader2,
  AlertTriangle,
  Users as GenderIcon, // Renamed for clarity
  University,
  CalendarCheck,
  Briefcase,
  CheckCircle2, // For Success Message
  ChevronDown, // For Select Field
  Mail, // Import Mail if you plan to display email
} from 'lucide-react';

// --- Reusable UI Helper Components (for consistency) ---
const LoadingState = ({ message = "Loading profile for editing..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-blue-200 py-10">
    <Loader2 className="animate-spin h-16 w-16 text-purple-400 mb-6" />
    <h2 className="text-2xl font-semibold text-white mb-2">Fetching Your Data</h2>
    <p className="text-blue-300">{message}</p>
  </div>
);

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className="flex items-start p-3.5 rounded-md bg-red-900/40 border border-red-700/50 text-red-300 text-sm mb-6 animate-fadeInUp">
            <AlertTriangle size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-red-400" />
            <span>{message}</span>
        </div>
    );
};

const SuccessMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className="flex items-start p-3.5 rounded-md bg-green-900/40 border border-green-700/50 text-green-300 text-sm mb-6 animate-fadeInUp">
            <CheckCircle2 size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-green-400" />
            <span>{message}</span>
        </div>
    );
};

// Styled Input Field Component
const InputField = ({ icon: Icon, name, type = "text", placeholder, value, onChange, error, readOnly = false, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
      {placeholder}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />}
      <input
        id={name} name={name} type={type} value={value || ''} onChange={onChange}
        placeholder={`Enter ${placeholder.toLowerCase()}`} readOnly={readOnly}
        className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm ${Icon ? 'pl-10' : 'pl-4'} pr-4 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'} ${readOnly ? 'bg-slate-600/50 cursor-not-allowed' : ''}`}
        {...props}
      />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
);

// Styled Select Field Component
const SelectField = ({ icon: Icon, name, placeholder, value, onChange, error, options, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
      {placeholder}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />}
      <select
        id={name} name={name} value={value || ''} onChange={onChange}
        className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm appearance-none ${Icon ? 'pl-10' : 'pl-4'} pr-10 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'} ${!value ? 'text-slate-400' : 'text-white'}`}
        {...props}
      >
        <option value="" disabled className="text-slate-500">{`Select ${placeholder}`}</option>
        {options.map(opt => <option key={opt.value} value={opt.value} className="text-black bg-white">{opt.label}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
);
// --- End Reusable UI Helper Components ---


// --- Main UpdateProfile Component ---
const StudentUpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    passoutYear: '', // Will be stored as string or number, handled in validation
    collegeName: '',
    github: '',
    linkedIn: '',
    // profilePic: '', 
    experience: '', 
    email: '', 
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState('');
  
  const [currentUserRole, setCurrentUserRole] = useState(localStorage.getItem('role'));

  const getToken = () => {
    const roleForToken = currentUserRole; 
    const token =
      roleForToken === 'student'
        ? localStorage.getItem('student_token')
        : roleForToken === 'alumni'
        ? localStorage.getItem('alumni_token')
        : roleForToken === 'admin'
        ? localStorage.getItem('admin_token')
        : null;
    return token;
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole !== currentUserRole) {
        setCurrentUserRole(storedRole);
    }

    const fetchProfile = async () => {
      try {
        setError(''); setSuccess(''); setFieldErrors({});
        const token = getToken();
        // if (!token) { navigate('/login'); return; }

        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data || {};
        setFormData({
          fullName: data.fullName || '',
          gender: data.gender || '',
          passoutYear: data.passoutYear || '', // Stays as string or number from API
          collegeName: data.collegeName || '',
          github: data.github || '',
          linkedIn: data.linkedIn || '',
          // profilePic: data.profilePic || '',
          experience: data.experience || '',
          email: data.email || '',
        });
      } catch (err) {
        console.error('[fetchProfile] Fetch error:', err.response || err);
        setError('Failed to load profile. Please try again or log back in.');
        if (err.response?.status === 401) {
          localStorage.removeItem(`${currentUserRole}_token`);
          localStorage.removeItem('userId');
          localStorage.removeItem('role');
          // navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate, currentUserRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
        setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName?.trim()) errors.fullName = 'Full name is required.';
    if (!formData.gender) errors.gender = 'Gender is required.';
    
    // --- FIXED PASSOUT YEAR VALIDATION ---
    if (formData.passoutYear === null || formData.passoutYear === undefined || String(formData.passoutYear).trim() === '') {
        errors.passoutYear = 'Passout year is required.';
    } else {
        const passoutYearStr = String(formData.passoutYear).trim(); // Convert to string and trim
        if (!/^\d{4}$/.test(passoutYearStr)) { // Test the string
            errors.passoutYear = 'Passout year must be a 4-digit year.';
        } else {
            const yearNum = parseInt(passoutYearStr, 10);
            if (yearNum < 1950 || yearNum > new Date().getFullYear() + 10) { // Check numeric range
                errors.passoutYear = `Enter a year between 1950 and ${new Date().getFullYear() + 10}.`;
            }
        }
    }
    // --- END OF FIXED PASSOUT YEAR VALIDATION ---

    if (!formData.collegeName?.trim()) errors.collegeName = 'College name is required.';
    
    // if (!formData.profilePic?.trim()) {
    //     errors.profilePic = 'Profile picture URL is required.';
    // } else if (formData.profilePic && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(formData.profilePic)) {
    //     errors.profilePic = 'Profile picture must be a valid image URL (ending in .jpg, .png, etc.).';
    // }

    if (formData.github && !/^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(formData.github)) {
      errors.github = 'Invalid GitHub URL format.';
    }
    if (formData.linkedIn && !/^https?:\/\/(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(formData.linkedIn)) {
      errors.linkedIn = 'Invalid LinkedIn URL format.';
    }
    
    if (currentUserRole === 'alumni' && !formData.experience?.trim()) {
      errors.experience = 'Experience is required for alumni.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    
    if (!validateForm()) {
      setError("Please correct the errors highlighted below.");
      return;
    }

    try {
      setSubmitting(true);
      const token = getToken();
      // if (!token) { navigate('/login'); return; }

      const payloadToSubmit = {
        fullName: formData.fullName,
        gender: formData.gender,
        passoutYear: formData.passoutYear, // Send as is, backend should handle type if needed
        collegeName: formData.collegeName,
        github: formData.github,
        linkedIn: formData.linkedIn,
        // profilePic: formData.profilePic,
        ...(currentUserRole === 'alumni' && { experience: formData.experience }),
      };

      await axios.put(
        'http://localhost:5000/api/users/profile',
        payloadToSubmit, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess('Profile updated successfully! Redirecting...');
      setTimeout(() => {
        const profileViewLink = currentUserRole === 'alumni' ? '/alumni-dashboard/profile' : '/student-dashboard/profile';
        navigate(profileViewLink);
      }, 2000);

    } catch (err) {
      console.error('[handleSubmit] Update error:', err.response || err);
      const serverError = err.response?.data?.message || 'Failed to update profile. Please try again.';
      setError(serverError);
      if (err.response?.data?.errors && typeof err.response.data.errors === 'object') {
        setFieldErrors(prev => ({ ...prev, ...err.response.data.errors }));
      }
      if (err.response?.status === 401) {
        localStorage.removeItem(`${currentUserRole}_token`); navigate('/login');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState />;

  const cancelLink = currentUserRole === 'alumni' ? '/alumni-dashboard/profile' : '/student-dashboard/profile';

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
            Update Your Profile
          </span>
        </h1>
        <p className="mt-3 text-lg text-blue-200 max-w-xl mx-auto capitalize">
          Editing Profile as {currentUserRole}
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/70 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700/60"
        noValidate
      >
        <ErrorMessage message={error && !Object.keys(fieldErrors).find(key => fieldErrors[key]) ? error : null} />
        <SuccessMessage message={success} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
          {formData.email && (
            <div className="md:col-span-2">
                 <InputField icon={Mail} name="email" placeholder="Email" value={formData.email} onChange={() => {}} readOnly={true} />
            </div>
          )}
          <InputField icon={User} name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} error={fieldErrors.fullName} />
          <SelectField icon={GenderIcon} name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} error={fieldErrors.gender}
            options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}, {value: 'other', label: 'Other'}]}
          />
          <InputField icon={CalendarCheck} name="passoutYear" placeholder="Passout Year (YYYY)" value={formData.passoutYear} onChange={handleChange} error={fieldErrors.passoutYear} type="number" />
          <InputField icon={University} name="collegeName" placeholder="College Name" value={formData.collegeName} onChange={handleChange} error={fieldErrors.collegeName} />
          <InputField icon={Link2} name="github" placeholder="GitHub Profile URL" value={formData.github} onChange={handleChange} error={fieldErrors.github} />
          <InputField icon={Link2} name="linkedIn" placeholder="LinkedIn Profile URL" value={formData.linkedIn} onChange={handleChange} error={fieldErrors.linkedIn} />
          
          {/* <div className="md:col-span-2">
            <InputField icon={ImageIcon} name="profilePic" placeholder="Profile Picture URL" value={formData.profilePic} onChange={handleChange} error={fieldErrors.profilePic} />
            {formData.profilePic && !fieldErrors.profilePic && (
                <div className="mt-3 text-center">
                    <img src={formData.profilePic} alt="Profile preview" className="w-24 h-24 rounded-full object-cover inline-block border-2 border-slate-600" 
                         onError={(e) => { e.target.style.display='none'; }} 
                         onLoad={(e) => { e.target.style.display='inline-block'; }}
                    />
                </div>
            )}
          </div> */}

          {currentUserRole === 'alumni' && (
            <div className="md:col-span-2">
              <InputField icon={Briefcase} name="experience" placeholder="Experience (e.g., Years, Key Roles)" value={formData.experience} onChange={handleChange} error={fieldErrors.experience} />
            </div>
          )}
        </div>

        <div className="mt-10 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-end gap-4">
          <Link
            to={cancelLink}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-sm font-medium rounded-lg shadow-sm text-slate-200 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500 transition-colors"
          >
            <XCircle size={18} className="mr-2" />
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-70 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? <Loader2 className="animate-spin h-5 w-5 mr-2.5" /> : <Save size={18} className="mr-2.5" />}
            {submitting ? 'Saving Changes...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentUpdateProfile;