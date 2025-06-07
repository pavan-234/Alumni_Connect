// import React, { useEffect, useState } from 'react';

// const SearchAlumni = () => {
//   const [alumni, setAlumni] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAlumni = async () => {
//       try {
//         setLoading(true);
//         setError('');
//         const res = await fetch('http://localhost:5000/api/search/alumni', {
//           method: 'GET',
//           credentials: 'include',
//         });

//         const data = await res.json();
//         console.log('Alumni data:', data);

//         if (Array.isArray(data)) {
//           setAlumni(data);
//         } else if (data.message) {
//           throw new Error(data.message);
//         } else {
//           throw new Error('Expected array but got something else');
//         }
//       } catch (err) {
//         console.error('Error fetching alumni:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAlumni();
//   }, []);

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

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <p className="text-red-600 text-lg" role="alert">
//           Error: {error}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
//       <div className="max-w-4xl mx-auto transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
//         <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//           Search Alumni
//         </h2>
//         {alumni.length === 0 ? (
//           <p className="text-gray-600 text-center text-lg">
//             No alumni found.
//           </p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2">
//             {alumni.map((a) => (
//               <div
//                 key={a._id}
//                 className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
//               >
//                 <div className="flex items-start gap-4">
//                   <img
//                     src={a.profilePic || 'https://via.placeholder.com/64'}
//                     alt={`${a.fullName}'s profile picture`}
//                     className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
//                   />
//                   <div className="flex-1">
//                     <h3 className="text-xl font-semibold text-gray-900">
//                       {a.fullName}
//                     </h3>
//                     <p className="text-gray-600">
//                       <span className="font-medium">Company:</span>{' '}
//                       {a.company || 'Not provided'}
//                     </p>
//                     <p className="text-gray-600">
//                       <span className="font-medium">Domains:</span>{' '}
//                       {a.domains && a.domains.length > 0
//                         ? a.domains.join(', ')
//                         : 'Not provided'}
//                     </p>
//                     <p className="text-gray-600">
//                       <span className="font-medium">Experience:</span>{' '}
//                       {a.experience ? `${a.experience} years` : 'Not provided'}
//                     </p>
//                     <p className="text-gray-600">
//                       <span className="font-medium">Passout Year:</span>{' '}
//                       {a.passoutYear || 'Not provided'}
//                     </p>
//                     {a.linkedIn && (
//                       <a
//                         href={a.linkedIn}
//                         className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label={`Visit ${a.fullName}'s LinkedIn profile`}
//                       >
//                         <svg
//                           className="w-5 h-5"
//                           fill="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                         </svg>
//                         LinkedIn
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // export default SearchAlumni;
// import React, { useEffect, useState } from 'react';

// const SearchAlumni = () => {
//   const [alumni, setAlumni] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAlumni = async () => {
//       try {
//         setLoading(true);
//         setError('');

//         // Get the role and token from localStorage
//         const role = localStorage.getItem('role');
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

//         const res = await fetch('http://localhost:5000/api/search/alumni', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           const err = await res.json();
//           throw new Error(err.message || 'Failed to fetch alumni');
//         }

//         const data = await res.json();
//         console.log('Alumni data:', data);
//         setAlumni(data); // ✅ Update state with data
//       } catch (error) {
//         console.error('Error fetching alumni:', error.message);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAlumni();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p className="text-blue-600 text-lg animate-pulse">Loading alumni...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p className="text-red-600 text-lg">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-6">Search Alumni</h2>
//         {alumni.length === 0 ? (
//           <p className="text-center text-gray-600">No alumni found.</p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2">
//             {alumni.map((a) => (
//               <div key={a._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow">
//                 <div className="flex items-start gap-4">
//                   <img
//                     src={a.profilePic || 'https://via.placeholder.com/64'}
//                     alt={`${a.fullName}'s profile`}
//                     className="w-16 h-16 rounded-full object-cover border"
//                   />
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-800">{a.fullName}</h3>
//                     <p className="text-gray-600"><strong>Company:</strong> {a.company || 'Not provided'}</p>
//                     <p className="text-gray-600"><strong>Domains:</strong> {a.domains?.join(', ') || 'Not provided'}</p>
//                     <p className="text-gray-600"><strong>Experience:</strong> {a.experience ? `${a.experience} years` : 'Not provided'}</p>
//                     <p className="text-gray-600"><strong>Passout Year:</strong> {a.passoutYear || 'Not provided'}</p>
//                     {a.linkedIn && (
//                       <a href={a.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 inline-block">
//                         LinkedIn Profile →
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchAlumni;




































