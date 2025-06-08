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