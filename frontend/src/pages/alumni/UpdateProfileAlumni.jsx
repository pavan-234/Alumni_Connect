// import React, { useState, useEffect } from 'react';

// const UpdateProfileAlumni = () => {
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const role = localStorage.getItem('role');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setError(null);
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
//         const data = await res.json();
//         if (res.ok) {
//           setFormData(data);
//         } else {
//           throw new Error(data.message || 'Failed to fetch profile');
//         }
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError('Error fetching profile. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);
//     try {
//       setSubmitLoading(true);
//       const res = await fetch('http://localhost:5000/api/users/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setSuccess('Profile updated successfully!');
//       } else {
//         throw new Error(data.message || 'Update failed');
//       }
//     } catch (err) {
//       console.error('Update error:', err);
//       setError('Error updating profile. Please try again.');
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
//           <p className="mt-2 text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
//         <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//           Update Profile ({role})
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="fullName"
//               id="fullName"
//               value={formData.fullName || ''}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               disabled={submitLoading}
//               aria-label="Full name"
//             />
//           </div>
//           <div>
//             <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
//               Gender
//             </label>
//             <select
//               name="gender"
//               id="gender"
//               value={formData.gender || ''}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               disabled={submitLoading}
//               aria-label="Select gender"
//             >
//               <option value="">Select</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//           </div>
//           <div>
//             <label htmlFor="passoutYear" className="block text-sm font-medium text-gray-700">
//               Passout Year
//             </label>
//             <input
//               type="number"
//               name="passoutYear"
//               id="passoutYear"
//               value={formData.passoutYear || ''}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               disabled={submitLoading}
//               aria-label="Passout year"
//             />
//           </div>
//           <div>
//             <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">
//               College Name
//             </label>
//             <input
//               type="text"
//               name="collegeName"
//               id="collegeName"
//               value={formData.collegeName || ''}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               disabled={submitLoading}
//               aria-label="College name"
//             />
//           </div>
//           <div>
//             <label htmlFor="github" className="block text-sm font-medium text-gray-700">
//               GitHub
//             </label>
//             <input
//               type="url"
//               name="github"
//               id="github"
//               value={formData.github || ''}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               disabled={submitLoading}
//               aria-label="GitHub profile URL"
//             />
//           </div>
//           <div>
//             <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">
//               LinkedIn
//             </label>
//             <input
//               type="url"
//               name="linkedIn"
//               id="linkedIn"
//               value={formData.linkedIn || ''}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               disabled={submitLoading}
//               aria-label="LinkedIn profile URL"
//             />
//           </div>
//           <div>
//             <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
//               Profile Picture URL
//             </label>
//             <input
//               type="url"
//               name="profilePic"
//               id="profilePic"
//               value={formData.profilePic || ''}
//               onChange={handleChange}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               required
//               disabled={submitLoading}
//               aria-label="Profile picture URL"
//             />
//           </div>
//           {role === 'alumni' && (
//             <div>
//               <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
//                 Experience
//               </label>
//               <input
//                 type="text"
//                 name="experience"
//                 id="experience"
//                 value={formData.experience || ''}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                 required
//                 disabled={submitLoading}
//                 aria-label="Professional experience"
//               />
//             </div>
//           )}
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
//             disabled={submitLoading}
//             aria-label="Save profile"
//           >
//             {submitLoading ? 'Saving...' : 'Save Profile'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfileAlumni;



























import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Assuming you'll stick with axios for consistency
import {
  User, Link2, Image as ImageIcon, Save, XCircle, Loader2, AlertTriangle,
  Users as GenderIcon, University, CalendarCheck, Briefcase, CheckCircle2,
  ChevronDown, Mail, Building, Layers, // Layers for Domains, Building for Company
} from 'lucide-react';

// --- Reusable UI Helper Components (from StudentUpdateProfile) ---
// IMPORTANT: These should ideally be in a shared components file and imported.
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
        <div className="flex items-start p-3.5 rounded-md bg-red-900/40 border border-red-700/50 text-red-300 text-sm my-4 animate-fadeInUp">
            <AlertTriangle size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-red-400" />
            <span>{message}</span>
        </div>
    );
};

const SuccessMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className="flex items-start p-3.5 rounded-md bg-green-900/40 border border-green-700/50 text-green-300 text-sm my-4 animate-fadeInUp">
            <CheckCircle2 size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-green-400" />
            <span>{message}</span>
        </div>
    );
};

const InputField = ({ icon: Icon, name, type = "text", placeholder, value, onChange, error, required = false, readOnly = false, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
      {placeholder} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />}
      <input id={name} name={name} type={type} value={value || ''} onChange={onChange} placeholder={`Enter ${placeholder.toLowerCase()}`} required={required} readOnly={readOnly}
        className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm ${Icon ? 'pl-12' : 'pl-4'} pr-4 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'} ${readOnly ? 'bg-slate-600/50 cursor-not-allowed' : ''}`}
        {...props} />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
);