// import React, { useEffect, useState, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom'; // For navigating to profile
// import {
//   Search,
//   Users,
//   Briefcase,
//   GraduationCap,
//   Linkedin,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
//   AlertTriangle,
//   UserCircle, // Fallback avatar
//   ExternalLink, // For profile link
// } from 'lucide-react';

// // --- Reusable UI Helper Components (for consistency) ---
// const LoadingState = ({ message = "Loading alumni directory..." }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-blue-200 py-10">
//     <Loader2 className="animate-spin h-16 w-16 text-purple-400 mb-6" />
//     <h2 className="text-2xl font-semibold text-white mb-2">Fetching Alumni</h2>
//     <p className="text-blue-300">{message}</p>
//   </div>
// );

// const ErrorState = ({ message, onRetry }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-red-300 p-8 bg-slate-800/50 rounded-xl shadow-xl border border-red-500/30">
//     <AlertTriangle className="h-16 w-16 text-red-400 mb-6" />
//     <h2 className="text-2xl font-semibold text-red-200 mb-2">Error Loading Alumni</h2>
//     <p className="text-center text-red-300 max-w-md">
//       {message || "Sorry, we couldn't load the alumni directory."}
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

// const AlumniAvatar = ({ src, name, size = "w-20 h-20" }) => {
//   const [imgError, setImgError] = useState(false);
//   const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'A')}&background=random&color=fff&size=128&font-size=0.33&bold=true`;

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
//   if (totalPages <= 1) return null;

//   const pageNumbers = [];
//   // Logic for displaying a limited number of page buttons (e.g., first, last, current, and a few around current)
//   // For simplicity, showing all pages if not too many, otherwise implement more complex logic
//   const maxButtons = 7;
//   if (totalPages <= maxButtons) {
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }
//   } else {
//     pageNumbers.push(1);
//     if (currentPage > 3) pageNumbers.push('...');
    
//     let startPage = Math.max(2, currentPage - 1);
//     let endPage = Math.min(totalPages - 1, currentPage + 1);

//     if (currentPage <=3) endPage = Math.min(totalPages -1, 4);
//     if (currentPage >= totalPages - 2) startPage = Math.max(2, totalPages -3);


//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }

//     if (currentPage < totalPages - 2) pageNumbers.push('...');
//     pageNumbers.push(totalPages);
//   }


//   return (
//     <nav className="mt-10 flex items-center justify-center space-x-2" aria-label="Pagination">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="p-2.5 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//       >
//         <ChevronLeft size={20} />
//         <span className="sr-only">Previous</span>
//       </button>
//       {pageNumbers.map((page, index) =>
//         typeof page === 'number' ? (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
//               currentPage === page
//                 ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
//                 : 'text-slate-300 hover:bg-slate-700'
//             }`}
//             aria-current={currentPage === page ? 'page' : undefined}
//           >
//             {page}
//           </button>
//         ) : (
//           <span key={`ellipsis-${index}`} className="px-4 py-2.5 text-slate-400">...</span>
//         )
//       )}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="p-2.5 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//       >
//         <ChevronRight size={20} />
//         <span className="sr-only">Next</span>
//       </button>
//     </nav>
//   );
// };


// // --- Main SearchAlumni Component ---
// const ITEMS_PER_PAGE = 12; // Adjust as needed

