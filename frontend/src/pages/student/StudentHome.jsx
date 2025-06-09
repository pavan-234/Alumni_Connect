// // export default StudentHome;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Briefcase, GraduationCap, MessageCircle, ArrowRight } from 'lucide-react';

// const StudentHome = () => {
//   return (
//     <div className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
//       {/* Background (Same as Home.jsx) */}
//       <div className="absolute inset-0 overflow-hidden z-0">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: `url('/api/placeholder/1920/1080')`, // Replace with your actual student-themed background if different
//             filter: 'blur(1px)',
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/70 to-purple-900/80" />
//       </div>

//       <div className="relative z-10 w-full max-w-5xl">
//         {/* Header (Styled like Home.jsx header) */}
//         <header className="text-center mb-12">
//           <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
//             <span className="inline-block transform transition-all duration-700 hover:scale-105">
//               Student Dashboard
//             </span>
//           </h1>
//           <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
//             Connect with alumni, explore opportunities, and build your professional network for future success.
//           </p>
//         </header>

//         {/* Action Links (Styled like Home.jsx Feature Cards) */}
//         <div className="grid gap-8 md:grid-cols-3 mb-12">
//           <ActionFeatureCard
//             to="/student-dashboard/jobs"
//             icon={<Briefcase className="h-8 w-8" />}
//             title="Job Board"
//             description="Browse job opportunities and internships shared by our alumni network."
//           />
//           <ActionFeatureCard
//             to="/student-dashboard/mentorship"
//             icon={<GraduationCap className="h-8 w-8" />}
//             title="Find Mentors"
//             description="Connect with alumni mentors who can guide you in your career journey."
//           />
//           <ActionFeatureCard
//             to="/student-dashboard/chat"
//             icon={<MessageCircle className="h-8 w-8" />}
//             title="Alumni Chat"
//             description="Start conversations with alumni who share your interests and goals."
//           />
//         </div>

//         {/* Footer Testimonial (Styled like Home.jsx testimonial) */}
//         <footer className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
//           <p className="text-blue-50 italic mb-4">
//             "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."
//           </p>
//           <p className="text-blue-200 font-medium">— Brian Herbert</p>
//         </footer>
//       </div>
//     </div>
//   );
// };

// // This new component mimics Home.jsx's FeatureCard style but is a Link
// const ActionFeatureCard = ({ to, icon, title, description }) => {
//   return (
//     <Link
//       to={to}
//       className="group block bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/20 hover:transform hover:scale-105 flex flex-col"
//       // Added flex flex-col to help with layout if content heights vary.
//       // Using 'h-full' on this Link and 'flex-grow' on description <p> could enforce same height cards,
//       // but Home.jsx FeatureCards don't do that, so keeping it simpler for now.
//     >
//       <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 text-blue-200 mb-4 mx-auto">
//         {icon} {/* Icon is passed with its size, e.g., <Briefcase className="h-8 w-8" /> */}
//       </div>
//       <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
//       <p className="text-blue-100 mb-4 flex-grow">{description}</p> {/* flex-grow helps if using flex-col and want to push arrow down */}
//       <div className="mt-auto"> {/* This pushes the arrow to the bottom of the card if flex-col is used effectively */}
//         <ArrowRight className="h-5 w-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 mx-auto" />
//       </div>
//     </Link>
//   );
// };

// export default StudentHome;


























// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Briefcase, GraduationCap, MessageCircle } from 'lucide-react';

// const StudentHome = () => {
//   return (
//     <div className="min-h-screen relative">
//       {/* Background with overlay gradient (Same as Home.jsx) */}
//       <div className="absolute inset-0 overflow-hidden z-0">
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: `url('https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`, // Graduation themed background
//             filter: 'blur(2px)',
//             transform: 'scale(1.05)'
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/80 to-purple-900/90" />
//       </div>

//       {/* Main Content - No longer vertically centered, starts from top */}
//       <main className="relative z-10">
//         <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
//           {/* Header */}
//           <header className="text-center mb-16">
//             <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
//               Student Dashboard
//             </h1>
//             <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
//               Connect with alumni, explore opportunities, and build your professional network for future success.
//             </p>
//           </header>

//           {/* Feature Cards */}
//           <div className="grid gap-8 md:grid-cols-3 mb-16">
//             <FeatureCard
//               to="/student-dashboard/jobs"
//               icon={<Briefcase className="h-8 w-8" />}
//               title="Job Board"
//               description="Browse job opportunities and internships shared by our alumni network."
//             />
//             <FeatureCard
//               to="/student-dashboard/mentorship"
//               icon={<GraduationCap className="h-8 w-8" />}
//               title="Find Mentors"
//               description="Connect with alumni mentors who can guide you in your career journey."
//             />
//             <FeatureCard
//               to="/student-dashboard/chat"
//               icon={<MessageCircle className="h-8 w-8" />}
//               title="Alumni Chat"
//               description="Start conversations with alumni who share your interests and goals."
//             />
//           </div>

