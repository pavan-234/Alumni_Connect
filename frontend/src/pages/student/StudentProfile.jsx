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


      const res = await fetch('https://alumni-connect-six.vercel.app/api/users/profile', {
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