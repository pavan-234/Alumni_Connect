import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const role = localStorage.getItem('role');

     const getToken = () => {
    const role = localStorage.getItem('role');
        const token =
          role === 'student'
            ? localStorage.getItem('student_token')
            : role === 'alumni'
            ? localStorage.getItem('alumni_token')
            : role === 'admin'
            ? localStorage.getItem('admin_token')
            : null;

        return token;
    };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError('');
        setSuccess('');
        const token = getToken();

        if (!token) {
          navigate('/login');
          return;
        }

        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data || {};
        setFormData({
          fullName: data.fullName || '',
          gender: data.gender || '',
          passoutYear: data.passoutYear || '',
          collegeName: data.collegeName || '',
          github: data.github || '',
          linkedIn: data.linkedIn || '',
          profilePic: data.profilePic || '',
          experience: data.experience || '',
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load profile. Please log in again.');
        if (err.response?.status === 401) {
          localStorage.removeItem(`${role}_token`);
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName?.trim()) return 'Full name is required.';
    if (!formData.gender) return 'Gender is required.';
    if (!formData.passoutYear?.trim()) return 'Passout year is required.';
    if (!/^\d{4}$/.test(formData.passoutYear)) return 'Passout year must be a 4-digit year.';
    if (!formData.collegeName?.trim()) return 'College name is required.';
    if (!formData.profilePic?.trim()) return 'Profile picture URL is required.';
    if (formData.github && !/^https?:\/\/(www\.)?github\.com\/.+$/.test(formData.github)) {
      return 'Invalid GitHub URL.';
    }
    if (formData.linkedIn && !/^https?:\/\/(www\.)?linkedin\.com\/.+$/.test(formData.linkedIn)) {
      return 'Invalid LinkedIn URL.';
    }
    if (formData.profilePic && !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(formData.profilePic)) {
      return 'Profile picture must be an image URL.';
    }
    if (role === 'alumni' && !formData.experience?.trim()) {
      return 'Experience is required for alumni.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.put(
        'http://localhost:5000/api/users/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess('Profile updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      setError(err.response?.data?.message || 'Failed to update profile.');
      if (err.response?.status === 401) {
        localStorage.removeItem(`${role}_token`);
        navigate('/login');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Profile ({role})</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* input fields... no change */}
          {/* ...reuse your existing form inputs from above */}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Profile'}
            </button>
            <Link
              to={role === 'alumni' ? '/alumni-dashboard/profile' : '/student-dashboard/profile'}
              className="flex-1 text-center bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