const TextareaField = ({ icon: Icon, name, placeholder, value, onChange, error, required = false, rows = 3, ...props }) => ( // Default rows to 3 for shorter text areas
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
      {placeholder} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />}
      <textarea id={name} name={name} value={value || ''} onChange={onChange} placeholder={`Enter ${placeholder.toLowerCase()}`} required={required} rows={rows}
        className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm resize-y ${Icon ? 'pl-12' : 'pl-4'} pr-4 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'}`}
        {...props} />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
);

const SelectField = ({ icon: Icon, name, placeholder, value, onChange, error, options, required = false, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
      {placeholder} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />}
      <select id={name} name={name} value={value || ''} onChange={onChange} required={required}
        className={`w-full py-3 rounded-lg bg-slate-700/60 border placeholder-slate-400 text-white focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-sm appearance-none ${Icon ? 'pl-12' : 'pl-4'} pr-10 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-purple-500'} ${!value ? 'text-slate-400' : 'text-white'}`}
        {...props} >
        <option value="" disabled className="text-slate-500 bg-slate-700">{`Select ${placeholder}`}</option>
        {options.map(opt => <option key={opt.value} value={opt.value} className="text-black bg-white">{opt.label}</option>)}
      </select>
      <ChevronDown className="absolute right-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
);
// --- End Reusable UI Helper Components ---


