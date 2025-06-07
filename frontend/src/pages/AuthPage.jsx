// // // src/pages/AuthPage.jsx (Create a new file for this combined page)
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate, Link as RouterLink } from 'react-router-dom'; // Renamed Link to avoid conflict
// // import axios from 'axios';
// // import {
// //   AiFillEye, AiFillEyeInvisible, AiOutlineMail, AiOutlineArrowLeft, AiOutlineUser,
// // } from 'react-icons/ai'; // From Login
// // import { RiLockPasswordLine } from 'react-icons/ri'; // From Login
// // import { FaSpinner } from 'react-icons/fa'; // From Login
// // import {
// //   User, AtSign, Lock, School, Github, Linkedin, Image as ImageIcon, Building,
// //   BadgeInfo, Briefcase, Calendar, ChevronLeft, UserCheck, Edit3, // Added Edit3 for consistency
// // } from 'lucide-react'; // From Register and common use
// // import { motion, AnimatePresence } from 'framer-motion';

// // // --- Reusable Styled Input Components (Adapted from your other pages) ---
// // const InputField = ({ icon: Icon, name, type = "text", placeholder, value, onChange, error, required = false, autoComplete = "off", ...props }) => (
// //   <div className="mb-5 relative">
// //     <label htmlFor={name} className="sr-only">{placeholder}</label>
// //     {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />}
// //     <input
// //       id={name} name={name} type={type} value={value || ''} onChange={onChange} placeholder={placeholder} required={required} autoComplete={autoComplete}
// //       className={`w-full py-3.5 rounded-lg bg-slate-800 border placeholder-slate-500 
// //                   text-white focus:ring-2 focus:border-transparent outline-none 
// //                   transition-all duration-300 shadow-sm 
// //                   ${Icon ? 'pl-12' : 'pl-4'} pr-4 
// //                   ${error ? 'border-red-500/70 focus:ring-red-500/50' : 'border-slate-700 focus:ring-purple-500/50'}`}
// //       {...props}
// //     />
// //     {error && <p className="mt-1.5 text-xs text-red-400 px-1">{error}</p>}
// //   </div>
// // );

// // const PasswordField = ({ icon: Icon, name, placeholder, value, onChange, error, required = false, showPassword, togglePasswordVisibility, passwordStrength, ...props }) => (
// //   <div className="mb-5 relative">
// //     <label htmlFor={name} className="sr-only">{placeholder}</label>
// //     {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />}
// //     <input
// //       id={name} name={name} type={showPassword ? 'text' : 'password'} value={value || ''} onChange={onChange} placeholder={placeholder} required={required} autoComplete="current-password"
// //       className={`w-full py-3.5 rounded-lg bg-slate-800 border placeholder-slate-500 
// //                   text-white focus:ring-2 focus:border-transparent outline-none 
// //                   transition-all duration-300 shadow-sm 
// //                   ${Icon ? 'pl-12' : 'pl-4'} pr-12 
// //                   ${error ? 'border-red-500/70 focus:ring-red-500/50' : 'border-slate-700 focus:ring-purple-500/50'}`}
// //       {...props}
// //     />
// //     <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-white transition">
// //       {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
// //     </button>
// //     {error && <p className="mt-1.5 text-xs text-red-400 px-1">{error}</p>}
// //     {value && passwordStrength && ( // Show strength only if there's a value and strength is calculated
// //       <p className={`text-xs mt-1.5 px-1 ${passwordStrength === 'Weak' ? 'text-red-400' : passwordStrength === 'Moderate' ? 'text-yellow-400' : 'text-green-400'}`}>
// //         Strength: {passwordStrength}
// //       </p>
// //     )}
// //   </div>
// // );

// // const SelectField = ({ icon: Icon, name, placeholder, value, onChange, error, options, required = false, ...props }) => (
// //   <div className="mb-5 relative">
// //     <label htmlFor={name} className="sr-only">{placeholder}</label>
// //     {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />}
// //     <select
// //       id={name} name={name} value={value || ''} onChange={onChange} required={required}
// //       className={`w-full py-3.5 rounded-lg bg-slate-800 border placeholder-slate-500 
// //                   text-white focus:ring-2 focus:border-transparent outline-none 
// //                   transition-all duration-300 shadow-sm appearance-none 
// //                   ${Icon ? 'pl-12' : 'pl-4'} pr-10 
// //                   ${error ? 'border-red-500/70 focus:ring-red-500/50' : 'border-slate-700 focus:ring-purple-500/50'} 
// //                   ${!value ? 'text-slate-500' : 'text-white'}`}
// //       {...props} >
// //       <option value="" disabled className="text-slate-500 bg-slate-800">{placeholder}</option>
// //       {options.map(opt => <option key={opt.value} value={opt.value} className="text-slate-800 bg-white">{opt.label}</option>)}
// //     </select>
// //     <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
// //     {error && <p className="mt-1.5 text-xs text-red-400 px-1">{error}</p>}
// //   </div>
// // );
// // // --- End Reusable UI Helper Components ---


// // // --- Animation Variants ---
// // const formVariants = {
// //   hidden: (direction) => ({
// //     x: direction === 'right' ? '100%' : '-100%',
// //     opacity: 0,
// //     scale: 0.95,
// //   }),
// //   visible: {
// //     x: 0,
// //     opacity: 1,
// //     scale: 1,
// //     transition: { type: 'spring', duration: 0.6, bounce: 0.3 },
// //   },
// //   exit: (direction) => ({
// //     x: direction === 'right' ? '-100%' : '100%',
// //     opacity: 0,
// //     scale: 0.95,
// //     transition: { type: 'spring', duration: 0.4, bounce: 0.2 },
// //   }),
// // };

// // const panelVariants = {
// //     initial: (isLoginView) => ({
// //         x: isLoginView ? 0 : '-100%',
// //     }),
// //     animate: (isLoginView) => ({
// //         x: isLoginView ? 0 : '-100%',
// //         transition: { type: 'spring', duration: 0.7, bounce: 0.2 }
// //     })
// // };


// // // --- Main Auth Page Component ---
// // const AuthPage = ({ initialMode = 'login' }) => {
// //   const navigate = useNavigate();
// //   const [isLoginView, setIsLoginView] = useState(initialMode === 'login');
// //   const [slideDirection, setSlideDirection] = useState('right');

