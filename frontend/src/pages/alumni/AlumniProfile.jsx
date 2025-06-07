// import React, { useEffect, useState } from 'react';

// const AlumniProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const role = localStorage.getItem('role');
//         const token =
//           role === 'student'
//             ? localStorage.getItem('student_token')
//             : role === 'alumni'
//             ? localStorage.getItem('alumni_token')
//             : role === 'admin'
//             ? localStorage.getItem('admin_token')
//             : null;

        

//         const res = await fetch('http://localhost:5000/api/users/profile', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           let errorMessage = 'Failed to fetch profile';
//           try {
//             const errorData = await res.json();
//             errorMessage = errorData.message || errorMessage;
//           } catch {
//             // Failed to parse JSON, ignore
//           }
//           throw new Error(errorMessage);
//         }

//         const data = await res.json();
//         setProfile(data);
//       } catch (err) {
//         console.error('Error fetching profile:', err);
//         setError(err.message || 'Unable to load profile. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
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
//           <p className="mt-2 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <p className="text-red-600 text-lg">{error}</p>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <p className="text-gray-600 text-lg">No profile data available.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
//         <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//           Alumni Profile
//         </h2>
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src={profile.profilePic || 'https://via.placeholder.com/96'}
//             alt={`${profile.fullName || 'Alumni'}'s profile picture`}
//             className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 mb-4"
//           />
//           <div className="space-y-4 w-full">
//             <div className="flex items-center">
//               <span className="w-1/3 font-semibold text-gray-900">Name:</span>
//               <span className="w-2/3 text-gray-600">{profile.fullName || 'N/A'}</span>
//             </div>
//             <div className="flex items-center">
//               <span className="w-1/3 font-semibold text-gray-900">Email:</span>
//               <span className="w-2/3 text-gray-600">{profile.email || 'N/A'}</span>
//             </div>
//             <div className="flex items-center">
//               <span className="w-1/3 font-semibold text-gray-900">Gender:</span>
//               <span className="w-2/3 text-gray-600">{profile.gender || 'N/A'}</span>
//             </div>
//             <div className="flex items-center">
//               <span className="w-1/3 font-semibold text-gray-900">College:</span>
//               <span className="w-2/3 text-gray-600">{profile.collegeName || 'N/A'}</span>
//             </div>
//             <div className="flex items-center">
//               <span className="w-1/3 font-semibold text-gray-900">Passout Year:</span>
//               <span className="w-2/3 text-gray-600">{profile.passoutYear || 'N/A'}</span>
//             </div>
//             <div className="flex items-center">
//               <span className="w-1/3 font-semibold text-gray-900">Experience:</span>
//               <span className="w-2/3 text-gray-600">{profile.experience || 'N/A'}</span>
//             </div>
//             <div className="flex items-center">
//               <span className="w-1/3 font-semibold text-gray-900">Domains:</span>
//               <span className="w-2/3 text-gray-600">
//                 {profile.domains?.length > 0 ? profile.domains.join(', ') : 'None'}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlumniProfile;





// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   UserCircle, Mail, Edit3, Loader2, AlertTriangle, GraduationCap,
//   Briefcase, MapPin, Cake, Users, University, CalendarCheck,
//   Github, Linkedin, Building, Info, // Added Building & Info for experience
// } from 'lucide-react';

// // --- Reusable UI Helper Components (Same as StudentProfile) ---
// // IMPORTANT: If these are in a shared file, import them. Otherwise, copy their definitions.
// const LoadingState = ({ message = "Loading your profile..." }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-blue-200 py-10">
//     <Loader2 className="animate-spin h-16 w-16 text-purple-400 mb-6" />
//     <h2 className="text-2xl font-semibold text-white mb-2">Fetching Profile</h2>
//     <p className="text-blue-300">{message}</p>
//   </div>
// );