const UpdateProfileAlumni = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    passoutYear: '',
    collegeName: '',
    github: '',
    linkedIn: '',
    // profilePic: '',
    company: '', // Alumni specific
    domains: '', // Will be string for input, converted to array on submit
    experience: '', // Alumni specific, number
    email: '', // To display, not edit
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState('');

  // Ensure this component is only for alumni
  const role = localStorage.getItem('role');
  const alumniToken = localStorage.getItem('alumni_token');

  useEffect(() => {
    if (role !== 'alumni' || !alumniToken) {
      console.warn("UpdateProfileAlumni: Not authenticated as alumni or token missing.");
      navigate('/login'); // Redirect if not an authenticated alumni
      return;
    }

    const fetchProfile = async () => {
      try {
        setError(''); setSuccess(''); setFieldErrors({});
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${alumniToken}` },
        });
        const data = res.data || {};
        setFormData({
          fullName: data.fullName || '',
          gender: data.gender || '',
          passoutYear: data.passoutYear || '',
          collegeName: data.collegeName || '',
          github: data.github || '',
          linkedIn: data.linkedIn || '',
          // profilePic: data.profilePic || '',
          company: data.company || '',
          domains: Array.isArray(data.domains) ? data.domains.join(', ') : '', // Convert array to comma-separated string for input
          experience: data.experience || '',
          email: data.email || '', // For display
        });
      } catch (err) {
        console.error('Fetch profile error (Alumni):', err.response || err);
        setError('Failed to load profile data. Please try again.');
        if (err.response?.status === 401) {
          localStorage.removeItem('alumni_token');
          localStorage.removeItem('userId');
          localStorage.removeItem('role');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate, alumniToken, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
        setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
    setError('');
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName?.trim()) errors.fullName = 'Full name is required.';
    if (!formData.gender) errors.gender = 'Gender is required.';
    if (formData.passoutYear === null || formData.passoutYear === undefined || String(formData.passoutYear).trim() === '') {
        errors.passoutYear = 'Passout year is required.';
    } else {
        const passoutYearStr = String(formData.passoutYear).trim();
        if (!/^\d{4}$/.test(passoutYearStr)) errors.passoutYear = 'Must be a 4-digit year.';
        else {
            const yearNum = parseInt(passoutYearStr, 10);
            if (yearNum < 1950 || yearNum > new Date().getFullYear() + 5) errors.passoutYear = `Enter a year between 1950 and ${new Date().getFullYear() + 5}.`;
        }
    }
    if (!formData.collegeName?.trim()) errors.collegeName = 'College name is required.';
    // Profile Pic URL validation (can be optional if not required by schema or if file upload is used)
    // if (formData.profilePic && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(formData.profilePic)) {
    //     errors.profilePic = 'Profile picture must be a valid image URL.';
    // }
    if (formData.github && !/^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(formData.github)) {
      errors.github = 'Invalid GitHub URL format.';
    }
    if (formData.linkedIn && !/^https?:\/\/(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(formData.linkedIn)) {
      errors.linkedIn = 'Invalid LinkedIn URL format.';
    }
    // Alumni specific fields based on schema
    if (!formData.company?.trim()) errors.company = 'Current company is required.';
    if (!formData.domains?.trim()) errors.domains = 'Domains/Skills are required (comma-separated).';
    if (formData.experience !== null && formData.experience !== undefined && String(formData.experience).trim() !== '' && (isNaN(parseInt(formData.experience)) || parseInt(formData.experience) < 0) ) {
        errors.experience = 'Experience must be a non-negative number (years).';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setFieldErrors({});
    if (!validateForm()) { setError("Please correct the errors highlighted."); return; }
    if (!alumniToken) { setError('Authentication failed. Please log in.'); return; }

    try {
      setSubmitting(true);
      const domainsArray = formData.domains.split(',').map(d => d.trim()).filter(d => d); // Convert comma-separated string to array
      
      const payloadToSubmit = {
        fullName: formData.fullName,
        gender: formData.gender,
        passoutYear: Number(formData.passoutYear), // Ensure number for backend
        collegeName: formData.collegeName,
        github: formData.github || undefined, // Send undefined if empty, so backend doesn't store empty string
        linkedIn: formData.linkedIn || undefined,
        // profilePic: formData.profilePic || undefined,
        company: formData.company,
        domains: domainsArray,
        experience: formData.experience ? Number(formData.experience) : undefined, // Ensure number or undefined
      };
      // Remove undefined fields to avoid issues with backend if it expects them to be absent not null/undefined
      Object.keys(payloadToSubmit).forEach(key => payloadToSubmit[key] === undefined && delete payloadToSubmit[key]);


      console.log("[AlumniUpdateProfile] Submitting payload:", payloadToSubmit);
      await axios.put('http://localhost:5000/api/users/profile', payloadToSubmit, {
        headers: { Authorization: `Bearer ${alumniToken}`, 'Content-Type': 'application/json' },
      });
      setSuccess('Profile updated successfully! Redirecting to your profile...');
      setTimeout(() => { navigate('/alumni-dashboard/profile'); }, 2500);
    } catch (err) {
      console.error('Alumni profile update error:', err.response || err);
      const serverError = err.response?.data?.message || 'Failed to update profile.';
      setError(serverError);
      if (err.response?.data?.errors && typeof err.response.data.errors === 'object') {
        setFieldErrors(prev => ({ ...prev, ...err.response.data.errors }));
      }
      if (err.response?.status === 401) { localStorage.removeItem('alumni_token'); navigate('/login'); }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState message="Loading alumni profile..." />;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-500"> {/* Alumni Theme Gradient */}
            Update Alumni Profile
          </span>
        </h1>
        <p className="mt-3 text-lg text-cyan-200 max-w-xl mx-auto">
          Keep your professional details current for the alumni network.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="bg-slate-800/70 backdrop-blur-md p-6 sm:p-10 rounded-xl shadow-2xl border border-slate-700/60" noValidate>
        <ErrorMessage message={error && !Object.values(fieldErrors).some(Boolean) ? error : null} />
        <SuccessMessage message={success} />
        
        {/* Display Email (Non-Editable) */}
        {formData.email && (
            <div className="mb-6">
                <InputField icon={Mail} name="emailDisplay" placeholder="Email (cannot be changed)" value={formData.email} readOnly={true} />
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
          <InputField icon={User} name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} error={fieldErrors.fullName} required />
          <SelectField icon={GenderIcon} name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} error={fieldErrors.gender} required
            options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}, {value: 'other', label: 'Other'}]}
          />
          <InputField icon={CalendarCheck} name="passoutYear" placeholder="Passout Year (YYYY)" value={formData.passoutYear} onChange={handleChange} error={fieldErrors.passoutYear} type="number" required />
          <InputField icon={University} name="collegeName" placeholder="College Name" value={formData.collegeName} onChange={handleChange} error={fieldErrors.collegeName} required />
          
          {/* <div className="md:col-span-2">
            <InputField icon={ImageIcon} name="profilePic" placeholder="Profile Picture URL (Optional)" value={formData.profilePic} onChange={handleChange} error={fieldErrors.profilePic} />
            {formData.profilePic && !fieldErrors.profilePic && (
                <div className="mt-3 text-center">
                    <img src={formData.profilePic} alt="Profile preview" className="w-24 h-24 rounded-full object-cover inline-block border-2 border-slate-600" 
                         onError={(e) => { e.target.style.display='none'; }} 
                         onLoad={(e) => { e.target.style.display='inline-block'; }}
                    />
                </div>
            )}
          </div> */}

          <InputField icon={Link2} name="github" placeholder="GitHub URL (Optional)" value={formData.github} onChange={handleChange} error={fieldErrors.github} />
          <InputField icon={Link2} name="linkedIn" placeholder="LinkedIn URL (Optional)" value={formData.linkedIn} onChange={handleChange} error={fieldErrors.linkedIn} />
          
          {/* Alumni Specific Fields */}
          <InputField icon={Building} name="company" placeholder="Current Company" value={formData.company} onChange={handleChange} error={fieldErrors.company} required />
          <InputField icon={Briefcase} name="experience" placeholder="Years of Experience (Number)" value={formData.experience} onChange={handleChange} error={fieldErrors.experience} type="number" />
          <div className="md:col-span-2">
            <TextareaField icon={Layers} name="domains" placeholder="Domains/Skills (comma-separated)" value={formData.domains} onChange={handleChange} error={fieldErrors.domains} rows={2} required />
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-end gap-4">
          <Link
            to="/alumni-dashboard/profile" // Link to alumni profile view
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-sm font-medium rounded-lg shadow-sm text-slate-200 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors"
          >
            <XCircle size={18} className="mr-2" />
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-600 hover:via-sky-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-70 disabled:opacity-60 disabled:cursor-not-allowed" // Alumni theme button
          >
            {submitting ? <Loader2 className="animate-spin h-5 w-5 mr-2.5" /> : <Save size={18} className="mr-2.5" />}
            {submitting ? 'Saving Profile...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileAlumni;