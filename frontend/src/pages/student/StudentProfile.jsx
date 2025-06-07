// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// const StudentProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         setError('');
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
//           navigate('/login');
//           return;
//         }

//         const res = await fetch('http://localhost:5000/api/users/profile', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (res.status === 401) {
//           navigate('/login');
//           return;
//         }

//         if (!res.ok) {
//           throw new Error('Failed to fetch profile');
//         }

//         const data = await res.json();
//         setProfile(data);
//       } catch (err) {
//         console.error('Error fetching profile:', err);
//         setError('Failed to load profile. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <p className="text-blue-600 text-lg">Loading profile...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <p className="text-red-600 text-lg" role="alert">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//           Student Profile
//         </h2>
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src={profile.profilePic || 'https://via.placeholder.com/96'}
//             alt={`${profile.fullName}'s profile`}
//             className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 mb-4"
//           />
//           <div className="space-y-3 w-full">
//             <ProfileRow label="Name" value={profile.fullName} />
//             <ProfileRow label="Email" value={profile.email} />
//             <ProfileRow label="Gender" value={profile.gender} />
//             <ProfileRow label="College" value={profile.collegeName} />
//             <ProfileRow label="Passout Year" value={profile.passoutYear} />
//           </div>
//         </div>
//         <Link
//           to="/student-dashboard/updateprofile"
//           className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-md"
//         >
//           Update Profile
//         </Link>
//       </div>
//     </div>
//   );
// };

// const ProfileRow = ({ label, value }) => (
//   <p className="flex justify-between">
//     <span className="font-medium text-gray-700">{label}:</span>
//     <span className="text-gray-600">{value || 'Not provided'}</span>
//   </p>
// );

// export default StudentProfile;


































// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   UserCircle, // For profile icon/placeholder
//   Mail,
//   Edit3,
//   LogOut, // If you want a logout button here
//   Loader2,
//   AlertTriangle,
//   GraduationCap,
//   Briefcase, // For current role/company if available
//   MapPin, // For location if available
//   Cake, // For DOB if available
//   Users, // For Gender (can be more specific icons)
//   University, // For College
//   CalendarCheck, // For Passout Year
//   ShieldCheck, // For verified status
// } from 'lucide-react';

// // --- Reusable UI Helper Components (from other pages for consistency) ---
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

// const ProfileDetailItem = ({ icon: Icon, label, value, href, iconColor = "text-purple-400" }) => {
//   if (!value && value !== 0 && value !== false) return null; // Don't render if value is truly missing

//   const ValueComponent = href ? 'a' : 'span';
//   const valueProps = href ? { href, target: "_blank", rel: "noopener noreferrer", className: "hover:underline hover:text-purple-300 transition-colors" } : {};

//   return (
//     <div className="flex items-start py-3 border-b border-slate-700/50 last:border-b-0">
//       <Icon size={20} className={`mr-4 mt-1 flex-shrink-0 ${iconColor} opacity-80`} />
//       <div className="flex-1">
//         <p className="text-xs text-slate-400 mb-0.5">{label}</p>
//         <ValueComponent {...valueProps} className={`text-slate-100 font-medium ${valueProps.className || ''}`}>
//           {String(value)}
//         </ValueComponent>
//       </div>
//     </div>
//   );
// };

// // --- Main StudentProfile Component ---
// const StudentProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const fetchProfileData = async () => { // Made it callable for retry
//     try {
//       setLoading(true);
//       setError('');
//       // CONSISTENCY: Using 'user_token' as it's often a single token for the logged-in user.
//       // Adjust if your roles truly have separate tokens named 'student_token', 'alumni_token'.
//       const role = localStorage.getItem('role');
//         const token =
//           role === 'student'
//             ? localStorage.getItem('student_token')
//             : role === 'alumni'
//             ? localStorage.getItem('alumni_token')
//             : role === 'admin'
//             ? localStorage.getItem('admin_token')
//             : null;
//        // Still useful for UI tweaks if needed

//       if (!token) {
//         navigate('/login'); // Redirect if no token
//         return;
//       }