// const ErrorState = ({ message, onRetry }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-red-300 p-8 bg-slate-800/50 rounded-xl shadow-xl border border-red-500/30">
//     <AlertTriangle className="h-16 w-16 text-red-400 mb-6" />
//     <h2 className="text-2xl font-semibold text-red-200 mb-2">Profile Error</h2>
//     <p className="text-center text-red-300 max-w-md">
//       {message || "Sorry, we couldn't load your profile at this time."}
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

// const ProfileDetailItem = ({ icon: Icon, label, value, href, iconColor = "text-purple-400", alwaysShow = false }) => {
//   if (!alwaysShow && !value && value !== 0 && value !== false) return null;
//   const displayValue = (value || value === 0 || value === false) ? String(value) : '—';
//   const ValueComponent = href && value ? 'a' : 'span';
//   const valueProps = (href && value) 
//     ? { href, target: "_blank", rel: "noopener noreferrer", className: "hover:underline hover:text-purple-300 transition-colors" } 
//     : {};

//   return (
//     <div className="flex items-start py-3 border-b border-slate-700/50 last:border-b-0">
//       <Icon size={20} className={`mr-4 mt-1 flex-shrink-0 ${iconColor} opacity-80`} />
//       <div className="flex-1">
//         <p className="text-xs text-slate-400 mb-0.5">{label}</p>
//         <ValueComponent 
//             {...valueProps} 
//             className={`text-slate-100 font-medium break-all ${valueProps.className || ''} ${displayValue === '—' ? 'text-slate-500 italic' : ''}`}
//         >
//           {displayValue === '—' && href ? label : displayValue}
//         </ValueComponent>
//       </div>
//     </div>
//   );
// };
// // --- End Reusable UI Helper Components ---


// // --- Main AlumniProfile Component ---
// const AlumniProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Added navigate

//   const fetchProfileData = async () => {
//     try {
//       setLoading(true); setError('');
//       const role = localStorage.getItem('role');
//       // Ensure we get the ALUMNI token
//       const token = role === 'alumni' ? localStorage.getItem('alumni_token') : null;

//       if (!token || role !== 'alumni') { // Stricter check for alumni role
//         console.warn("AlumniProfile: Not authenticated as alumni or token missing.");
//         // setError("Access denied. Please log in as an alumnus.");
//         // setLoading(false); // Stop loading as we are redirecting
//         navigate('/login'); // Redirect if not an authenticated alumni
//         return;
//       }

//       const res = await fetch('http://localhost:5000/api/users/profile', { // Assuming same endpoint
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });

//       if (res.status === 401) {
//         localStorage.removeItem('alumni_token');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('role');
//         navigate('/login'); return;
//       }
//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({ message: 'Failed to parse server error.' }));
//         throw new Error(errorData.message || `Fetch profile failed: ${res.status}`);
//       }
//       const data = await res.json();
//       setProfile(data);
//     } catch (err) {
//       console.error('Fetch Alumni Profile Error:', err);
//       setError(err.message || 'Failed to load alumni profile.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfileData();
//   }, [navigate]); // Added navigate to dependency array

//   if (loading) return <LoadingState message="Loading alumni profile..." />;
//   // Ensure profile exists before trying to access profile.role
//   if (error || !profile) return <ErrorState message={error || "Alumni profile data is missing or could not be loaded."} onRetry={fetchProfileData} />;

//   // Alumni specific update link
//   const updateProfileLink = '/alumni-dashboard/updateprofile';

//   return (
//     <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
//       <header className="mb-10 text-center">
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-500"> {/* Alumni Theme Gradient */}
//             Alumni Profile
//           </span>
//         </h1>
//         <p className="mt-3 text-lg text-cyan-200 max-w-2xl mx-auto"> {/* Alumni Theme Text Color */}
//           Your professional and academic journey.
//         </p>
//       </header>

