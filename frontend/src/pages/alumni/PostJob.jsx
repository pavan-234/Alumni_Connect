// import React, { useState } from 'react';

// const PostJob = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     type: '',
//     location: '',
//     duration: '',
//     applyLink: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     // Uncomment if token-based authentication is needed
//     // const token = localStorage.getItem('alumni_token');
//     // if (!token) {
//     //   setError('You must be logged in as alumni to post a job.');
//     //   return;
//     // }

//     try {
//       setLoading(true);
//       const res = await fetch('http://localhost:5000/api/jobs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || 'Something went wrong');
//       }

//       setSuccess(data.message || 'Job posted successfully!');
//       setFormData({
//         title: '',
//         description: '',
//         type: '',
//         location: '',
//         duration: '',
//         applyLink: '',
//       });
//     } catch (err) {
//       console.error('Job post error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
//         <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//           Post a Job
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//               Job Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               id="title"
//               placeholder="Enter job title"
//               value={formData.title}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               disabled={loading}
//               aria-label="Job title"
//             />
//           </div>
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//               Job Description
//             </label>
//             <textarea
//               name="description"
//               id="description"
//               placeholder="Enter job description"
//               value={formData.description}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               rows="4"
//               required
//               disabled={loading}
//               aria-label="Job description"
//             />
//           </div>
//           <div>
//             <label htmlFor="type" className="block text-sm font-medium text-gray-700">
//               Job Type
//             </label>
//             <select
//               name="type"
//               id="type"
//               value={formData.type}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               disabled={loading}
//               aria-label="Select job type"
//             >
//               <option value="">Select Type</option>
//               <option value="intern">Intern</option>
//               <option value="job">Job</option>
//               <option value="part-time">Part-time</option>
//               <option value="full-time">Full-time</option>
//             </select>
//           </div>
//           <div>
//             <label htmlFor="location" className="block text-sm font-medium text-gray-700">
//               Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               id="location"
//               placeholder="Enter location"
//               value={formData.location}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               disabled={loading}
//               aria-label="Job location"
//             />
//           </div>
//           <div>
//             <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
//               Duration
//             </label>
//             <input
//               type="text"
//               name="duration"
//               id="duration"
//               placeholder="Enter duration (e.g., 6 months)"
//               value={formData.duration}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               disabled={loading}
//               aria-label="Job duration"
//             />
//           </div>
//           <div>
//             <label htmlFor="applyLink" className="block text-sm font-medium text-gray-700">
//               Apply Link
//             </label>
//             <input
//               type="url"
//               name="applyLink"
//               id="applyLink"
//               placeholder="Enter application link"
//               value={formData.applyLink}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               disabled={loading}
//               aria-label="Application link"
//             />
//           </div>
//           {error && (
//             <p className="text-red-600 text-sm" role="alert">
//               {error}
//             </p>
//           )}
//           {success && (
//             <p className="text-green-600 text-sm" role="status">
//               {success}
//             </p>
//           )}
//           <button
//             type="submit"
//             className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
//             disabled={loading}
//             aria-label="Post job"
//           >
//             {loading ? 'Posting...' : 'Post Job'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostJob;















// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// // import axios from 'axios'; // Sticking to fetch as per your original component
// import {
//   Briefcase, PlusCircle, Send,
//   Loader2, AlertTriangle, CheckCircle2, FileText, ListChecks, MapPin, Clock, ExternalLink, Edit3, ChevronDown
// } from 'lucide-react';

// // --- Reusable UI Helper Components (Keep as is) ---
// const LoadingFormSpinner = ({ message = "Processing..." }) => (
//   <div className="flex items-center justify-center text-white">
//     <Loader2 className="animate-spin h-5 w-5 mr-2.5" />
//     <span>{message}</span>
//   </div>
// );

// const ErrorMessage = ({ message }) => {
//     if (!message) return null;
//     return (
//         <div className="flex items-start p-3.5 rounded-md bg-red-900/40 border border-red-700/50 text-red-300 text-sm my-4 animate-fadeInUp">
//             <AlertTriangle size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-red-400" />
//             <span>{message}</span>
//         </div>
//     );
// };

// const SuccessMessage = ({ message }) => {
//     if (!message) return null;
//     return (
//         <div className="flex items-start p-3.5 rounded-md bg-green-900/40 border border-green-700/50 text-green-300 text-sm my-4 animate-fadeInUp">
//             <CheckCircle2 size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-green-400" />
//             <span>{message}</span>
//         </div>
//     );
// };

