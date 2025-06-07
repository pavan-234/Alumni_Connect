// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Mentorship = () => {
//   const [alumniList, setAlumniList] = useState([]);
//   const [selectedAlumni, setSelectedAlumni] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAlumni = async () => {
//       try {
//         setError('');
//         setLoading(true);
//         const token = localStorage.getItem('student_token');
//         const response = await axios.get('http://localhost:5000/api/search/alumni', {
//           headers: {
//             'Content-Type': 'application/json',
//             'token': token,
//           },
//           withCredentials: true,
//         });
//         if (Array.isArray(response.data)) {
//           setAlumniList(response.data);
//         } else {
//           throw new Error('Unexpected response format');
//         }
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch alumni data. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAlumni();
//   }, []);

//   const handleMentorshipRequest = async () => {
//     if (!selectedAlumni) {
//       setError('Please select an alumni.');
//       return;
//     }

//     try {
//       setError('');
//       setSuccess('');
//       setSubmitLoading(true);
//       const token = localStorage.getItem('student_token');
//       const response = await axios.post(
//         'http://localhost:5000/api/mentorship',
//         { alumniId: selectedAlumni },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'token': token,
//           },
//           withCredentials: true,
//         }
//       );

//       setSuccess(response.data.message || 'Mentorship request sent successfully!');
//       setTimeout(() => navigate('/student-dashboard'), 1500); // Delay navigation for user to see success
//     } catch (err) {
//       console.error(err);
//       setError(err?.response?.data?.message || 'Failed to send request. Please try again.');
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="flex flex-col items-center">
//           <svg
//             className="animate-spin h-8 w-8 text-blue-600"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//           <p className="mt-2 text-gray-600">Loading alumni...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//           Request Mentorship
//         </h1>
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
//         <div className="space-y-6">
//           <div>
//             <label htmlFor="alumniSelect" className="block text-sm font-medium text-gray-700">
//               Select Alumni
//             </label>
//             <select
//               id="alumniSelect"
//               onChange={(e) => setSelectedAlumni(e.target.value)}
//               value={selectedAlumni}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               disabled={submitLoading}
//               aria-label="Select an alumni for mentorship"
//             >
//               <option value="">--Select Alumni--</option>
//               {alumniList.length > 0 ? (
//                 alumniList.map((alumni) => (
//                   <option key={alumni._id} value={alumni._id}>
//                     {alumni.fullName}
//                   </option>
//                 ))
//               ) : (
//                 <option value="" disabled>
//                   No alumni available
//                 </option>
//               )}
//             </select>
//           </div>
//           <button
//             onClick={handleMentorshipRequest}
//             className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
//             disabled={submitLoading}
//             aria-label="Send mentorship request"
//           >
//             {submitLoading ? 'Sending...' : 'Send Request'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Mentorship;

















// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Users,
//   Send,
//   Loader2,
//   CheckCircle2,
//   AlertTriangle,
//   UserCheck,
//   ChevronDown,
//   SearchX,
//   Briefcase, // For alumni's current role/company
//   GraduationCap, // For alumni's graduation year/major
// } from 'lucide-react';

// // --- Reusable UI Helper Components (similar to Jobs.jsx for consistency) ---

// const LoadingState = ({ message = "Loading available mentors..." }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-blue-200 py-10">
//     <Loader2 className="animate-spin h-16 w-16 text-purple-400 mb-6" />
//     <h2 className="text-2xl font-semibold text-white mb-2">Please Wait</h2>
//     <p className="text-blue-300">{message}</p>
//   </div>
// );

// const ErrorState = ({ message, onRetry }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-red-300 p-8 bg-slate-800/50 rounded-xl shadow-xl border border-red-500/30">
//     <AlertTriangle className="h-16 w-16 text-red-400 mb-6" />
//     <h2 className="text-2xl font-semibold text-red-200 mb-2">An Error Occurred</h2>
//     <p className="text-center text-red-300 max-w-md">
//       {message || "Sorry, we couldn't complete your request at this time."}
//     </p>
//     {onRetry && (
//       <button
//         onClick={onRetry}
//         className="mt-6 inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
//       >
//         Try Again
//       </button>
//     )}
//   </div>
// );

// const NoAlumniState = () => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-blue-200 p-8 bg-slate-800/50 rounded-xl shadow-xl border border-blue-500/20">
//     <SearchX className="h-20 w-20 text-purple-400 mb-8" />
//     <h2 className="text-3xl font-semibold text-white mb-3">No Mentors Available</h2>
//     <p className="text-blue-200 text-center max-w-lg">
//       Currently, there are no alumni available for mentorship. Please check back later as new mentors join our platform.
//     </p>
//   </div>
// );

// // Custom Select Dropdown (enhancement over native select)
// const CustomSelectAlumni = ({ alumniList, selectedAlumni, setSelectedAlumni, disabled, labelId }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const selectedAlumnus = alumniList.find(a => a._id === selectedAlumni);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   if (!alumniList || alumniList.length === 0) {
//     return (
//          <div className="mt-1 p-4 border border-slate-600 rounded-lg text-slate-400 bg-slate-700/30 text-center">
//             No alumni mentors currently available.
//          </div>
//     );
//   }

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         type="button"
//         id={labelId}
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//         disabled={disabled}
//         className={`w-full flex items-center justify-between p-4 pr-3 border rounded-lg transition-colors duration-150
//                     ${disabled ? 'bg-slate-700/50 cursor-not-allowed border-slate-600' : 'bg-slate-700/30 hover:bg-slate-600/50 border-slate-600 hover:border-purple-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50'}
//                     text-white placeholder-slate-400 outline-none text-left`}
//         aria-haspopup="listbox"
//         aria-expanded={isOpen}
//       >
//         {selectedAlumnus ? (
//           <div className="flex items-center">
//             {/* Basic initial placeholder, can be enhanced with image if available */}
//             <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm mr-3">
//               {selectedAlumnus.fullName?.charAt(0).toUpperCase()}
//             </div>
//             <span>{selectedAlumnus.fullName} <span className="text-xs text-slate-400">({selectedAlumnus.graduationYear || 'Alumni'})</span></span>
//           </div>
//         ) : (
//           <span className="text-slate-400">-- Select a Mentor --</span>
//         )}
//         <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {isOpen && !disabled && (
//         <ul
//           className="absolute z-10 mt-1 w-full max-h-72 overflow-y-auto bg-slate-800 border border-slate-700 rounded-lg shadow-2xl py-1 animate-fadeInDropdown"
//           role="listbox"
//           aria-labelledby={labelId}
//         >
//           {alumniList.map((alumni) => (
//             <li
//               key={alumni._id}
//               onClick={() => {
//                 setSelectedAlumni(alumni._id);
//                 setIsOpen(false);
//               }}
//               className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors duration-150
//                           ${selectedAlumni === alumni._id ? 'bg-purple-600/30 text-purple-300' : 'hover:bg-slate-700/80 text-slate-200 hover:text-white'}`}
//               role="option"
//               aria-selected={selectedAlumni === alumni._id}
//             >
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm mr-3">
//                  {alumni.fullName?.charAt(0).toUpperCase()}
//                 </div>
//                 <div>
//                   <span className="block font-medium">{alumni.fullName}</span>
//                   <span className="text-xs text-slate-400">
//                     {alumni.currentRole || 'Role not specified'} @ {alumni.currentCompany || 'Company not specified'}
//                   </span>
//                   {/* <span className="block text-xs text-slate-400">Graduated: {alumni.graduationYear || 'N/A'} ({alumni.major || 'N/A'})</span> */}
//                 </div>
//               </div>
//               {selectedAlumni === alumni._id && <CheckCircle2 className="h-5 w-5 text-purple-400" />}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };


// // --- Main Mentorship Component ---

// const Mentorship = () => {
//   const [alumniList, setAlumniList] = useState([]);
//   const [selectedAlumni, setSelectedAlumni] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loadingAlumni, setLoadingAlumni] = useState(true);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const navigate = useNavigate();

//   const fetchAlumni = async () => { // Made into a callable function for retry
//     try {
//       setError('');
//       setLoadingAlumni(true);
//       // CONSISTENCY NOTE: Using 'user_token' assuming it's the standard.
//       const token = localStorage.getItem('user_token');
//       const response = await axios.get('http://localhost:5000/api/search/alumni', { // Ensure this endpoint returns data needed for CustomSelectAlumni
//         headers: {
//           'Content-Type': 'application/json',
//           ...(token && { Authorization: `Bearer ${token}` }), // Standardized token header
//         },
//         // withCredentials: true, // Usually for cookies, review if needed with Bearer token
//       });
//       if (Array.isArray(response.data)) {
//         // Filter for alumni who are explicitly available for mentorship, if such a field exists
//         // const availableMentors = response.data.filter(alumni => alumni.isAvailableForMentorship === true);
//         // setAlumniList(availableMentors);
//         setAlumniList(response.data); // Assuming all returned alumni are potential mentors
//       } else {
//         throw new Error('Unexpected response format from server.');
//       }
//     } catch (err) {
//       console.error('Fetch Alumni Error:', err);
//       setError(err?.response?.data?.message || 'Failed to fetch alumni data. Please check your connection and try again.');
//     } finally {
//       setLoadingAlumni(false);
//     }
//   };

//   useEffect(() => {
//     fetchAlumni();
//   }, []);

//   const handleMentorshipRequest = async (e) => {
//     e.preventDefault(); // Prevent default form submission if wrapped in form
//     if (!selectedAlumni) {
//       setError('Please select an alumnus to request mentorship.');
//       return;
//     }

//     try {
//       setError('');
//       setSuccess('');
//       setSubmitLoading(true);
//       const token = localStorage.getItem('user_token');
//       const response = await axios.post(
//         'http://localhost:5000/api/mentorship',
//         { alumniId: selectedAlumni },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//         }
//       );

//       setSuccess(response.data.message || 'Mentorship request sent successfully! The alumnus will be notified.');
//       setSelectedAlumni(''); // Reset selection
//       setTimeout(() => {
//         setSuccess(''); // Clear success message
//         // Optionally navigate, or stay on page to allow another request
//         // navigate('/student-dashboard');
//       }, 3000); // Longer delay for success message
//     } catch (err) {
//       console.error('Mentorship Request Error:', err);
//       setError(err?.response?.data?.message || 'Failed to send mentorship request. The alumnus might not be available or an error occurred.');
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   // Keyframes for dropdown animation (better in global CSS)
//   const keyframesStyle = `
//     @keyframes fadeInDropdown {
//       0% { opacity: 0; transform: translateY(-10px); }
//       100% { opacity: 1; transform: translateY(0); }
//     }
//   `;


