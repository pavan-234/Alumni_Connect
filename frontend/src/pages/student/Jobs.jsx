// import React, { useEffect, useState } from 'react';

// const Jobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setError(null);
//         setLoading(true);
//         const token = localStorage.getItem('student_token');

//         const res = await fetch('http://localhost:5000/api/jobs', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           credentials: 'include',
//         });

//         if (!res.ok) {
//           throw new Error('Failed to fetch jobs');
//         }

//         const data = await res.json();

//         if (Array.isArray(data)) {
//           setJobs(data);
//         } else {
//           throw new Error('Data format is incorrect');
//         }
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
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
//           <p className="mt-2 text-gray-600">Loading jobs...</p>
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
//           Job Opportunities
//         </h2>
//         {jobs.length === 0 ? (
//           <p className="text-gray-600 text-center text-lg">
//             No job opportunities available.
//           </p>
//         ) : (
//           <div className="space-y-6">
//             {jobs.map((job, index) => (
//               <div
//                 key={index}
//                 className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
//               >
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   {job.title}
//                 </h3>
//                 <p className="text-gray-600">
//                   <span className="font-medium">Company:</span>{' '}
//                   {job.postedBy?.company || 'Unknown Company'}
//                 </p>
//                 <p className="text-gray-600">
//                   <span className="font-medium">Type:</span> {job.type}
//                 </p>
//                 <p className="text-gray-600">
//                   <span className="font-medium">Location:</span> {job.location}
//                 </p>
//                 <p className="text-gray-600">
//                   <span className="font-medium">Duration:</span> {job.duration}
//                 </p>
//                 <p className="text-gray-600 mt-2">
//                   <span className="font-medium">Description:</span>{' '}
//                   {job.description}
//                 </p>
//                 <a
//                   href={job.applyLink}
//                   className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={`Apply for ${job.title} at ${job.postedBy?.company || 'company'}`}
//                 >
//                   Apply
//                 </a>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Jobs;


// import React, { useEffect, useState } from 'react';
// import {
//   Briefcase,
//   MapPin,
//   Clock3,
//   AlertTriangle,
//   SearchX,
//   ExternalLink,
//   Building,
//   Loader2,
//   CalendarDays,
//   DollarSign, // For salary indication
//   ChevronDown, // For expandable description (optional)
// } from 'lucide-react';

// // --- Reusable UI Helper Components ---

// // Enhanced Company Logo/Initial Placeholder
// const CompanyLogoPlaceholder = ({ companyName, className = "" }) => {
//   const initial = companyName ? companyName.charAt(0).toUpperCase() : '?';
//   return (
//     <div
//       className={`flex-shrink-0 h-16 w-16 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg ${className}`}
//     >
//       {initial}
//     </div>
//   );
// };

// // Visually Appealing Loading State
// const LoadingState = () => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-blue-200 py-10"> {/* Adjusted min-height */}
//     <Loader2 className="animate-spin h-16 w-16 text-purple-400 mb-6" />
//     <h2 className="text-2xl font-semibold text-white mb-2">Fetching Opportunities</h2>
//     <p className="text-blue-300">Please wait while we gather the latest job listings for you.</p>
//   </div>
// );

// // Clear and Styled Error State
// const ErrorState = ({ message }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-red-300 p-8 bg-slate-800/50 rounded-xl shadow-xl border border-red-500/30">
//     <AlertTriangle className="h-16 w-16 text-red-400 mb-6" />
//     <h2 className="text-2xl font-semibold text-red-200 mb-2">An Error Occurred</h2>
//     <p className="text-center text-red-300 max-w-md">
//       {message || "Sorry, we couldn't load the job opportunities at this time. Please try again later."}
//     </p>
//   </div>
// );

// // Engaging No Jobs State
// const NoJobsState = () => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-blue-200 p-8 bg-slate-800/50 rounded-xl shadow-xl border border-blue-500/20">
//     <SearchX className="h-20 w-20 text-purple-400 mb-8" />
//     <h2 className="text-3xl font-semibold text-white mb-3">No Opportunities Found</h2>
//     <p className="text-blue-200 text-center max-w-lg">
//       It seems there are no job openings available right now.
//       Don't worry, new opportunities are posted regularly! Check back soon.
//     </p>
//   </div>
// );