//       // Ensure the endpoint is correct for the logged-in user type
//       // For simplicity, assuming a single /profile endpoint that uses the token to identify the user
//       const res = await fetch('http://localhost:5000/api/users/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (res.status === 401) {
//         // Token might be invalid or expired
//         localStorage.removeItem('user_token'); // Clear potentially bad token
//         localStorage.removeItem('userId');
//         localStorage.removeItem('role');
//         navigate('/login');
//         return;
//       }

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({ message: 'Failed to parse server error response.' }));
//         throw new Error(errorData.message || `Failed to fetch profile. Status: ${res.status}`);
//       }

//       const data = await res.json();
//       setProfile(data);
//     } catch (err) {
//       console.error('Error fetching profile:', err);
//       setError(err.message || 'Failed to load profile. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchProfileData();
//   }, [navigate]); // navigate dependency is fine, but fetchProfileData is now stable

//   if (loading) {
//     return <LoadingState />;
//   }

//   if (error || !profile) { // Added !profile check for safety
//     return <ErrorState message={error || "Profile data could not be loaded."} onRetry={fetchProfileData} />;
//   }

//   // Determine the update profile link based on role
//   const updateProfileLink = profile.role === 'student' ? '/student-dashboard/updateprofile' :
//                             profile.role === 'alumni' ? '/alumni-dashboard/updateprofile' : '/login'; // Fallback

//   return (
//     <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
//       <header className="mb-10 text-center">
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
//             My Profile
//           </span>
//         </h1>
//         <p className="mt-3 text-lg text-blue-200 max-w-2xl mx-auto">
//           View and manage your personal and professional information.
//         </p>
//       </header>

//       <div className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-slate-700/60">
//         {/* Profile Header Section */}
//         <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-800 to-slate-800/80 border-b border-slate-700/50">
//           <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <div className="relative group">
//               <img
//                 src={profile.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName)}&background=random&color=fff&size=128&font-size=0.33&bold=true`}
//                 alt={`${profile.fullName}'s profile`}
//                 className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-purple-500/50 shadow-lg"
//               />
//               {/* Optional: Edit profile picture button on hover
//               <Link
//                 to={updateProfileLink} // Or a specific link to update picture
//                 className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
//                 aria-label="Change profile picture"
//               >
//                 <Edit3 size={24} className="text-white" />
//               </Link> */}
//             </div>
//             <div className="text-center sm:text-left">
//               <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
//                 {profile.fullName || 'User Name'}
//               </h2>
//               <p className="text-md text-purple-300 mt-1">
//                 {profile.email || 'Email not provided'}
//               </p>
//               {/* Optional: Role display */}
//               <span className="mt-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-600/30 text-purple-300 capitalize">
//                 {profile.role || 'Member'}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Profile Details Section */}
//         <div className="p-6 sm:p-8">
//           <h3 className="text-xl font-semibold text-slate-100 mb-4 border-b border-slate-700 pb-2">
//             Personal Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//             <ProfileDetailItem icon={Users} label="Gender" value={profile.gender} />
//             {profile.dateOfBirth && <ProfileDetailItem icon={Cake} label="Date of Birth" value={new Date(profile.dateOfBirth).toLocaleDateString()} />}
//             {/* Add more personal details if available: Location, Phone, etc. */}
//             <ProfileDetailItem icon={MapPin} label="Location" value={profile.location || profile.city} />
//           </div>

//           { (profile.role === 'student' || profile.role === 'alumni') && (
//             <>
//               <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-700 pb-2">
//                 Academic Details
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//                 <ProfileDetailItem icon={University} label="College" value={profile.collegeName} />
//                 <ProfileDetailItem icon={GraduationCap} label="Major/Department" value={profile.department} />
//                 <ProfileDetailItem icon={CalendarCheck} label="Passout Year" value={profile.passoutYear} />
//                 {/* Add more academic details if available */}
//               </div>
//             </>
//           )}