// const InputField = ({ icon: Icon, name, type = "text", placeholder, value, onChange, error, required = false, ...props }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
//       {placeholder} {required && <span className="text-red-400">*</span>}
//     </label>
//     <div className="relative">
//       {Icon && <Icon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />}
//       <input id={name} name={name} type={type} value={value || ''} onChange={onChange} placeholder={`Enter ${placeholder.toLowerCase()}`} required={required}
//         className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm ${Icon ? 'pl-12' : 'pl-4'} pr-4 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'}`}
//         {...props} />
//     </div>
//     {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
//   </div>
// );

// const TextareaField = ({ icon: Icon, name, placeholder, value, onChange, error, required = false, rows = 4, ...props }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
//       {placeholder} {required && <span className="text-red-400">*</span>}
//     </label>
//     <div className="relative">
//       {Icon && <Icon className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />}
//       <textarea id={name} name={name} value={value || ''} onChange={onChange} placeholder={`Enter ${placeholder.toLowerCase()}`} required={required} rows={rows}
//         className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm resize-y ${Icon ? 'pl-12' : 'pl-4'} pr-4 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'}`}
//         {...props} />
//     </div>
//     {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
//   </div>
// );

// const SelectField = ({ icon: Icon, name, placeholder, value, onChange, error, options, required = false, ...props }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
//       {placeholder} {required && <span className="text-red-400">*</span>}
//     </label>
//     <div className="relative">
//       {Icon && <Icon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />}
//       <select id={name} name={name} value={value || ''} onChange={onChange} required={required}
//         className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm appearance-none ${Icon ? 'pl-12' : 'pl-4'} pr-10 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'} ${!value ? 'text-slate-400' : 'text-white'}`}
//         {...props} >
//         <option value="" disabled className="text-slate-500 bg-slate-700">{`Select ${placeholder}`}</option>
//         {options.map(opt => <option key={opt.value} value={opt.value} className="text-black bg-white">{opt.label}</option>)}
//       </select>
//       <ChevronDown className="absolute right-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
//     </div>
//     {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
//   </div>
// );
// // --- End Reusable UI Helper Components ---


// const PostJob = () => {
//   const initialFormData = { title: '', description: '', type: '', location: '', duration: '', applyLink: '' };
//   const [formData, setFormData] = useState(initialFormData);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [fieldErrors, setFieldErrors] = useState({});
//   const [success, setSuccess] = useState('');
  
//   const navigate = useNavigate();

//   // Function to get the token dynamically, ensuring it's for 'alumni'
//   const getAlumniAuthToken = () => {
//     const role = localStorage.getItem('role');
//     let token = null;
//     if (role === 'alumni') {
//       token = localStorage.getItem('alumni_token');
//       console.log(`[getAlumniAuthToken] Role is 'alumni'. Token: ${token ? '******' : 'NULL (alumni_token not found!)'}`);
//     } else {
//       console.warn(`[getAlumniAuthToken] Current role is '${role}', not 'alumni'. No token retrieved for posting job.`);
//     }
//     return token;
//   };


//   useEffect(() => {
//     // Initial check: if not alumni or no alumni token, redirect or show persistent error.
//     const role = localStorage.getItem('role');
//     const token = localStorage.getItem('alumni_token'); // Check specifically for alumni_token

//     if (role !== 'alumni' || !token) {
//       console.warn("PostJob: User is not an authenticated alumni. Redirecting to login.");
//       setError('You must be logged in as an alumnus to post a job.');
//       // Consider a more graceful redirect or disabling the form entirely
//       // navigate('/login'); // Can be aggressive if page is accessed directly
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (fieldErrors[name]) {
//         setFieldErrors(prev => ({ ...prev, [name]: '' }));
//     }
//     setError('');
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.title.trim()) errors.title = 'Job title is required.';
//     if (formData.title.trim().length > 100) errors.title = 'Job title cannot exceed 100 characters.';
//     if (!formData.description.trim()) errors.description = 'Job description is required.';
//     if (formData.description.trim().length > 2000) errors.description = 'Description too long (max 2000 chars).';
//     if (!formData.type) errors.type = 'Job type is required.';
//     if (!formData.location.trim()) errors.location = 'Location is required.';
//     if (!formData.duration.trim()) errors.duration = 'Duration is required.';
//     if (!formData.applyLink.trim()) errors.applyLink = 'Application link is required.';
//     else if (!/^https?:\/\/.+/.test(formData.applyLink)) errors.applyLink = 'Application link must be a valid URL.';
    