// //   // Login State
// //   const [loginFormData, setLoginFormData] = useState(() => { /* ... same as your Login ... */ 
// //     const savedData = localStorage.getItem('loginFormData');
// //     return savedData ? JSON.parse(savedData) : { role: 'student', email: '', password: '', rememberMe: false };
// //   });
// //   const [loginLoading, setLoginLoading] = useState(false);
// //   const [loginError, setLoginError] = useState('');
// //   const [loginSuccess, setLoginSuccess] = useState('');
// //   const [showLoginPassword, setShowLoginPassword] = useState(false);
// //   const [loginPasswordStrength, setLoginPasswordStrength] = useState('');

// //   // Register State
// //   const [registerFormData, setRegisterFormData] = useState({ /* ... same as your Register ... */ 
// //     role: "student", fullName: "", gender: "", passoutYear: "", email: "", password: "",
// //     collegeName: "", profilePic: "", github: "", linkedIn: "", company: "", domains: "", experience: "",
// //   });
// //   const [registerLoading, setRegisterLoading] = useState(false);
// //   const [registerError, setRegisterError] = useState(''); // General error for register form
// //   const [registerFieldErrors, setRegisterFieldErrors] = useState({}); // Field-specific errors for register
// //   const [registerSuccess, setRegisterSuccess] = useState('');
// //   const [showRegisterPassword, setShowRegisterPassword] = useState(false);


// //   useEffect(() => { // For Login form 'remember me'
// //     if (loginFormData.rememberMe) localStorage.setItem('loginFormData', JSON.stringify(loginFormData));
// //     else localStorage.removeItem('loginFormData');
// //   }, [loginFormData]);

// //   const handleLoginChange = (e) => { /* ... same as your Login ... */ 
// //     const { name, value, type, checked } = e.target;
// //     setLoginFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
// //     if (name === 'password') {
// //         if (!value) setLoginPasswordStrength('');
// //         else if (value.length < 6) setLoginPasswordStrength('Weak');
// //         else if (value.length < 10 || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) setLoginPasswordStrength('Moderate');
// //         else setLoginPasswordStrength('Strong');
// //     }
// //   };
// //   const toggleLoginPasswordVisibility = () => setShowLoginPassword((prev) => !prev);
  
// //   const handleRegisterChange = (e) => { /* ... same as your Register ... */ 
// //     const { name, value } = e.target;
// //     setRegisterFormData((prev) => ({ ...prev, [name]: value }));
// //     if (registerFieldErrors[name]) setRegisterFieldErrors(prev => ({ ...prev, [name]: ''})); // Clear specific field error
// //     setRegisterError(''); // Clear general error
// //   };
// //   // Add toggle for register password if you add a show/hide button there too
// //   // const toggleRegisterPasswordVisibility = () => setShowRegisterPassword((prev) => !prev);


// //   const validateLoginForm = () => { /* ... same as your Login ... */ 
// //     if (!loginFormData.email.trim()) return 'Email is required.';
// //     if (!/\S+@\S+\.\S+/.test(loginFormData.email)) return 'Invalid email format.';
// //     if (!loginFormData.password.trim()) return 'Password is required.';
// //     if (loginFormData.password.length < 6) return 'Password must be at least 6 characters.';
// //     return '';
// //   };

// //   const validateRegisterForm = () => { // Add more specific validation for register as needed
// //     const errors = {};
// //     if (!registerFormData.fullName.trim()) errors.fullName = 'Full name is required.';
// //     if (!registerFormData.gender) errors.gender = 'Gender is required.';
// //     if (!registerFormData.passoutYear.trim()) errors.passoutYear = 'Passout year is required.';
// //     else if (!/^\d{4}$/.test(registerFormData.passoutYear) || parseInt(registerFormData.passoutYear) < 1950 || parseInt(registerFormData.passoutYear) > new Date().getFullYear() + 10) errors.passoutYear = 'Invalid passout year.';
// //     if (!registerFormData.email.trim()) errors.email = 'Email is required.';
// //     else if (!/\S+@\S+\.\S+/.test(registerFormData.email)) errors.email = 'Invalid email format.';
// //     if (!registerFormData.password.trim()) errors.password = 'Password is required.';
// //     else if (registerFormData.password.length < 6) errors.password = 'Password must be at least 6 characters.';
// //     if (!registerFormData.collegeName.trim()) errors.collegeName = 'College name is required.';
// //     if (registerFormData.profilePic && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(registerFormData.profilePic)) errors.profilePic = 'Profile picture must be a valid image URL.';
// //     if (registerFormData.github && !/^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(registerFormData.github)) errors.github = 'Invalid GitHub URL.';
// //     if (registerFormData.linkedIn && !/^https?:\/\/(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(registerFormData.linkedIn)) errors.linkedIn = 'Invalid LinkedIn URL.';

// //     if (registerFormData.role === "alumni") {
// //       if (!registerFormData.company?.trim()) errors.company = 'Company is required for alumni.';
// //       if (!registerFormData.domains?.trim()) errors.domains = 'Domains/Skills are required for alumni (comma-separated).';
// //       // Experience can be optional or validated if number
// //       if (registerFormData.experience && (isNaN(parseInt(registerFormData.experience)) || parseInt(registerFormData.experience) < 0)) errors.experience = 'Experience must be a valid number.';
// //     }
// //     setRegisterFieldErrors(errors);
// //     return Object.keys(errors).length === 0;
// //   };

// //   const isProfileIncomplete = (user) => { /* ... same as your Login ... */ 
// //     const requiredFields = ['fullName', 'gender', 'passoutYear', 'collegeName']; // Removed profilePic as it can be optional or URL
// //     for (const field of requiredFields) if (!user[field]) return true;
// //     if (user.role === 'alumni') if (!user.experience && user.experience !== 0 || !user.domains?.length || !user.company) return true;
// //     return false;
// //   };