//       <div className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-slate-700/60">
//         <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-800 to-slate-800/80 border-b border-slate-700/50">
//           <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <div className="relative group">
//               <img
//                 src={profile.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || 'A L')}&background=0D8ABC&color=fff&size=128&font-size=0.33&bold=true`} // Different fallback bg for alumni
//                 alt={`${profile.fullName || 'Alumni'}'s profile`}
//                 className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-cyan-500/50 shadow-lg" // Alumni theme border
//               />
//             </div>
//             <div className="text-center sm:text-left">
//               <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
//                 {profile.fullName || '—'}
//               </h2>
//               <p className="text-md text-cyan-300 mt-1"> {/* Alumni theme text color */}
//                 {profile.email || '—'}
//               </p>
//               <span className="mt-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-cyan-600/30 text-cyan-300 capitalize">
//                 {profile.role || 'Alumnus/Alumna'}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 sm:p-8">
//           <h3 className="text-xl font-semibold text-slate-100 mb-4 border-b border-slate-700 pb-2">
//             Personal Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//             <ProfileDetailItem icon={Users} label="Gender" value={profile.gender} alwaysShow={true} />
//             <ProfileDetailItem icon={Cake} label="Date of Birth" value={profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : null} alwaysShow={true} />
//             <ProfileDetailItem icon={MapPin} label="Location" value={profile.location || profile.city} alwaysShow={true} />
//           </div>

//           <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-700 pb-2">
//             Academic Background
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//             <ProfileDetailItem icon={University} label="College" value={profile.collegeName} alwaysShow={true} />
//             <ProfileDetailItem icon={GraduationCap} label="Major/Department" value={profile.department} alwaysShow={true} />
//             <ProfileDetailItem icon={CalendarCheck} label="Passout Year" value={profile.passoutYear} alwaysShow={true} />
//           </div>

//           {/* Professional Information - More prominent for Alumni */}
//           <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-700 pb-2">
//             Professional Journey
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//             <ProfileDetailItem icon={Briefcase} label="Current Role" value={profile.currentRole} alwaysShow={true} />
//             <ProfileDetailItem icon={Building} label="Current Company" value={profile.currentCompany} alwaysShow={true} />
//             <ProfileDetailItem icon={Info} label="Experience" value={profile.experience} alwaysShow={true} /> {/* Assuming experience is a text field */}
//              {/* Domains could be skills or areas of expertise */}
//             <ProfileDetailItem icon={GraduationCap} label="Domains/Skills" value={Array.isArray(profile.domains) && profile.domains.length > 0 ? profile.domains.join(', ') : null} alwaysShow={true} />
//           </div>
          
//           <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-700 pb-2">
//             Online Profiles
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//             <ProfileDetailItem 
//                 icon={Github} 
//                 label="GitHub" 
//                 value={profile.github ? "View GitHub" : null} 
//                 href={profile.github} 
//                 iconColor="text-slate-300" 
//                 alwaysShow={true}
//             />
//             <ProfileDetailItem 
//                 icon={Linkedin} 
//                 label="LinkedIn" 
//                 value={profile.linkedIn ? "View LinkedIn" : null}
//                 href={profile.linkedIn} 
//                 iconColor="text-sky-400" 
//                 alwaysShow={true}
//             />
//           </div>

//           <div className="mt-10 text-center">
//             <Link
//               to={updateProfileLink}
//               className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-600 hover:via-sky-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-70" // Alumni theme button
//             >
//               <Edit3 size={18} className="mr-2.5" />
//               Update Profile
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlumniProfile;



// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   UserCircle, Mail, Edit3, Loader2, AlertTriangle, GraduationCap,
//   Briefcase, MapPin, Cake, Users as GenderIcon, University, CalendarCheck,
//   Github, Linkedin, Building, Layers, // Layers for Domains
// } from 'lucide-react'; // Ensure all used icons are imported

// // --- Reusable UI Helper Components (Same as UpdateProfileAlumni) ---
// // IMPORTANT: If these are in a shared file, import them. Otherwise, copy their definitions.
// const LoadingState = ({ message = "Loading your profile..." }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-blue-200 py-10">
//     <Loader2 className="animate-spin h-16 w-16 text-purple-400 mb-6" />
//     <h2 className="text-2xl font-semibold text-white mb-2">Fetching Profile</h2>
//     <p className="text-blue-300">{message}</p>
//   </div>
// );