//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); 
//     setSuccess('');
//     setFieldErrors({});

//     if (!validateForm()) {
//       setError("Please correct the errors highlighted in the form.");
//       return;
//     }

//     const currentAlumniToken = getAlumniAuthToken(); 
//     console.log("[handleSubmit] Current Alumni Token for API call:", currentAlumniToken ? '******' : 'NULL - THIS IS A PROBLEM!');

//     if (!currentAlumniToken) {
//       setError('Authentication failed: Alumni token is missing. Please log in again as an alumnus.');
//       // navigate('/login'); // Optionally redirect
//       return;
//     }

//     try {
//       setSubmitting(true);
//       console.log("[handleSubmit] Submitting formData:", JSON.stringify(formData));
//       console.log("[handleSubmit] Using Authorization Header:", `Bearer ${currentAlumniToken}`);

//       const res = await fetch('http://localhost:5000/api/jobs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${currentAlumniToken}`, 
//         },
//         body: JSON.stringify(formData), // formData already contains the expected fields
//       });

//       const data = await res.json();
//       console.log("[handleSubmit] Server response data:", data);
//       console.log("[handleSubmit] Server response status:", res.status);

//       if (!res.ok) {
//         if (data.errors && typeof data.errors === 'object') {
//             setFieldErrors(data.errors);
//             throw new Error(data.message || 'Validation failed. Please check the fields.');
//         }
//         throw new Error(data.message || 'Something went wrong while posting the job.');
//       }

//       setSuccess(data.message || 'Job posted successfully!');
//       setFormData(initialFormData);
//       setTimeout(() => {
//         setSuccess('');
//       }, 4000);