//           { profile.role === 'alumni' && profile.currentRole && (
//              <>
//               <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-700 pb-2">
//                 Professional Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//                 <ProfileDetailItem icon={Briefcase} label="Current Role" value={profile.currentRole} />
//                 <ProfileDetailItem icon={Building} label="Company" value={profile.currentCompany} />
//                 {/* Add LinkedIn, Portfolio links etc. */}
//                 {profile.linkedinProfile && <ProfileDetailItem icon={Users} label="LinkedIn" value="View Profile" href={profile.linkedinProfile} iconColor="text-sky-400" />}
//               </div>
//             </>
//           )}

//           {/* Action Button */}
//           <div className="mt-10 text-center">
//             <Link
//               to={updateProfileLink}
//               className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-70"
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

// export default StudentProfile;


























// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   UserCircle, Mail, Edit3, Loader2, AlertTriangle, GraduationCap,
//   Briefcase, MapPin, Cake, Users, University, CalendarCheck,
//   // NEW ICONS
//   Github, Linkedin, Building 
// } from 'lucide-react';

// // --- Reusable UI Helper Components (Keep as is) ---
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

// // --- MODIFIED ProfileDetailItem ---
// const ProfileDetailItem = ({ icon: Icon, label, value, href, iconColor = "text-purple-400", alwaysShow = false }) => {
//   // If not alwaysShow and value is falsy (except 0 or false), don't render.
//   // If alwaysShow, it will render, and we'll display '-' if value is falsy.
//   if (!alwaysShow && !value && value !== 0 && value !== false) return null;

//   const displayValue = (value || value === 0 || value === false) ? String(value) : '—'; // Use em-dash for missing
  
//   const ValueComponent = href && value ? 'a' : 'span'; // Only make it a link if href AND value exist
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
//           {/* If it's a link but no value, show label. Otherwise, show displayValue. For "View Profile" scenario */}
//         </ValueComponent>
//       </div>
//     </div>
//   );
// };
// // --- End MODIFIED ProfileDetailItem ---


// // --- Main StudentProfile Component ---
// const StudentProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const fetchProfileData = async () => {
//     try {
//       setLoading(true); setError('');
//       const role = localStorage.getItem('role');
//       const token =
//           role === 'student' ? localStorage.getItem('student_token') :
//           role === 'alumni' ? localStorage.getItem('alumni_token') :
//           role === 'admin' ? localStorage.getItem('admin_token') : null;

//       if (!token) { navigate('/login'); return; }

//       const res = await fetch('http://localhost:5000/api/users/profile', {
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });

//       if (res.status === 401) {
//         localStorage.removeItem(role === 'student' ? 'student_token' : role === 'alumni' ? 'alumni_token' : 'admin_token');
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
//       console.error('Fetch Profile Error:', err);
//       setError(err.message || 'Failed to load profile.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfileData();
//   }, [navigate]);

//   if (loading) return <LoadingState />;
//   if (error || !profile) return <ErrorState message={error || "Profile data missing."} onRetry={fetchProfileData} />;

//   const updateProfileLink = profile.role === 'student' ? '/student-dashboard/updateprofile' :
//                             profile.role === 'alumni' ? '/alumni-dashboard/updateprofile' : '/login';

//   return (
//     <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
//       <header className="mb-10 text-center">
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
//             My Profile
//           </span>
//         </h1>
//         <p className="mt-3 text-lg text-blue-200 max-w-2xl mx-auto">
//           View and manage your personal and professional information.
//         </p>
//       </header>

//       <div className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-slate-700/60">
//         <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-800 to-slate-800/80 border-b border-slate-700/50">
//           <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <div className="relative group">
//               <img
//                 src={profile.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || 'User')}&background=random&color=fff&size=128&font-size=0.33&bold=true`}
//                 alt={`${profile.fullName || 'User'}'s profile`}
//                 className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-purple-500/50 shadow-lg"
//               />
//             </div>
//             <div className="text-center sm:text-left">
//               <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
//                 {profile.fullName || '—'}
//               </h2>
//               <p className="text-md text-purple-300 mt-1">
//                 {profile.email || '—'}
//               </p>
//               <span className="mt-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-600/30 text-purple-300 capitalize">
//                 {profile.role || 'Member'}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 sm:p-8">
//           <h3 className="text-xl font-semibold text-slate-100 mb-4 border-b border-slate-700 pb-2">
//             Personal Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//             {/* Using alwaysShow for fields you want to display even if empty, showing '—' */}
//             <ProfileDetailItem icon={Users} label="Gender" value={profile.gender} alwaysShow={true} />
//             {/* <ProfileDetailItem icon={Cake} label="Date of Birth" value={profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : null} alwaysShow={true} />
//             <ProfileDetailItem icon={MapPin} label="Location" value={profile.location || profile.city} alwaysShow={true} /> */}
//           </div>