// //   const handleLoginSubmit = async (e) => { /* ... same as your Login, ensure token names match ... */ 
// //     e.preventDefault(); setLoginError(''); setLoginSuccess('');
// //     const validationError = validateLoginForm();
// //     if (validationError) { setLoginError(validationError); return; }
// //     try {
// //       setLoginLoading(true);
// //       const res = await axios.post('http://localhost:5000/api/users/login', {
// //         role: loginFormData.role, email: loginFormData.email, password: loginFormData.password,
// //       });
// //       const { user, token } = res.data;
// //       localStorage.removeItem('student_token'); localStorage.removeItem('alumni_token'); localStorage.removeItem('admin_token');
// //       localStorage.setItem(`${user.role}_token`, token); // Use dynamic token name based on role
// //       localStorage.setItem('userId', user._id); localStorage.setItem('role', user.role);
// //       setLoginSuccess('Login successful! Redirecting...');
      
// //       // Redirect logic (same as your login)
// //       // Consider a slight delay for success message visibility before redirect
// //       setTimeout(() => {
// //         if (isProfileIncomplete(user)) {
// //             setLoginError('Please complete your profile.'); // This message might not be seen due to redirect
// //             navigate(user.role === 'alumni' ? '/alumni-dashboard/updateprofile' : '/student-dashboard/updateprofile');
// //         } else if (!user.isApproved) {
// //             setLoginError('Profile under review. Wait for admin approval.');
// //             // Maybe redirect to a "Pending Approval" page or just show message on login
// //             // For now, assuming they might still go to update profile or just see message.
// //         } else {
// //             if (user.role === 'admin') navigate('/admin');
// //             else if (user.role === 'alumni') navigate('/alumni-dashboard');
// //             else navigate('/student-dashboard');
// //         }
// //       }, 1000);

// //     } catch (error) {
// //       setLoginError(error.response?.data?.message || 'Login failed. Please try again.');
// //     } finally {
// //       setLoginLoading(false);
// //     }
// //   };

// //   const handleRegisterSubmit = async (e) => { /* ... same as your Register, but use axios for consistency ... */ 
// //     e.preventDefault(); setRegisterError(''); setRegisterSuccess(''); setRegisterFieldErrors({});
// //     if(!validateRegisterForm()) { setRegisterError("Please correct the form errors."); return; }
    
// //     const payload = { ...registerFormData };
// //     if (payload.role === "student") {
// //       delete payload.company; delete payload.domains; delete payload.experience;
// //     } else if (payload.role === "alumni") {
// //       payload.domains = payload.domains.split(",").map((domain) => domain.trim()).filter(d => d);
// //       if (payload.experience) payload.experience = Number(payload.experience); else delete payload.experience;
// //     }
// //      // Remove empty optional fields to avoid sending empty strings if not intended
// //     ['github', 'linkedIn', 'profilePic'].forEach(key => {
// //         if (!payload[key]?.trim()) delete payload[key];
// //     });


// //     try {
// //       setRegisterLoading(true);
// //       // Using axios for consistency with login
// //       const response = await axios.post("http://localhost:5000/api/users/signup", payload);
      
// //       setRegisterSuccess(response.data.message || "Registered successfully! Awaiting approval. Please login.");
// //       // Reset form or redirect to login after a delay
// //       setTimeout(() => {
// //         setIsLoginView(true); // Switch to login view
// //         setSlideDirection('left');
// //         setRegisterFormData({ role: "student", fullName: "", gender: "", passoutYear: "", email: "", password: "", collegeName: "", profilePic: "", github: "", linkedIn: "", company: "", domains: "", experience: ""});
// //         setRegisterSuccess('');
// //       }, 2000);

// //     } catch (error) {
// //       console.error("Registration error:", error.response?.data || error.message);
// //       setRegisterError(error.response?.data?.message || "Registration failed. Please try again.");
// //       if (error.response?.data?.errors) {
// //           setRegisterFieldErrors(error.response.data.errors);
// //       }
// //     } finally {
// //       setRegisterLoading(false);
// //     }
// //   };

// //   const switchToRegister = () => {
// //     setSlideDirection('right');
// //     setIsLoginView(false);
// //     setLoginError(''); setLoginSuccess(''); // Clear login messages
// //   };
// //   const switchToLogin = () => {
// //     setSlideDirection('left');
// //     setIsLoginView(true);
// //     setRegisterError(''); setRegisterSuccess(''); // Clear register messages
// //   };

// //   // Define common fields and alumni-specific fields for the register form
// //   const commonRegisterFields = [
// //     { name: "fullName", placeholder: "Full Name", icon: User, required: true },
// //     { name: "gender", placeholder: "Gender", type: "select", icon: BadgeInfo, required: true, options: [{value: "male", label: "Male"}, {value: "female", label: "Female"}, {value: "other", label: "Other"}] },
// //     { name: "passoutYear", placeholder: "Passout Year (YYYY)", type: "number", icon: Calendar, required: true },
// //     { name: "email", placeholder: "Email Address", type: "email", icon: AtSign, required: true, autoComplete: "username" },
// //     { name: "password", placeholder: "Password", type: "password", icon: Lock, required: true, autoComplete: "new-password" },
// //     { name: "collegeName", placeholder: "College Name", icon: School, required: true },
// //     { name: "profilePic", placeholder: "Profile Picture URL (Optional)", type: "url", icon: ImageIcon },
// //     { name: "github", placeholder: "GitHub URL (Optional)", type: "url", icon: Github },
// //     { name: "linkedIn", placeholder: "LinkedIn URL (Optional)", type: "url", icon: Linkedin },
// //   ];
// //   const alumniRegisterFields = [
// //     { name: "company", placeholder: "Current Company", icon: Building, required: true },
// //     { name: "domains", placeholder: "Domains/Skills (comma-separated)", icon: Layers, required: true }, // Using Layers icon
// //     { name: "experience", placeholder: "Years of Experience (Optional)", type: "number", icon: Briefcase },
// //   ];


// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 p-4 overflow-hidden">
// //       <div className="relative w-full max-w-4xl h-[700px] sm:h-[650px] md:h-[720px] bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-2xl flex overflow-hidden border border-slate-700/50">
        