//     } catch (err) {
//       console.error('[handleSubmit] Job post error:', err);
//       if (!Object.values(fieldErrors).some(Boolean)) { // Only set general error if no specific field errors were set
//           setError(err.message || "An unexpected error occurred during submission.");
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const jobTypeOptions = [
//     { value: "Full-time", label: "Full-time" },
//     { value: "Part-time", label: "Part-time" },
//     { value: "Internship", label: "Internship" },
//     { value: "Contract", label: "Contract" },
//     { value: "Temporary", label: "Temporary" },
//   ];

//   // Check for alumni role and token on initial render
//   // If not an alumni, perhaps show a different message or disable form
//   const role = localStorage.getItem('role');
//   if (role !== 'alumni') {
//       return (
//           <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp text-center">
//               <AlertTriangle size={48} className="mx-auto text-yellow-400 mb-4" />
//               <h1 className="text-3xl font-bold text-yellow-300 mb-3">Access Denied</h1>
//               <p className="text-slate-300">Only alumni can post jobs. Please log in with an alumni account.</p>
//               <Link to="/login" className="mt-6 inline-block px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">
//                   Go to Login
//               </Link>
//           </div>
//       );
//   }


//   return (
//     <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
//       <header className="mb-10 text-center">
//         <Briefcase className="mx-auto h-16 w-16 text-purple-400 mb-4" />
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
//             Share an Opportunity
//           </span>
//         </h1>
//         <p className="mt-3 text-lg text-blue-200 max-w-xl mx-auto">
//           Help students and fellow alumni by posting relevant job or internship openings.
//         </p>
//       </header>

//       <div className="bg-slate-800/70 backdrop-blur-md p-6 sm:p-10 rounded-xl shadow-2xl border border-slate-700/60">
//         <form onSubmit={handleSubmit} className="space-y-6" noValidate>
//           <InputField icon={Edit3} name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} error={fieldErrors.title} required />
//           <TextareaField icon={FileText} name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} error={fieldErrors.description} required />
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <SelectField icon={ListChecks} name="type" placeholder="Job Type" value={formData.type} onChange={handleChange} options={jobTypeOptions} error={fieldErrors.type} required />
//             <InputField icon={MapPin} name="location" placeholder="Location (e.g., City, Remote)" value={formData.location} onChange={handleChange} error={fieldErrors.location} required />
//           </div>
          
//           <InputField icon={Clock} name="duration" placeholder="Duration (e.g., 6 Months, Permanent)" value={formData.duration} onChange={handleChange} error={fieldErrors.duration} required />
//           <InputField icon={ExternalLink} name="applyLink" type="url" placeholder="Application Link (URL)" value={formData.applyLink} onChange={handleChange} error={fieldErrors.applyLink} required />
          
//           <ErrorMessage message={error && !Object.values(fieldErrors).some(Boolean) ? error : null} />
//           <SuccessMessage message={success} />

//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full mt-8 inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-70 disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {submitting ? <LoadingFormSpinner message="Posting Job..." /> : <><PlusCircle size={20} className="mr-2.5" /> Post Job Opening</>}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostJob;










































// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   Briefcase, PlusCircle, Send,
//   Loader2, AlertTriangle, CheckCircle2, FileText, ListChecks, MapPin, Clock, ExternalLink, Edit3, ChevronDown
// } from 'lucide-react';

// // --- Reusable UI Helper Components (Keep as is) ---
// const LoadingFormSpinner = ({ message = "Processing..." }) => (
//   <div className="flex items-center justify-center text-white">
//     <Loader2 className="animate-spin h-5 w-5 mr-2.5" />
//     <span>{message}</span>
//   </div>
// );

// const ErrorMessage = ({ message }) => {
//     if (!message) return null;
//     return (
//         <div className="flex items-start p-3.5 rounded-md bg-red-900/40 border border-red-700/50 text-red-300 text-sm my-4 animate-fadeInUp">
//             <AlertTriangle size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-red-400" />
//             <span>{message}</span>
//         </div>
//     );
// };

// const SuccessMessage = ({ message }) => {
//     if (!message) return null;
//     return (
//         <div className="flex items-start p-3.5 rounded-md bg-green-900/40 border border-green-700/50 text-green-300 text-sm my-4 animate-fadeInUp">
//             <CheckCircle2 size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-green-400" />
//             <span>{message}</span>
//         </div>
//     );
// };

// const InputField = ({ icon: Icon, name, type = "text", placeholder, value, onChange, error, required = false, ...props }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
//       {placeholder} {required && <span className="text-red-400">*</span>}
//     </label>
//     <div className="relative">
//       {Icon && <Icon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />}
//       <input id={name} name={name} type={type} value={value || ''} onChange={onChange} placeholder={`Enter ${placeholder.toLowerCase()}`} required={required}
//         className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm ${Icon ? 'pl-12' : 'pl-4'} pr-4 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'}`}
//         {...props} />
//     </div>
//     {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
//   </div>
// );

// const TextareaField = ({ icon: Icon, name, placeholder, value, onChange, error, required = false, rows = 4, ...props }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
//       {placeholder} {required && <span className="text-red-400">*</span>}
//     </label>
//     <div className="relative">
//       {Icon && <Icon className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />}
//       <textarea id={name} name={name} value={value || ''} onChange={onChange} placeholder={`Enter ${placeholder.toLowerCase()}`} required={required} rows={rows}
//         className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm resize-y ${Icon ? 'pl-12' : 'pl-4'} pr-4 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'}`}
//         {...props} />
//     </div>
//     {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
//   </div>
// );

// const SelectField = ({ icon: Icon, name, placeholder, value, onChange, error, options, required = false, ...props }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
//       {placeholder} {required && <span className="text-red-400">*</span>}
//     </label>
//     <div className="relative">
//       {Icon && <Icon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />}
//       <select id={name} name={name} value={value || ''} onChange={onChange} required={required}
//         className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm appearance-none ${Icon ? 'pl-12' : 'pl-4'} pr-10 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'} ${!value ? 'text-slate-400' : 'text-white'}`}
//         {...props} >
//         <option value="" disabled className="text-slate-500 bg-slate-700">{`Select ${placeholder}`}</option>
//         {options.map(opt => <option key={opt.value} value={opt.value} className="text-black bg-white">{opt.label}</option>)}
//       </select>
//       <ChevronDown className="absolute right-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
//     </div>
//     {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
//   </div>
// );
// // --- End Reusable UI Helper Components ---


// const PostJob = () => {
//   const initialFormData = { title: '', description: '', type: '', location: '', duration: '', applyLink: '' };
//   const [formData, setFormData] = useState(initialFormData);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [fieldErrors, setFieldErrors] = useState({});
//   const [success, setSuccess] = useState('');
  
//   const navigate = useNavigate();

//   // Function to get the token dynamically, specifically for 'alumni'
//   const getAlumniAuthToken = () => {
//     const role = localStorage.getItem('role');
//     let token = null;
//     if (role === 'alumni') {
//       token = localStorage.getItem('alumni_token'); // CRITICAL: Ensure this key is correct
//       console.log(`[getAlumniAuthToken] Role: 'alumni'. Token from 'alumni_token': ${token ? '******' : 'NULL (alumni_token not found!)'}`);
//     } else {
//       console.warn(`[getAlumniAuthToken] Current role is '${role}', not 'alumni'. This function expects 'alumni' role to get the correct token for posting a job.`);
//     }
//     return token;
//   };

//   useEffect(() => {
//     // Initial check to ensure the user is an alumnus.
//     // This doesn't prevent API calls if the token changes later,
//     // that's handled by calling getAlumniAuthToken() inside handleSubmit.
//     const currentRole = localStorage.getItem('role');
//     const token = localStorage.getItem('alumni_token'); // Specifically check alumni_token

//     if (currentRole !== 'alumni' || !token) {
//       console.warn("PostJob: Initial check - User is not an authenticated alumni or alumni_token is missing. Form interactions might fail if token isn't set before submit.");
//       // Optionally, set a persistent error or redirect if you want to block early
//       // setError('Access Denied: You must be logged in as an alumnus to post a job.');
//       // For now, the main auth check happens in handleSubmit
//     }
//   }, []); // Runs once on mount

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (fieldErrors[name]) {
//         setFieldErrors(prev => ({ ...prev, [name]: '' }));
//     }
//     setError('');
//   };

//   const validateForm = () => { /* ... Your existing validation logic ... */ 
//     const errors = {};
//     if (!formData.title.trim()) errors.title = 'Job title is required.';
//     if (formData.title.trim().length > 100) errors.title = 'Job title cannot exceed 100 characters.';
//     if (!formData.description.trim()) errors.description = 'Job description is required.';
//     if (formData.description.trim().length > 2000) errors.description = 'Description too long (max 2000 chars).';
//     if (!formData.type) errors.type = 'Job type is required.';
//     if (!formData.location.trim()) errors.location = 'Location is required.';
//     if (!formData.duration.trim()) errors.duration = 'Duration is required.';
//     if (!formData.applyLink.trim()) errors.applyLink = 'Application link is required.';
//     else if (!/^https?:\/\/.+/.test(formData.applyLink)) errors.applyLink = 'Application link must be a valid URL.';
    
//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); 
//     setSuccess('');
//     setFieldErrors({});

//     if (!validateForm()) {
//       setError("Please correct the errors highlighted in the form.");
//       return;
//     }

//     // **FIX APPLIED HERE: Get the token fresh from localStorage**
//     const currentAlumniToken = getAlumniAuthToken(); 
    
//     console.log("[handleSubmit] Attempting submission. Current Alumni Token:", currentAlumniToken ? '******' : 'NULL - THIS IS A PROBLEM!');

//     if (!currentAlumniToken) {
//       setError('Authentication failed: Alumni token is missing. Please ensure you are logged in as an alumnus.');
//       // navigate('/login'); // Optionally redirect immediately
//       return;
//     }

//     try {
//       setSubmitting(true);
//       console.log("[handleSubmit] Submitting formData:", JSON.stringify(formData));
//       console.log("[handleSubmit] Using Authorization Header:", `Bearer ${currentAlumniToken}`);

//       const res = await fetch('http://localhost:5000/api/jobs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${currentAlumniToken}`, // Use the freshly retrieved token
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       console.log("[handleSubmit] Server response data:", data);
//       console.log("[handleSubmit] Server response status:", res.status);

//       if (!res.ok) {
//         if (data.errors && typeof data.errors === 'object') {
//             setFieldErrors(data.errors);
//             // Set a general error as well if specific field errors are present from backend
//             throw new Error(data.message || 'Validation failed from server. Please check the fields.');
//         }
//         // If backend sends a 500 or other non-2xx, this will be the message
//         throw new Error(data.message || 'Something went wrong while posting the job.'); 
//       }

//       setSuccess(data.message || 'Job posted successfully!');
//       setFormData(initialFormData);
//       setTimeout(() => {
//         setSuccess('');
//       }, 4000);

//     } catch (err) {
//       console.error('[handleSubmit] Job post error object:', err);
//       // If specific field errors were already set by backend response, don't overwrite with generic.
//       // Otherwise, set the general error.
//       if (!Object.values(fieldErrors).some(Boolean)) {
//           setError(err.message || "An unexpected error occurred during submission.");
//       } else {
//           // If fieldErrors were set, the general error might still be useful
//           setError(prevError => prevError || err.message || "Please review field errors.");
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const jobTypeOptions = [
//     { value: "Full-time", label: "Full-time" },
//     { value: "Part-time", label: "Part-time" },
//     { value: "Internship", label: "Internship" },
//     { value: "Contract", label: "Contract" },
//     { value: "Temporary", label: "Temporary" },
//   ];

//   // Early return if not an alumnus to prevent form display to wrong role
//   const currentRole = localStorage.getItem('role');
//   if (currentRole !== 'alumni') {
//       return (
//           <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp text-center">
//               <AlertTriangle size={48} className="mx-auto text-yellow-400 mb-4" />
//               <h1 className="text-3xl font-bold text-yellow-300 mb-3">Access Denied</h1>
//               <p className="text-slate-300">Only alumni can post new job opportunities.</p>
//               <Link to="/login" className="mt-6 inline-block px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">
//                   Go to Login
//               </Link>
//           </div>
//       );
//   }

//   return (
//     <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
//       <header className="mb-10 text-center">
//         <Briefcase className="mx-auto h-16 w-16 text-purple-400 mb-4" />
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
//             Share an Opportunity
//           </span>
//         </h1>
//         <p className="mt-3 text-lg text-blue-200 max-w-xl mx-auto">
//           Help students and fellow alumni by posting relevant job or internship openings.
//         </p>
//       </header>

//       <div className="bg-slate-800/70 backdrop-blur-md p-6 sm:p-10 rounded-xl shadow-2xl border border-slate-700/60">
//         <form onSubmit={handleSubmit} className="space-y-6" noValidate>
//           <InputField icon={Edit3} name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} error={fieldErrors.title} required />
//           <TextareaField icon={FileText} name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} error={fieldErrors.description} required />
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <SelectField icon={ListChecks} name="type" placeholder="Job Type" value={formData.type} onChange={handleChange} options={jobTypeOptions} error={fieldErrors.type} required />
//             <InputField icon={MapPin} name="location" placeholder="Location (e.g., City, Remote)" value={formData.location} onChange={handleChange} error={fieldErrors.location} required />
//           </div>
          
//           <InputField icon={Clock} name="duration" placeholder="Duration (e.g., 6 Months, Permanent)" value={formData.duration} onChange={handleChange} error={fieldErrors.duration} required />
//           <InputField icon={ExternalLink} name="applyLink" type="url" placeholder="Application Link (URL)" value={formData.applyLink} onChange={handleChange} error={fieldErrors.applyLink} required />
          
//           <ErrorMessage message={error && !Object.values(fieldErrors).some(Boolean) ? error : null} />
//           <SuccessMessage message={success} />

//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full mt-8 inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-70 disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {submitting ? <LoadingFormSpinner message="Posting Job..." /> : <><PlusCircle size={20} className="mr-2.5" /> Post Job Opening</>}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostJob;





































import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Briefcase, PlusCircle, Send, Loader2, AlertTriangle, CheckCircle2,
  FileText, ListChecks, MapPin, Clock, ExternalLink, Edit3, ChevronDown
} from 'lucide-react';

// --- Reusable UI Helper Components ---
const LoadingFormSpinner = ({ message = "Processing..." }) => (
  <div className="flex items-center justify-center text-white">
    <Loader2 className="animate-spin h-5 w-5 mr-2.5" />
    <span>{message}</span>
  </div>
);

const ErrorMessage = ({ message }) =>
  message ? (
    <div className="flex items-start p-3.5 rounded-md bg-red-900/40 border border-red-700/50 text-red-300 text-sm my-4 animate-fadeInUp">
      <AlertTriangle size={20} className="mr-2.5 mt-0.5 text-red-400" />
      <span>{message}</span>
    </div>
  ) : null;

const SuccessMessage = ({ message }) =>
  message ? (
    <div className="flex items-start p-3.5 rounded-md bg-green-900/40 border border-green-700/50 text-green-300 text-sm my-4 animate-fadeInUp">
      <CheckCircle2 size={20} className="mr-2.5 mt-0.5 text-green-400" />
      <span>{message}</span>
    </div>
  ) : null;

const InputField = ({ icon: Icon, name, type = "text", placeholder, value, onChange, error, required = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
      {placeholder} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />}
      <input
        id={name}
        name={name}
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={`Enter ${placeholder.toLowerCase()}`}
        required={required}
        className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm ${Icon ? 'pl-12' : 'pl-4'} pr-4 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'}`}
      />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
);

const TextareaField = ({ icon: Icon, name, placeholder, value, onChange, error, required = false, rows = 4 }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
      {placeholder} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />}
      <textarea
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={`Enter ${placeholder.toLowerCase()}`}
        required={required}
        rows={rows}
        className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm resize-y ${Icon ? 'pl-12' : 'pl-4'} pr-4 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'}`}
      />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
);

const SelectField = ({ icon: Icon, name, placeholder, value, onChange, error, options, required = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
      {placeholder} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />}
      <select
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        required={required}
        className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm appearance-none ${Icon ? 'pl-12' : 'pl-4'} pr-10 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'} ${!value ? 'text-slate-400' : 'text-white'}`}
      >
        <option value="" disabled>{`Select ${placeholder}`}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="text-black bg-white">{opt.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
);
// --- End UI Helpers ---

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '', description: '', type: '', location: '', duration: '', applyLink: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  const jobTypeOptions = [
    { value: "fullTime", label: "Full-time" },
    { value: "partTime", label: "Part-time" },
    { value: "internship", label: "Internship" },
    { value: "temporary", label: "Temporary" },
  ];

  const currentRole = localStorage.getItem('role');
  const alumniToken =
    currentRole === 'student'
      ? localStorage.getItem('student_token')
      : currentRole === 'alumni'
      ? localStorage.getItem('alumni_token')
      : currentRole === 'admin'
      ? localStorage.getItem('admin_token')
      : null;

  useEffect(() => {
    if (currentRole !== 'alumni' || !alumniToken) {
      console.warn("Unauthorized access to job posting page.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
    setError('');
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required.";
    if (!formData.description.trim()) errors.description = "Description is required.";
    if (!formData.type) errors.type = "Type is required.";
    if (!formData.location.trim()) errors.location = "Location is required.";
    if (!formData.duration.trim()) errors.duration = "Duration is required.";
    if (!formData.applyLink.trim() || !/^https?:\/\/.+/.test(formData.applyLink))
      errors.applyLink = "Valid URL is required.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setFieldErrors({});

    if (!validateForm()) {
      setError('Please correct the highlighted fields.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${alumniToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) setFieldErrors(data.errors);
        throw new Error(data.message || 'Something went wrong.');
      }

      setSuccess(data.message || 'Job posted successfully!');
      setFormData({ title: '', description: '', type: '', location: '', duration: '', applyLink: '' });

      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.message || 'Unexpected error.');
    } finally {
      setSubmitting(false);
    }
  };

  if (currentRole !== 'alumni') {
    return (
      <div className="text-center py-10">
        <AlertTriangle className="mx-auto text-yellow-400 mb-4" size={48} />
        <h1 className="text-3xl font-bold text-yellow-300">Access Denied</h1>
        <p className="text-slate-300">Only alumni can post job opportunities.</p>
        <Link to="/login" className="mt-6 inline-block px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10">
      <header className="mb-10 text-center">
        <Briefcase className="mx-auto h-16 w-16 text-purple-400 mb-4" />
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Share an Opportunity
        </h1>
        <p className="mt-3 text-blue-200">Help students by posting job or internship openings.</p>
      </header>

      <div className="bg-slate-800/70 backdrop-blur-md p-10 rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <InputField icon={Edit3} name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} error={fieldErrors.title} required />
          <TextareaField icon={FileText} name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} error={fieldErrors.description} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SelectField icon={ListChecks} name="type" placeholder="Job Type" value={formData.type} onChange={handleChange} options={jobTypeOptions} error={fieldErrors.type} required />
            <InputField icon={MapPin} name="location" placeholder="Location" value={formData.location} onChange={handleChange} error={fieldErrors.location} required />
          </div>
          <InputField icon={Clock} name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} error={fieldErrors.duration} required />
          <InputField icon={ExternalLink} name="applyLink" type="url" placeholder="Application Link" value={formData.applyLink} onChange={handleChange} error={fieldErrors.applyLink} required />
          
          <ErrorMessage message={error} />
          <SuccessMessage message={success} />

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-8 inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 disabled:opacity-60"
          >
            {submitting ? <LoadingFormSpinner message="Posting Job..." /> : <><PlusCircle size={20} className="mr-2.5" /> Post Job Opening</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;