//           {(profile.role === 'student' || profile.role === 'alumni') && (
//             <>
//               <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-700 pb-2">
//                 Academic Details
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//                 <ProfileDetailItem icon={University} label="College" value={profile.collegeName} alwaysShow={true} />
//                 {/* <ProfileDetailItem icon={GraduationCap} label="Major/Department" value={profile.department} alwaysShow={true} /> */}
//                 <ProfileDetailItem icon={CalendarCheck} label="Passout Year" value={profile.passoutYear} alwaysShow={true} />
//               </div>
//             </>
//           )}

//           {/* Modified Professional Information Section */}
//           <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-700 pb-2">
//             Professional & Social Profiles
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
//             {profile.role === 'alumni' && (
//                 <>
//                     <ProfileDetailItem icon={Briefcase} label="Current Role" value={profile.currentRole} alwaysShow={true} />
//                     <ProfileDetailItem icon={Building} label="Company" value={profile.currentCompany} alwaysShow={true} />
//                 </>
//             )}
//             <ProfileDetailItem 
//                 icon={Github} 
//                 label="GitHub" 
//                 value={profile.github ? "View Profile" : null} // Display "View Profile" if link exists
//                 href={profile.github} 
//                 iconColor="text-slate-300" 
//                 alwaysShow={true} // Always show the GitHub label
//             />
//             <ProfileDetailItem 
//                 icon={Linkedin} 
//                 label="LinkedIn" 
//                 value={profile.linkedIn ? "View Profile" : null} // Display "View Profile" if link exists
//                 href={profile.linkedIn} 
//                 iconColor="text-sky-400" 
//                 alwaysShow={true} // Always show the LinkedIn label
//             />
//           </div>
//           {/* End Modified Professional Information Section */}


//           <div className="mt-10 text-center">
//             <Link
//               to={updateProfileLink}
//               className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-70"
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

// export default StudentProfile;















































import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserCircle, Mail, Edit3, Loader2, AlertTriangle, GraduationCap,
  Briefcase, MapPin, Cake, Users, University, CalendarCheck,
  Github, Linkedin, Building 
} from 'lucide-react';

// --- Reusable UI Helper Components (Keep as is) ---
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
        <ValueComponent {...valueProps} className={`text-slate-100 font-medium break-words ${valueProps.className || ''} ${displayValue === '—' ? 'text-slate-500 italic' : ''}`}>
          {href && value && displayValue !== '—' ? `View ${label}` : displayValue}
        </ValueComponent>
      </div>
    </div>
  );
};
// --- End Reusable UI Helper Components ---


// --- NEW ProfilePageAvatar Component (for this page) ---
const ProfilePageAvatar = ({ src, name }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false); // Reset error if src changes
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

  // Define consistent classes for size and border, matching the original <img>
  const avatarSizeClasses = "w-28 h-28 sm:w-32 sm:h-32";
  const avatarBorderClasses = "border-4 border-purple-500/50"; // Student theme border
  const textClasses = "text-4xl sm:text-5xl"; // For initials

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
    // Fallback to div with initials
    // Consistent gradient background for student theme
    const gradientBg = "bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600"; 
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