// //         {/* Sliding Panels Container */}
// //         <motion.div 
// //             className="absolute top-0 left-0 w-[200%] h-full flex"
// //             custom={isLoginView}
// //             initial="initial"
// //             animate="animate"
// //             variants={panelVariants}
// //         >
// //             {/* Left Info Panel (shows when Login is active) */}
// //             <div className="w-1/2 h-full flex flex-col justify-center items-center p-8 sm:p-12 text-white bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-700">
// //                 <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3, duration:0.5}}>
// //                     <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">New Here?</h1>
// //                     <p className="text-md sm:text-lg mb-8 text-center text-purple-100">
// //                         Join our vibrant community! Create an account to connect with peers and alumni.
// //                     </p>
// //                     <button
// //                         onClick={switchToRegister}
// //                         className="w-full sm:w-auto px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
// //                     >
// //                         Create Account
// //                     </button>
// //                 </motion.div>
// //             </div>

// //             {/* Right Info Panel (shows when Register is active) */}
// //              <div className="w-1/2 h-full flex flex-col justify-center items-center p-8 sm:p-12 text-white bg-gradient-to-bl from-sky-600 via-cyan-700 to-teal-700">
// //                 <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3, duration:0.5}}>
// //                     <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">One of Us?</h1>
// //                     <p className="text-md sm:text-lg mb-8 text-center text-sky-100">
// //                         Already have an account? Log in to access your dashboard.
// //                     </p>
// //                     <button
// //                         onClick={switchToLogin}
// //                         className="w-full sm:w-auto px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
// //                     >
// //                         Sign In
// //                     </button>
// //                 </motion.div>
// //             </div>
// //         </motion.div>


// //         {/* Forms Area (fixed position, content slides within) */}
// //         <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-900 text-white shadow-2xl z-10">
// //           <AnimatePresence initial={false} custom={slideDirection}>
// //             {isLoginView ? (
// //               // --- Login Form ---
// //               <motion.div
// //                 key="login"
// //                 className="w-full h-full flex flex-col justify-center p-8 sm:p-12 overflow-y-auto custom-scrollbar"
// //                 custom="left" // Direction it slides from when appearing
// //                 variants={formVariants}
// //                 initial="hidden"
// //                 animate="visible"
// //                 exit="exit"
// //               >
// //                 <h2 className="text-3xl font-bold text-white mb-8 text-center">Login to Your Account</h2>
// //                 {loginError && <div className="p-3 mb-4 bg-red-500/20 text-red-300 rounded-md text-sm text-center">{loginError}</div>}
// //                 {loginSuccess && <div className="p-3 mb-4 bg-green-500/20 text-green-300 rounded-md text-sm text-center">{loginSuccess}</div>}
                
// //                 <form onSubmit={handleLoginSubmit} noValidate>
// //                   <SelectField name="role" placeholder="Select Role" icon={AiOutlineUser} value={loginFormData.role} onChange={handleLoginChange} options={[{value: 'student', label: 'Student'}, {value: 'alumni', label: 'Alumni'}, {value: 'admin', label: 'Admin'}]}/>
// //                   <InputField name="email" type="email" placeholder="Email Address" icon={AiOutlineMail} value={loginFormData.email} onChange={handleLoginChange} autoComplete="username"/>
// //                   <PasswordField name="password" placeholder="Password" icon={RiLockPasswordLine} value={loginFormData.password} onChange={handleLoginChange} showPassword={showLoginPassword} togglePasswordVisibility={toggleLoginPasswordVisibility} passwordStrength={loginPasswordStrength}/>
                  
// //                   <div className="flex items-center justify-between mb-6">
// //                     <label className="flex items-center text-sm text-slate-400">
// //                       <input type="checkbox" name="rememberMe" checked={loginFormData.rememberMe} onChange={handleLoginChange} className="h-4 w-4 text-purple-500 border-slate-600 rounded focus:ring-purple-500 mr-2 bg-slate-700"/>
// //                       Remember Me
// //                     </label>
// //                     <RouterLink to="/forgot-password" // Add this route if you have a forgot password page
// //                        className="text-sm text-purple-400 hover:text-purple-300 hover:underline">
// //                        Forgot Password?
// //                     </RouterLink>
// //                   </div>

// //                   <button type="submit" disabled={loginLoading} className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3.5 rounded-lg transition-all duration-300 disabled:opacity-70 transform hover:scale-105">
// //                     {loginLoading && <FaSpinner className="animate-spin" />} Log In
// //                   </button>
// //                 </form>
// //                 <p className="mt-8 text-center text-slate-400 text-sm">
// //                   New here?{' '}
// //                   <button onClick={switchToRegister} className="font-semibold text-purple-400 hover:text-purple-300 hover:underline">
// //                     Create an account
// //                   </button>
// //                 </p>
// //               </motion.div>
// //             ) : (
// //               // --- Register Form ---
// //               <motion.div
// //                 key="register"
// //                 className="w-full h-full flex flex-col justify-center p-8 sm:p-12 overflow-y-auto custom-scrollbar"
// //                 custom="right" // Direction it slides from when appearing
// //                 variants={formVariants}
// //                 initial="hidden"
// //                 animate="visible"
// //                 exit="exit"
// //               >
// //                 <h2 className="text-3xl font-bold text-white mb-8 text-center">Create Your Account</h2>
// //                 {registerError && <div className="p-3 mb-4 bg-red-500/20 text-red-300 rounded-md text-sm text-center">{registerError}</div>}
// //                 {registerSuccess && <div className="p-3 mb-4 bg-green-500/20 text-green-300 rounded-md text-sm text-center">{registerSuccess}</div>}