// // Component for displaying individual job details with icons
// const JobDetailItem = ({ icon: Icon, label, value, iconColor = "text-purple-400", srOnlyLabel = false }) => {
//   if (!value && value !== 0 && value !== false) return null; // Don't render if value is truly missing
//   return (
//     <div className="flex items-start text-sm">
//       <Icon size={18} className={`mr-2.5 mt-0.5 flex-shrink-0 ${iconColor} opacity-90`} />
//       <div>
//         <span className={srOnlyLabel ? "sr-only" : "font-semibold text-slate-300 mr-1.5"}>{label}:</span>
//         <span className="text-blue-200">{String(value)}</span> {/* Ensure value is string */}
//       </div>
//     </div>
//   );
// };


// // --- Job Card Component ---
// const JobCard = ({ job, index }) => {
//   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
//   const companyName = job.postedBy?.company || 'Unknown Company';
//   const postedDate = job.createdAt ? new Date(job.createdAt).toLocaleDateString('en-US', {
//     year: 'numeric', month: 'short', day: 'numeric'
//   }) : 'Recently';

//   // Simple slug function for unique IDs
//   const toSlug = (str) => str?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

//   const jobId = job._id || toSlug(job.title) || index;

//   return (
//     <article
//       className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out hover:shadow-purple-500/40 hover:-translate-y-1.5 border border-slate-700/60 group"
//       style={{ animation: `fadeInUp 0.5s ${index * 0.07}s ease-out forwards`, opacity: 0 }} // Staggered animation
//       aria-labelledby={`job-title-${jobId}`}
//     >
//       <div className="p-5 sm:p-6 flex-grow">
//         <div className="flex items-start space-x-4 mb-5">
//           <CompanyLogoPlaceholder companyName={companyName} />
//           <div className="flex-1">
//             <h3 id={`job-title-${jobId}`} className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-1 leading-tight group-hover:to-pink-500 transition-colors duration-300">
//               {job.title || 'Job Title Not Specified'}
//             </h3>
//             <JobDetailItem icon={Building} label="Company" value={companyName} srOnlyLabel={true} iconColor="text-slate-400" />
//           </div>
//         </div>

//         <div className="space-y-3.5 mb-5"> {/* Increased spacing */}
//           <JobDetailItem icon={Briefcase} label="Type" value={job.type} />
//           <JobDetailItem icon={MapPin} label="Location" value={job.location} />
//           <JobDetailItem icon={Clock3} label="Duration" value={job.duration} />
//           <JobDetailItem icon={DollarSign} label="Salary" value={job.salaryRange || job.salary} iconColor="text-green-400" />
//           <JobDetailItem icon={CalendarDays} label="Posted" value={postedDate} iconColor="text-sky-400"/>
//         </div>

//         <div>
//           <p className="text-sm font-semibold text-slate-300 mb-1.5">Description:</p>
//           <div
//             className={`text-blue-100 text-sm leading-relaxed overflow-hidden transition-all duration-500 ease-in-out ${
//               isDescriptionExpanded ? 'max-h-[1000px]' : 'max-h-[4.5em] line-clamp-3' // approx 3 lines
//             }`}
//             onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} // Toggle on click
//             role="button" // Make it behave like a button for accessibility
//             tabIndex={0} // Make it focusable
//             onKeyDown={(e) => e.key === 'Enter' && setIsDescriptionExpanded(!isDescriptionExpanded)}
//             aria-expanded={isDescriptionExpanded}
//             aria-controls={`job-desc-full-${jobId}`}
//           >
//             {job.description || 'No description available.'}
//             {!isDescriptionExpanded && job.description && job.description.length > 150 && ( // Show only if text is actually clamped
//                  <span className="text-purple-400 font-semibold ml-1 group-hover:underline cursor-pointer">
//                     Show more
//                  </span>
//             )}
//           </div>
//            {isDescriptionExpanded && job.description && job.description.length > 150 && (
//              <button
//                 onClick={() => setIsDescriptionExpanded(false)}
//                 className="text-purple-400 font-semibold mt-2 text-sm hover:underline"
//              >
//                 Show less
//              </button>
//            )}
//         </div>
//       </div>

//       {job.applyLink && (
//         <div className="p-5 sm:p-6 border-t border-slate-700/50 mt-auto"> {/* Ensure button is at the bottom */}
//           <a
//             href={job.applyLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-70"
//             aria-label={`Apply for ${job.title} at ${companyName}`}
//           >
//             Apply Now
//             <ExternalLink size={20} className="ml-2.5" />
//           </a>
//         </div>
//       )}
//        {!job.applyLink && (
//          <div className="p-5 sm:p-6 border-t border-slate-700/50 mt-auto text-center">
//             <span className="text-sm text-slate-500 italic">Application link not provided.</span>
//          </div>
//        )}
//     </article>
//   );
// };