// const SearchAlumni = () => {
//   const [allAlumni, setAllAlumni] = useState([]); // Stores all fetched alumni
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Your existing getToken function
//   const getToken = () => {
//     const role = localStorage.getItem('role');
//     const token =
//       role === 'student' ? localStorage.getItem('student_token') :
//       role === 'alumni' ? localStorage.getItem('alumni_token') :
//       role === 'admin' ? localStorage.getItem('admin_token') : null;
//     return token;
//   };

//   const fetchAlumniData = async () => {
//     try {
//       setLoading(true); setError('');
//       const token = getToken();
//       // if (!token) {
//       //   // setError('Authentication required. Please log in.'); // Optionally set error
//       //   navigate('/login'); // Or just redirect
//       //   return;
//       // }
//       const res = await fetch('http://localhost:5000/api/search/alumni', {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) {
//         const errData = await res.json().catch(() => ({ message: 'Unknown server error.'}));
//         throw new Error(errData.message || 'Failed to fetch alumni');
//       }
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setAllAlumni(data);
//       } else {
//         throw new Error("Invalid data format received from server.");
//       }
//     } catch (error) {
//       console.error('Error fetching alumni:', error.message);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchAlumniData();
//   }, []);

//   // Client-side filtering
//   const filteredAlumni = useMemo(() => {
//     if (!searchTerm) return allAlumni;
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return allAlumni.filter(
//       (a) =>
//         a.fullName?.toLowerCase().includes(lowerSearchTerm) ||
//         (a.company || a.currentCompany)?.toLowerCase().includes(lowerSearchTerm) || // Check both company fields
//         a.passoutYear?.toString().includes(lowerSearchTerm) ||
//         (Array.isArray(a.domains) && a.domains.some(domain => domain.toLowerCase().includes(lowerSearchTerm))) ||
//         (typeof a.experience === 'string' && a.experience.toLowerCase().includes(lowerSearchTerm)) ||
//         (typeof a.experience === 'number' && a.experience.toString().includes(lowerSearchTerm))
//     );
//   }, [allAlumni, searchTerm]);

//   // Client-side pagination
//   const totalPages = Math.ceil(filteredAlumni.length / ITEMS_PER_PAGE);
//   const currentDisplayAlumni = useMemo(() => {
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     return filteredAlumni.slice(startIndex, endIndex);
//   }, [filteredAlumni, currentPage]);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to first page on new search
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
//     }
//   };

//   // Navigate to alumni's public profile page
//   const handleViewProfile = (alumniId) => {
//     // Assuming you have a route like /profile/alumni/:id
//     // Or if it's the same student profile page but needs an ID
//     // navigate(`/student-dashboard/profile/${alumniId}`); // Or your specific alumni profile route
    
//     // For now, let's assume a generic profile viewer or storing ID for a modal
//     console.log("View profile for alumni ID:", alumniId);
//     // You would typically navigate:
//     navigate(`/alumni-profile/${alumniId}`); // EXAMPLE ROUTE - ADJUST
//   };


//   if (loading) return <LoadingState />;
//   // Show error prominently if loading fails before search/pagination logic
//   if (error && allAlumni.length === 0) return <ErrorState message={error} onRetry={fetchAlumniData} />;


//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
//       <header className="mb-10">
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
//             Alumni Directory
//           </span>
//         </h1>
//         <p className="mt-3 text-lg text-blue-200 max-w-2xl mx-auto text-center">
//           Connect with experienced professionals from your alma mater network.
//         </p>
//         <div className="mt-8 max-w-2xl mx-auto">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search alumni by name, company, year, skills..."
//               className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-md"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
//           </div>
//         </div>
//       </header>

//       {/* Display general error here too, if it occurred after initial load */}
//       {error && <ErrorMessage message={error} />} 

//       {!loading && currentDisplayAlumni.length === 0 && !error && (
//         <div className="text-center py-10">
//           <Users size={64} className="mx-auto text-slate-500 mb-4" />
//           <p className="text-xl text-slate-300 font-semibold">
//             {searchTerm ? "No alumni match your search." : "No alumni found in the directory."}
//           </p>
//           {searchTerm && <p className="text-slate-400 mt-2">Try adjusting your search terms.</p>}
//         </div>
//       )}

//       {currentDisplayAlumni.length > 0 && (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {currentDisplayAlumni.map((alumni) => (
//             <article
//               key={alumni._id}
//               className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 ease-out hover:shadow-purple-500/30 hover:-translate-y-1 group border border-slate-700/60"
//             >
//               <div className="p-5 flex flex-col items-center text-center flex-grow">
//                 <AlumniAvatar src={alumni.profilePic} name={alumni.fullName} size="w-24 h-24 mb-4" />
//                 <h3
//                   className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 group-hover:to-pink-400 transition-colors cursor-pointer"
//                   onClick={() => handleViewProfile(alumni._id)}
//                   tabIndex={0}
//                   onKeyDown={(e) => e.key === 'Enter' && handleViewProfile(alumni._id)}
//                 >
//                   {alumni.fullName || 'Alumni Name'}
//                 </h3>
//                 <p className="text-sm text-slate-400 mt-1">
//                   {alumni.currentRole || (alumni.company || alumni.currentCompany) || 'Role not specified'}
//                   {(alumni.currentRole && (alumni.company || alumni.currentCompany)) && ' at '} 
//                   {(!alumni.currentRole && (alumni.company || alumni.currentCompany)) ? `${alumni.company || alumni.currentCompany}` : (alumni.company || alumni.currentCompany)}
//                 </p>
//                  <p className="text-xs text-slate-500 mt-0.5">
//                     Batch of {alumni.passoutYear || 'N/A'}
//                 </p>
//               </div>
//               <div className="p-4 border-t border-slate-700/50 mt-auto text-center">
//                  <button
//                     onClick={() => handleViewProfile(alumni._id)}
//                     className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 group-hover:underline"
//                  >
//                     View Profile <ExternalLink size={14} className="ml-1.5 opacity-70 group-hover:opacity-100" />
//                  </button>
//               </div>
//             </article>
//           ))}
//         </div>
//       )}

//       {!loading && totalPages > 1 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       )}
//     </div>
//   );
// };

// export default SearchAlumni;































































import React, { useEffect, useState, useMemo } from 'react';
import {
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
  ExternalLink,
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Linkedin,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

// --- Reusable UI Helper Components ---
const LoadingState = ({ message = "Loading alumni directory..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-blue-200 py-10">
    <Loader2 className="animate-spin h-16 w-16 text-purple-400 mb-6" />
    <h2 className="text-2xl font-semibold text-white mb-2">Fetching Alumni</h2>
    <p className="text-blue-300">{message}</p>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-red-300 p-8 bg-slate-800/50 rounded-xl shadow-xl border border-red-500/30">
    <AlertTriangle className="h-16 w-16 text-red-400 mb-6" />
    <h2 className="text-2xl font-semibold text-red-200 mb-2">Error Loading Alumni</h2>
    <p className="text-center text-red-300 max-w-md">
      {message || "Sorry, we couldn't load the alumni directory."}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-6 inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      >
        Try Again
      </button>
    )}
  </div>
);

const AlumniAvatar = ({ src, name, size = "w-20 h-20" }) => {
  const [imgError, setImgError] = useState(false);
  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'A')}&background=random&color=fff&size=128&font-size=0.33&bold=true`;
  
  return (
    <img
      src={imgError || !src ? fallbackSrc : src}
      alt={`${name || 'Alumni'}'s profile`}
      className={`${size} rounded-full object-cover border-2 border-slate-600 shadow-md`}
      onError={() => setImgError(true)}
    />
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  
  const pageNumbers = [];
  const maxButtons = 7;
  
  if (totalPages <= maxButtons) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push('...');
    
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    if (currentPage <= 3) endPage = Math.min(totalPages - 1, 4);
    if (currentPage >= totalPages - 2) startPage = Math.max(2, totalPages - 3);
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    if (currentPage < totalPages - 2) pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }
  
  return (
    <nav className="mt-10 flex items-center justify-center space-x-2" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2.5 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={20} />
        <span className="sr-only">Previous</span>
      </button>
      
      {pageNumbers.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-4 py-2.5 text-slate-400">...</span>
        )
      )}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2.5 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={20} />
        <span className="sr-only">Next</span>
      </button>
    </nav>
  );
};