// //                 <form onSubmit={handleRegisterSubmit} noValidate>
// //                     <SelectField name="role" placeholder="I am a..." icon={UserCheck} value={registerFormData.role} onChange={handleRegisterChange} options={[{value: 'student', label: 'Student'}, {value: 'alumni', label: 'Alumni'}]} />
// //                     {commonRegisterFields.map(field => (
// //                         field.type === "select" ?
// //                         <SelectField key={field.name} {...field} value={registerFormData[field.name]} onChange={handleRegisterChange} error={registerFieldErrors[field.name]} />
// //                         : field.type === "password" ?
// //                         <PasswordField key={field.name} {...field} value={registerFormData[field.name]} onChange={handleRegisterChange} error={registerFieldErrors[field.name]} showPassword={showRegisterPassword} togglePasswordVisibility={() => setShowRegisterPassword(s => !s)} />
// //                         : <InputField key={field.name} {...field} value={registerFormData[field.name]} onChange={handleRegisterChange} error={registerFieldErrors[field.name]} />
// //                     ))}
// //                     {registerFormData.role === 'alumni' && alumniRegisterFields.map(field => (
// //                          field.type === "number" ?
// //                          <InputField key={field.name} {...field} type="number" value={registerFormData[field.name]} onChange={handleRegisterChange} error={registerFieldErrors[field.name]} />
// //                          : <InputField key={field.name} {...field} value={registerFormData[field.name]} onChange={handleRegisterChange} error={registerFieldErrors[field.name]} />
// //                     ))}
                 
// //                   <button type="submit" disabled={registerLoading} className="w-full mt-2 flex justify-center items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-semibold py-3.5 rounded-lg transition-all duration-300 disabled:opacity-70 transform hover:scale-105">
// //                     {registerLoading && <FaSpinner className="animate-spin" />} Register
// //                   </button>
// //                 </form>
// //                 <p className="mt-8 text-center text-slate-400 text-sm">
// //                   Already have an account?{' '}
// //                   <button onClick={switchToLogin} className="font-semibold text-sky-400 hover:text-sky-300 hover:underline">
// //                     Sign In
// //                   </button>
// //                 </p>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AuthPage;




















// // src/pages/AuthPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link as RouterLink } from 'react-router-dom';
// import axios from 'axios';
// import {
//   AiFillEye, AiFillEyeInvisible, AiOutlineMail, AiOutlineUser,
// } from 'react-icons/ai'; // From Login
// import { RiLockPasswordLine } from 'react-icons/ri'; // From Login
// import { FaSpinner } from 'react-icons/fa'; // From Login
// import {
//   User, AtSign, Lock, School, Github, Linkedin, Image as ImageIcon, Building,
//   BadgeInfo, Briefcase, Calendar, UserCheck, Edit3, ChevronDown, Layers, // Added ChevronDown, Layers
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// // --- Reusable Styled Input Components ---
// const InputField = ({ icon: Icon, name, type = "text", placeholder, value, onChange, error, required = false, autoComplete = "off", ...props }) => (
//   <div className="mb-5 relative">
//     <label htmlFor={name} className="sr-only">{placeholder}</label>
//     {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />}
//     <input
//       id={name} name={name} type={type} value={value || ''} onChange={onChange} placeholder={placeholder} required={required} autoComplete={autoComplete}
//       className={`w-full py-3.5 rounded-lg bg-slate-800 border placeholder-slate-500 
//                   text-white focus:ring-2 focus:border-transparent outline-none 
//                   transition-all duration-300 shadow-sm 
//                   ${Icon ? 'pl-12' : 'pl-4'} pr-4 
//                   ${error ? 'border-red-500/70 focus:ring-red-500/50' : 'border-slate-700 focus:ring-purple-500/50'}`}
//       {...props}
//     />
//     {error && <p className="mt-1.5 text-xs text-red-400 px-1">{error}</p>}
//   </div>
// );

// const PasswordField = ({ icon: Icon, name, placeholder, value, onChange, error, required = false, showPassword, togglePasswordVisibility, passwordStrength, ...props }) => (
//   <div className="mb-5 relative">
//     <label htmlFor={name} className="sr-only">{placeholder}</label>
//     {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />}
//     <input
//       id={name} name={name} type={showPassword ? 'text' : 'password'} value={value || ''} onChange={onChange} placeholder={placeholder} required={required} autoComplete="current-password"
//       className={`w-full py-3.5 rounded-lg bg-slate-800 border placeholder-slate-500 
//                   text-white focus:ring-2 focus:border-transparent outline-none 
//                   transition-all duration-300 shadow-sm 
//                   ${Icon ? 'pl-12' : 'pl-4'} pr-12 
//                   ${error ? 'border-red-500/70 focus:ring-red-500/50' : 'border-slate-700 focus:ring-purple-500/50'}`}
//       {...props}
//     />
//     <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-white transition">
//       {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
//     </button>
//     {error && <p className="mt-1.5 text-xs text-red-400 px-1">{error}</p>}
//     {value && passwordStrength && (
//       <p className={`text-xs mt-1.5 px-1 ${passwordStrength === 'Weak' ? 'text-red-400' : passwordStrength === 'Moderate' ? 'text-yellow-400' : 'text-green-400'}`}>
//         Strength: {passwordStrength}
//       </p>
//     )}
//   </div>
// );

// const SelectField = ({ icon: Icon, name, placeholder, value, onChange, error, options, required = false, ...props }) => (
//   <div className="mb-5 relative">
//     <label htmlFor={name} className="sr-only">{placeholder}</label>
//     {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />}
//     <select
//       id={name} name={name} value={value || ''} onChange={onChange} required={required}
//       className={`w-full py-3.5 rounded-lg bg-slate-800 border placeholder-slate-500 
//                   text-white focus:ring-2 focus:border-transparent outline-none 
//                   transition-all duration-300 shadow-sm appearance-none 
//                   ${Icon ? 'pl-12' : 'pl-4'} pr-10 
//                   ${error ? 'border-red-500/70 focus:ring-red-500/50' : 'border-slate-700 focus:ring-purple-500/50'} 
//                   ${!value ? 'text-slate-500' : 'text-white'}`}
//       {...props} >
//       <option value="" disabled className="text-slate-500 bg-slate-800">{placeholder}</option>
//       {options.map(opt => <option key={opt.value} value={opt.value} className="text-slate-800 bg-white">{opt.label}</option>)}
//     </select>
//     <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
//     {error && <p className="mt-1.5 text-xs text-red-400 px-1">{error}</p>}
//   </div>
// );
// // --- End Reusable UI Helper Components ---


// // --- Animation Variants ---
// const formVariants = {
//   hidden: (direction) => ({
//     x: direction === 'right' ? '100%' : '-100%',
//     opacity: 0,
//     scale: 0.95,
//   }),
//   visible: {
//     x: 0,
//     opacity: 1,
//     scale: 1,
//     transition: { type: 'spring', duration: 0.6, bounce: 0.3 },
//   },
//   exit: (direction) => ({
//     x: direction === 'right' ? '-100%' : '100%',
//     opacity: 0,
//     scale: 0.95,
//     transition: { type: 'spring', duration: 0.4, bounce: 0.2 },
//   }),
// };

// const panelVariants = {
//     initial: (isLoginView) => ({
//         x: isLoginView ? 0 : '-100%', // if login view, info panel is on right (so form is on left)
//     }),
//     animate: (isLoginView) => ({
//         x: isLoginView ? 0 : '-100%', // if register view, info panel on left (so form is on right)
//         transition: { type: 'spring', duration: 0.7, bounce: 0.2 }
//     })
// };

// const AuthPage = ({ initialMode = 'login', initialRole = 'student' }) => {
//   const navigate = useNavigate();
//   const [isLoginView, setIsLoginView] = useState(initialMode === 'login');
//   const [slideDirection, setSlideDirection] = useState(initialMode === 'login' ? 'left' : 'right');

//   // Login State
//   const [loginFormData, setLoginFormData] = useState(() => { 
//     const savedData = localStorage.getItem('loginFormData');
//     return savedData ? JSON.parse(savedData) : { role: 'student', email: '', password: '', rememberMe: false };
//   });
//   const [loginLoading, setLoginLoading] = useState(false);
//   const [loginError, setLoginError] = useState('');
//   const [loginSuccess, setLoginSuccess] = useState('');
//   const [showLoginPassword, setShowLoginPassword] = useState(false);
//   const [loginPasswordStrength, setLoginPasswordStrength] = useState('');

//   // Register State
//   const [registerFormData, setRegisterFormData] = useState({ 
//     role: initialMode === 'register' ? initialRole : "student", 
//     fullName: "", gender: "", passoutYear: "", email: "", password: "",
//     collegeName: "", profilePic: "", github: "", linkedIn: "", 
//     company: "", domains: "", experience: "",
//   });
//   const [registerLoading, setRegisterLoading] = useState(false);
//   const [registerError, setRegisterError] = useState('');
//   const [registerFieldErrors, setRegisterFieldErrors] = useState({});
//   const [registerSuccess, setRegisterSuccess] = useState('');
//   const [showRegisterPassword, setShowRegisterPassword] = useState(false);


//   useEffect(() => {
//     if (loginFormData.rememberMe) localStorage.setItem('loginFormData', JSON.stringify(loginFormData));
//     else localStorage.removeItem('loginFormData');
//   }, [loginFormData]);

//   const handleLoginChange = (e) => { 
//     const { name, value, type, checked } = e.target;
//     setLoginFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//     if (name === 'password') {
//         if (!value) setLoginPasswordStrength('');
//         else if (value.length < 6) setLoginPasswordStrength('Weak');
//         else if (value.length < 10 || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) setLoginPasswordStrength('Moderate');
//         else setLoginPasswordStrength('Strong');
//     }
//     setLoginError(''); // Clear error on change
//   };
//   const toggleLoginPasswordVisibility = () => setShowLoginPassword((prev) => !prev);
  
//   const handleRegisterChange = (e) => { 
//     const { name, value } = e.target;
//     setRegisterFormData((prev) => ({ ...prev, [name]: value }));
//     if (registerFieldErrors[name]) setRegisterFieldErrors(prev => ({ ...prev, [name]: ''}));
//     setRegisterError(''); 
//   };
//   const toggleRegisterPasswordVisibility = () => setShowRegisterPassword(s => !s);


//   const validateLoginForm = () => { /* ... same ... */ 
//     if (!loginFormData.email.trim()) return 'Email is required.';
//     if (!/\S+@\S+\.\S+/.test(loginFormData.email)) return 'Invalid email format.';
//     if (!loginFormData.password.trim()) return 'Password is required.';
//     if (loginFormData.password.length < 6) return 'Password must be at least 6 characters.';
//     return '';
//   };

//   const validateRegisterForm = () => {
//     const errors = {};
//     if (!registerFormData.fullName.trim()) errors.fullName = 'Full name is required.';
//     if (!registerFormData.gender) errors.gender = 'Gender is required.';
//     if (!registerFormData.passoutYear.trim()) errors.passoutYear = 'Passout year is required.';
//     else if (!/^\d{4}$/.test(registerFormData.passoutYear) || parseInt(registerFormData.passoutYear) < 1950 || parseInt(registerFormData.passoutYear) > new Date().getFullYear() + 10) errors.passoutYear = 'Invalid passout year.';
//     if (!registerFormData.email.trim()) errors.email = 'Email is required.';
//     else if (!/\S+@\S+\.\S+/.test(registerFormData.email)) errors.email = 'Invalid email format.';
//     if (!registerFormData.password.trim()) errors.password = 'Password is required.';
//     else if (registerFormData.password.length < 6) errors.password = 'Password must be at least 6 characters.';
//     if (!registerFormData.collegeName.trim()) errors.collegeName = 'College name is required.';
//     if (registerFormData.profilePic && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(registerFormData.profilePic)) errors.profilePic = 'Profile picture must be a valid image URL.';
//     if (registerFormData.github && !/^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(registerFormData.github)) errors.github = 'Invalid GitHub URL.';
//     if (registerFormData.linkedIn && !/^https?:\/\/(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(registerFormData.linkedIn)) errors.linkedIn = 'Invalid LinkedIn URL.';

//     if (registerFormData.role === "alumni") {
//       if (!registerFormData.company?.trim()) errors.company = 'Company is required for alumni.';
//       if (!registerFormData.domains?.trim()) errors.domains = 'Domains/Skills are required (comma-separated).';
//       if (registerFormData.experience && (isNaN(parseInt(registerFormData.experience)) || parseInt(registerFormData.experience) < 0)) errors.experience = 'Experience must be a valid number.';
//     }
//     setRegisterFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const isProfileIncomplete = (user) => { 
//     const requiredFields = ['fullName', 'gender', 'passoutYear', 'collegeName']; 
//     for (const field of requiredFields) if (!user[field]) return true;
//     if (user.role === 'alumni') if ((!user.experience && user.experience !== 0) || !user.domains?.length || !user.company) return true;
//     return false;
//   };

