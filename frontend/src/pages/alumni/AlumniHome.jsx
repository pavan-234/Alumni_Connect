// import React from 'react';

// const AlumniHome = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">
//           Welcome to the Alumni Dashboard
//         </h1>
//         <p className="text-lg text-gray-600">
//           Select an option from the navigation bar to get started.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AlumniHome;












import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, UserPlus, MessageCircle, ArrowRight, Search, Handshake, Edit } from 'lucide-react'; // Added relevant icons

// Re-using or re-defining ActionFeatureCard (same as in StudentHome)
// If StudentHome and AlumniHome are in the same project scope,
// you'd ideally move ActionFeatureCard to a shared components file.
const ActionFeatureCard = ({ to, icon, title, description, iconBgColor = "bg-blue-500/20", iconTextColor = "text-blue-200" }) => {
  return (
    <Link
      to={to}
      className="group block bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/20 hover:transform hover:scale-105 flex flex-col h-full" // Added h-full for equal height cards
    >
      <div className={`inline-flex items-center justify-center h-16 w-16 rounded-full ${iconBgColor} ${iconTextColor} mb-4 mx-auto`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-blue-100 mb-4 flex-grow">{description}</p>
      <div className="mt-auto">
        <ArrowRight className="h-5 w-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 mx-auto" />
      </div>
    </Link>
  );
};


const AlumniHome = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      {/* Background (Same as StudentHome.jsx / Home.jsx) */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            // Replace with your actual alumni-themed background or a general one
            backgroundImage: `url('/api/placeholder/1920/1080/000000/ EEEEEE?text=Alumni+Portal+Background&fontsize=100')`, 
            filter: 'blur(1px)',
          }}
        />
        {/* Consistent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-800/80 via-cyan-800/70 to-sky-800/80" /> 
        {/* Slightly different gradient for Alumni portal differentiation, if desired */}
        {/* Or keep the same: from-blue-900/80 via-indigo-900/70 to-purple-900/80 */}
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="inline-block transform transition-all duration-700 hover:scale-105">
              Alumni Dashboard
            </span>
          </h1>
          <p className="text-xl text-sky-100 max-w-2xl mx-auto leading-relaxed"> {/* Adjusted text color for contrast with new gradient */}
            Give back to your alma mater, connect with students, and expand your professional network.
          </p>
        </header>

        {/* Action Feature Cards for Alumni */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <ActionFeatureCard
            to="/alumni-dashboard/post-job" // Make sure this route exists
            icon={<Briefcase className="h-8 w-8" />}
            title="Post a Job"
            description="Share job or internship opportunities from your company with current students."
            iconBgColor="bg-sky-500/20" // Example of custom icon color
            iconTextColor="text-sky-200"
          />
          <ActionFeatureCard
            to="/alumni-dashboard/mentorship-requests" // Route for managing mentorship requests
            icon={<Handshake className="h-8 w-8" />} // Changed icon
            title="Mentorship Desk"
            description="View and respond to mentorship requests from students seeking guidance."
            iconBgColor="bg-green-500/20"
            iconTextColor="text-green-200"
          />
          <ActionFeatureCard
            to="/alumni-dashboard/search-students" // Route for searching students
            icon={<Search className="h-8 w-8" />}
            title="Find Students"
            description="Discover and connect with talented students for opportunities or networking."
            iconBgColor="bg-yellow-500/20"
            iconTextColor="text-yellow-200"
          />
          {/* You can add more cards if needed, or a fourth one to balance a 2x2 grid on some screens */}
           {/* <ActionFeatureCard
            to="/alumni-dashboard/profile" 
            icon={<Edit className="h-8 w-8" />}
            title="Update My Profile"
            description="Keep your professional and contact information up-to-date."
            iconBgColor="bg-pink-500/20"
            iconTextColor="text-pink-200"
          /> */}
        </div>

        {/* Footer Testimonial */}
        <footer className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <p className="text-sky-50 italic mb-4"> {/* Adjusted text color */}
            "Staying connected with my alma mater and mentoring students has been an incredibly rewarding experience."
          </p>
          <p className="text-sky-200 font-medium">— A Proud Alumnus</p> {/* Adjusted text color */}
        </footer>
      </div>
    </div>
  );
};

export default AlumniHome;