//           {/* Testimonial Quote */}
//           <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 text-center">
//             <p className="text-blue-100 italic text-lg mb-2">"The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."</p>
//             <p className="text-blue-300 font-medium">— Brian Herbert</p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// // Reusable FeatureCard as a Link
// const FeatureCard = ({ to, icon, title, description }) => {
//   return (
//     <Link to={to} className="block bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/10 hover:transform hover:-translate-y-2 ring-1 ring-white/10">
//       <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 text-blue-200 mb-5 shadow-lg">
//         {icon}
//       </div>
//       <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
//       <p className="text-blue-200">{description}</p>
//     </Link>
//   );
// };

// export default StudentHome;
























import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, MessageCircle, Github, Linkedin, Mail, Heart } from 'lucide-react';

const StudentHome = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background with overlay gradient (Same as Home.jsx) */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
            filter: 'blur(1px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/70 to-purple-900/80" />
      </div>

      <div className="relative z-10">
        {/* Main Content */}
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
          <div className="w-full max-w-5xl">
            {/* Header */}
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

            {/* Feature Cards */}
            <div className="grid gap-8 md:grid-cols-3 mb-16">
              <FeatureCard
                to="/student-dashboard/jobs"
                icon={<Briefcase className="h-8 w-8" />}
                title="Job Board"
                description="Browse job opportunities and internships shared by our alumni network."
              />
              <FeatureCard
                to="/student-dashboard/mentorship"
                icon={<GraduationCap className="h-8 w-8" />}
                title="Find Mentors"
                description="Connect with alumni mentors who can guide you in your career journey."
              />
              <FeatureCard
                to="/student-dashboard/chat"
                icon={<MessageCircle className="h-8 w-8" />}
                title="Alumni Chat"
                description="Start conversations with alumni who share your interests and goals."
              />
            </div>

            {/* Testimonial */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center mb-16">
              <p className="text-blue-50 italic mb-4">"The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."</p>
              <p className="text-blue-200 font-medium">— Brian Herbert</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 bg-black/20 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid gap-8 md:grid-cols-4">
              {/* Brand Column */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-white mb-4">Bridge Batch</h3>
                <p className="text-blue-100 mb-6 max-w-md">
                  Connecting alumni and students to build stronger communities, foster mentorship, and create opportunities for lifelong growth.
                </p>
                <div className="flex space-x-4">
                  <SocialIcon icon={<Github className="h-5 w-5" />} href="https://github.com/pavan-234" />
                  <SocialIcon icon={<Linkedin className="h-5 w-5" />} href="https://www.linkedin.com/in/pavan-kalyan-varanasi-210573267/" />
                  <SocialIcon icon={<Mail className="h-5 w-5" />} href="mailto:varanasipavankalyan07@gmail.com" />
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <FooterLink href="#" text="About Us" />
                  <FooterLink href="#" text="How It Works" />
                  <FooterLink href="#" text="Success Stories" />
                  <FooterLink href="#" text="Contact" />
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-2">
                  <FooterLink href="#" text="Help Center" />
                  <FooterLink href="#" text="Privacy Policy" />
                  <FooterLink href="#" text="Terms of Service" />
                  <FooterLink href="#" text="Community Guidelines" />
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-200 text-sm">
                © 2025 Bridge Batch. All rights reserved.
              </p>
              <p className="text-blue-200 text-sm mt-2 md:mt-0">
                Made with <Heart className="h-4 w-4 inline text-red-400" /> for building connections
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Reusable FeatureCard as a Link, styled like home.jsx's cards
const FeatureCard = ({ to, icon, title, description }) => {
  return (
    <Link to={to} className="block bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/20 hover:transform hover:scale-105">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 text-blue-200 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </Link>
  );
};

// Footer helper components from home.jsx
const SocialIcon = ({ icon, href }) => (
  <a href={href} className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 text-blue-200 hover:bg-white/20 hover:text-white transition-all duration-200">
    {icon}
  </a>
);

const FooterLink = ({ href, text }) => (
  <li>
    <a href={href} className="text-blue-200 hover:text-white transition-colors duration-200 text-sm">
      {text}
    </a>
  </li>
);

export default StudentHome;