// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import {
//   AiFillEye,
//   AiFillEyeInvisible,
//   AiOutlineMail,
//   AiOutlineArrowLeft,
//   AiOutlineUser,
// } from 'react-icons/ai';
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
//       const res = await axios.post('https://alumni-connect-six.vercel.app/api/users/login', {
//         role: formData.role,
//         email: formData.email,
//         password: formData.password,
//       });

//       const { user, token } = res.data;

//       // Clear old tokens
//       localStorage.removeItem('student_token');
//       localStorage.removeItem('alumni_token');
//       localStorage.removeItem('admin_token');
//       localStorage.removeItem('userId');
//       localStorage.removeItem('role');

//       // Save new token and data
//       if (user.role === 'student') {
//         localStorage.setItem('student_token', token);
//       } else if (user.role === 'alumni') {
//         localStorage.setItem('alumni_token', token);
//       } else if (user.role === 'admin') {
//         localStorage.setItem('admin_token', token);
//       }

//       localStorage.setItem('userId', user._id);
//       localStorage.setItem('role', user.role);
//       setSuccess('Login successful!');

//       // Redirect logic
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
//           <img
//             src="../../undraw_login_weas.png"
//             alt="Login Illustration"
//             className="w-64 h-64 opacity-80"
//           />
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="relative flex items-center justify-center p-8 bg-gray-900">
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
//             {/* Role Select */}
//             <div>
//               <label
//                 htmlFor="role"
//                 className="block text-sm font-medium text-white mb-1 flex items-center gap-2"
//               >
//                 <AiOutlineUser /> Role
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-gray-800 text-white"
//                 required
//                 disabled={loading}
//               >
//                 <option value="student">Student</option>
//                 <option value="alumni">Alumni</option>
//                 {/* <option value="admin">Admin</option> */}
//               </select>
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-white mb-1 flex items-center gap-2"
//               >
//                 <AiOutlineMail /> Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg bg-gray-800 text-white"
//                 placeholder="Enter your email"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-white mb-1 flex items-center gap-2"
//               >
//                 <RiLockPasswordLine /> Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full p-3 pr-12 border border-gray-300 rounded-lg bg-gray-800 text-white"
//                   placeholder="Enter your password"
//                   required
//                   disabled={loading}
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition"
//                 >
//                   {showPassword ? (
//                     <AiFillEyeInvisible size={22} />
//                   ) : (
//                     <AiFillEye size={22} />
//                   )}
//                 </button>
//               </div>
//               {/* {formData.password && (
//                 <p
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
//               )} */}
//             </div>