//   if (loadingAlumni) {
//     return <LoadingState />;
//   }

//   if (error && alumniList.length === 0) { // Show error prominently if list failed to load
//       return <ErrorState message={error} onRetry={fetchAlumni} />;
//   }

//   return (
//     <>
//       <style>{keyframesStyle}</style>
//       <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <header className="mb-10 text-center">
//           <UserCheck className="mx-auto h-16 w-16 text-purple-400 mb-4" />
//           <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
//               Connect with a Mentor
//             </span>
//           </h1>
//           <p className="mt-3 text-lg text-blue-200 max-w-xl mx-auto">
//             Select an experienced alumnus from our network to guide you on your career path.
//           </p>
//         </header>

//         {alumniList.length === 0 && !error && <NoAlumniState />}

//         {alumniList.length > 0 && (
//           <form
//             onSubmit={handleMentorshipRequest}
//             className="bg-slate-800/60 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700/50 space-y-8"
//           >
//             <div>
//               <label htmlFor="alumniSelectButton" className="block text-lg font-semibold text-slate-100 mb-3">
//                 Choose Your Mentor
//               </label>
//               <CustomSelectAlumni
//                 alumniList={alumniList}
//                 selectedAlumni={selectedAlumni}
//                 setSelectedAlumni={setSelectedAlumni}
//                 disabled={submitLoading}
//                 labelId="alumniSelectButton"
//               />
//             </div>

//             {error && !success && ( // Show request-specific error, not initial load error if list is present
//               <div className="flex items-start p-3.5 rounded-md bg-red-900/40 border border-red-700/50 text-red-300 text-sm">
//                 <AlertTriangle size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-red-400" />
//                 <span>{error}</span>
//               </div>
//             )}
//             {success && (
//               <div className="flex items-start p-3.5 rounded-md bg-green-900/40 border border-green-700/50 text-green-300 text-sm">
//                 <CheckCircle2 size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-green-400" />
//                 <span>{success}</span>
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={submitLoading || !selectedAlumni}
//               className={`w-full inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-lg shadow-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-opacity-70
//                           ${submitLoading || !selectedAlumni
//                             ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
//                             : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white hover:shadow-xl hover:scale-[1.02] focus:ring-purple-400'
//                           }`}
//               aria-label="Send mentorship request to selected alumni"
//             >
//               {submitLoading ? (
//                 <>
//                   <Loader2 className="animate-spin h-5 w-5 mr-2.5" />
//                   Sending Request...
//                 </>
//               ) : (
//                 <>
//                   <Send className="h-5 w-5 mr-2.5" />
//                   Request Mentorship
//                 </>
//               )}
//             </button>
//           </form>
//         )}
//       </div>
//     </>
//   );
// };

// // export default Mentorship;
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import {
//   Users,
//   Send,
//   Loader2,
//   CheckCircle2,
//   AlertTriangle,
//   UserCheck,
//   ChevronDown,
//   SearchX,
//   Briefcase,
//   GraduationCap,
// } from 'lucide-react';

// const baseUrl = 'http://localhost:5000/api';

// const LoadingState = ({ message = "Loading..." }) => (
//   <div className="text-center py-10 text-blue-300">
//     <Loader2 className="animate-spin h-10 w-10 mx-auto mb-4" />
//     <p>{message}</p>
//   </div>
// );

// const ErrorState = ({ message, onRetry }) => (
//   <div className="text-center py-10 text-red-400">
//     <AlertTriangle className="h-10 w-10 mx-auto mb-4" />
//     <p>{message}</p>
//     {onRetry && <button onClick={onRetry} className="mt-3 px-4 py-2 bg-red-600 rounded text-white">Retry</button>}
//   </div>
// );

// const CustomSelectAlumni = ({ alumniList, selectedAlumni, setSelectedAlumni, disabled }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const selected = alumniList.find(a => a._id === selectedAlumni);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         type="button"
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//         disabled={disabled}
//         className="w-full p-3 border bg-slate-700 text-white rounded flex justify-between"
//       >
//         {selected ? selected.fullName : "Select Mentor"}
//         <ChevronDown />
//       </button>
//       {isOpen && (
//         <ul className="absolute z-10 w-full bg-slate-800 border mt-1 rounded text-white max-h-60 overflow-y-auto">
//           {alumniList.map((alumni) => (
//             <li
//               key={alumni._id}
//               className="p-3 hover:bg-purple-700 cursor-pointer"
//               onClick={() => {
//                 setSelectedAlumni(alumni._id);
//                 setIsOpen(false);
//               }}
//             >
//               {alumni.fullName} – {alumni.currentCompany}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// const Mentorship = () => {
//   const [alumniList, setAlumniList] = useState([]);
//   const [selectedAlumni, setSelectedAlumni] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [requests, setRequests] = useState([]);

//   const token = localStorage.getItem('student_token');

//   const fetchAlumni = async () => {
//     try {
//       setError('');
//       setLoading(true);
//       const role = localStorage.getItem('role');
//         const token =
//           role === 'student'
//             ? localStorage.getItem('student_token')
//             : role === 'alumni'
//             ? localStorage.getItem('alumni_token')
//             : role === 'admin'
//             ? localStorage.getItem('admin_token')
//             : null;
      
//         if (!token) {
//           throw new Error('Authentication token not found.');
//         }
//       const res = await axios.get(`${baseUrl}/search/alumni`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAlumniList(res.data);
//     } catch (err) {
//       setError('Failed to fetch mentors.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(`${baseUrl}/mentorship`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRequests(res.data);
//     } catch (err) {
//       console.error("Error loading mentorships");
//     }
//   };

//   useEffect(() => {
//     fetchAlumni();
//     fetchRequests();
//   }, []);

//   const handleMentorshipRequest = async (e) => {
//     e.preventDefault();
//     if (!selectedAlumni) {
//       setError('Please select a mentor.');
//       return;
//     }

//     try {
//       setSubmitLoading(true);
//       const res = await axios.post(`${baseUrl}/mentorship`, {
//         alumniId: selectedAlumni,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSuccess('Request sent!');
//       setSelectedAlumni('');
//       fetchRequests();
//     } catch (err) {
//       setError(err?.response?.data?.message || 'Request failed.');
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   if (loading) return <LoadingState />;
//   if (error && alumniList.length === 0) return <ErrorState message={error} onRetry={fetchAlumni} />;

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-10 text-white">
//       <h2 className="text-3xl font-bold mb-6 text-center">Connect with a Mentor</h2>

//       <form onSubmit={handleMentorshipRequest} className="bg-slate-800 p-6 rounded-lg space-y-4 border border-slate-600">
//         <CustomSelectAlumni
//           alumniList={alumniList}
//           selectedAlumni={selectedAlumni}
//           setSelectedAlumni={setSelectedAlumni}
//           disabled={submitLoading}
//         />
//         {error && <p className="text-red-400">{error}</p>}
//         {success && <p className="text-green-400">{success}</p>}
//         <button
//           type="submit"
//           disabled={submitLoading || !selectedAlumni}
//           className={`w-full py-2 rounded bg-purple-600 hover:bg-purple-700 ${submitLoading ? 'opacity-50' : ''}`}
//         >
//           {submitLoading ? 'Sending...' : 'Request Mentorship'}
//         </button>
//       </form>

//       <div className="mt-10">
//         <h3 className="text-xl font-semibold mb-4">Your Requests</h3>
//         {requests.length === 0 ? (
//           <p className="text-slate-400">No requests yet.</p>
//         ) : (
//           <ul className="space-y-4">
//             {requests.map((r) => (
//               <li key={r._id} className="bg-slate-700 p-4 rounded-lg">
//                 <p className="font-semibold">{r.alumni?.fullName}</p>
//                 <p className="text-sm text-slate-300">Status: {r.status}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Mentorship;
















// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Using axios as in your original mentorship request logic
// import {
//   Users, Search, Briefcase, GraduationCap, ChevronLeft, ChevronRight, Loader2,
//   AlertTriangle, UserCheck, Send, Clock, XCircle, CheckCircle2, MessageSquare, UserPlus, // UserPlus for request
// } from 'lucide-react';

// // --- Reusable UI Helper Components (from SearchAlumni for consistency) ---
// const LoadingState = ({ message = "Loading..." }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-blue-200 py-10">
//     <Loader2 className="animate-spin h-12 w-12 text-purple-400 mb-4" /> {/* Smaller spinner for sub-sections */}
//     <p className="text-xl text-white">{message}</p>
//   </div>
// );

// const ErrorState = ({ message, onRetry, small = false }) => (
//   <div className={`flex flex-col items-center justify-center text-red-300 p-6 bg-slate-800/50 rounded-lg shadow-lg border border-red-500/30 ${small ? 'min-h-[200px]' : 'min-h-[calc(100vh-15rem)]'}`}>
//     <AlertTriangle className={`${small ? 'h-10 w-10':'h-16 w-16'} text-red-400 mb-4`} />
//     <h2 className={`${small ? 'text-lg':'text-xl'} font-semibold text-red-200`}>An Error Occurred</h2>
//     <p className="text-center mt-1 max-w-md">
//       {message || "Sorry, something went wrong."}
//     </p>
//     {onRetry && (
//       <button
//         onClick={onRetry}
//         className="mt-4 inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg"
//       >
//         Try Again
//       </button>
//     )}
//   </div>
// );

// const AlumniAvatar = ({ src, name, size = "w-16 h-16" }) => { // Slightly smaller default for cards
//   const [imgError, setImgError] = useState(false);
//   const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'A')}&background=random&color=fff&size=96&font-size=0.33&bold=true`;
//   return (
//     <img
//       src={imgError || !src ? fallbackSrc : src}
//       alt={`${name || 'Alumni'}'s profile`}
//       className={`${size} rounded-full object-cover border-2 border-slate-600 shadow-md`}
//       onError={() => setImgError(true)}
//     />
//   );
// };

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   // (Same Pagination component from SearchAlumni - keep it here or move to a shared utils file)
//   if (totalPages <= 1) return null;
//   const pageNumbers = []; const maxButtons = 5;
//   if (totalPages <= maxButtons) { for (let i = 1; i <= totalPages; i++) pageNumbers.push(i); } 
//   else {
//     pageNumbers.push(1);
//     if (currentPage > 3) pageNumbers.push('...');
//     let startPage = Math.max(2, currentPage - Math.floor((maxButtons - 3) / 2));
//     let endPage = Math.min(totalPages - 1, currentPage + Math.floor((maxButtons - 2) / 2));
//     if (currentPage <= Math.floor(maxButtons/2)) endPage = Math.min(totalPages -1, maxButtons - 2);
//     if (currentPage >= totalPages - Math.floor(maxButtons/2) +1) startPage = Math.max(2, totalPages - maxButtons + 3);
//     for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
//     if (currentPage < totalPages - Math.floor(maxButtons/2)) pageNumbers.push('...');
//     pageNumbers.push(totalPages);
//   }
//   return (
//     <nav className="mt-8 flex items-center justify-center space-x-1 sm:space-x-2" aria-label="Pagination">
//       <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50"><ChevronLeft size={18} /></button>
//       {pageNumbers.map((page, index) => typeof page === 'number' ? (<button key={page} onClick={() => onPageChange(page)} className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium ${currentPage === page ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>{page}</button>) : (<span key={`ellipsis-${index}`} className="px-3 py-1.5 text-slate-400">...</span>))}
//       <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50"><ChevronRight size={18} /></button>
//     </nav>
//   );
// };

// // --- Tabs Component ---
// const Tabs = ({ tabs, activeTab, onTabClick }) => (
//   <div className="mb-8 border-b border-slate-700">
//     <nav className="-mb-px flex space-x-4 sm:space-x-8" aria-label="Tabs">
//       {tabs.map((tab) => (
//         <button
//           key={tab.name}
//           onClick={() => onTabClick(tab.name)}
//           className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors
//             ${activeTab === tab.name
//               ? 'border-purple-500 text-purple-400'
//               : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
//             }`}
//           aria-current={activeTab === tab.name ? 'page' : undefined}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </nav>
//   </div>
// );

// // --- Mentorship Request Card for "My Requests" section ---
// const MentorshipRequestCard = ({ request, onChat }) => {
//   const { alumni, status, requestedAt, respondedAt } = request;
//   const getStatusPill = () => {
//     switch (status) {
//       case 'pending': return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-yellow-600/30 text-yellow-300 flex items-center"><Clock size={12} className="mr-1"/> Pending</span>;
//       case 'accepted': return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-600/30 text-green-300 flex items-center"><CheckCircle2 size={12} className="mr-1"/> Accepted</span>;
//       case 'rejected': return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-600/30 text-red-300 flex items-center"><XCircle size={12} className="mr-1"/> Rejected</span>;
//       default: return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-600/30 text-slate-300">Unknown</span>;
//     }
//   };

//   return (
//     <div className="bg-slate-800/70 p-4 rounded-lg shadow-lg border border-slate-700/50 flex items-center space-x-4">
//       <AlumniAvatar src={alumni.profilePic} name={alumni.fullName} size="w-12 h-12 sm:w-16 sm:h-16" />
//       <div className="flex-1">
//         <h4 className="font-semibold text-slate-100 text-md sm:text-lg">{alumni.fullName}</h4>
//         <p className="text-xs text-slate-400">
//           Requested: {new Date(requestedAt).toLocaleDateString()}
//           {respondedAt && ` | Responded: ${new Date(respondedAt).toLocaleDateString()}`}
//         </p>
//         <div className="mt-2 flex flex-wrap items-center gap-2">
//             {getStatusPill()}
//             {status === 'accepted' && (
//                 <button 
//                     onClick={() => onChat(alumni)}
//                     className="ml-auto text-xs inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
//                 >
//                     <MessageSquare size={14} className="mr-1.5" /> Chat
//                 </button>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };


// // --- Main Mentorship Page Component ---
// const ITEMS_PER_PAGE = 9; // For alumni listing

// const Mentorship = () => {
//   const [allAlumni, setAllAlumni] = useState([]);
//   const [myRequests, setMyRequests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeTab, setActiveTab] = useState('find_mentor'); // 'find_mentor' or 'my_requests'
  
//   const [loading, setLoading] = useState({ alumni: true, requests: true, sending: false });
//   const [error, setError] = useState({ alumni: '', requests: '', sending: '' });
  
//   const navigate = useNavigate();
//   const studentId = localStorage.getItem('userId');

//   const getToken = () => { /* ... same getToken as before ... */ 
//     const role = localStorage.getItem('role');
//     return role === 'student' ? localStorage.getItem('student_token') :
//            role === 'alumni' ? localStorage.getItem('alumni_token') :
//            role === 'admin' ? localStorage.getItem('admin_token') : null;
//   };


//   const fetchAlumniData = useCallback(async () => {
//     // (Same fetchAlumniData from SearchAlumni, adapted)
//     try {
//       setLoading(prev => ({ ...prev, alumni: true })); setError(prev => ({ ...prev, alumni: '' }));
//       const token = getToken();
//       if (!token) { navigate('/login'); return; }
//       const res = await axios.get('http://localhost:5000/api/search/alumni', { headers: { Authorization: `Bearer ${token}` } });
//       if (Array.isArray(res.data)) setAllAlumni(res.data);
//       else throw new Error("Invalid alumni data format.");
//     } catch (err) {
//       console.error('Fetch Alumni Error:', err);
//       setError(prev => ({ ...prev, alumni: err.response?.data?.message || err.message || 'Failed to load alumni.' }));
//     } finally {
//       setLoading(prev => ({ ...prev, alumni: false }));
//     }
//   }, [navigate]);

//   const fetchMyRequests = useCallback(async () => {
//     try {
//       setLoading(prev => ({ ...prev, requests: true })); setError(prev => ({ ...prev, requests: '' }));
//       const token = getToken();
//       if (!token) { navigate('/login'); return; }
//       // IMPORTANT: Replace with your actual endpoint for fetching student's mentorship requests
//       const res = await axios.get('http://localhost:5000/api/mentorship/my-requests', { headers: { Authorization: `Bearer ${token}` } });
//       if (Array.isArray(res.data)) {
//         // Sort requests: pending first, then by date
//         const sorted = res.data.sort((a, b) => {
//             if (a.status === 'pending' && b.status !== 'pending') return -1;
//             if (a.status !== 'pending' && b.status === 'pending') return 1;
//             return new Date(b.requestedAt) - new Date(a.requestedAt);
//         });
//         setMyRequests(sorted);
//       } else throw new Error("Invalid requests data format.");
//     } catch (err) {
//       console.error('Fetch My Requests Error:', err);
//       setError(prev => ({ ...prev, requests: err.response?.data?.message || err.message || 'Failed to load your mentorship requests.' }));
//     } finally {
//       setLoading(prev => ({ ...prev, requests: false }));
//     }
//   }, [navigate]);


//   useEffect(() => {
//     fetchAlumniData();
//     fetchMyRequests();
//   }, [fetchAlumniData, fetchMyRequests]);


//   const handleMentorshipRequest = async (alumniIdToRequest) => {
//     if (myRequests.some(req => req.alumni._id === alumniIdToRequest && (req.status === 'pending' || req.status === 'accepted'))) {
//         setError(prev => ({ ...prev, sending: 'Request already sent or accepted for this mentor.' }));
//         setTimeout(() => setError(prev => ({...prev, sending: ''})), 3000);
//         return;
//     }

//     try {
//       setLoading(prev => ({ ...prev, sending: true })); setError(prev => ({ ...prev, sending: '' }));
//       const token = getToken();
//       if (!token) { navigate('/login'); return; }

//       await axios.post('http://localhost:5000/api/mentorship', { alumniId: alumniIdToRequest }, {
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });
//       // Refresh my requests to show the new pending request
//       fetchMyRequests();
//       // Optionally provide a success message
//       // setSuccess('Mentorship request sent successfully!');
//       // setTimeout(() => setSuccess(''), 3000);
//     } catch (err) {
//       console.error('Send Mentorship Request Error:', err);
//       setError(prev => ({ ...prev, sending: err.response?.data?.message || err.message || 'Failed to send request.' }));
//     } finally {
//       setLoading(prev => ({ ...prev, sending: false }));
//     }
//   };
  