// Alumni Profile Modal Component
const AlumniProfileModal = ({ alumni, isOpen, onClose }) => {
  if (!isOpen || !alumni) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-slate-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center space-x-6">
            <AlumniAvatar 
              src={alumni.profilePic} 
              name={alumni.fullName} 
              size="w-24 h-24" 
            />
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {alumni.fullName || 'Alumni Name'}
              </h2>
              <p className="text-slate-300 text-lg">
                {alumni.currentRole || 'Professional'}
              </p>
              {(alumni.company || alumni.currentCompany) && (
                <p className="text-slate-400">
                  at {alumni.company || alumni.currentCompany}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alumni.passoutYear && (
              <div className="flex items-center space-x-3 text-slate-300">
                <GraduationCap className="text-purple-400" size={20} />
                <div>
                  <p className="text-sm text-slate-400">Batch Year</p>
                  <p className="font-medium">{alumni.passoutYear}</p>
                </div>
              </div>
            )}
            
            {alumni.experience && (
              <div className="flex items-center space-x-3 text-slate-300">
                <Briefcase className="text-blue-400" size={20} />
                <div>
                  <p className="text-sm text-slate-400">Experience</p>
                  <p className="font-medium">
                    {typeof alumni.experience === 'number' 
                      ? `${alumni.experience} years`
                      : alumni.experience
                    }
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Domains/Skills */}
          {alumni.domains && alumni.domains.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Domains & Skills</h3>
              <div className="flex flex-wrap gap-2">
                {alumni.domains.map((domain, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Company Info */}
          {(alumni.company || alumni.currentCompany) && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Current Position</h3>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-300">
                  <span className="font-medium text-white">Company:</span> {alumni.company || alumni.currentCompany}
                </p>
                {alumni.currentRole && (
                  <p className="text-slate-300 mt-1">
                    <span className="font-medium text-white">Role:</span> {alumni.currentRole}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Contact Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
            <div className="space-y-2">
              {alumni.linkedIn && (
                <a
                  href={alumni.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
                >
                  <Linkedin className="text-blue-400" size={20} />
                  <span>LinkedIn Profile</span>
                  <ExternalLink size={16} className="ml-auto" />
                </a>
              )}
              
              {alumni.email && (
                <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg text-slate-300">
                  <Mail className="text-green-400" size={20} />
                  <span>{alumni.email}</span>
                </div>
              )}
              
              {alumni.phone && (
                <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg text-slate-300">
                  <Phone className="text-orange-400" size={20} />
                  <span>{alumni.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          {alumni.bio && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">About</h3>
              <p className="text-slate-300 leading-relaxed bg-slate-700/30 rounded-lg p-4">
                {alumni.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main SearchAlumni Component ---
const ITEMS_PER_PAGE = 12;

const SearchAlumni = () => {
  const [allAlumni, setAllAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getToken = () => {
    const role = localStorage.getItem('role');
    const token =
      role === 'student' ? localStorage.getItem('student_token') :
      role === 'alumni' ? localStorage.getItem('alumni_token') :
      role === 'admin' ? localStorage.getItem('admin_token') : null;
    return token;
  };

  const fetchAlumniData = async () => {
    try {
      setLoading(true);
      setError('');
      const token = getToken();
      
      const res = await fetch('http://localhost:5000/api/search/alumni', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) {
        const errData = await res.json().catch(() => ({ message: 'Unknown server error.' }));
        throw new Error(errData.message || 'Failed to fetch alumni');
      }
      
      const data = await res.json();
      if (Array.isArray(data)) {
        setAllAlumni(data);
      } else {
        throw new Error("Invalid data format received from server.");
      }
    } catch (error) {
      console.error('Error fetching alumni:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumniData();
  }, []);

  // Client-side filtering
  const filteredAlumni = useMemo(() => {
    if (!searchTerm) return allAlumni;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allAlumni.filter(
      (a) =>
        a.fullName?.toLowerCase().includes(lowerSearchTerm) ||
        (a.company || a.currentCompany)?.toLowerCase().includes(lowerSearchTerm) ||
        a.passoutYear?.toString().includes(lowerSearchTerm) ||
        (Array.isArray(a.domains) && a.domains.some(domain => domain.toLowerCase().includes(lowerSearchTerm))) ||
        (typeof a.experience === 'string' && a.experience.toLowerCase().includes(lowerSearchTerm)) ||
        (typeof a.experience === 'number' && a.experience.toString().includes(lowerSearchTerm))
    );
  }, [allAlumni, searchTerm]);

  // Client-side pagination
  const totalPages = Math.ceil(filteredAlumni.length / ITEMS_PER_PAGE);
  const currentDisplayAlumni = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAlumni.slice(startIndex, endIndex);
  }, [filteredAlumni, currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleViewProfile = (alumni) => {
    setSelectedAlumni(alumni);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlumni(null);
  };

  if (loading) return <LoadingState />;
  if (error && allAlumni.length === 0) return <ErrorState message={error} onRetry={fetchAlumniData} />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
            Alumni Directory
          </span>
        </h1>
        <p className="mt-3 text-lg text-blue-200 max-w-2xl mx-auto text-center">
          Connect with experienced professionals from your alma mater network.
        </p>
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search alumni by name, company, year, skills..."
              className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
          </div>
        </div>
      </header>

      {!loading && currentDisplayAlumni.length === 0 && !error && (
        <div className="text-center py-10">
          <Users size={64} className="mx-auto text-slate-500 mb-4" />
          <p className="text-xl text-slate-300 font-semibold">
            {searchTerm ? "No alumni match your search." : "No alumni found in the directory."}
          </p>
          {searchTerm && <p className="text-slate-400 mt-2">Try adjusting your search terms.</p>}
        </div>
      )}

      {currentDisplayAlumni.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentDisplayAlumni.map((alumni) => (
            <article
              key={alumni._id}
              className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 ease-out hover:shadow-purple-500/30 hover:-translate-y-1 group border border-slate-700/60"
            >
              <div className="p-5 flex flex-col items-center text-center flex-grow">
                <AlumniAvatar src={alumni.profilePic} name={alumni.fullName} size="w-24 h-24 mb-4" />
                <h3
                  className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 group-hover:to-pink-400 transition-colors cursor-pointer"
                  onClick={() => handleViewProfile(alumni)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleViewProfile(alumni)}
                >
                  {alumni.fullName || 'Alumni Name'}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {alumni.currentRole || (alumni.company || alumni.currentCompany) || 'Role not specified'}
                  {(alumni.currentRole && (alumni.company || alumni.currentCompany)) && ' at '}
                  {(!alumni.currentRole && (alumni.company || alumni.currentCompany)) ? `${alumni.company || alumni.currentCompany}` : (alumni.company || alumni.currentCompany)}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Batch of {alumni.passoutYear || 'N/A'}
                </p>
              </div>
              <div className="p-4 border-t border-slate-700/50 mt-auto text-center">
                <button
                  onClick={() => handleViewProfile(alumni)}
                  className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 group-hover:underline"
                >
                  View Profile <ExternalLink size={14} className="ml-1.5 opacity-70 group-hover:opacity-100" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Alumni Profile Modal */}
      <AlumniProfileModal
        alumni={selectedAlumni}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SearchAlumni;