// // --- Main Jobs Component ---
// const Jobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // const [searchTerm, setSearchTerm] = useState(''); // For future search functionality

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setError(null);
//         setLoading(true);
//         const role = localStorage.getItem('role');
//       const token =
//         role === 'student'
//           ? localStorage.getItem('student_token')
//           : role === 'alumni'
//           ? localStorage.getItem('alumni_token')
//           : role === 'admin'
//           ? localStorage.getItem('admin_token')
//           : null;

//       if (!token) {
//         throw new Error('No token, unauthorized');
//     } // Standardized token key
//         console.log(token);

//         // --- Simulate API delay for UX testing (REMOVE IN PRODUCTION) ---
//         // await new Promise(resolve => setTimeout(resolve, 1500));
//         // --- End Simulation ---

//         const res = await fetch('http://localhost:5000/api/jobs', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,// Conditionally add Auth header
//           },
//         });

//         if (!res.ok) {
//           const errorData = await res.json().catch(() => ({ message: 'Failed to parse server error.' }));
//           throw new Error(errorData.message || `Server Error: ${res.status}`);
//         }

//         const data = await res.json();
//         if (Array.isArray(data)) {
//           const sortedJobs = data.sort((a, b) =>
//             new Date(b.createdAt || 0) - new Date(a.createdAt || 0) // Newest first
//           );
//           setJobs(sortedJobs);
//         } else {
//           throw new Error('Invalid data format: Expected an array of jobs.');
//         }
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // In-line style for keyframes (better in global CSS or Tailwind config)
//   const keyframesStyle = `
//     @keyframes fadeInUp {
//       0% { opacity: 0; transform: translateY(25px); }
//       100% { opacity: 1; transform: translateY(0); }
//     }
//   `;

//   // const filteredJobs = jobs.filter(job =>
//   //   (job.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//   //   (job.postedBy?.company?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//   //   (job.location?.toLowerCase() || '').includes(searchTerm.toLowerCase())
//   // );

//   return (
//     <>
//       <style>{keyframesStyle}</style>
//       <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <header className="mb-12 text-center">
//           <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
//               Discover Your Next Role
//             </span>
//           </h1>
//           <p className="mt-2 text-lg sm:text-xl text-blue-200 max-w-3xl mx-auto">
//             Explore curated job openings and internships from our network of alumni and partner organizations.
//           </p>
//           {/* Optional: Future Search Bar
//           <div className="mt-8 max-w-xl mx-auto">
//             <input
//               type="text"
//               placeholder="Search by title, company, location..."
//               className="w-full px-5 py-3.5 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm"
//               // value={searchTerm}
//               // onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           */}
//         </header>

//         {loading && <LoadingState />}
//         {!loading && error && <ErrorState message={error} />}
//         {!loading && !error && jobs.length === 0 && <NoJobsState />}
//         {/* {!loading && !error && jobs.length > 0 && filteredJobs.length === 0 && (
//           <NoJobsState message="No jobs match your current search." /> // For when search yields no results
//         )} */}

//         {!loading && !error && jobs.length > 0 && (
//           <div className="grid gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 md:grid-cols-2 lg:grid-cols-3">
//             {/* Replace 'jobs' with 'filteredJobs' if using search */}
//             {jobs.map((job, index) => (
//               <JobCard key={job._id || `job-${index}`} job={job} index={index} />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Jobs;
































































import React, { useEffect, useState, useMemo } from 'react';
import {
  Briefcase, MapPin, Clock3, AlertTriangle, SearchX, ExternalLink, Building,
  Loader2, CalendarDays, DollarSign, Search as SearchIcon, ChevronLeft, ChevronRight,
} from 'lucide-react'; // Added SearchIcon, ChevronLeft, ChevronRight

