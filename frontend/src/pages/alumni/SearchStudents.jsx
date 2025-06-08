import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Users,
  Briefcase,
  GraduationCap,
  Linkedin,
  Github,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
  UserCircle,
  ExternalLink,
  X,
  Mail,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Code,
  Building,
  Phone
} from 'lucide-react';

// --- Reusable UI Helper Components ---
const LoadingState = ({ message = "Loading student directory..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-blue-200 py-10">
    <Loader2 className="animate-spin h-16 w-16 text-purple-400 mb-6" />
    <h2 className="text-2xl font-semibold text-white mb-2">Fetching Students</h2>
    <p className="text-blue-300">{message}</p>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-red-300 p-8 bg-slate-800/50 rounded-xl shadow-xl border border-red-500/30">
    <AlertTriangle className="h-16 w-16 text-red-400 mb-6" />
    <h2 className="text-2xl font-semibold text-red-200 mb-2">Error Loading Students</h2>
    <p className="text-center text-red-300 max-w-md">
      {message || "Sorry, we couldn't load the student directory."}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-6 inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      >
        Try Again
      </button>
    )}
  </div>
);

const UserCardAvatar = ({ src, name, size = "w-20 h-20" }) => {
  const [imgError, setImgError] = useState(false);
  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'S')}&background=random&color=fff&size=128&font-size=0.33&bold=true`;

  return (
    <img
      src={imgError || !src ? fallbackSrc : src}
      alt={`${name || 'User'}'s profile`}
      className={`${size} rounded-full object-cover border-2 border-slate-600 shadow-md`}
      onError={() => setImgError(true)}
    />
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pageNumbers = [];
  const maxButtons = 7;
  
  if (totalPages <= maxButtons) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push('...');
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    if (currentPage <= 3) endPage = Math.min(totalPages - 1, 4);
    if (currentPage >= totalPages - 2) startPage = Math.max(2, totalPages - 3);
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    if (currentPage < totalPages - 2) pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }
  
  return (
    <nav className="mt-10 flex items-center justify-center space-x-2" aria-label="Pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        className="p-2.5 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>
      {pageNumbers.map((page, index) => 
        typeof page === 'number' ? (
          <button 
            key={page} 
            onClick={() => onPageChange(page)} 
            className={`px-4 py-2.5 rounded-md text-sm font-medium ${
              currentPage === page 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md' 
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-4 py-2.5 text-slate-400">...</span>
        )
      )}
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className="p-2.5 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};

// Student Profile Modal Component
const StudentProfileModal = ({ student, isOpen, onClose }) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 border-b border-slate-700/50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-700/50 transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
          
          <div className="flex items-center space-x-4">
            <UserCardAvatar src={student.profilePic} name={student.fullName} size="w-20 h-20" />
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {student.fullName || 'Student Name'}
              </h2>
              <p className="text-slate-300 flex items-center gap-2">
                <Building size={16} />
                {student.collegeName || 'College Not Specified'}
              </p>
              <p className="text-slate-400 flex items-center gap-2">
                <Calendar size={16} />
                Batch of {student.passoutYear || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Mail size={18} className="text-purple-400" />
              Contact Information
            </h3>
            <div className="space-y-2">
              {student.email && (
                <p className="text-slate-300 flex items-center gap-2">
                  <Mail size={16} className="text-slate-400" />
                  <a href={`mailto:${student.email}`} className="hover:text-purple-400 transition-colors">
                    {student.email}
                  </a>
                </p>
              )}
              {student.phone && (
                <p className="text-slate-300 flex items-center gap-2">
                  <Phone size={16} className="text-slate-400" />
                  <a href={`tel:${student.phone}`} className="hover:text-purple-400 transition-colors">
                    {student.phone}
                  </a>
                </p>
              )}
              {student.location && (
                <p className="text-slate-300 flex items-center gap-2">
                  <MapPin size={16} className="text-slate-400" />
                  {student.location}
                </p>
              )}
            </div>
          </div>

          {/* Skills/Domains */}
          {student.domains && student.domains.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Code size={18} className="text-purple-400" />
                Skills & Domains
              </h3>
              <div className="flex flex-wrap gap-2">
                {student.domains.map((domain, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Academic Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <GraduationCap size={18} className="text-purple-400" />
              Academic Information
            </h3>
            <div className="space-y-2">
              <p className="text-slate-300">
                <span className="text-slate-400">College:</span> {student.collegeName || 'Not specified'}
              </p>
              <p className="text-slate-300">
                <span className="text-slate-400">Graduation Year:</span> {student.passoutYear || 'Not specified'}
              </p>
              {student.degree && (
                <p className="text-slate-300">
                  <span className="text-slate-400">Degree:</span> {student.degree}
                </p>
              )}
              {student.branch && (
                <p className="text-slate-300">
                  <span className="text-slate-400">Branch:</span> {student.branch}
                </p>
              )}
              {student.cgpa && (
                <p className="text-slate-300">
                  <span className="text-slate-400">CGPA:</span> {student.cgpa}
                </p>
              )}
            </div>
          </div>

          {/* About/Bio */}
          {student.bio && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <UserCircle size={18} className="text-purple-400" />
                About
              </h3>
              <p className="text-slate-300 leading-relaxed">{student.bio}</p>
            </div>
          )}

          {/* Projects */}
          {student.projects && student.projects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Briefcase size={18} className="text-purple-400" />
                Projects
              </h3>
              <div className="space-y-3">
                {student.projects.map((project, index) => (
                  <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
                    <h4 className="font-medium text-white">{project.title || `Project ${index + 1}`}</h4>
                    {project.description && (
                      <p className="text-slate-300 text-sm mt-1">{project.description}</p>
                    )}
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm mt-2"
                      >
                        View Project <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <ExternalLink size={18} className="text-purple-400" />
              Social Links
            </h3>
            <div className="flex space-x-4">
              {student.github && (
                <a
                  href={student.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/30 text-slate-300 hover:text-white transition-all"
                >
                  <Github size={18} />
                  GitHub
                </a>
              )}
              {student.linkedIn && (
                <a
                  href={student.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/30 text-slate-300 hover:text-white transition-all"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              )}
              {student.portfolio && (
                <a
                  href={student.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/30 text-slate-300 hover:text-white transition-all"
                >
                  <ExternalLink size={18} />
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main SearchStudents Component ---
const ITEMS_PER_PAGE = 12;

const SearchStudents = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const getToken = () => {
    const role = localStorage.getItem('role');
    const token =
      role === 'alumni' ? localStorage.getItem('alumni_token') :
      role === 'admin' ? localStorage.getItem('admin_token') :
      role === 'student' ? localStorage.getItem('student_token') : null;
    return token;
  };

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError('');
      const token = getToken();
      
      const res = await fetch('http://localhost:5000/api/search/students', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
      });
      
      if (!res.ok) {
        const errData = await res.json().catch(() => ({ message: 'Unknown server error.'}));
        throw new Error(errData.message || 'Failed to fetch students');
      }
      
      const data = await res.json();
      if (Array.isArray(data)) {
        setAllStudents(data);
      } else if (data.message) {
        throw new Error(data.message);
      } else {
        throw new Error("Invalid data format: Expected an array of students.");
      }
    } catch (error) {
      console.error('Error fetching students:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const filteredStudents = useMemo(() => {
    if (!searchTerm) return allStudents;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allStudents.filter(
      (s) =>
        s.fullName?.toLowerCase().includes(lowerSearchTerm) ||
        s.collegeName?.toLowerCase().includes(lowerSearchTerm) ||
        s.passoutYear?.toString().includes(lowerSearchTerm) ||
        s.email?.toLowerCase().includes(lowerSearchTerm) ||
        (Array.isArray(s.domains) && s.domains.some(domain => domain.toLowerCase().includes(lowerSearchTerm)))
    );
  }, [allStudents, searchTerm]);

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const currentDisplayStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedStudent(null);
  };

  if (loading) return <LoadingState message="Loading student directory..." />;
  if (error && allStudents.length === 0) return <ErrorState message={error} onRetry={fetchStudentData} />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
            Student Directory
          </span>
        </h1>
        <p className="mt-3 text-lg text-blue-200 max-w-2xl mx-auto text-center">
          Discover talented students and connect for opportunities.
        </p>
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students by name, college, year, skills..."
              className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
          </div>
        </div>
      </header>

      {error && !loading && <ErrorState message={error} onRetry={fetchStudentData} />}

      {!loading && currentDisplayStudents.length === 0 && !error && (
        <div className="text-center py-10">
          <Users size={64} className="mx-auto text-slate-500 mb-4" />
          <p className="text-xl text-slate-300 font-semibold">
            {searchTerm ? "No students match your search criteria." : "No students found in the directory."}
          </p>
          {searchTerm && <p className="text-slate-400 mt-2">Try refining your search terms.</p>}
        </div>
      )}

      {currentDisplayStudents.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentDisplayStudents.map((student) => (
            <article
              key={student._id}
              className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 ease-out hover:shadow-purple-500/30 hover:-translate-y-1 group border border-slate-700/60"
            >
              <div className="p-5 flex flex-col items-center text-center flex-grow">
                <UserCardAvatar src={student.profilePic} name={student.fullName} size="w-24 h-24 mb-4" />
                <h3
                  className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 group-hover:to-pink-400 transition-colors cursor-pointer"
                  onClick={() => handleViewProfile(student)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleViewProfile(student)}
                >
                  {student.fullName || 'Student Name'}
                </h3>
                <p className="text-sm text-slate-400 mt-1 truncate w-full px-2">
                  {student.collegeName || 'College Not Specified'}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Batch of {student.passoutYear || 'N/A'}
                </p>
                {student.domains && student.domains.length > 0 && (
                  <p className="text-xs text-purple-300 mt-2 px-2 truncate w-full" title={student.domains.join(', ')}>
                    Skills: {student.domains.join(', ').substring(0, 30)}{student.domains.join(', ').length > 30 ? '...' : ''}
                  </p>
                )}
                <div className="mt-3 flex space-x-3">
                  {student.github && (
                    <a href={student.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors" aria-label="GitHub">
                      <Github size={20} />
                    </a>
                  )}
                  {student.linkedIn && (
                    <a href={student.linkedIn} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors" aria-label="LinkedIn">
                      <Linkedin size={20} />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-4 border-t border-slate-700/50 mt-auto text-center">
                <button
                  onClick={() => handleViewProfile(student)}
                  className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 group-hover:underline"
                >
                  View Profile <ExternalLink size={14} className="ml-1.5 opacity-70 group-hover:opacity-100" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Student Profile Modal */}
      <StudentProfileModal
        student={selectedStudent}
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
      />
    </div>
  );
};

export default SearchStudents;