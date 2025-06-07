    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';

    const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState({ login: false, users: false, approving: {} });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Check if already authenticated
    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token) {
        setIsAuthenticated(true);
        fetchUnapprovedUsers(token);
        }
    }, []);

    const validateForm = () => {
        if (!email.trim()) return 'Email is required.';
        if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email.';
        if (!password.trim()) return 'Password is required.';
        return '';
    };

    const handleLogin = async () => {
        setError('');
        setSuccess('');

        const validationError = validateForm();
        if (validationError) {
        setError(validationError);
        return;
        }

        try {
        setLoading((prev) => ({ ...prev, login: true }));
        const res = await axios.post('http://localhost:5000/api/users/login', {
            email,
            password,
            role: 'admin',
        });
        const token = res.data.token; // Assuming the API returns { token }
        localStorage.setItem('admin_token', token);
        setIsAuthenticated(true);
        setEmail('');
        setPassword('');
        setSuccess('Login successful!');
        fetchUnapprovedUsers(token);
        } catch (err) {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
        setLoading((prev) => ({ ...prev, login: false }));
        }
    };

    const fetchUnapprovedUsers = async (token) => {
        try {
        setLoading((prev) => ({ ...prev, users: true }));
        setError('');
        const res = await axios.get('http://localhost:5000/api/users/admin/dashboard', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        setUsers(res.data.pendingUsers || []);
        } catch (err) {
        setError('Could not load users. Please try again.');
        if (err.response?.status === 401) {
            localStorage.removeItem('admin_token');
            setIsAuthenticated(false);
            navigate('/login');
        }
        } finally {
        setLoading((prev) => ({ ...prev, users: false }));
        }
    };

    const approveUser = async (userId) => {
        try {
        setLoading((prev) => ({ ...prev, approving: { ...prev.approving, [userId]: true } }));
        setError('');
        setSuccess('');
        const token = localStorage.getItem('admin_token');
        await axios.post(`http://localhost:5000/api/users/approve/${userId}`, {}, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        setSuccess('User approved successfully!');
        fetchUnapprovedUsers(token);
        } catch (err) {
        setError(err.response?.data?.message || 'Approval failed. Please try again.');
        } finally {
        setLoading((prev) => ({
            ...prev,
            approving: { ...prev.approving, [userId]: false },
        }));
        }
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('admin_token');
        setIsAuthenticated(false);
        setUsers([]);
        setSuccess('Logged out successfully!');
        navigate('/login');
        }
    };

    if (loading.login || loading.users) {
        return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col items-center">
            <svg
                className="animate-spin h-8 w-8 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                ></circle>
                <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
            <p className="mt-2 text-gray-600">
                {loading.login ? 'Logging in...' : 'Loading users...'}
            </p>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
        {!isAuthenticated ? (
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Admin Login
            </h2>
            {error && (
                <p className="text-red-600 text-sm mb-4" role="alert">
                {error}
                </p>
            )}
            {success && (
                <p className="text-green-600 text-sm mb-4" role="status">
                {success}
                </p>
            )}
            <form className="space-y-4">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="Enter your email"
                    required
                    aria-label="Admin email"
                    disabled={loading.login}
                />
                </div>
                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="Enter your password"
                    required
                    aria-label="Admin password"
                    disabled={loading.login}
                />
                </div>
                <button
                type="button"
                onClick={handleLogin}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                disabled={loading.login}
                aria-label="Log in as admin"
                >
                {loading.login ? 'Logging in...' : 'Log In'}
                </button>
            </form>
            </div>
        ) : (
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                Admin Panel - Pending Approvals
                </h2>
                <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                aria-label="Log out"
                >
                Logout
                </button>
            </div>
            {error && (
                <p className="text-red-600 text-sm mb-4" role="alert">
                {error}
                </p>
            )}
            {success && (
                <p className="text-green-600 text-sm mb-4" role="status">
                {success}
                </p>
            )}
            {users.length === 0 ? (
                <p className="text-gray-600">No users pending approval.</p>
            ) : (
                <div className="border border-gray-200 rounded-md p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-medium text-gray-700 border-b border-gray-200 pb-2 mb-2">
                    <span>Name</span>
                    <span>Role & Email</span>
                    <span className="text-right">Action</span>
                </div>
                {users.map((user) => (
                    <div
                    key={user._id}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 border-b border-gray-100 last:border-b-0"
                    >
                    <span className="text-gray-600">{user.fullName || 'Not provided'}</span>
                    <span className="text-gray-600">
                        {user.role} - {user.email}
                    </span>
                    <div className="text-right">
                        <button
                        onClick={() => approveUser(user._id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                        disabled={loading.approving[user._id]}
                        aria-label={`Approve user ${user.fullName}`}
                        >
                        {loading.approving[user._id] ? 'Approving...' : 'Approve'}
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
        )}
        </div>
    );
    };

    export default AdminPanel;