// --- Main StudentProfile Component ---
const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    try {
      setLoading(true); setError('');
      const role = localStorage.getItem('role');
      // Ensure token logic is correct for fetching student's own profile
      const token = role === 'student' ? localStorage.getItem('student_token') : null; 
                 //  If alumni/admin can view student profiles, this needs adjustment
                 //  OR if it's always the logged-in user's profile, 'user_token' might be better

      if (!token) { // If no specific student token, maybe a general user is logged in
        const generalToken = localStorage.getItem('user_token'); // Check for a generic token
        if (!generalToken) {
            navigate('/login'); 
            return;
        }
        // If using a general token, the backend /api/users/profile must correctly identify the user
        // For now, assuming student_token is primary for a student viewing their own profile.
      }


      const res = await fetch('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token || localStorage.getItem('user_token')}`, 'Content-Type': 'application/json' },
      });

      if (res.status === 401) {
        localStorage.removeItem('student_token'); // Or the token key that was used
        localStorage.removeItem('user_token');
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
      console.error('Fetch Profile Error:', err);
      setError(err.message || 'Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []); // Removed navigate dependency if fetchProfileData is stable or doesn't use it directly

  if (loading) return <LoadingState />;
  if (error || !profile) return <ErrorState message={error || "Profile data missing or could not be loaded."} onRetry={fetchProfileData} />;

  // This link should ideally only be shown if the profile being viewed IS the logged-in user's profile.
  // If this page can show other users' profiles, this link logic needs to be more sophisticated.
  const updateProfileLink = (profile.role === 'student' && localStorage.getItem('userId') === profile._id) 
                            ? '/student-dashboard/updateprofile' 
                            : (profile.role === 'alumni' && localStorage.getItem('userId') === profile._id) 
                            ? '/alumni-dashboard/updateprofile' 
                            : null; // No update link if not their own profile or role unknown

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
            My Profile {/* Or {profile.fullName}'s Profile if viewing others */}
          </span>
        </h1>
        <p className="mt-3 text-lg text-blue-200 max-w-2xl mx-auto">
          View and manage your personal and professional information.
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
              />
              {/* === MODIFIED SECTION END === */}
            </div>
            <div className="text-center sm:text-left min-w-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight truncate">
                {profile.fullName || '—'}
              </h2>
              <p className="text-md text-purple-300 mt-1 truncate">
                {profile.email || '—'}
              </p>
              <span className="mt-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-600/30 text-purple-300 capitalize">
                {profile.role || 'Member'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-slate-100 mb-4 border-b border-slate-700 pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <ProfileDetailItem icon={Users} label="Gender" value={profile.gender} alwaysShow={true} />
            {/* Other personal items from schema (e.g. dateOfBirth, location) would go here if present */}
          </div>

          {/* Conditional Academic Details - show for student or alumni */}
          {(profile.role === 'student' || profile.role === 'alumni') && (
            <>
              <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-700 pb-2">
                Academic Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <ProfileDetailItem icon={University} label="College" value={profile.collegeName} alwaysShow={true} />
                <ProfileDetailItem icon={CalendarCheck} label="Passout Year" value={profile.passoutYear} alwaysShow={true} />
                {/* <ProfileDetailItem icon={GraduationCap} label="Major/Department" value={profile.department} alwaysShow={true} /> */}
              </div>
            </>
          )}

          {/* Conditional Professional Info for Alumni, Socials for all */}
          <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-700 pb-2">
            Professional & Social Profiles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            {profile.role === 'alumni' && (
                <>
                    {/* These fields are directly from your schema for alumni */}
                    <ProfileDetailItem icon={Building} label="Company" value={profile.company} alwaysShow={true} />
                    <ProfileDetailItem 
                        icon={Layers} // Using Layers for domains/skills
                        label="Domains/Skills" 
                        value={Array.isArray(profile.domains) && profile.domains.length > 0 ? profile.domains.join(', ') : null} 
                        alwaysShow={true} 
                        iconColor="text-yellow-400"
                    />
                    <ProfileDetailItem 
                        icon={Briefcase} 
                        label="Experience" 
                        value={profile.experience !== null && profile.experience !== undefined ? `${profile.experience} years` : null} 
                        alwaysShow={true} 
                        iconColor="text-green-400"
                    />
                </>
            )}
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
          
          {updateProfileLink && ( // Only show button if updateProfileLink is not null
            <div className="mt-10 text-center">
              <Link
                to={updateProfileLink}
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-70"
              >
                <Edit3 size={18} className="mr-2.5" />
                Update Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;