//   const handleStartChat = (alumnus) => {
//       localStorage.setItem('chatReceiverId', alumnus._id); // Store ID for Chat page to pick up
//       navigate('/student-dashboard/chat'); // Or your specific chat route
//   };

//   // Client-side filtering for "Find a Mentor" tab
//   const filteredAlumni = useMemo(() => {
//     if (activeTab !== 'find_mentor') return [];
//     if (!searchTerm) return allAlumni;
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return allAlumni.filter(a => a.fullName?.toLowerCase().includes(lowerSearchTerm) || a.currentCompany?.toLowerCase().includes(lowerSearchTerm) || a.passoutYear?.toString().includes(lowerSearchTerm));
//   }, [allAlumni, searchTerm, activeTab]);

//   // Pagination for "Find a Mentor" tab
//   const totalPages = Math.ceil(filteredAlumni.length / ITEMS_PER_PAGE);
//   const currentDisplayAlumni = useMemo(() => {
//     if (activeTab !== 'find_mentor') return [];
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredAlumni.slice(startIndex, startIndex + ITEMS_PER_PAGE);
//   }, [filteredAlumni, currentPage, activeTab]);

//   const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
//   const handlePageChange = (page) => { if (page >= 1 && page <= totalPages) setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' });};

//   const TABS = [
//     { name: 'find_mentor', label: 'Find a Mentor' },
//     { name: 'my_requests', label: 'My Requests' },
//   ];

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
//       <header className="mb-10 text-center">
//         <UserCheck className="mx-auto h-16 w-16 text-purple-400 mb-4" />
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
//             Mentorship Hub
//           </span>
//         </h1>
//         <p className="mt-3 text-lg text-blue-200 max-w-2xl mx-auto">
//           Connect with alumni mentors and manage your mentorship journey.
//         </p>
//       </header>

//       <Tabs tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />

//       {activeTab === 'find_mentor' && (
//         <section>
//           <div className="mb-8 max-w-xl mx-auto">
//             <div className="relative">
//               <input type="text" placeholder="Search mentors by name, company, year..."
//                 className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500"
//                 value={searchTerm} onChange={handleSearchChange} />
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
//             </div>
//           </div>

//           {loading.alumni && <LoadingState message="Loading potential mentors..." />}
//           {!loading.alumni && error.alumni && <ErrorState message={error.alumni} onRetry={fetchAlumniData} small />}
//           {!loading.alumni && !error.alumni && currentDisplayAlumni.length === 0 && (
//             <div className="text-center py-10"><Users size={56} className="mx-auto text-slate-500 mb-3" /><p className="text-xl text-slate-300">{searchTerm ? "No mentors match your search." : "No mentors available currently."}</p></div>
//           )}