// --- Reusable UI Helper Components (Keep as is or move to shared file) ---
const CompanyLogoPlaceholder = ({ companyName, className = "" }) => {
  const initial = companyName ? companyName.charAt(0).toUpperCase() : '?';
  return (<div className={`flex-shrink-0 h-16 w-16 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg ${className}`}>{initial}</div>);
};
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-blue-200 py-10">
    <Loader2 className="animate-spin h-16 w-16 text-purple-400 mb-6" />
    <h2 className="text-2xl font-semibold text-white mb-2">Fetching Opportunities</h2>
    <p className="text-blue-300">Please wait while we gather the latest job listings for you.</p>
  </div>
);
const ErrorState = ({ message, onRetry }) => ( // Added onRetry prop
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-red-300 p-8 bg-slate-800/50 rounded-xl shadow-xl border border-red-500/30">
    <AlertTriangle className="h-16 w-16 text-red-400 mb-6" />
    <h2 className="text-2xl font-semibold text-red-200 mb-2">An Error Occurred</h2>
    <p className="text-center text-red-300 max-w-md">{message || "Sorry, we couldn't load job opportunities."}</p>
    {onRetry && <button onClick={onRetry} className="mt-6 inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md">Try Again</button>}
  </div>
);
const NoJobsState = ({ message = "No job opportunities found." }) => ( // Added message prop
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-25rem)] text-blue-200 p-8 bg-slate-800/50 rounded-xl shadow-xl border border-blue-500/20">
    <SearchX className="h-20 w-20 text-purple-400 mb-8" />
    <h2 className="text-3xl font-semibold text-white mb-3">{message.startsWith("No jobs match") ? "No Results" : "No Opportunities"}</h2>
    <p className="text-blue-200 text-center max-w-lg">{message}</p>
  </div>
);
const JobDetailItem = ({ icon: Icon, label, value, iconColor = "text-purple-400", srOnlyLabel = false }) => {
  if (!value && value !== 0 && value !== false) return null;
  return (<div className="flex items-start text-sm"><Icon size={18} className={`mr-2.5 mt-0.5 flex-shrink-0 ${iconColor} opacity-90`} /><div><span className={srOnlyLabel ? "sr-only" : "font-semibold text-slate-300 mr-1.5"}>{label}:</span><span className="text-blue-200">{String(value)}</span></div></div>);
};