// const ErrorState = ({ message, onRetry }) => (
//   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-red-300 p-8 bg-slate-800/50 rounded-xl shadow-xl border border-red-500/30">
//     <AlertTriangle className="h-16 w-16 text-red-400 mb-6" />
//     <h2 className="text-2xl font-semibold text-red-200 mb-2">Profile Error</h2>
//     <p className="text-center text-red-300 max-w-md">
//       {message || "Sorry, we couldn't load your profile at this time."}
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

// const ProfileDetailItem = ({ icon: Icon, label, value, href, iconColor = "text-purple-400", alwaysShow = false }) => {
//   if (!alwaysShow && !value && value !== 0 && value !== false) return null;
//   const displayValue = (value || value === 0 || value === false) ? String(value) : '—';
//   const ValueComponent = href && value && displayValue !== '—' ? 'a' : 'span'; // Only link if value is not '—'
//   const valueProps = (href && value && displayValue !== '—') 
//     ? { href, target: "_blank", rel: "noopener noreferrer", className: "hover:underline hover:text-purple-300 transition-colors" } 
//     : {};

//   return (
//     <div className="flex items-start py-3 border-b border-slate-700/50 last:border-b-0">
//       <Icon size={20} className={`mr-4 mt-1 flex-shrink-0 ${iconColor} opacity-80`} />
//       <div className="flex-1 min-w-0"> {/* Added min-w-0 for proper truncation if needed */}
//         <p className="text-xs text-slate-400 mb-0.5">{label}</p>
//         <ValueComponent 
//             {...valueProps} 
//             className={`text-slate-100 font-medium break-words ${valueProps.className || ''} ${displayValue === '—' ? 'text-slate-500 italic' : ''}`}
//         >
//           {/* For links, if original value was present, show "View Profile", else "—" or label */}
//           {href && value && displayValue !== '—' ? `View ${label}` : displayValue}
//         </ValueComponent>
//       </div>
//     </div>
//   );
// };
// // --- End Reusable UI Helper Components ---


// // --- Main AlumniProfile Component ---
// const AlumniProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const fetchProfileData = async () => {
//     try {
//       setLoading(true); setError('');
//       const role = localStorage.getItem('role');
//       const token = role === 'alumni' ? localStorage.getItem('alumni_token') : null;

//       if (!token || role !== 'alumni') {
//         console.warn("AlumniProfile: Not authenticated as alumni or token missing.");
//         navigate('/login');
//         return;
//       }

//       const res = await fetch('http://localhost:5000/api/users/profile', {
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });

//       if (res.status === 401) {
//         localStorage.removeItem('alumni_token');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('role');
//         navigate('/login'); return;
//       }
//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({ message: 'Failed to parse server error.' }));
//         throw new Error(errorData.message || `Fetch profile failed: ${res.status}`);
//       }
//       const data = await res.json();
//       setProfile(data);
//     } catch (err) {
//       console.error('Fetch Alumni Profile Error:', err);
//       setError(err.message || 'Failed to load alumni profile.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfileData();
//   }, [navigate]);

//   if (loading) return <LoadingState message="Loading alumni profile..." />;
//   if (error || !profile) return <ErrorState message={error || "Alumni profile data is missing."} onRetry={fetchProfileData} />;

//   const updateProfileLink = '/alumni-dashboard/updateprofile';

//   return (
//     <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
//       <header className="mb-10 text-center">
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-500">
//             My Alumni Profile
//           </span>
//         </h1>
//         <p className="mt-3 text-lg text-cyan-200 max-w-2xl mx-auto">
//           Your professional and academic journey.
//         </p>
//       </header>