//   const handleLoginSubmit = async (e) => { /* ... same, ensure token names in localStorage.setItem match ... */ 
//     e.preventDefault(); setLoginError(''); setLoginSuccess('');
//     const validationError = validateLoginForm();
//     if (validationError) { setLoginError(validationError); return; }
//     try {
//       setLoginLoading(true);
//       const res = await axios.post('http://localhost:5000/api/users/login', {
//         role: loginFormData.role, email: loginFormData.email, password: loginFormData.password,
//       });
//       const { user, token } = res.data;
//       localStorage.removeItem('student_token'); localStorage.removeItem('alumni_token'); localStorage.removeItem('admin_token');
//       localStorage.setItem(`${user.role}_token`, token); // Uses role from response to set specific token
//       localStorage.setItem('userId', user._id); localStorage.setItem('role', user.role);
//       setLoginSuccess('Login successful! Redirecting...');
      
//       setTimeout(() => {
//         if (isProfileIncomplete(user)) {
//             setLoginError('Please complete your profile.');
//             navigate(user.role === 'alumni' ? '/alumni-dashboard/updateprofile' : '/student-dashboard/updateprofile');
//         } else if (!user.isApproved) {
//             setLoginError('Your profile is under review. Please wait for admin approval.');
//             // No automatic redirect here, user sees message.
//         } else {
//             if (user.role === 'admin') navigate('/admin');
//             else if (user.role === 'alumni') navigate('/alumni-dashboard');
//             else navigate('/student-dashboard');
//         }
//       }, 1000);

//     } catch (error) {
//       setLoginError(error.response?.data?.message || 'Login failed. Check credentials or network.');
//     } finally {
//       setLoginLoading(false);
//     }
//   };

//   const handleRegisterSubmit = async (e) => { 
//     e.preventDefault(); setRegisterError(''); setRegisterSuccess(''); setRegisterFieldErrors({});
//     if(!validateRegisterForm()) { setRegisterError("Please correct the form errors."); return; }
    
//     const payload = { ...registerFormData };
//     if (payload.role === "student") {
//       delete payload.company; delete payload.domains; delete payload.experience;
//     } else if (payload.role === "alumni") {
//       payload.domains = payload.domains.split(",").map((domain) => domain.trim()).filter(d => d);
//       if (payload.experience) payload.experience = Number(payload.experience); else delete payload.experience;
//     }
//     ['github', 'linkedIn', 'profilePic'].forEach(key => { if (!payload[key]?.trim()) delete payload[key]; });

//     try {
//       setRegisterLoading(true);
//       const response = await axios.post("http://localhost:5000/api/users/signup", payload);
//       setRegisterSuccess(response.data.message || "Registered successfully! Awaiting approval. Please login.");
//       setTimeout(() => {
//         setIsLoginView(true); 
//         setSlideDirection('left'); // Prepare for login form to slide in from left
//         setRegisterFormData({ role: initialRole, fullName: "", gender: "", passoutYear: "", email: "", password: "", collegeName: "", profilePic: "", github: "", linkedIn: "", company: "", domains: "", experience: ""});
//         setRegisterSuccess('');
//       }, 2500);
//     } catch (error) {
//       setRegisterError(error.response?.data?.message || "Registration failed. Please try again.");
//       if (error.response?.data?.errors) setRegisterFieldErrors(error.response.data.errors);
//     } finally {
//       setRegisterLoading(false);
//     }
//   };

//   const switchToRegister = () => {
//     setSlideDirection('right'); // Register form slides in from right
//     setIsLoginView(false);
//     setLoginError(''); setLoginSuccess(''); 
//   };
//   const switchToLogin = () => {
//     setSlideDirection('left'); // Login form slides in from left
//     setIsLoginView(true);
//     setRegisterError(''); setRegisterSuccess(''); setRegisterFieldErrors({});
//   };

//   const commonRegisterFields = [
//     { name: "fullName", placeholder: "Full Name", icon: User, required: true },
//     { name: "gender", placeholder: "Select Gender", type: "select", icon: BadgeInfo, required: true, options: [{value: "male", label: "Male"}, {value: "female", label: "Female"}, {value: "other", label: "Other"}] },
//     { name: "passoutYear", placeholder: "Passout Year (YYYY)", type: "number", icon: Calendar, required: true },
//     { name: "email", placeholder: "Email Address", type: "email", icon: AtSign, required: true, autoComplete: "username" },
//     { name: "password", placeholder: "Create Password", type: "password", icon: Lock, required: true, autoComplete: "new-password" },
//     { name: "collegeName", placeholder: "College Name", icon: School, required: true },
//     { name: "profilePic", placeholder: "Profile Picture URL (Optional)", type: "url", icon: ImageIcon },
//     { name: "github", placeholder: "GitHub URL (Optional)", type: "url", icon: Github },
//     { name: "linkedIn", placeholder: "LinkedIn URL (Optional)", type: "url", icon: Linkedin },
//   ];
//   const alumniRegisterFields = [
//     { name: "company", placeholder: "Current Company", icon: Building, required: true },
//     { name: "domains", placeholder: "Domains/Skills (comma-separated)", icon: Layers, required: true }, 
//     { name: "experience", placeholder: "Years of Experience (Optional)", type: "number", icon: Briefcase },
//   ];


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 p-4 overflow-hidden">
//       <div className="relative w-full max-w-4xl h-[700px] sm:h-[680px] md:h-[750px] bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-2xl flex overflow-hidden border border-slate-700/50">
        
//         <motion.div 
//             className="absolute top-0 left-0 w-[200%] h-full flex"
//             custom={isLoginView}
//             initial="initial"
//             animate="animate"
//             variants={panelVariants}
//         >
//             <div className="w-1/2 h-full flex flex-col justify-center items-center p-8 sm:p-12 text-white bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-700">
//                 <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3, duration:0.5}} className="text-center">
//                     <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">New Here?</h1>
//                     <p className="text-md sm:text-lg mb-8 text-purple-100">
//                         Join our vibrant community! Create an account to connect with peers and alumni.
//                     </p>
//                     <button onClick={switchToRegister} className="w-auto px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
//                         Create Account
//                     </button>
//                 </motion.div>
//             </div>

