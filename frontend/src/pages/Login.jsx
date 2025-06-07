
// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { AiFillEye, AiFillEyeInvisible, AiOutlineMail, AiOutlineArrowLeft, AiOutlineUser } from 'react-icons/ai';
// import { RiLockPasswordLine } from 'react-icons/ri';
// import { motion } from 'framer-motion';
// import { FaSpinner } from 'react-icons/fa';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(() => {
//     const savedData = localStorage.getItem('loginFormData');
//     return savedData
//       ? JSON.parse(savedData)
//       : {
//           role: 'student',
//           email: '',
//           password: '',
//           rememberMe: false,
//         };
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState('');

//   useEffect(() => {
//     if (formData.rememberMe) {
//       localStorage.setItem('loginFormData', JSON.stringify(formData));
//     } else {
//       localStorage.removeItem('loginFormData');
//     }
//   }, [formData]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));

//     if (name === 'password') {
//       if (value.length < 6) {
//         setPasswordStrength('Weak');
//       } else if (
//         value.length < 10 ||
//         !/[A-Z]/.test(value) ||
//         !/[0-9]/.test(value)
//       ) {
//         setPasswordStrength('Moderate');
//       } else {
//         setPasswordStrength('Strong');
//       }
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const validateForm = () => {
//     if (!formData.email.trim()) return 'Email is required.';
//     if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email.';
//     if (!formData.password.trim()) return 'Password is required.';
//     if (formData.password.length < 6)
//       return 'Password must be at least 6 characters.';
//     return '';
//   };

//   const isProfileIncomplete = (user) => {
//     const requiredFields = ['fullName', 'gender', 'passoutYear', 'collegeName', 'profilePic'];
//     for (const field of requiredFields) {
//       if (!user[field]) return true;
//     }
//     if (user.role === 'alumni') {
//       if (!user.experience || !user.domains?.length) return true;
//     }
//     return false;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post('http://localhost:5000/api/users/login', {
//         role: formData.role,
//         email: formData.email,
//         password: formData.password,
//       });
//       const { user, token } = res.data;
      
//       localStorage.setItem('user_token', token);  
//       localStorage.setItem('userId', user._id);
//       localStorage.setItem('role', user.role);

//       setSuccess('Login successful!');

//       if (isProfileIncomplete(user)) {
//         setError('Please complete your profile before proceeding.');
//         navigate(
//           user.role === 'alumni'
//             ? '/alumni-dashboard/updateprofile'
//             : '/student-dashboard/updateprofile'
//         );
//       } else if (!user.isApproved) {
//         setError('Your profile is under review. Please wait for admin approval.');
//         navigate(
//           user.role === 'alumni'
//             ? '/alumni-dashboard/updateprofile'
//             : '/student-dashboard/updateprofile'
//         );
//       } else {
//         if (user.role === 'admin') {
//           navigate('/admin');
//         } else if (user.role === 'alumni') {
//           navigate('/alumni-dashboard');
//         } else {
//           navigate('/student-dashboard');
//         }
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError(error.response?.data?.message || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   return (
//     <motion.div
//       className="min-h-screen grid grid-cols-1 md:grid-cols-2"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       {/* Left Panel */}
//       <div className="bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white flex flex-col justify-center items-center px-10 py-16">
//         <motion.h1
//           className="text-4xl md:text-5xl font-extrabold mb-6 leading-snug"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           Welcome Back!
//         </motion.h1>
//         <motion.p
//           className="text-lg md:text-xl text-center opacity-90"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3 }}
//         >
//           Log in to access your dashboard and stay connected with your network.
//         </motion.p>
//         <div className="mt-12 w-64 h-64 bg-purple-700 rounded-lg flex items-center justify-center opacity-60">
//           <span className="italic">
//             <img
//               src="../../undraw_login_weas.png"
//               alt="Register Illustration"
//               className="w-64 h-64 opacity-80"
//             />
//           </span>
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="relative flex items-center justify-center p-8 bg-gray-900">
//         {/* Back Button */}
//         <Link
//           to="/"
//           className="absolute top-4 left-4 text-white hover:text-blue-400 transition-all flex items-center"
//         >
//           <AiOutlineArrowLeft className="mr-1" size={20} />
//           Back
//         </Link>

//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-bold text-white mb-6 text-center">Log In</h2>

//           {error && (
//             <motion.p
//               className="text-red-400 text-sm mb-4 text-center"
//               role="alert"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               {error}
//             </motion.p>
//           )}
//           {success && (
//             <motion.p
//               className="text-green-400 text-sm mb-4 text-center"
//               role="status"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               {success}
//             </motion.p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5" noValidate>
//             {/* Role Field with Icon inside Label */}
//             <div>
//               <label
//                 htmlFor="role"
//                 className="block text-sm font-medium text-white mb-1 flex items-center gap-2"
//               >
//                 <AiOutlineUser aria-hidden="true" />
//                 Role
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition bg-gray-800 text-white"
//                 required
//                 disabled={loading}
//                 aria-describedby="role-description"
//               >
//                 <option value="student">Student</option>
//                 <option value="alumni">Alumni</option>
//                 <option value="admin">Admin</option>
//               </select>
//               {/* <p id="role-description" className="text-xs text-gray-300 mt-1">
//                 Select your account type
//               </p> */}
//             </div>

//             {/* Email Field with Icon inside Label */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-white mb-1 flex items-center gap-2"
//               >
//                 <AiOutlineMail aria-hidden="true" />
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition bg-gray-800 text-white"
//                 placeholder="Enter your email"
//                 required
//                 disabled={loading}
//                 aria-describedby="email-description"
//               />
//               {/* <p id="email-description" className="text-xs text-gray-300 mt-1">
//                 We'll never share your email
//               </p> */}
//             </div>

//             {/* Password Field with Icon inside Label */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-white mb-1 flex items-center gap-2"
//               >
//                 <RiLockPasswordLine aria-hidden="true" />
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition bg-gray-800 text-white"
//                   placeholder="Enter your password"
//                   required
//                   disabled={loading}
//                   aria-describedby="password-description password-strength"
//                   autoComplete="current-password"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition"
//                   aria-label={showPassword ? 'Hide password' : 'Show password'}
//                   tabIndex={-1}
//                 >
//                   {showPassword ? (
//                     <AiFillEyeInvisible size={22} />
//                   ) : (
//                     <AiFillEye size={22} />
//                   )}
//                 </button>
//               </div>
//               {/* <p
//                 id="password-description"
//                 className="text-xs text-gray-300 mt-1"
//               >
//                 At least 6 characters
//               </p> */}
//               {formData.password && (
//                 <p
//                   id="password-strength"
//                   className={`text-xs mt-1 ${
//                     passwordStrength === 'Weak'
//                       ? 'text-red-400'
//                       : passwordStrength === 'Moderate'
//                       ? 'text-yellow-400'
//                       : 'text-green-400'
//                   }`}
//                 >
//                   Password strength: {passwordStrength}
//                 </p>
//               )}
//             </div>

//             {/* Remember Me Checkbox */}
//             {/* <div className="flex items-center">
//               <input
//                 id="rememberMe"
//                 name="rememberMe"
//                 type="checkbox"
//                 checked={formData.rememberMe}
//                 onChange={handleChange}
//                 className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 disabled={loading}
//               />
//               <label
//                 htmlFor="rememberMe"
//                 className="ml-2 block text-sm text-gray-300 select-none cursor-pointer"
//               >
//                 Remember me
//               </label>
//             </div> */}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
//             >
//               {loading && <FaSpinner className="animate-spin" />}
//               Log In
//             </button>
//           </form>

//           <p className="mt-6 text-center text-gray-400 text-sm">
//             Don't have an account?{' '}
//             <Link
//               to="/register/student"
//               className="text-blue-500 hover:underline focus:underline"
//             >
//               Register here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineMail,
  AiOutlineArrowLeft,
  AiOutlineUser,
} from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('loginFormData');
    return savedData
      ? JSON.parse(savedData)
      : {
          role: 'student',
          email: '',
          password: '',
          rememberMe: false,
        };
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  useEffect(() => {
    if (formData.rememberMe) {
      localStorage.setItem('loginFormData', JSON.stringify(formData));
    } else {
      localStorage.removeItem('loginFormData');
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'password') {
      if (value.length < 6) {
        setPasswordStrength('Weak');
      } else if (
        value.length < 10 ||
        !/[A-Z]/.test(value) ||
        !/[0-9]/.test(value)
      ) {
        setPasswordStrength('Moderate');
      } else {
        setPasswordStrength('Strong');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    if (!formData.email.trim()) return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email.';
    if (!formData.password.trim()) return 'Password is required.';
    if (formData.password.length < 6)
      return 'Password must be at least 6 characters.';
    return '';
  };

  const isProfileIncomplete = (user) => {
    const requiredFields = ['fullName', 'gender', 'passoutYear', 'collegeName', 'profilePic'];
    for (const field of requiredFields) {
      if (!user[field]) return true;
    }
    if (user.role === 'alumni') {
      if (!user.experience || !user.domains?.length) return true;
    }
    return false;
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
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/users/login', {
        role: formData.role,
        email: formData.email,
        password: formData.password,
      });

      const { user, token } = res.data;

      // Clear old tokens
      localStorage.removeItem('student_token');
      localStorage.removeItem('alumni_token');
      localStorage.removeItem('admin_token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');

      // Save new token and data
      if (user.role === 'student') {
        localStorage.setItem('student_token', token);
      } else if (user.role === 'alumni') {
        localStorage.setItem('alumni_token', token);
      } else if (user.role === 'admin') {
        localStorage.setItem('admin_token', token);
      }

      localStorage.setItem('userId', user._id);
      localStorage.setItem('role', user.role);
      setSuccess('Login successful!');

      // Redirect logic
      if (isProfileIncomplete(user)) {
        setError('Please complete your profile before proceeding.');
        navigate(
          user.role === 'alumni'
            ? '/alumni-dashboard/updateprofile'
            : '/student-dashboard/updateprofile'
        );
      } else if (!user.isApproved) {
        setError('Your profile is under review. Please wait for admin approval.');
        navigate(
          user.role === 'alumni'
            ? '/alumni-dashboard/updateprofile'
            : '/student-dashboard/updateprofile'
        );
      } else {
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'alumni') {
          navigate('/alumni-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-screen grid grid-cols-1 md:grid-cols-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Panel */}
      <div className="bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white flex flex-col justify-center items-center px-10 py-16">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-6 leading-snug"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome Back!
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-center opacity-90"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Log in to access your dashboard and stay connected with your network.
        </motion.p>
        <div className="mt-12 w-64 h-64 bg-purple-700 rounded-lg flex items-center justify-center opacity-60">
          <img
            src="../../undraw_login_weas.png"
            alt="Login Illustration"
            className="w-64 h-64 opacity-80"
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="relative flex items-center justify-center p-8 bg-gray-900">
        <Link
          to="/"
          className="absolute top-4 left-4 text-white hover:text-blue-400 transition-all flex items-center"
        >
          <AiOutlineArrowLeft className="mr-1" size={20} />
          Back
        </Link>

        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Log In</h2>

          {error && (
            <motion.p
              className="text-red-400 text-sm mb-4 text-center"
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              className="text-green-400 text-sm mb-4 text-center"
              role="status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {success}
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Role Select */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-white mb-1 flex items-center gap-2"
              >
                <AiOutlineUser /> Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-gray-800 text-white"
                required
                disabled={loading}
              >
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                {/* <option value="admin">Admin</option> */}
              </select>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-1 flex items-center gap-2"
              >
                <AiOutlineMail /> Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-800 text-white"
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-1 flex items-center gap-2"
              >
                <RiLockPasswordLine /> Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 pr-12 border border-gray-300 rounded-lg bg-gray-800 text-white"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={22} />
                  ) : (
                    <AiFillEye size={22} />
                  )}
                </button>
              </div>
              {/* {formData.password && (
                <p
                  className={`text-xs mt-1 ${
                    passwordStrength === 'Weak'
                      ? 'text-red-400'
                      : passwordStrength === 'Moderate'
                      ? 'text-yellow-400'
                      : 'text-green-400'
                  }`}
                >
                  Password strength: {passwordStrength}
                </p>
              )} */}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
            >
              {loading && <FaSpinner className="animate-spin" />}
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link
              to="/register/student"
              className="text-blue-500 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