//       <div className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-slate-700/60">
//         <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-800 to-slate-800/80 border-b border-slate-700/50">
//           <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <div className="relative group flex-shrink-0"> {/* Added flex-shrink-0 */}
//               <img
//                 src={profile.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || 'AL')}&background=0D8ABC&color=fff&size=128&font-size=0.33&bold=true`}
//                 alt={`${profile.fullName || 'Alumni'}'s profile`}
//                 className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-cyan-500/50 shadow-lg"
//               />
//             </div>
//             <div className="text-center sm:text-left min-w-0"> {/* Added min-w-0 */}
//               <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight truncate">
//                 {profile.fullName || '—'}
//               </h2>
//               <p className="text-md text-cyan-300 mt-1 truncate">
//                 {profile.email || '—'}
//               </p>
//               <span className="mt-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-cyan-600/30 text-cyan-300 capitalize">
//                 {profile.role || 'Alumnus/Alumna'}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 sm:p-8">
//           {/* Personal Information */}
//           <h3 className="text-xl font-semibold text-slate-100 mb-4 border-b border-slate-700 pb-2">
//             Personal Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//             <ProfileDetailItem icon={GenderIcon} label="Gender" value={profile.gender} alwaysShow={true} />
//             {/* Assuming dateOfBirth is not in your current schema based on what you provided,
//                 but if it were, it would look like this:
//             <ProfileDetailItem icon={Cake} label="Date of Birth" value={profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : null} alwaysShow={true} />
//             */}
//             {/* Assuming location/city is not in your current schema
//             <ProfileDetailItem icon={MapPin} label="Location" value={profile.location || profile.city} alwaysShow={true} /> 
//             */}
//           </div>

//           {/* Academic Background */}
//           <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-700 pb-2">
//             Academic Background
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//             <ProfileDetailItem icon={University} label="College Name" value={profile.collegeName} alwaysShow={true} />
//             <ProfileDetailItem icon={CalendarCheck} label="Passout Year" value={profile.passoutYear} alwaysShow={true} />
//             {/* Removed 'department' as it's not in the provided userSchema top level */}
//           </div>

//           {/* Professional Journey & Socials */}
//           <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-700 pb-2">
//             Professional & Social Presence
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//             <ProfileDetailItem icon={Building} label="Current Company" value={profile.company} alwaysShow={true} />
//             {/* Assuming 'currentRole' is not a direct field in your schema, but company is. If currentRole exists, add it. */}
//             {/* <ProfileDetailItem icon={Briefcase} label="Current Role" value={profile.currentRole} alwaysShow={true} /> */}
//             <ProfileDetailItem icon={Briefcase} label="Years of Experience" value={profile.experience !== null && profile.experience !== undefined ? `${profile.experience} years` : null} alwaysShow={true} iconColor="text-green-400" />
//             <ProfileDetailItem 
//                 icon={Layers} 
//                 label="Domains/Skills" 
//                 value={Array.isArray(profile.domains) && profile.domains.length > 0 ? profile.domains.join(', ') : null} 
//                 alwaysShow={true} 
//                 iconColor="text-yellow-400" 
//             />
//             <ProfileDetailItem 
//                 icon={Github} 
//                 label="GitHub" 
//                 value={profile.github} // Display actual URL or "View GitHub"
//                 href={profile.github} 
//                 iconColor="text-slate-300" 
//                 alwaysShow={true}
//             />
//             <ProfileDetailItem 
//                 icon={Linkedin} 
//                 label="LinkedIn" 
//                 value={profile.linkedIn} // Display actual URL or "View LinkedIn"
//                 href={profile.linkedIn} 
//                 iconColor="text-sky-400" 
//                 alwaysShow={true}
//             />
//           </div>
          
//           <div className="mt-10 text-center">
//             <Link
//               to={updateProfileLink}
//               className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-600 hover:via-sky-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-70"
//             >
//               <Edit3 size={18} className="mr-2.5" />
//               Update My Profile
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlumniProfile;



































import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserCircle, Mail, Edit3, Loader2, AlertTriangle, GraduationCap,
  Briefcase, MapPin, Cake, Users as GenderIcon, University, CalendarCheck,
  Github, Linkedin, Building, Layers, Info, // Ensure all used icons are imported
} from 'lucide-react';