//              <div className="w-1/2 h-full flex flex-col justify-center items-center p-8 sm:p-12 text-white bg-gradient-to-bl from-sky-600 via-cyan-700 to-teal-700">
//                 <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3, duration:0.5}} className="text-center">
//                     <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">One of Us?</h1>
//                     <p className="text-md sm:text-lg mb-8 text-sky-100">
//                         Already have an account? Log in to access your dashboard.
//                     </p>
//                     <button onClick={switchToLogin} className="w-auto px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
//                         Sign In
//                     </button>
//                 </motion.div>
//             </div>
//         </motion.div>


//         <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-900 text-white shadow-2xl z-10">
//           <AnimatePresence initial={false} custom={slideDirection}>
//             {isLoginView ? (
//               <motion.div key="login" className="w-full h-full flex flex-col justify-center p-6 sm:p-10 md:p-12 overflow-y-auto custom-scrollbar" custom="left" variants={formVariants} initial="hidden" animate="visible" exit="exit">
//                 <h2 className="text-3xl font-bold text-white mb-8 text-center">Login to Your Account</h2>
//                 {loginError && <div className="p-3 mb-4 bg-red-500/20 text-red-300 rounded-md text-sm text-center">{loginError}</div>}
//                 {loginSuccess && <div className="p-3 mb-4 bg-green-500/20 text-green-300 rounded-md text-sm text-center">{loginSuccess}</div>}
                
//                 <form onSubmit={handleLoginSubmit} noValidate>
//                   <SelectField name="role" placeholder="Select Role" icon={AiOutlineUser} value={loginFormData.role} onChange={handleLoginChange} options={[{value: 'student', label: 'Student'}, {value: 'alumni', label: 'Alumni'}, {value: 'admin', label: 'Admin'}]} required/>
//                   <InputField name="email" type="email" placeholder="Email Address" icon={AiOutlineMail} value={loginFormData.email} onChange={handleLoginChange} autoComplete="username" required/>
//                   <PasswordField name="password" placeholder="Password" icon={RiLockPasswordLine} value={loginFormData.password} onChange={handleLoginChange} showPassword={showLoginPassword} togglePasswordVisibility={toggleLoginPasswordVisibility} passwordStrength={loginPasswordStrength} required/>
                  
//                   <div className="flex items-center justify-between mb-6 mt-1">
//                     <label className="flex items-center text-sm text-slate-400 cursor-pointer">
//                       <input type="checkbox" name="rememberMe" checked={loginFormData.rememberMe} onChange={handleLoginChange} className="h-4 w-4 text-purple-500 border-slate-600 rounded focus:ring-purple-500 mr-2 bg-slate-700"/>
//                       Remember Me
//                     </label>
//                     <RouterLink to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 hover:underline">
//                        Forgot Password?
//                     </RouterLink>
//                   </div>

//                   <button type="submit" disabled={loginLoading} className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3.5 rounded-lg transition-all duration-300 disabled:opacity-70 transform hover:scale-105">
//                     {loginLoading && <FaSpinner className="animate-spin" />} Log In
//                   </button>
//                 </form>
//                 <p className="mt-8 text-center text-slate-400 text-sm">
//                   New here?{' '}
//                   <button onClick={switchToRegister} className="font-semibold text-purple-400 hover:text-purple-300 hover:underline">
//                     Create an account
//                   </button>
//                 </p>
//               </motion.div>
//             ) : (
//               <motion.div key="register" className="w-full h-full flex flex-col justify-center p-6 sm:p-10 md:p-12 overflow-y-auto custom-scrollbar" custom="right" variants={formVariants} initial="hidden" animate="visible" exit="exit">
//                 <h2 className="text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Create Your Account</h2>
//                 {registerError && <div className="p-3 mb-4 bg-red-500/20 text-red-300 rounded-md text-sm text-center">{registerError}</div>}
//                 {registerSuccess && <div className="p-3 mb-4 bg-green-500/20 text-green-300 rounded-md text-sm text-center">{registerSuccess}</div>}

//                 <form onSubmit={handleRegisterSubmit} noValidate className="space-y-1">
//                     <SelectField name="role" placeholder="I am a..." icon={UserCheck} value={registerFormData.role} onChange={handleRegisterChange} options={[{value: 'student', label: 'Student'}, {value: 'alumni', label: 'Alumni'}]} required/>
//                     {commonRegisterFields.map(field => (
//                         field.type === "select" ?
//                         <SelectField key={field.name} {...field} value={registerFormData[field.name]} onChange={handleRegisterChange} error={registerFieldErrors[field.name]} />
//                         : field.type === "password" ?
//                         <PasswordField key={field.name} {...field} value={registerFormData[field.name]} onChange={handleRegisterChange} error={registerFieldErrors[field.name]} showPassword={showRegisterPassword} togglePasswordVisibility={toggleRegisterPasswordVisibility} /> // Removed passwordStrength prop here
//                         : <InputField key={field.name} {...field} value={registerFormData[field.name]} onChange={handleRegisterChange} error={registerFieldErrors[field.name]} />
//                     ))}
//                     {registerFormData.role === 'alumni' && alumniRegisterFields.map(field => (
//                          field.type === "number" ?
//                          <InputField key={field.name} {...field} type="number" value={registerFormData[field.name]} onChange={handleRegisterChange} error={registerFieldErrors[field.name]} />
//                          : <InputField key={field.name} {...field} value={registerFormData[field.name]} onChange={handleRegisterChange} error={registerFieldErrors[field.name]} />
//                     ))}
                 
//                   <button type="submit" disabled={registerLoading} className="w-full mt-4 flex justify-center items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-semibold py-3.5 rounded-lg transition-all duration-300 disabled:opacity-70 transform hover:scale-105">
//                     {registerLoading && <FaSpinner className="animate-spin" />} Register
//                   </button>
//                 </form>
//                 <p className="mt-6 text-center text-slate-400 text-sm">
//                   Already have an account?{' '}
//                   <button onClick={switchToLogin} className="font-semibold text-sky-400 hover:text-sky-300 hover:underline">
//                     Sign In
//                   </button>
//                 </p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;