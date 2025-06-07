// import React from 'react';
// import { Link } from 'react-router-dom';

// const StudentHome = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
//           Welcome to the Student Portal
//         </h1>
//         <p className="text-lg text-gray-600 mb-8 text-center">
//           Connect with alumni, explore job opportunities, request mentorship, and build your network.
//         </p>
//         <div className="grid gap-4 sm:grid-cols-2">
//           <Link
//             to="/student-dashboard/jobs"
//             className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-md transition-colors"
//             aria-label="Explore Job Opportunities"
//           >
//             Explore Jobs
//           </Link>
//           <Link
//             to="/student-dashboard/mentorship"
//             className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-md transition-colors"
//             aria-label="Request Mentorship"
//           >
//             Request Mentorship
//           </Link>
//           <Link
//             to="/student-dashboard/search-alumni"
//             className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-md transition-colors"
//             aria-label="Search Alumni"
//           >
//             Search Alumni
//           </Link>
//           <Link
//             to="/student-dashboard/chat"
//             className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-md transition-colors"
//             aria-label="Chat with Alumni"
//           >
//             Chat with Alumni
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentHome;
import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, MessageCircle, ArrowRight } from 'lucide-react';

const StudentHome = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      {/* Background (Same as Home.jsx) */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/api/placeholder/1920/1080')`, // Replace with your actual student-themed background if different
            filter: 'blur(1px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/70 to-purple-900/80" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header (Styled like Home.jsx header) */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="inline-block transform transition-all duration-700 hover:scale-105">
              Student Dashboard
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Connect with alumni, explore opportunities, and build your professional network for future success.
          </p>
        </header>

        {/* Action Links (Styled like Home.jsx Feature Cards) */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <ActionFeatureCard
            to="/student-dashboard/jobs"
            icon={<Briefcase className="h-8 w-8" />}
            title="Job Board"
            description="Browse job opportunities and internships shared by our alumni network."
          />
          <ActionFeatureCard
            to="/student-dashboard/mentorship"
            icon={<GraduationCap className="h-8 w-8" />}
            title="Find Mentors"
            description="Connect with alumni mentors who can guide you in your career journey."
          />
          <ActionFeatureCard
            to="/student-dashboard/chat"
            icon={<MessageCircle className="h-8 w-8" />}
            title="Alumni Chat"
            description="Start conversations with alumni who share your interests and goals."
          />
        </div>

        {/* Footer Testimonial (Styled like Home.jsx testimonial) */}
        <footer className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <p className="text-blue-50 italic mb-4">
            "The guidance from alumni has been invaluable in shaping my career path and understanding the industry."
          </p>
          <p className="text-blue-200 font-medium">— Varanasi Pavan Kalyan</p>
        </footer>
      </div>
    </div>
  );
};

// This new component mimics Home.jsx's FeatureCard style but is a Link
const ActionFeatureCard = ({ to, icon, title, description }) => {
  return (
    <Link
      to={to}
      className="group block bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/20 hover:transform hover:scale-105 flex flex-col"
      // Added flex flex-col to help with layout if content heights vary.
      // Using 'h-full' on this Link and 'flex-grow' on description <p> could enforce same height cards,
      // but Home.jsx FeatureCards don't do that, so keeping it simpler for now.
    >
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 text-blue-200 mb-4 mx-auto">
        {icon} {/* Icon is passed with its size, e.g., <Briefcase className="h-8 w-8" /> */}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-blue-100 mb-4 flex-grow">{description}</p> {/* flex-grow helps if using flex-col and want to push arrow down */}
      <div className="mt-auto"> {/* This pushes the arrow to the bottom of the card if flex-col is used effectively */}
        <ArrowRight className="h-5 w-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 mx-auto" />
      </div>
    </Link>
  );
};

export default StudentHome;