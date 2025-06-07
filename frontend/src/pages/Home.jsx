// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
//           Welcome to the Alumni Portal
//         </h1>
//         <p className="text-lg text-gray-600 mb-8 text-center">
//           Connect with your college community. Register as a student to explore opportunities or as an
//           alumni to mentor and share jobs.
//         </p>
//         <div className="grid gap-4 sm:grid-cols-3">
//           <Link
//             to="/register/student"
//             className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-md transition-colors"
//             aria-label="Register as a student"
//           >
//             Register as Student
//           </Link>
//           <Link
//             to="/register/alumni"
//             className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-md transition-colors"
//             aria-label="Register as an alumni"
//           >
//             Register as Alumni
//           </Link>
//           <Link
//             to="/login"
//             className="block text-center bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-3 rounded-md transition-colors"
//             aria-label="Log in to your account"
//           >
//             Log In
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, LogIn, ArrowRight, Building, Briefcase } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      {/* Background with overlay gradient */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/api/placeholder/1920/1080')`,
            filter: 'blur(1px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/70 to-purple-900/80" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="inline-block transform transition-all duration-700 hover:scale-105">
              Alumni Connect
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Your gateway to lifelong connections, mentorship opportunities, and professional growth with your college community.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <FeatureCard 
            icon={<Users className="h-8 w-8" />}
            title="Connect"
            description="Network with alumni and students from your college across the globe."
          />
          <FeatureCard 
            icon={<Building className="h-8 w-8" />}
            title="Grow"
            description="Access exclusive learning resources and development opportunities."
          />
          <FeatureCard 
            icon={<Briefcase className="h-8 w-8" />}
            title="Thrive"
            description="Discover job opportunities shared by alumni in your field."
          />
        </div>

        {/* Registration Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <RegistrationCard
            to="/register/student"
            title="Register as Student"
            icon={<GraduationCap className="h-6 w-6" />}
            description="Join as a current student to connect with alumni mentors and opportunities."
            bgColor="from-blue-600 to-blue-700"
            hoverColor="from-blue-500 to-blue-600"
          />
          <RegistrationCard
            to="/register/alumni"
            title="Register as Alumni"
            icon={<Users className="h-6 w-6" />}
            description="Register as an alumni to give back and stay connected with your alma mater."
            bgColor="from-purple-600 to-purple-700"
            hoverColor="from-purple-500 to-purple-600"
          />
          <RegistrationCard
            to="/login"
            title="Log In"
            icon={<LogIn className="h-6 w-6" />}
            description="Already have an account? Sign in to access your dashboard."
            bgColor="from-gray-700 to-gray-800"
            hoverColor="from-gray-600 to-gray-700"
            isLastCard={true}
          />
        </div>

        {/* Testimonial */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <p className="text-blue-50 italic mb-4">"The bond between alumni and students is the foundation of a thriving community and lifelong learning."</p>
          <p className="text-blue-200 font-medium">— Varanasi Pavan Kalyan</p>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/20 hover:transform hover:scale-105">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 text-blue-200 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </div>
  );
};

const RegistrationCard = ({ to, title, icon, description, bgColor, hoverColor, isLastCard }) => {
  return (
    <Link to={to} className={`block rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${isLastCard ? 'md:col-span-2 lg:col-span-1' : ''}`}>
      <div className={`h-full bg-gradient-to-br ${bgColor} hover:bg-gradient-to-br hover:${hoverColor} p-6`}>
        <div className="flex items-start justify-between">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/20 text-white mb-4">
            {icon}
          </div>
          <ArrowRight className="h-5 w-5 text-white/70" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2"> {title}</h3>
        <p className="text-blue-100 mb-4">{description}</p>
        <div className="mt-auto pt-4">
          <span className="inline-flex items-center text-sm font-medium text-white">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Home;