//             {/* Submit */}
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
//               className="text-blue-500 hover:underline"
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
import { ClipboardCopy, Info } from 'lucide-react'; // Added ClipboardCopy and Info icons

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    // ... (your existing formData state)
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
  const [passwordStrength, setPasswordStrength] = useState(''); // Kept, but UI commented out

  // ... (useEffect for rememberMe remains the same) ...
  useEffect(() => {
    if (formData.rememberMe) {
      localStorage.setItem('loginFormData', JSON.stringify(formData));
    } else {
      localStorage.removeItem('loginFormData');
    }
  }, [formData]);


  const handleChange = (e) => { // ... (your existing handleChange) ...
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Password strength logic can be kept if desired, but UI part is commented out
    if (name === 'password' && value) {
      if (value.length < 6) setPasswordStrength('Weak');
      else if (value.length < 10 || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) setPasswordStrength('Moderate');
      else setPasswordStrength('Strong');
    } else if (name === 'password' && !value) {
        setPasswordStrength('');
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const validateForm = () => { /* ... (your existing validateForm) ... */ 
    if (!formData.email.trim()) return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email.';
    if (!formData.password.trim()) return 'Password is required.';
    // Password length validation might be handled by backend, but good for frontend too
    // if (formData.password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const isProfileIncomplete = (user) => { /* ... (your existing isProfileIncomplete) ... */ 
    const requiredFields = ['fullName', 'gender', 'passoutYear', 'collegeName']; // profilePic can be URL, often optional initially
    for (const field of requiredFields) {
      if (!user[field]) return true;
    }
    if (user.role === 'alumni') {
      // For alumni, experience might be a number (0 is valid), domains might be empty array initially
      if (!user.company || (user.experience === undefined || user.experience === null) || !user.domains) return true;
    }
    return false;
  };

  const handleSubmit = async (e) => { /* ... (your existing handleSubmit) ... */ 
    e.preventDefault(); setError(''); setSuccess('');
    const validationError = validateForm();
    if (validationError) { setError(validationError); return; }
    try {
      setLoading(true);
      const res = await axios.post('https://alumni-connect-six.vercel.app/api/users/login', {
        role: formData.role, email: formData.email, password: formData.password,
      });
      const { user, token } = res.data;
      localStorage.removeItem('student_token'); localStorage.removeItem('alumni_token'); localStorage.removeItem('admin_token');
      localStorage.removeItem('userId'); localStorage.removeItem('role');

      localStorage.setItem(`${user.role}_token`, token); // Store role-specific token
      localStorage.setItem('userId', user._id);
      localStorage.setItem('role', user.role);
      setSuccess('Login successful! Redirecting...');

      setTimeout(() => { // Added timeout for success message visibility
        if (isProfileIncomplete(user)) {
          setError('Please complete your profile before proceeding.');
          navigate(user.role === 'alumni' ? '/alumni-dashboard/updateprofile' : '/student-dashboard/updateprofile');
        } else if (!user.isApproved && user.role !== 'admin') { // Admin might not need approval
          setError('Your profile is under review. Please wait for admin approval.');
          // Optionally, navigate to a specific "pending approval" page or just show message
          // For now, just showing message, user stays on login or can try again later.
          // Or, if you want to let them update profile while pending:
          // navigate(user.role === 'alumni' ? '/alumni-dashboard/updateprofile' : '/student-dashboard/updateprofile');
        } else {
          if (user.role === 'admin') navigate('/admin');
          else if (user.role === 'alumni') navigate('/alumni-dashboard');
          else navigate('/student-dashboard');
        }
      }, 1000); // 1 second delay

    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Invalid credentials or server error.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = { /* ... (your existing containerVariants) ... */ };

  // Function to quickly fill form with demo credentials
  const handleDemoLogin = (role, email, password) => {
    setFormData({
        role: role,
        email: email,
        password: password,
        rememberMe: false // Or true if you want to persist demo creds too
    });
    // Optionally trigger password strength check if needed for UI
    if (password.length < 6) setPasswordStrength('Weak');
    else if (password.length < 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) setPasswordStrength('Moderate');
    else setPasswordStrength('Strong');
  };

  return (
    <motion.div
      className="min-h-screen grid grid-cols-1 md:grid-cols-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Panel (Informational) */}
      <div className="bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white flex flex-col justify-center items-center px-10 py-16 text-center">
        <motion.h1 /* ... */ > Welcome Back! </motion.h1>
        <motion.p /* ... */ > Log in to access your dashboard and stay connected with your network. </motion.p>
        <div className="mt-12 w-60 h-60 sm:w-64 sm:h-64"> {/* Adjusted image size */}
          <img
            src="/undraw_login_weas.png" // Assuming image is in public folder
            alt="Login Illustration"
            className="w-full h-full object-contain opacity-90"
          />
        </div>
      </div>

      {/* Right Panel (Login Form) */}
      <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 bg-gray-900 overflow-y-auto custom-scrollbar"> {/* Added flex-col and overflow */}
        <Link
          to="/"
          className="absolute top-6 left-6 text-slate-300 hover:text-sky-400 transition-colors flex items-center text-sm z-10"
        >
          <AiOutlineArrowLeft className="mr-1.5" size={18} />
          Back to Home
        </Link>

        <div className="w-full max-w-md py-8"> {/* Added py-8 for spacing */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
            Log In
          </h2>

          {error && ( <motion.p className="text-red-400 text-sm mb-4 p-3 bg-red-500/10 rounded-md text-center" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }}> {error} </motion.p> )}
          {success && ( <motion.p className="text-green-400 text-sm mb-4 p-3 bg-green-500/10 rounded-md text-center" role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }}> {success} </motion.p> )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Role Select */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-2"> <AiOutlineUser /> Role </label>
              <select id="role" name="role" value={formData.role} onChange={handleChange} className="mt-1 w-full p-3.5 border border-slate-700 rounded-lg bg-slate-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent" required disabled={loading}>
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                {/* Admin login typically separate or less prominent */}
                {/* <option value="admin">Admin</option> */}
              </select>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-2"> <AiOutlineMail /> Email Address </label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full p-3.5 border border-slate-700 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter your email" required disabled={loading} />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-2"> <RiLockPasswordLine /> Password </label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className="w-full p-3.5 pr-12 border border-slate-700 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter your password" required disabled={loading} />
                <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-white transition">
                  {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                </button>
              </div>
              {/* Password strength UI commented out for cleaner look, can be re-added */}
              {/* {formData.password && passwordStrength && ( <p className={`text-xs mt-1.5 ${passwordStrength === 'Weak' ? 'text-red-400' : passwordStrength === 'Moderate' ? 'text-yellow-400' : 'text-green-400'}`}> Password strength: {passwordStrength} </p> )} */}
            </div>
            
            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-slate-400 cursor-pointer">
                    <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="h-4 w-4 text-purple-500 border-slate-600 rounded focus:ring-purple-500 mr-2 bg-slate-700"/>
                    Remember Me
                </label>
                {/* <Link to="/forgot-password" className="text-purple-400 hover:text-purple-300 hover:underline">Forgot Password?</Link> */}
            </div>


            <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3.5 rounded-lg transition-all duration-300 disabled:opacity-70 transform hover:scale-105">
              {loading && <FaSpinner className="animate-spin" />}
              Log In
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-purple-400 hover:text-purple-300 hover:underline">
              Create one here
            </Link>
          </p>

          {/* --- DEMO CREDENTIALS SECTION --- */}
          <div className="mt-10 pt-6 border-t border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 text-center flex items-center justify-center gap-2">
                <Info size={20} className="text-sky-400"/> Demo Accounts
            </h3>
            <div className="space-y-4">
                {/* Student Demo */}
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <p className="text-sm font-medium text-sky-300 mb-1">Student Login:</p>
                    <p className="text-xs text-slate-400">Email: <span className="text-slate-200 font-mono">DemoStudent12@gmail.com</span></p>
                    <p className="text-xs text-slate-400">Password: <span className="text-slate-200 font-mono">Demo123</span></p>
                    <button 
                        onClick={() => handleDemoLogin('student', 'DemoStudent12@gmail.com', 'Demo123')}
                        className="mt-2 text-xs bg-sky-600/50 hover:bg-sky-500/60 text-sky-200 px-3 py-1 rounded-md transition-colors flex items-center gap-1.5"
                    >
                        <ClipboardCopy size={14}/> Use Credentials
                    </button>
                </div>
                {/* Alumni Demo */}
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <p className="text-sm font-medium text-purple-300 mb-1">Alumni Login:</p>
                    <p className="text-xs text-slate-400">Email: <span className="text-slate-200 font-mono">DemoAlumni12@gmail.com
</span></p>
                    <p className="text-xs text-slate-400">Password: <span className="text-slate-200 font-mono">Demo123</span></p>
                     <button 
                        onClick={() => handleDemoLogin('alumni', 'DemoAlumni12@gmail.com', 'Demo123')}
                        className="mt-2 text-xs bg-purple-600/50 hover:bg-purple-500/60 text-purple-200 px-3 py-1 rounded-md transition-colors flex items-center gap-1.5"
                    >
                        <ClipboardCopy size={14}/> Use Credentials
                    </button>
                </div>
            </div>
          </div>
          {/* --- END DEMO CREDENTIALS SECTION --- */}

        </div>
      </div>
    </motion.div>
  );
};

export default Login;