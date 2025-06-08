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