// --- Pagination Component ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pageNumbers = []; const maxButtons = 5; // Keep it concise
  if (totalPages <= maxButtons) { for (let i = 1; i <= totalPages; i++) pageNumbers.push(i); }
  else {
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push('...');
    let startPage = Math.max(2, currentPage - Math.floor((maxButtons - 3) / 2));
    let endPage = Math.min(totalPages - 1, currentPage + Math.floor((maxButtons - 2) / 2));
    if (currentPage <= Math.floor(maxButtons/2)) endPage = Math.min(totalPages -1, maxButtons - 2);
    if (currentPage >= totalPages - Math.floor(maxButtons/2) +1 ) startPage = Math.max(2, totalPages - maxButtons + 3);
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    if (currentPage < totalPages - Math.floor(maxButtons/2) ) pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }
  return (
    <nav className="mt-12 flex items-center justify-center space-x-1 sm:space-x-2" aria-label="Pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2.5 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeft size={20} /><span className="sr-only">Previous</span></button>
      {pageNumbers.map((page, index) => typeof page === 'number' ? (<button key={page} onClick={() => onPageChange(page)} className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${currentPage === page ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-700'}`} aria-current={currentPage === page ? 'page' : undefined}>{page}</button>) : (<span key={`ellipsis-${index}`} className="px-4 py-2.5 text-slate-400">...</span>))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2.5 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronRight size={20} /><span className="sr-only">Next</span></button>
    </nav>
  );
};
// --- End Pagination Component ---


// --- Job Card Component (Keep as is) ---
const JobCard = ({ job, index }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const companyName = job.postedBy?.company || job.companyName || 'Unknown Company'; // Added job.companyName as fallback
  const postedDate = job.createdAt ? new Date(job.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently';
  const toSlug = (str) => str?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  const jobId = job._id || toSlug(job.title) || index;

  return (
    <article className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out hover:shadow-purple-500/40 hover:-translate-y-1.5 border border-slate-700/60 group h-full" // Added h-full for equal height cards
      style={{ animation: `fadeInUp 0.5s ${index * 0.07}s ease-out forwards`, opacity: 0 }} aria-labelledby={`job-title-${jobId}`}>
      <div className="p-5 sm:p-6 flex-grow">
        <div className="flex items-start space-x-4 mb-5">
          <CompanyLogoPlaceholder companyName={companyName} />
          <div className="flex-1 min-w-0"> {/* Added min-w-0 for truncation */}
            <h3 id={`job-title-${jobId}`} className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-1 leading-tight group-hover:to-pink-500 transition-colors duration-300 truncate" title={job.title || 'Job Title Not Specified'}>
              {job.title || 'Job Title Not Specified'}
            </h3>
            <JobDetailItem icon={Building} label="Company" value={companyName} srOnlyLabel={true} iconColor="text-slate-400" />
          </div>
        </div>
        <div className="space-y-3.5 mb-5">
          <JobDetailItem icon={Briefcase} label="Type" value={job.type} />
          <JobDetailItem icon={MapPin} label="Location" value={job.location} />
          <JobDetailItem icon={Clock3} label="Duration" value={job.duration} />
          <JobDetailItem icon={DollarSign} label="Salary" value={job.salaryRange || job.salary} iconColor="text-green-400" />
          <JobDetailItem icon={CalendarDays} label="Posted" value={postedDate} iconColor="text-sky-400"/>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-300 mb-1.5">Description:</p>
          <div className={`text-blue-100 text-sm leading-relaxed overflow-hidden transition-all duration-500 ease-in-out ${isDescriptionExpanded ? 'max-h-[1000px]' : 'max-h-[4.5em] line-clamp-3'}`} onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setIsDescriptionExpanded(!isDescriptionExpanded)} aria-expanded={isDescriptionExpanded} aria-controls={`job-desc-full-${jobId}`}>
            {job.description || 'No description available.'}
            {!isDescriptionExpanded && job.description && job.description.length > 150 && (<span className="text-purple-400 font-semibold ml-1 group-hover:underline cursor-pointer">Show more</span>)}
          </div>
           {isDescriptionExpanded && job.description && job.description.length > 150 && (<button onClick={() => setIsDescriptionExpanded(false)} className="text-purple-400 font-semibold mt-2 text-sm hover:underline">Show less</button>)}
        </div>
      </div>
      {job.applyLink && (<div className="p-5 sm:p-6 border-t border-slate-700/50 mt-auto"><a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-70" aria-label={`Apply for ${job.title} at ${companyName}`}>Apply Now <ExternalLink size={20} className="ml-2.5" /></a></div>)}
      {!job.applyLink && (<div className="p-5 sm:p-6 border-t border-slate-700/50 mt-auto text-center"><span className="text-sm text-slate-500 italic">Application link not provided.</span></div>)}
    </article>
  );
};
// --- End Job Card Component ---


const ITEMS_PER_PAGE = 9; // Display 9 jobs per page

// --- Main Jobs Component ---
const Jobs = () => {
  const [allJobs, setAllJobs] = useState([]); // Stores all fetched jobs
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Get Token function (ensure this is correct for your auth setup)
  const getAuthToken = () => {
    const role = localStorage.getItem('role');
    // This page is typically for students, but alumni/admin might also view it.
    // The backend route for GET /api/jobs is role-protected for 'student'.
    // So, ideally, only student_token should be used.
    // If other roles can view, ensure backend allows it or use their respective tokens.
    if (role === 'student') return localStorage.getItem('student_token');
    if (role === 'alumni') return localStorage.getItem('alumni_token'); // If alumni can also view
    if (role === 'admin') return localStorage.getItem('admin_token');   // If admin can also view
    return null;
  };

  const fetchJobsData = async () => { // Renamed for clarity
    try {
      setError(null); setLoading(true);
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found. Please log in.');
      }
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Failed to parse server error.' }));
        throw new Error(errorData.message || `Server Error: ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setAllJobs(data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)));
      } else {
        throw new Error('Invalid data format: Expected an array of jobs.');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobsData();
  }, []);

  // Client-side filtering
  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) return allJobs;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allJobs.filter(job =>
      (job.title?.toLowerCase() || '').includes(lowerSearchTerm) ||
      (job.postedBy?.company?.toLowerCase() || job.companyName?.toLowerCase() || '').includes(lowerSearchTerm) ||
      (job.location?.toLowerCase() || '').includes(lowerSearchTerm) ||
      (job.type?.toLowerCase() || '').includes(lowerSearchTerm) ||
      (job.description?.toLowerCase() || '').includes(lowerSearchTerm) // Search in description too
    );
  }, [allJobs, searchTerm]);

  // Client-side pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const currentDisplayJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const keyframesStyle = ` @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(25px); } 100% { opacity: 1; transform: translateY(0); } } `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
              Discover Your Next Role
            </span>
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-blue-200 max-w-3xl mx-auto">
            Explore curated job openings and internships from our network.
          </p>
          {/* Search Bar Added */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by job title, company, location, type..."
                className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-md"
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search jobs"
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </header>

        {loading && <LoadingState />}
        {!loading && error && <ErrorState message={error} onRetry={fetchJobsData} />}
        {!loading && !error && currentDisplayJobs.length === 0 && (
          <NoJobsState 
            message={searchTerm ? "No jobs match your search criteria. Try different keywords." : "No job opportunities available at the moment."} 
          />
        )}

        {!loading && !error && currentDisplayJobs.length > 0 && (
          // Ensure grid adapts for fewer items on last page: default is 3 cols, 2 for md
          <div className="grid gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 md:grid-cols-2 lg:grid-cols-3"> 
            {currentDisplayJobs.map((job, index) => (
              <JobCard key={job._id || `job-${index}`} job={job} index={index} />
            ))}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default Jobs;