//           {!loading.alumni && !error.alumni && currentDisplayAlumni.length > 0 && (
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {currentDisplayAlumni.map((alumni) => (
//                 <article key={alumni._id} className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col border border-slate-700/50">
//                   <div className="p-5 flex flex-col items-center text-center flex-grow">
//                     <AlumniAvatar src={alumni.profilePic} name={alumni.fullName} />
//                     <h3 className="mt-3 text-lg font-semibold text-slate-100">{alumni.fullName}</h3>
//                     <p className="text-sm text-purple-300 mt-0.5">{alumni.currentRole || 'Alumnus/Alumna'}{alumni.currentCompany && ` at ${alumni.currentCompany}`}</p>
//                     <p className="text-xs text-slate-400 mt-1">Batch of {alumni.passoutYear || 'N/A'}</p>
//                   </div>
//                   <div className="p-4 border-t border-slate-700/50 mt-auto">
//                     <button
//                       onClick={() => handleMentorshipRequest(alumni._id)}
//                       disabled={loading.sending || myRequests.some(req => req.alumni._id === alumni._id && (req.status === 'pending' || req.status === 'accepted'))}
//                       className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-md shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
//                     >
//                       {loading.sending && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
//                       {myRequests.some(req => req.alumni._id === alumni._id && req.status === 'pending') ? <><Clock size={16} className="mr-2"/>Request Pending</> :
//                        myRequests.some(req => req.alumni._id === alumni._id && req.status === 'accepted') ? <><CheckCircle2 size={16} className="mr-2"/>Mentorship Active</> :
//                        <><UserPlus size={16} className="mr-2"/>Request Mentorship</>}
//                     </button>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           )}
//           {!loading.alumni && !error.alumni && totalPages > 1 && (
//             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//           )}
//            {error.sending && <ErrorMessage message={error.sending} />}
//         </section>
//       )}

//       {activeTab === 'my_requests' && (
//         <section>
//           {loading.requests && <LoadingState message="Loading your mentorship requests..." />}
//           {!loading.requests && error.requests && <ErrorState message={error.requests} onRetry={fetchMyRequests} small />}
//           {!loading.requests && !error.requests && myRequests.length === 0 && (
//             <div className="text-center py-10"><UserCheck size={56} className="mx-auto text-slate-500 mb-3" /><p className="text-xl text-slate-300">You haven't sent any mentorship requests yet.</p><p className="text-slate-400 mt-1">Find a mentor in the "Find a Mentor" tab!</p></div>
//           )}
//           {!loading.requests && !error.requests && myRequests.length > 0 && (
//             <div className="space-y-4 max-w-3xl mx-auto">
//               {myRequests.map(request => (
//                 <MentorshipRequestCard key={request._id} request={request} onChat={handleStartChat} />
//               ))}
//             </div>
//           )}
//         </section>
//       )}
//     </div>
//   );
// };

// export default Mentorship;



























// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Users, Search, Briefcase, GraduationCap, ChevronLeft, ChevronRight, Loader2,
//   AlertTriangle, UserCheck, Send, Clock, XCircle, CheckCircle2, MessageSquare, UserPlus, Ban,
// } from 'lucide-react';

// // --- Reusable UI Helper Components (Keep as is) ---
// const LoadingState = ({ message = "Loading..." }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-blue-200 py-10">
//     <Loader2 className="animate-spin h-12 w-12 text-purple-400 mb-4" />
//     <p className="text-xl text-white">{message}</p>
//   </div>
// );

// const ErrorState = ({ message, onRetry, small = false }) => (
//   <div className={`flex flex-col items-center justify-center text-red-300 p-6 bg-slate-800/50 rounded-lg shadow-lg border border-red-500/30 ${small ? 'min-h-[200px]' : 'min-h-[calc(100vh-15rem)]'}`}>
//     <AlertTriangle className={`${small ? 'h-10 w-10':'h-16 w-16'} text-red-400 mb-4`} />
//     <h2 className={`${small ? 'text-lg':'text-xl'} font-semibold text-red-200`}>An Error Occurred</h2>
//     <p className="text-center mt-1 max-w-md">{message || "Sorry, something went wrong."}</p>
//     {onRetry && (<button onClick={onRetry} className="mt-4 inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg">Try Again</button>)}
//   </div>
// );

// const AlumniAvatar = ({ src, name, size = "w-16 h-16" }) => {
//   const [imgError, setImgError] = useState(false);
//   const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'A')}&background=random&color=fff&size=96&font-size=0.33&bold=true`;
//   return (<img src={imgError || !src ? fallbackSrc : src} alt={`${name || 'Alumni'}'s profile`} className={`${size} rounded-full object-cover border-2 border-slate-600 shadow-md`} onError={() => setImgError(true)} />);
// };

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   if (totalPages <= 1) return null;
//   const pageNumbers = []; const maxButtons = 5;
//   if (totalPages <= maxButtons) { for (let i = 1; i <= totalPages; i++) pageNumbers.push(i); } 
//   else {
//     pageNumbers.push(1);
//     if (currentPage > 3) pageNumbers.push('...');
//     let startPage = Math.max(2, currentPage - Math.floor((maxButtons - 3) / 2));
//     let endPage = Math.min(totalPages - 1, currentPage + Math.floor((maxButtons - 2) / 2));
//     if (currentPage <= Math.floor(maxButtons/2)) endPage = Math.min(totalPages -1, maxButtons - 2);
//     if (currentPage >= totalPages - Math.floor(maxButtons/2) +1) startPage = Math.max(2, totalPages - maxButtons + 3);
//     for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
//     if (currentPage < totalPages - Math.floor(maxButtons/2)) pageNumbers.push('...');
//     pageNumbers.push(totalPages);
//   }
//   return (
//     <nav className="mt-8 flex items-center justify-center space-x-1 sm:space-x-2" aria-label="Pagination">
//       <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50"><ChevronLeft size={18} /></button>
//       {pageNumbers.map((page, index) => typeof page === 'number' ? (<button key={page} onClick={() => onPageChange(page)} className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium ${currentPage === page ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>{page}</button>) : (<span key={`ellipsis-${index}`} className="px-3 py-1.5 text-slate-400">...</span>))}
//       <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50"><ChevronRight size={18} /></button>
//     </nav>
//   );
// };

// const Tabs = ({ tabs, activeTab, onTabClick }) => (
//   <div className="mb-8 border-b border-slate-700">
//     <nav className="-mb-px flex space-x-4 sm:space-x-8" aria-label="Tabs">
//       {tabs.map((tab) => (<button key={tab.name} onClick={() => onTabClick(tab.name)} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.name ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'}`} aria-current={activeTab === tab.name ? 'page' : undefined}>{tab.label}</button>))}
//     </nav>
//   </div>
// );
// // --- End Reusable UI Helper Components ---


// // --- Mentorship Request Card for "My Requests" section ---
// const MentorshipRequestCard = ({ request, onChat, onCancelRequest, cancellingRequestId }) => {
//   const { _id: requestId, alumni, status, requestedAt, respondedAt } = request;

//   // Defensive check for alumni object
//   const alumniName = alumni?.fullName || 'Alumni Details Missing';
//   const alumniProfilePic = alumni?.profilePic;

//   const getStatusPill = () => {
//     switch (status) {
//       case 'pending': return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-yellow-600/30 text-yellow-300 flex items-center"><Clock size={12} className="mr-1"/> Pending</span>;
//       case 'accepted': return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-600/30 text-green-300 flex items-center"><CheckCircle2 size={12} className="mr-1"/> Accepted</span>;
//       case 'rejected': return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-600/30 text-red-300 flex items-center"><XCircle size={12} className="mr-1"/> Rejected</span>;
//       case 'cancelled': return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-600/40 text-slate-400 flex items-center"><Ban size={12} className="mr-1"/> Cancelled</span>;
//       default: return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-600/30 text-slate-300">Unknown ({status})</span>;
//     }
//   };

//   return (
//     <div className="bg-slate-800/70 p-4 rounded-lg shadow-lg border border-slate-700/50 flex items-center space-x-3 sm:space-x-4">
//       <AlumniAvatar src={alumniProfilePic} name={alumniName} size="w-12 h-12 sm:w-16 sm:h-16" />
//       <div className="flex-1 min-w-0">
//         <h4 className="font-semibold text-slate-100 text-md sm:text-lg truncate">{alumniName}</h4>
//         <p className="text-xs text-slate-400 truncate">
//           Requested: {new Date(requestedAt).toLocaleDateString()}
//           {respondedAt && ` | Responded: ${new Date(respondedAt).toLocaleDateString()}`}
//         </p>
//         <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
//             {getStatusPill()}
//             <div className="sm:ml-auto flex gap-2 mt-2 sm:mt-0">
//                 {status === 'pending' && onCancelRequest && ( // Conditionally render cancel button
//                     <button
//                         onClick={() => onCancelRequest(requestId)}
//                         disabled={cancellingRequestId === requestId}
//                         className="text-xs inline-flex items-center px-3 py-1 bg-red-600/80 hover:bg-red-700/80 text-white font-medium rounded-md transition-colors disabled:opacity-50"
//                     >
//                         {cancellingRequestId === requestId ? <Loader2 className="animate-spin h-3 w-3 mr-1" /> : <XCircle size={14} className="mr-1.5" />}
//                         Cancel Request
//                     </button>
//                 )}
//                 {status === 'accepted' && alumni && ( // Ensure alumni object exists for chat
//                     <button 
//                         onClick={() => onChat(alumni)}
//                         className="text-xs inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
//                     >
//                         <MessageSquare size={14} className="mr-1.5" /> Chat
//                     </button>
//                 )}
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// // --- Main Mentorship Page Component ---
// const ITEMS_PER_PAGE = 9;

// const Mentorship = () => {
//   const [allAlumni, setAllAlumni] = useState([]);
//   const [myRequests, setMyRequests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeTab, setActiveTab] = useState('find_mentor');
  
//   const [loading, setLoading] = useState({ alumni: true, requests: true, sendingReq: false, cancellingReq: null });
//   const [error, setError] = useState({ alumni: '', requests: '', sendingReq: '', cancellingReq: '' });
  
//   const navigate = useNavigate();

//   const getToken = () => { 
//     const role = localStorage.getItem('role');
//     // This component is primarily for students requesting mentorship
//     if (role === 'student') return localStorage.getItem('student_token');
//     // If alumni can also use this page for some reason (e.g. view requests made TO them), adjust token
//     // For now, assuming this page is student-centric for requesting.
//     return null; 
//   };

//   const fetchAlumniData = useCallback(async () => {
//     console.log("[MentorshipPage] Attempting to fetch alumni data...");
//     try {
//       setLoading(prev => ({ ...prev, alumni: true })); setError(prev => ({ ...prev, alumni: '' }));
//       const token = getToken();
//       if (!token) { 
//         console.warn("[MentorshipPage] No token for alumni fetch, redirecting."); 
//         navigate('/login'); return; 
//       }
      
//       const res = await axios.get('http://localhost:5000/api/search/alumni', { headers: { Authorization: `Bearer ${token}` } });
//       console.log("[MentorshipPage] Alumni fetch response status:", res.status);
//       if (Array.isArray(res.data)) {
//         setAllAlumni(res.data);
//       } else {
//         throw new Error("Invalid alumni data format received from server.");
//       }
//     } catch (err) {
//       console.error('[MentorshipPage] Fetch Alumni Error:', err.response?.data || err.message || err);
//       setError(prev => ({ ...prev, alumni: err.response?.data?.message || err.message || 'Failed to load potential mentors.' }));
//     } finally {
//       setLoading(prev => ({ ...prev, alumni: false }));
//     }
//   }, [navigate]);

//   const fetchMyRequests = useCallback(async () => {
//     console.log("[MentorshipPage] Attempting to fetch my mentorship requests...");
//     try {
//       setLoading(prev => ({ ...prev, requests: true })); setError(prev => ({ ...prev, requests: '' }));
//       const token = getToken();
//       if (!token) { 
//         console.warn("[MentorshipPage] No token for 'My Requests' fetch, redirecting."); 
//         navigate('/login'); return; 
//       }
      
//       // MODIFIED: Use GET /api/mentorship as per your backend for student's requests
//       const res = await axios.get('http://localhost:5000/api/mentorship', { headers: { Authorization: `Bearer ${token}` } });
//       console.log("[MentorshipPage] 'My Requests' API response status:", res.status);

//       if (Array.isArray(res.data)) {
//         console.log("[MentorshipPage] 'My Requests' data received:", res.data.length, "items. First item:", JSON.stringify(res.data[0], null, 2));
        
//         // Filter out requests where alumni might be null or undefined (data integrity check)
//         const validRequests = res.data.filter(req => req.alumni && typeof req.alumni === 'object');
//         if(validRequests.length !== res.data.length) {
//             console.warn("[MentorshipPage] Some requests were filtered out due to missing alumni data.");
//         }

//         const sorted = validRequests.sort((a, b) => {
//             const statusOrder = { pending: 1, accepted: 2, rejected: 3, cancelled: 4, unknown: 5 };
//             const statusA = statusOrder[a.status] || statusOrder.unknown;
//             const statusB = statusOrder[b.status] || statusOrder.unknown;
//             if (statusA !== statusB) {
//                 return statusA - statusB;
//             }
//             return new Date(b.requestedAt || 0) - new Date(a.requestedAt || 0);
//         });
//         setMyRequests(sorted);
//       } else {
//         throw new Error("Invalid 'My Requests' data format received from server.");
//       }
//     } catch (err) {
//       console.error('[MentorshipPage] Fetch My Requests Error:', err.response?.data || err.message || err);
//       setError(prev => ({ ...prev, requests: err.response?.data?.message || err.message || 'Failed to load your mentorship requests. Please check logs.' }));
//     } finally {
//       setLoading(prev => ({ ...prev, requests: false }));
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchAlumniData();
//     fetchMyRequests();
//   }, [fetchAlumniData, fetchMyRequests]);

//   const handleMentorshipRequest = async (alumniIdToRequest) => {
//     // Check if alumni object is available, not just ID
//     const targetAlumni = allAlumni.find(a => a._id === alumniIdToRequest);
//     if (!targetAlumni) {
//         setError(prev => ({ ...prev, sendingReq: 'Selected mentor details not found.' }));
//         return;
//     }

//     if (myRequests.some(req => req.alumni?._id === alumniIdToRequest && (req.status === 'pending' || req.status === 'accepted'))) {
//         setError(prev => ({ ...prev, sendingReq: `Request already sent to ${targetAlumni.fullName} or mentorship is active.` }));
//         setTimeout(() => setError(prev => ({...prev, sendingReq: ''})), 4000);
//         return;
//     }
//     try {
//       setLoading(prev => ({ ...prev, sendingReq: true })); setError(prev => ({ ...prev, sendingReq: '' }));
//       const token = getToken();
//       if (!token) { navigate('/login'); return; }
//       await axios.post('http://localhost:5000/api/mentorship', { alumniId: alumniIdToRequest }, {
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });
//       fetchMyRequests(); // Refresh to show new pending request
//     } catch (err) {
//       setError(prev => ({ ...prev, sendingReq: err.response?.data?.message || err.message || 'Failed to send request.' }));
//     } finally {
//       setLoading(prev => ({ ...prev, sendingReq: false }));
//     }
//   };

//   // REMOVED handleCancelRequest for now as backend doesn't support student cancelling
//   // If you add a DELETE /api/mentorship/:requestId for students, re-enable this.
//   // const handleCancelRequest = async (requestId) => { ... }; 
  
//   const handleStartChat = (alumnus) => {
//       if (!alumnus?._id) {
//           console.error("[MentorshipPage] Cannot start chat, alumnus object or _id is missing", alumnus);
//           setError(prev => ({ ...prev, requests: 'Could not start chat: mentor details missing.'}));
//           return;
//       }
//       localStorage.setItem('chatReceiverId', alumnus._id);
//       navigate('/student-dashboard/chat');
//   };

//   const filteredAlumni = useMemo(() => {
//     if (activeTab !== 'find_mentor' || !allAlumni) return [];
//     if (!searchTerm) return allAlumni;
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return allAlumni.filter(a => a.fullName?.toLowerCase().includes(lowerSearchTerm) || a.currentCompany?.toLowerCase().includes(lowerSearchTerm) || a.passoutYear?.toString().includes(lowerSearchTerm));
//   }, [allAlumni, searchTerm, activeTab]);

//   const totalPages = Math.ceil(filteredAlumni.length / ITEMS_PER_PAGE);
//   const currentDisplayAlumni = useMemo(() => {
//     if (activeTab !== 'find_mentor') return [];
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredAlumni.slice(startIndex, startIndex + ITEMS_PER_PAGE);
//   }, [filteredAlumni, currentPage, activeTab]);

//   const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
//   const handlePageChange = (page) => { if (page >= 1 && page <= totalPages) setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' });};

//   const TABS = [
//     { name: 'find_mentor', label: 'Find a Mentor' },
//     { name: 'my_requests', label: 'My Requests' },
//   ];

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
//       <header className="mb-10 text-center">
//         <UserCheck className="mx-auto h-16 w-16 text-purple-400 mb-4" />
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">Mentorship Hub</span>
//         </h1>
//         <p className="mt-3 text-lg text-blue-200 max-w-2xl mx-auto">Connect with alumni mentors and manage your mentorship journey.</p>
//       </header>

//       <Tabs tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />

//       {activeTab === 'find_mentor' && (
//         <section>
//           <div className="mb-8 max-w-xl mx-auto">
//             <div className="relative"><input type="text" placeholder="Search mentors by name, company, year..." className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500" value={searchTerm} onChange={handleSearchChange} /><Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" /></div>
//           </div>
//           {loading.alumni && <LoadingState message="Loading potential mentors..." />}
//           {!loading.alumni && error.alumni && <ErrorState message={error.alumni} onRetry={fetchAlumniData} small />}
//           {!loading.alumni && !error.alumni && currentDisplayAlumni.length === 0 && (<div className="text-center py-10"><Users size={56} className="mx-auto text-slate-500 mb-3" /><p className="text-xl text-slate-300">{searchTerm ? "No mentors match your search." : "No mentors available currently."}</p></div>)}
//           {!loading.alumni && !error.alumni && currentDisplayAlumni.length > 0 && (
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {currentDisplayAlumni.map((alumni) => {
//                 const existingRequest = myRequests.find(req => req.alumni?._id === alumni._id);
//                 const buttonState = existingRequest?.status === 'pending' ? 'pending' : existingRequest?.status === 'accepted' ? 'accepted' : 'request';
//                 return (
//                 <article key={alumni._id} className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col border border-slate-700/50">
//                   <div className="p-5 flex flex-col items-center text-center flex-grow">
//                     <AlumniAvatar src={alumni.profilePic} name={alumni.fullName} />
//                     <h3 className="mt-3 text-lg font-semibold text-slate-100">{alumni.fullName}</h3>
//                     <p className="text-sm text-purple-300 mt-0.5 truncate w-full px-2">{alumni.currentRole || 'Alumnus/Alumna'}{alumni.currentCompany && ` at ${alumni.currentCompany}`}</p>
//                     <p className="text-xs text-slate-400 mt-1">Batch of {alumni.passoutYear || 'N/A'}</p>
//                   </div>
//                   <div className="p-4 border-t border-slate-700/50 mt-auto">
//                     <button onClick={() => handleMentorshipRequest(alumni._id)} disabled={loading.sendingReq || buttonState !== 'request'}
//                       className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-md shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
//                     >
//                       {loading.sendingReq && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
//                       {buttonState === 'pending' ? <><Clock size={16} className="mr-2"/>Request Pending</> :
//                        buttonState === 'accepted' ? <><CheckCircle2 size={16} className="mr-2"/>Mentorship Active</> :
//                        <><UserPlus size={16} className="mr-2"/>Request Mentorship</>}
//                     </button>
//                   </div>
//                 </article>
//               )})}
//             </div>
//           )}
//           {!loading.alumni && !error.alumni && totalPages > 1 && (<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />)}
//           {error.sendingReq && <div className="mt-4"><ErrorState message={error.sendingReq} small onRetry={() => setError(prev => ({...prev, sendingReq: ''}))} /></div>}
//         </section>
//       )}

//       {activeTab === 'my_requests' && (
//         <section>
//           {loading.requests && <LoadingState message="Loading your mentorship requests..." />}
//           {!loading.requests && error.requests && <ErrorState message={error.requests} onRetry={fetchMyRequests} small />}
//           {!loading.requests && !error.requests && myRequests.length === 0 && (<div className="text-center py-10"><UserCheck size={56} className="mx-auto text-slate-500 mb-3" /><p className="text-xl text-slate-300">You haven't sent any mentorship requests yet.</p><p className="text-slate-400 mt-1">Find a mentor in the "Find a Mentor" tab!</p></div>)}
//           {!loading.requests && !error.requests && myRequests.length > 0 && (
//             <div className="space-y-4 max-w-3xl mx-auto">
//               {myRequests.map(request => (
//                 <MentorshipRequestCard 
//                     key={request._id} 
//                     request={request} 
//                     onChat={handleStartChat} 
//                     // onCancelRequest={handleCancelRequest} // Temporarily remove if backend for cancel is not ready
//                     // cancellingRequestId={loading.cancellingReq}
//                 />
//               ))}
//             </div>
//           )}
//            {/* {error.cancellingReq && <div className="mt-4"><ErrorState message={error.cancellingReq} small onRetry={() => setError(prev => ({...prev, cancellingReq: ''}))} /></div>} */}
//         </section>
//       )}
//     </div>
//   );
// };

// export default Mentorship;



















































// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Users, Search, Briefcase, GraduationCap, ChevronLeft, ChevronRight, Loader2,
//   AlertTriangle, UserCheck, Send, Clock, XCircle, CheckCircle2, MessageSquare, UserPlus, Ban,
// } from 'lucide-react';

// // --- Reusable UI Helper Components (Keep as is) ---
// const LoadingState = ({ message = "Loading..." }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-blue-200 py-10">
//     <Loader2 className="animate-spin h-12 w-12 text-purple-400 mb-4" />
//     <p className="text-xl text-white">{message}</p>
//   </div>
// );

// const ErrorState = ({ message, onRetry, small = false }) => (
//   <div className={`flex flex-col items-center justify-center text-red-300 p-6 bg-slate-800/50 rounded-lg shadow-lg border border-red-500/30 ${small ? 'min-h-[200px]' : 'min-h-[calc(100vh-15rem)]'}`}>
//     <AlertTriangle className={`${small ? 'h-10 w-10':'h-16 w-16'} text-red-400 mb-4`} />
//     <h2 className={`${small ? 'text-lg':'text-xl'} font-semibold text-red-200`}>An Error Occurred</h2>
//     <p className="text-center mt-1 max-w-md">{message || "Sorry, something went wrong."}</p>
//     {onRetry && (<button onClick={onRetry} className="mt-4 inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg">Try Again</button>)}
//   </div>
// );

// const AlumniAvatar = ({ src, name, size = "w-16 h-16" }) => {
//   const [imgError, setImgError] = useState(false);
//   const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'A')}&background=random&color=fff&size=96&font-size=0.33&bold=true`;
//   useEffect(() => { setImgError(false); }, [src]); // Reset error if src changes
//   return (<img src={imgError || !src ? fallbackSrc : src} alt={`${name || 'User'}'s profile`} className={`${size} rounded-full object-cover border-2 border-slate-600 shadow-md`} onError={() => setImgError(true)} />);
// };

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   if (totalPages <= 1) return null;
//   const pageNumbers = []; const maxButtons = 5;
//   if (totalPages <= maxButtons) { for (let i = 1; i <= totalPages; i++) pageNumbers.push(i); } 
//   else {
//     pageNumbers.push(1);
//     if (currentPage > 3) pageNumbers.push('...');
//     let startPage = Math.max(2, currentPage - Math.floor((maxButtons - 3) / 2));
//     let endPage = Math.min(totalPages - 1, currentPage + Math.floor((maxButtons - 2) / 2));
//     if (currentPage <= Math.floor(maxButtons/2)) endPage = Math.min(totalPages -1, maxButtons - 2);
//     if (currentPage >= totalPages - Math.floor(maxButtons/2) +1) startPage = Math.max(2, totalPages - maxButtons + 3);
//     for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
//     if (currentPage < totalPages - Math.floor(maxButtons/2)) pageNumbers.push('...');
//     pageNumbers.push(totalPages);
//   }
//   return (
//     <nav className="mt-8 flex items-center justify-center space-x-1 sm:space-x-2" aria-label="Pagination">
//       <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50"><ChevronLeft size={18} /></button>
//       {pageNumbers.map((page, index) => typeof page === 'number' ? (<button key={page} onClick={() => onPageChange(page)} className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium ${currentPage === page ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>{page}</button>) : (<span key={`ellipsis-${index}`} className="px-3 py-1.5 text-slate-400">...</span>))}
//       <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50"><ChevronRight size={18} /></button>
//     </nav>
//   );
// };

// const Tabs = ({ tabs, activeTab, onTabClick }) => (
//   <div className="mb-8 border-b border-slate-700">
//     <nav className="-mb-px flex space-x-4 sm:space-x-8" aria-label="Tabs">
//       {tabs.map((tab) => (<button key={tab.name} onClick={() => onTabClick(tab.name)} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.name ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'}`} aria-current={activeTab === tab.name ? 'page' : undefined}>{tab.label}</button>))}
//     </nav>
//   </div>
// );
// // --- End Reusable UI Helper Components ---


// const MentorshipRequestCard = ({ request, onChat /* Removed onCancelRequest, cancellingRequestId */ }) => {
//   const { _id: requestId, alumni, status, requestedAt, respondedAt } = request;
//   const alumniName = alumni?.fullName || 'Alumni Details Missing';
//   const alumniProfilePic = alumni?.profilePic;

//   const getStatusPill = () => { /* ... same as before ... */ 
//     switch (status) {
//       case 'pending': return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-yellow-600/30 text-yellow-300 flex items-center"><Clock size={12} className="mr-1"/> Pending</span>;
//       case 'accepted': return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-600/30 text-green-300 flex items-center"><CheckCircle2 size={12} className="mr-1"/> Accepted</span>;
//       case 'rejected': return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-600/30 text-red-300 flex items-center"><XCircle size={12} className="mr-1"/> Rejected</span>;
//       case 'cancelled': return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-600/40 text-slate-400 flex items-center"><Ban size={12} className="mr-1"/> Cancelled</span>;
//       default: return <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-600/30 text-slate-300">Unknown ({status})</span>;
//     }
//   };

//   return ( /* ... structure same, but cancel button logic removed ... */ 
//     <div className="bg-slate-800/70 p-4 rounded-lg shadow-lg border border-slate-700/50 flex items-center space-x-3 sm:space-x-4">
//       <AlumniAvatar src={alumniProfilePic} name={alumniName} size="w-12 h-12 sm:w-16 sm:h-16" />
//       <div className="flex-1 min-w-0">
//         <h4 className="font-semibold text-slate-100 text-md sm:text-lg truncate">{alumniName}</h4>
//         <p className="text-xs text-slate-400 truncate">
//           Requested: {new Date(requestedAt).toLocaleDateString()}
//           {respondedAt && ` | Responded: ${new Date(respondedAt).toLocaleDateString()}`}
//         </p>
//         <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
//             {getStatusPill()}
//             <div className="sm:ml-auto flex gap-2 mt-2 sm:mt-0">
//                 {/* Cancel button removed as backend doesn't support student cancelling */}
//                 {status === 'accepted' && alumni && (
//                     <button onClick={() => onChat(alumni)} className="text-xs inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
//                         <MessageSquare size={14} className="mr-1.5" /> Chat
//                     </button>
//                 )}
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// const ITEMS_PER_PAGE = 9;

// const Mentorship = () => {
//   const [allAlumni, setAllAlumni] = useState([]);
//   const [myRequests, setMyRequests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeTab, setActiveTab] = useState('find_mentor');
  
//   const [loading, setLoading] = useState({ alumni: true, requests: true, sendingReq: false /* removed cancellingReq */ });
//   const [error, setError] = useState({ alumni: '', requests: '', sendingReq: '' /* removed cancellingReq */ });
  
//   const navigate = useNavigate();

//   // CRITICAL: Ensure this function correctly identifies the logged-in user's role
//   // and retrieves the EXACT token name that your backend's authMiddleware expects for that role.
//   const getAuthToken = useCallback(() => { 
//     const role = localStorage.getItem('role');
//     let token = null;
//     // This page is for STUDENTS requesting mentorship or viewing their requests.
//     if (role === 'student') {
//       token = localStorage.getItem('student_token'); // Make SURE 'student_token' is the correct key
//       console.log(`[MentorshipPage/getAuthToken] Role: 'student', Token retrieved: ${token ? '******' : 'NULL (student_token not found!)'}`);
//     } else {
//       console.warn(`[MentorshipPage/getAuthToken] Current role is '${role}'. This page is intended for students. No token retrieved.`);
//     }
//     return token;
//   }, []); // Empty dependency, as localStorage is synchronous

//   const fetchAlumniData = useCallback(async () => {
//     console.log("[MentorshipPage] Attempting to fetch alumni data...");
//     const token = getAuthToken(); // Use the updated getToken
//     if (!token) { 
//       console.warn("[MentorshipPage] No token for alumni fetch. User might not be logged in as student.");
//       setError(prev => ({ ...prev, alumni: 'Authentication required to view mentors.'}));
//       setLoading(prev => ({ ...prev, alumni: false }));
//       // navigate('/login'); // Consider if immediate redirect is desired
//       return; 
//     }
//     try {
//       setLoading(prev => ({ ...prev, alumni: true })); setError(prev => ({ ...prev, alumni: '' }));
//       const res = await axios.get('http://localhost:5000/api/search/alumni', { headers: { Authorization: `Bearer ${token}` } });
//       if (Array.isArray(res.data)) setAllAlumni(res.data);
//       else throw new Error("Invalid alumni data format from server.");
//     } catch (err) {
//       const errMsg = err.response?.data?.message || err.message || 'Failed to load potential mentors.';
//       console.error('[MentorshipPage] Fetch Alumni Error:', errMsg, err.response || err);
//       setError(prev => ({ ...prev, alumni: errMsg }));
//     } finally {
//       setLoading(prev => ({ ...prev, alumni: false }));
//     }
//   }, [navigate, getAuthToken]);

//   const fetchMyRequests = useCallback(async () => {
//     console.log("[MentorshipPage] Attempting to fetch my mentorship requests...");
//     const token = getAuthToken(); // Use the updated getToken
//     if (!token) { 
//       console.warn("[MentorshipPage] No token for 'My Requests' fetch. User might not be logged in as student.");
//       setError(prev => ({ ...prev, requests: 'Authentication required to view your requests.'}));
//       setLoading(prev => ({ ...prev, requests: false }));
//       // navigate('/login');
//       return; 
//     }
//     try {
//       setLoading(prev => ({ ...prev, requests: true })); setError(prev => ({ ...prev, requests: '' }));
//       // Backend uses GET /api/mentorship for student's requests
//       const res = await axios.get('http://localhost:5000/api/mentorship', { headers: { Authorization: `Bearer ${token}` } });
//       console.log("[MentorshipPage] 'My Requests' API response status:", res.status);

//       if (Array.isArray(res.data)) {
//         console.log("[MentorshipPage] 'My Requests' raw data:", JSON.stringify(res.data, null, 2));
//         const validRequests = res.data.filter(req => req.alumni && typeof req.alumni === 'object' && req.alumni._id); // Check for populated alumni
//         if(validRequests.length !== res.data.length) {
//             console.warn("[MentorshipPage] Some requests were filtered out due to missing or invalid alumni data from backend. Original count:", res.data.length, "Valid count:", validRequests.length);
//         }
//         const sorted = validRequests.sort((a, b) => { /* ... same sorting ... */ 
//             const statusOrder = { pending: 1, accepted: 2, rejected: 3, cancelled: 4, unknown: 5 };
//             const statusA = statusOrder[a.status] || statusOrder.unknown;
//             const statusB = statusOrder[b.status] || statusOrder.unknown;
//             if (statusA !== statusB) return statusA - statusB;
//             return new Date(b.requestedAt || 0) - new Date(a.requestedAt || 0);
//         });
//         setMyRequests(sorted);
//       } else {
//         throw new Error("Invalid 'My Requests' data format: Expected an array.");
//       }
//     } catch (err) {
//       const errMsg = err.response?.data?.message || err.message || 'Failed to load your mentorship requests.';
//       console.error('[MentorshipPage] Fetch My Requests Error:', errMsg, err.response || err);
//       setError(prev => ({ ...prev, requests: `Error: ${errMsg} (Status: ${err.response?.status || 'N/A'})`}));
//     } finally {
//       setLoading(prev => ({ ...prev, requests: false }));
//     }
//   }, [navigate, getAuthToken]);

//   useEffect(() => {
//     // Initial data fetch
//     const role = localStorage.getItem('role');
//     if (role === 'student') { // Only fetch if logged in as student
//         fetchAlumniData();
//         fetchMyRequests();
//     } else {
//         console.warn("[MentorshipPage] User role is not 'student'. Data fetching skipped. Role:", role);
//         setLoading({ alumni: false, requests: false, sendingReq: false }); // Stop loading indicators
//         setError({ alumni: 'Access denied. This page is for students.', requests: 'Access denied.', sendingReq: ''});
//         // navigate('/login'); // Or to a generic dashboard
//     }
//   }, [fetchAlumniData, fetchMyRequests]); // Only depend on the stable callback functions

//   const handleMentorshipRequest = async (alumniIdToRequest) => { /* ... same as before ... */ 
//     const targetAlumni = allAlumni.find(a => a._id === alumniIdToRequest);
//     if (!targetAlumni) { setError(prev => ({ ...prev, sendingReq: 'Selected mentor details not found.' })); return; }
//     if (myRequests.some(req => req.alumni?._id === alumniIdToRequest && (req.status === 'pending' || req.status === 'accepted'))) {
//         setError(prev => ({ ...prev, sendingReq: `Request already sent to ${targetAlumni.fullName} or mentorship is active.` }));
//         setTimeout(() => setError(prev => ({...prev, sendingReq: ''})), 4000);
//         return;
//     }
//     const token = getAuthToken();
//     if (!token) { setError(prev => ({...prev, sendingReq: 'Authentication required.'})); navigate('/login'); return; }
//     try {
//       setLoading(prev => ({ ...prev, sendingReq: true })); setError(prev => ({ ...prev, sendingReq: '' }));
//       await axios.post('http://localhost:5000/api/mentorship', { alumniId: alumniIdToRequest }, {
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });
//       fetchMyRequests(); 
//     } catch (err) {
//       setError(prev => ({ ...prev, sendingReq: err.response?.data?.message || err.message || 'Failed to send request.' }));
//     } finally {
//       setLoading(prev => ({ ...prev, sendingReq: false }));
//     }
//   };
  
//   const handleStartChat = (alumnus) => { /* ... same as before ... */ 
//       if (!alumnus?._id) { console.error("Cannot start chat, alumnus object or _id is missing", alumnus); setError(prev => ({ ...prev, requests: 'Could not start chat: mentor details missing.'})); return; }
//       localStorage.setItem('chatReceiverId', alumnus._id);
//       navigate('/student-dashboard/chat');
//   };

//   const filteredAlumni = useMemo(() => { /* ... same as before ... */ 
//     if (activeTab !== 'find_mentor' || !allAlumni) return [];
//     if (!searchTerm) return allAlumni;
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return allAlumni.filter(a => a.fullName?.toLowerCase().includes(lowerSearchTerm) || a.currentCompany?.toLowerCase().includes(lowerSearchTerm) || a.passoutYear?.toString().includes(lowerSearchTerm));
//   }, [allAlumni, searchTerm, activeTab]);

//   const totalPages = Math.ceil(filteredAlumni.length / ITEMS_PER_PAGE);
//   const currentDisplayAlumni = useMemo(() => { /* ... same as before ... */ 
//     if (activeTab !== 'find_mentor') return [];
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredAlumni.slice(startIndex, startIndex + ITEMS_PER_PAGE);
//   }, [filteredAlumni, currentPage, activeTab]);

//   const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
//   const handlePageChange = (page) => { if (page >= 1 && page <= totalPages) setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' });};

//   const TABS = [ /* ... same as before ... */ ];

//   return ( /* ... JSX structure remains largely the same ... */ 
//     <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
//       <header className="mb-10 text-center">
//         <UserCheck className="mx-auto h-16 w-16 text-purple-400 mb-4" />
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">Mentorship Hub</span>
//         </h1>
//         <p className="mt-3 text-lg text-blue-200 max-w-2xl mx-auto">Connect with alumni mentors and manage your mentorship journey.</p>
//       </header>

//       <Tabs tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />

//       {activeTab === 'find_mentor' && (
//         <section>
//           <div className="mb-8 max-w-xl mx-auto">
//             <div className="relative"><input type="text" placeholder="Search mentors by name, company, year..." className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500" value={searchTerm} onChange={handleSearchChange} /><Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" /></div>
//           </div>
//           {loading.alumni && <LoadingState message="Loading potential mentors..." />}
//           {!loading.alumni && error.alumni && <ErrorState message={error.alumni} onRetry={fetchAlumniData} small />}
//           {!loading.alumni && !error.alumni && currentDisplayAlumni.length === 0 && (<div className="text-center py-10"><Users size={56} className="mx-auto text-slate-500 mb-3" /><p className="text-xl text-slate-300">{searchTerm ? "No mentors match your search." : "No mentors available currently."}</p></div>)}
//           {!loading.alumni && !error.alumni && currentDisplayAlumni.length > 0 && (
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {currentDisplayAlumni.map((alumni) => {
//                 const existingRequest = myRequests.find(req => req.alumni?._id === alumni._id);
//                 const buttonState = existingRequest?.status === 'pending' ? 'pending' : existingRequest?.status === 'accepted' ? 'accepted' : 'request';
//                 return (
//                 <article key={alumni._id} className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col border border-slate-700/50">
//                   <div className="p-5 flex flex-col items-center text-center flex-grow">
//                     <AlumniAvatar src={alumni.profilePic} name={alumni.fullName} />
//                     <h3 className="mt-3 text-lg font-semibold text-slate-100">{alumni.fullName}</h3>
//                     <p className="text-sm text-purple-300 mt-0.5 truncate w-full px-2">{alumni.currentRole || 'Alumnus/Alumna'}{alumni.currentCompany && ` at ${alumni.currentCompany}`}</p>
//                     <p className="text-xs text-slate-400 mt-1">Batch of {alumni.passoutYear || 'N/A'}</p>
//                   </div>
//                   <div className="p-4 border-t border-slate-700/50 mt-auto">
//                     <button onClick={() => handleMentorshipRequest(alumni._id)} disabled={loading.sendingReq || buttonState !== 'request'}
//                       className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-md shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
//                     >
//                       {loading.sendingReq && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
//                       {buttonState === 'pending' ? <><Clock size={16} className="mr-2"/>Request Pending</> :
//                        buttonState === 'accepted' ? <><CheckCircle2 size={16} className="mr-2"/>Mentorship Active</> :
//                        <><UserPlus size={16} className="mr-2"/>Request Mentorship</>}
//                     </button>
//                   </div>
//                 </article>
//               )})}
//             </div>
//           )}
//           {!loading.alumni && !error.alumni && totalPages > 1 && (<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />)}
//           {error.sendingReq && <div className="mt-4"><ErrorState message={error.sendingReq} small onRetry={() => setError(prev => ({...prev, sendingReq: ''}))} /></div>}
//         </section>
//       )}

//       {activeTab === 'my_requests' && (
//         <section>
//           {loading.requests && <LoadingState message="Loading your mentorship requests..." />}
//           {!loading.requests && error.requests && <ErrorState message={error.requests} onRetry={fetchMyRequests} small />}
//           {!loading.requests && !error.requests && myRequests.length === 0 && (<div className="text-center py-10"><UserCheck size={56} className="mx-auto text-slate-500 mb-3" /><p className="text-xl text-slate-300">You haven't sent any mentorship requests yet.</p><p className="text-slate-400 mt-1">Find a mentor in the "Find a Mentor" tab!</p></div>)}
//           {!loading.requests && !error.requests && myRequests.length > 0 && (
//             <div className="space-y-4 max-w-3xl mx-auto">
//               {myRequests.map(request => (
//                 <MentorshipRequestCard 
//                     key={request._id} 
//                     request={request} 
//                     onChat={handleStartChat} 
//                     // onCancelRequest={handleCancelRequest} // Cancel button removed for now
//                     // cancellingRequestId={loading.cancellingReq}
//                 />
//               ))}
//             </div>
//           )}
//         </section>
//       )}
//     </div>
//   );
// };

// export default Mentorship;
































































import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Users, Search, Briefcase, GraduationCap, ChevronLeft, ChevronRight, Loader2,
  AlertTriangle, UserCheck, Send, Clock, XCircle, CheckCircle2, MessageSquare, UserPlus, Ban,
} from 'lucide-react';

// --- Reusable UI Helper Components (Keep as is or from shared file) ---
const LoadingState = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-blue-200 py-10">
    <Loader2 className="animate-spin h-12 w-12 text-purple-400 mb-4" />
    <p className="text-xl text-white">{message}</p>
  </div>
);

const ErrorState = ({ message, onRetry, small = false }) => (
  <div className={`flex flex-col items-center justify-center text-red-300 p-6 bg-slate-800/50 rounded-lg shadow-lg border border-red-500/30 ${small ? 'min-h-[200px]' : 'min-h-[calc(100vh-15rem)]'}`}>
    <AlertTriangle className={`${small ? 'h-10 w-10':'h-16 w-16'} text-red-400 mb-4`} />
    <h2 className={`${small ? 'text-lg':'text-xl'} font-semibold text-red-200`}>An Error Occurred</h2>
    <p className="text-center mt-1 max-w-md">{message || "Sorry, something went wrong."}</p>
    {onRetry && (<button onClick={onRetry} className="mt-4 inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg">Try Again</button>)}
  </div>
);

const AlumniAvatar = ({ src, name, size = "w-16 h-16" }) => {
  const [imgError, setImgError] = useState(false);
  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'A')}&background=random&color=fff&size=96&font-size=0.33&bold=true`;
  useEffect(() => { setImgError(false); }, [src]); // Reset error if src changes
  if (src && !imgError) {
    return (<img src={src} alt={`${name || 'User'}'s profile`} className={`${size} rounded-full object-cover border-2 border-slate-600 shadow-md`} onError={() => setImgError(true)} />);
  }
  return (<div className={`${size} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md text-lg`} aria-label={`${name || 'User'} avatar`}>{name ? name.charAt(0).toUpperCase() : 'A'}</div>);
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pageNumbers = []; const maxButtons = 5;
  if (totalPages <= maxButtons) { for (let i = 1; i <= totalPages; i++) pageNumbers.push(i); } 
  else {
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push('...');
    let startPage = Math.max(2, currentPage - Math.floor((maxButtons - 3) / 2));
    let endPage = Math.min(totalPages - 1, currentPage + Math.floor((maxButtons - 2) / 2));
    if (currentPage <= Math.floor(maxButtons/2)) endPage = Math.min(totalPages -1, maxButtons - 2);
    if (currentPage >= totalPages - Math.floor(maxButtons/2) +1) startPage = Math.max(2, totalPages - maxButtons + 3);
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    if (currentPage < totalPages - Math.floor(maxButtons/2)) pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }
  return (
    <nav className="mt-8 flex items-center justify-center space-x-1 sm:space-x-2" aria-label="Pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50"><ChevronLeft size={18} /></button>
      {pageNumbers.map((page, index) => typeof page === 'number' ? (<button key={page} onClick={() => onPageChange(page)} className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium ${currentPage === page ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>{page}</button>) : (<span key={`ellipsis-${index}`} className="px-3 py-1.5 text-slate-400">...</span>))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50"><ChevronRight size={18} /></button>
    </nav>
  );
};
// --- End Reusable UI Helper Components ---


// --- Main Mentorship Page Component (Student's View) ---
const ITEMS_PER_PAGE = 9;

const Mentorship = () => {
  const [allAlumni, setAllAlumni] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isLoadingAlumni, setIsLoadingAlumni] = useState(true);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  const [isSendingRequest, setIsSendingRequest] = useState(false); // Global state for "sending a request"
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const getAuthToken = useCallback(() => { 
    const role = localStorage.getItem('role');
    if (role === 'student') {
      return localStorage.getItem('student_token');
    }
    return null; 
  }, []);

  const fetchAlumniData = useCallback(async () => {
    const token = getAuthToken();
    if (!token) { 
      setError('Authentication required.'); setIsLoadingAlumni(false); return; 
    }
    try {
      setIsLoadingAlumni(true); setError('');
      const res = await axios.get('http://localhost:5000/api/search/alumni', { headers: { Authorization: `Bearer ${token}` } });
      if (Array.isArray(res.data)) setAllAlumni(res.data);
      else throw new Error("Invalid alumni data format.");
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load mentors.');
    } finally {
      setIsLoadingAlumni(false);
    }
  }, [getAuthToken]);

  const fetchMyRequests = useCallback(async () => {
    const token = getAuthToken();
    if (!token) { 
      setError('Authentication required for requests.'); setIsLoadingRequests(false); return; 
    }
    try {
      setIsLoadingRequests(true); setError('');
      const res = await axios.get('http://localhost:5000/api/mentorship', { headers: { Authorization: `Bearer ${token}` } });
      if (Array.isArray(res.data)) {
        const validRequests = res.data.filter(req => req.alumni && typeof req.alumni === 'object' && req.alumni._id);
        // No complex sorting needed here as we only use this list to check status on alumni cards
        setMyRequests(validRequests);
      } else throw new Error("Invalid 'My Requests' data format.");
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load your request statuses.');
    } finally {
      setIsLoadingRequests(false);
    }
  }, [getAuthToken]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'student') {
        fetchAlumniData();
        fetchMyRequests();
    } else {
        setError('Access Denied. This page is for students.');
        setIsLoadingAlumni(false);
        setIsLoadingRequests(false);
    }
  }, [fetchAlumniData, fetchMyRequests]);

  const handleMentorshipRequest = async (alumnus) => {
    if (myRequests.some(req => req.alumni?._id === alumnus._id && (req.status === 'pending' || req.status === 'accepted'))) {
        setError(`Request already sent to ${alumnus.fullName} or mentorship is active.`);
        setTimeout(() => setError(''), 4000); return;
    }
    const token = getAuthToken();
    if (!token) { setError('Authentication required.'); return; }
    try {
      setIsSendingRequest(true); setError(''); // Set global sending state
      await axios.post('http://localhost:5000/api/mentorship', { alumniId: alumnus._id }, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      fetchMyRequests(); // Refresh statuses
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to send request.');
    } finally {
      setIsSendingRequest(false); // Clear global sending state
    }
  };
  
  const handleChatWithMentor = (alumnus) => { 
      if (!alumnus?._id) { 
        console.error("Mentorship.jsx: Cannot start chat, alumnus object or _id is missing.", alumnus); 
        setError('Could not start chat: mentor details incomplete.'); 
        return; 
      }
      localStorage.setItem('chatReceiverId', alumnus._id);
      navigate('/student-dashboard/chat');
  };

  const filteredAlumni = useMemo(() => { 
    if (!allAlumni) return [];
    if (!searchTerm.trim()) return allAlumni;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allAlumni.filter(a => 
        a.fullName?.toLowerCase().includes(lowerSearchTerm) || 
        a.currentCompany?.toLowerCase().includes(lowerSearchTerm) || 
        a.passoutYear?.toString().includes(lowerSearchTerm) ||
        (Array.isArray(a.domains) && a.domains.some(domain => domain.toLowerCase().includes(lowerSearchTerm)))
    );
  }, [allAlumni, searchTerm]);

  const totalPages = Math.ceil(filteredAlumni.length / ITEMS_PER_PAGE);
  const currentDisplayAlumni = useMemo(() => { 
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAlumni.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAlumni, currentPage]);

  const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
  const handlePageChange = (page) => { if (page >= 1 && page <= totalPages) setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' });};

  return ( 
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
      <header className="mb-10 text-center">
        <UserCheck className="mx-auto h-16 w-16 text-purple-400 mb-4" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">Find Your Mentor</span>
        </h1>
        <p className="mt-3 text-lg text-blue-200 max-w-2xl mx-auto">Connect with experienced alumni for guidance and support.</p>
      </header>

      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <input type="text" placeholder="Search mentors by name, company, skills, year..." 
                 className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500" 
                 value={searchTerm} onChange={handleSearchChange} />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>
      </div>

      {error && <ErrorState message={error} small onRetry={() => { setError(''); fetchAlumniData(); fetchMyRequests(); }} />}

      {(isLoadingAlumni || isLoadingRequests) && <LoadingState message="Loading mentors and your request statuses..." />}
      
      {!isLoadingAlumni && !isLoadingRequests && !error && currentDisplayAlumni.length === 0 && (
          <div className="text-center py-10">
              <Users size={56} className="mx-auto text-slate-500 mb-3" />
              <p className="text-xl text-slate-300">{searchTerm ? "No mentors match your search." : "No mentors available currently."}</p>
          </div>
      )}

      {!isLoadingAlumni && !isLoadingRequests && !error && currentDisplayAlumni.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentDisplayAlumni.map((alumnus) => {
            const existingRequest = myRequests.find(req => req.alumni?._id === alumnus._id);
            let buttonContent;
            let buttonAction;
            let isButtonDisabled;
            let currentActionType = 'request'; // Default type for this button

            if (existingRequest) {
              if (existingRequest.status === 'pending') {
                buttonContent = <><Clock size={16} className="mr-2"/>Request Pending</>;
                isButtonDisabled = true;
                currentActionType = 'pending';
              } else if (existingRequest.status === 'accepted') {
                buttonContent = <><MessageSquare size={16} className="mr-2"/>Chat with Mentor</>;
                buttonAction = () => handleChatWithMentor(alumnus);
                isButtonDisabled = false; // Chat button should not be disabled by isSendingRequest (for new requests)
                currentActionType = 'chat';
              } else { // Rejected, cancelled, or other - allow re-request
                buttonContent = <><UserPlus size={16} className="mr-2"/>Request Mentorship</>;
                buttonAction = () => handleMentorshipRequest(alumnus);
                isButtonDisabled = isSendingRequest; // Only disable if a new request is being sent
              }
            } else {
              buttonContent = <><UserPlus size={16} className="mr-2"/>Request Mentorship</>;
              buttonAction = () => handleMentorshipRequest(alumnus);
              isButtonDisabled = isSendingRequest; // Only disable if a new request is being sent
            }

            return (
            <article key={alumnus._id} className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col border border-slate-700/50 h-full">
              <div className="p-5 flex flex-col items-center text-center flex-grow">
                <AlumniAvatar src={alumnus.profilePic} name={alumnus.fullName} />
                <h3 className="mt-3 text-lg font-semibold text-slate-100">{alumnus.fullName}</h3>
                <p className="text-sm text-purple-300 mt-0.5 truncate w-full px-2" title={alumnus.currentRole && alumnus.currentCompany ? `${alumnus.currentRole} at ${alumnus.currentCompany}` : (alumnus.currentRole || alumnus.currentCompany || 'Alumnus/Alumna')}>
                    {alumnus.currentRole || 'Alumnus/Alumna'}{alumnus.currentCompany && ` at ${alumnus.currentCompany}`}
                </p>
                <p className="text-xs text-slate-400 mt-1">Batch of {alumnus.passoutYear || 'N/A'}</p>
                {Array.isArray(alumnus.domains) && alumnus.domains.length > 0 && (
                     <p className="text-xs text-sky-300 mt-2 px-1 line-clamp-2" title={alumnus.domains.join(', ')}>
                        Skills: {alumnus.domains.join(', ')}
                     </p>
                )}
              </div>
              <div className="p-4 border-t border-slate-700/50 mt-auto">
                <button 
                    onClick={buttonAction} 
                    disabled={isButtonDisabled}
                    className={`w-full inline-flex items-center justify-center px-4 py-2.5 font-semibold rounded-md shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                                ${currentActionType === 'chat' 
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                    : 'bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white'
                                }`}
                >
                  {/* Show loader only if this specific button's action is to 'request' AND a request is being sent */}
                  {isSendingRequest && currentActionType === 'request' && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                  {buttonContent}
                </button>
              </div>
            </article>
          )})}
        </div>
      )}
      {/* Pagination for "Find a Mentor" results */}
      {!isLoadingAlumni && !isLoadingRequests && !error && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default Mentorship;