// --- Reusable UI Helper Components (Assumed to be defined as in StudentProfile or shared) ---
const LoadingState = ({ message = "Loading your profile..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-blue-200 py-10">
    <Loader2 className="animate-spin h-16 w-16 text-purple-400 mb-6" />
    <h2 className="text-2xl font-semibold text-white mb-2">Fetching Profile</h2>
    <p className="text-blue-300">{message}</p>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-red-300 p-8 bg-slate-800/50 rounded-xl shadow-xl border border-red-500/30">
    <AlertTriangle className="h-16 w-16 text-red-400 mb-6" />
    <h2 className="text-2xl font-semibold text-red-200 mb-2">Profile Error</h2>
    <p className="text-center text-red-300 max-w-md">
      {message || "Sorry, we couldn't load your profile at this time."}
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

const ProfileDetailItem = ({ icon: Icon, label, value, href, iconColor = "text-purple-400", alwaysShow = false }) => {
  if (!alwaysShow && !value && value !== 0 && value !== false) return null;
  const displayValue = (value || value === 0 || value === false) ? String(value) : '—';
  const ValueComponent = href && value && displayValue !== '—' ? 'a' : 'span';
  const valueProps = (href && value && displayValue !== '—') 
    ? { href, target: "_blank", rel: "noopener noreferrer", className: "hover:underline hover:text-purple-300 transition-colors" } 
    : {};

  return (
    <div className="flex items-start py-3 border-b border-slate-700/50 last:border-b-0">
      <Icon size={20} className={`mr-4 mt-1 flex-shrink-0 ${iconColor} opacity-80`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 mb-0.5">{label}</p>
        <ValueComponent 
            {...valueProps} 
            className={`text-slate-100 font-medium break-words ${valueProps.className || ''} ${displayValue === '—' ? 'text-slate-500 italic' : ''}`}
        >
          {href && value && displayValue !== '—' ? `View ${label}` : displayValue}
        </ValueComponent>
      </div>
    </div>
  );
};
// --- End Reusable UI Helper Components ---

// --- ProfilePageAvatar Component (Copied from StudentProfile for consistency) ---
const ProfilePageAvatar = ({ src, name, alumniTheme = false }) => { // Added alumniTheme prop
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  const getInitials = (nameString) => {
    if (!nameString || typeof nameString !== 'string') return '?';
    const words = nameString.split(' ').filter(Boolean);
    if (words.length === 0) return '?';
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  const initials = getInitials(name);
  const shouldUseImage = src && !imgError;

  const avatarSizeClasses = "w-28 h-28 sm:w-32 sm:h-32";
  // Conditional border and gradient for alumni theme
  const avatarBorderClasses = alumniTheme ? "border-4 border-cyan-500/50" : "border-4 border-purple-500/50";
  const gradientBg = alumniTheme ? "bg-gradient-to-br from-teal-500 via-cyan-500 to-sky-600" : "bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600";
  const textClasses = "text-4xl sm:text-5xl";

  if (shouldUseImage) {
    return (
      <img
        src={src}
        alt={`${name || 'User'}'s profile`}
        className={`${avatarSizeClasses} rounded-full object-cover shadow-lg ${avatarBorderClasses}`}
        onError={() => {
          console.warn(`ProfilePageAvatar: Image failed to load - ${src}`);
          setImgError(true);
        }}
      />
    );
  } else {
    return (
      <div
        className={`${avatarSizeClasses} rounded-full flex items-center justify-center 
                    font-bold text-white shadow-lg 
                    ${gradientBg} ${avatarBorderClasses}`}
        aria-label={`${name || 'User'} avatar`}
      >
        <span className={textClasses}>{initials}</span>
      </div>
    );
  }
};
// --- End ProfilePageAvatar Component ---


// --- Main AlumniProfile Component ---
const AlumniProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    try {
      setLoading(true); setError('');
      const role = localStorage.getItem('role');
      const token = role === 'alumni' ? localStorage.getItem('alumni_token') : null;

      if (!token || role !== 'alumni') {
        console.warn("AlumniProfile: Not authenticated as alumni or token missing.");
        navigate('/login');
        return;
      }

      const res = await fetch('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      if (res.status === 401) {
        localStorage.removeItem('alumni_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        navigate('/login'); return;
      }
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Failed to parse server error.' }));
        throw new Error(errorData.message || `Fetch profile failed: ${res.status}`);
      }
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error('Fetch Alumni Profile Error:', err);
      setError(err.message || 'Failed to load alumni profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []); // Removed navigate from dependency if fetchProfileData doesn't use it directly

  if (loading) return <LoadingState message="Loading alumni profile..." />;
  if (error || !profile) return <ErrorState message={error || "Alumni profile data is missing or could not be loaded."} onRetry={fetchProfileData} />;

  const updateProfileLink = '/alumni-dashboard/updateprofile';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-500">
            My Alumni Profile
          </span>
        </h1>
        <p className="mt-3 text-lg text-cyan-200 max-w-2xl mx-auto">
          Your professional and academic journey.
        </p>
      </header>

      <div className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-slate-700/60">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-800 to-slate-800/80 border-b border-slate-700/50">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative group flex-shrink-0">
              {/* === MODIFIED SECTION START === */}
              <ProfilePageAvatar 
                src={profile.profilePic} 
                name={profile.fullName}
                alumniTheme={true} // Pass prop to use alumni-specific theme colors
              />
              {/* === MODIFIED SECTION END === */}
            </div>
            <div className="text-center sm:text-left min-w-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight truncate">
                {profile.fullName || '—'}
              </h2>
              <p className="text-md text-cyan-300 mt-1 truncate">
                {profile.email || '—'}
              </p>
              <span className="mt-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-cyan-600/30 text-cyan-300 capitalize">
                {profile.role || 'Alumnus/Alumna'}
              </span>
            </div>
          </div>
        </div>

        {/* Profile details sections remain the same as your last AlumniProfile version */}
        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-slate-100 mb-4 border-b border-slate-700 pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <ProfileDetailItem icon={GenderIcon} label="Gender" value={profile.gender} alwaysShow={true} />
            {/* <ProfileDetailItem icon={Cake} label="Date of Birth" value={profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : null} alwaysShow={true} /> */}
            {/* <ProfileDetailItem icon={MapPin} label="Location" value={profile.location || profile.city} alwaysShow={true} />  */}
          </div>

          <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-700 pb-2">
            Academic Background
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <ProfileDetailItem icon={University} label="College Name" value={profile.collegeName} alwaysShow={true} />
            <ProfileDetailItem icon={CalendarCheck} label="Passout Year" value={profile.passoutYear} alwaysShow={true} />
          </div>

          <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-700 pb-2">
            Professional & Social Presence
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <ProfileDetailItem icon={Building} label="Current Company" value={profile.company} alwaysShow={true} />
            <ProfileDetailItem icon={Briefcase} label="Years of Experience" value={profile.experience !== null && profile.experience !== undefined ? `${profile.experience} years` : null} alwaysShow={true} iconColor="text-green-400" />
            <ProfileDetailItem 
                icon={Layers} 
                label="Domains/Skills" 
                value={Array.isArray(profile.domains) && profile.domains.length > 0 ? profile.domains.join(', ') : null} 
                alwaysShow={true} 
                iconColor="text-yellow-400" 
            />
            <ProfileDetailItem 
                icon={Github} 
                label="GitHub" 
                value={profile.github} 
                href={profile.github} 
                iconColor="text-slate-300" 
                alwaysShow={true}
            />
            <ProfileDetailItem 
                icon={Linkedin} 
                label="LinkedIn" 
                value={profile.linkedIn}
                href={profile.linkedIn} 
                iconColor="text-sky-400" 
                alwaysShow={true}
            />
          </div>
          
          <div className="mt-10 text-center">
            <Link
              to={updateProfileLink}
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-600 hover:via-sky-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-70"
            >
              <Edit3 size={18} className="mr-2.5" />
              Update My Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;