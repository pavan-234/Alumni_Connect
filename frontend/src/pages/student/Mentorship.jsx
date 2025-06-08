import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Users, Search, Briefcase, GraduationCap, ChevronLeft, ChevronRight, Loader2,
  AlertTriangle, UserCheck, Send, Clock, XCircle, CheckCircle2, MessageSquare, UserPlus, Ban,
} from 'lucide-react';

// --- Reusable UI Helper Components (Keep as is or from shared file) ---
const LoadingState = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-blue-200 py-10">
    <Loader2 className="animate-spin h-12 w-12 text-purple-400 mb-4" />
    <p className="text-xl text-white">{message}</p>
  </div>
);

const ErrorState = ({ message, onRetry, small = false }) => (
  <div className={`flex flex-col items-center justify-center text-red-300 p-6 bg-slate-800/50 rounded-lg shadow-lg border border-red-500/30 ${small ? 'min-h-[200px]' : 'min-h-[calc(100vh-15rem)]'}`}>
    <AlertTriangle className={`${small ? 'h-10 w-10':'h-16 w-16'} text-red-400 mb-4`} />
    <h2 className={`${small ? 'text-lg':'text-xl'} font-semibold text-red-200`}>An Error Occurred</h2>
    <p className="text-center mt-1 max-w-md">{message || "Sorry, something went wrong."}</p>
    {onRetry && (<button onClick={onRetry} className="mt-4 inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg">Try Again</button>)}
  </div>
);

const AlumniAvatar = ({ src, name, size = "w-16 h-16" }) => {
  const [imgError, setImgError] = useState(false);
  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'A')}&background=random&color=fff&size=96&font-size=0.33&bold=true`;
  useEffect(() => { setImgError(false); }, [src]); // Reset error if src changes
  if (src && !imgError) {
    return (<img src={src} alt={`${name || 'User'}'s profile`} className={`${size} rounded-full object-cover border-2 border-slate-600 shadow-md`} onError={() => setImgError(true)} />);
  }
  return (<div className={`${size} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md text-lg`} aria-label={`${name || 'User'} avatar`}>{name ? name.charAt(0).toUpperCase() : 'A'}</div>);
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pageNumbers = []; const maxButtons = 5;
  if (totalPages <= maxButtons) { for (let i = 1; i <= totalPages; i++) pageNumbers.push(i); } 
  else {
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push('...');
    let startPage = Math.max(2, currentPage - Math.floor((maxButtons - 3) / 2));
    let endPage = Math.min(totalPages - 1, currentPage + Math.floor((maxButtons - 2) / 2));
    if (currentPage <= Math.floor(maxButtons/2)) endPage = Math.min(totalPages -1, maxButtons - 2);
    if (currentPage >= totalPages - Math.floor(maxButtons/2) +1) startPage = Math.max(2, totalPages - maxButtons + 3);
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    if (currentPage < totalPages - Math.floor(maxButtons/2)) pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }
  return (
    <nav className="mt-8 flex items-center justify-center space-x-1 sm:space-x-2" aria-label="Pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50"><ChevronLeft size={18} /></button>
      {pageNumbers.map((page, index) => typeof page === 'number' ? (<button key={page} onClick={() => onPageChange(page)} className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium ${currentPage === page ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>{page}</button>) : (<span key={`ellipsis-${index}`} className="px-3 py-1.5 text-slate-400">...</span>))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50"><ChevronRight size={18} /></button>
    </nav>
  );
};
// --- End Reusable UI Helper Components ---


// --- Main Mentorship Page Component (Student's View) ---
const ITEMS_PER_PAGE = 9;

const Mentorship = () => {
  const [allAlumni, setAllAlumni] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isLoadingAlumni, setIsLoadingAlumni] = useState(true);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  const [isSendingRequest, setIsSendingRequest] = useState(false); // Global state for "sending a request"
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const getAuthToken = useCallback(() => { 
    const role = localStorage.getItem('role');
    if (role === 'student') {
      return localStorage.getItem('student_token');
    }
    return null; 
  }, []);

  const fetchAlumniData = useCallback(async () => {
    const token = getAuthToken();
    if (!token) { 
      setError('Authentication required.'); setIsLoadingAlumni(false); return; 
    }
    try {
      setIsLoadingAlumni(true); setError('');
      const res = await axios.get('https://alumni-connect-six.vercel.app/api/search/alumni', { headers: { Authorization: `Bearer ${token}` } });
      if (Array.isArray(res.data)) setAllAlumni(res.data);
      else throw new Error("Invalid alumni data format.");
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load mentors.');
    } finally {
      setIsLoadingAlumni(false);
    }
  }, [getAuthToken]);

  const fetchMyRequests = useCallback(async () => {
    const token = getAuthToken();
    if (!token) { 
      setError('Authentication required for requests.'); setIsLoadingRequests(false); return; 
    }
    try {
      setIsLoadingRequests(true); setError('');
      const res = await axios.get('https://alumni-connect-six.vercel.app/api/mentorship', { headers: { Authorization: `Bearer ${token}` } });
      if (Array.isArray(res.data)) {
        const validRequests = res.data.filter(req => req.alumni && typeof req.alumni === 'object' && req.alumni._id);
        // No complex sorting needed here as we only use this list to check status on alumni cards
        setMyRequests(validRequests);
      } else throw new Error("Invalid 'My Requests' data format.");
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load your request statuses.');
    } finally {
      setIsLoadingRequests(false);
    }
  }, [getAuthToken]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'student') {
        fetchAlumniData();
        fetchMyRequests();
    } else {
        setError('Access Denied. This page is for students.');
        setIsLoadingAlumni(false);
        setIsLoadingRequests(false);
    }
  }, [fetchAlumniData, fetchMyRequests]);

  const handleMentorshipRequest = async (alumnus) => {
    if (myRequests.some(req => req.alumni?._id === alumnus._id && (req.status === 'pending' || req.status === 'accepted'))) {
        setError(`Request already sent to ${alumnus.fullName} or mentorship is active.`);
        setTimeout(() => setError(''), 4000); return;
    }
    const token = getAuthToken();
    if (!token) { setError('Authentication required.'); return; }
    try {
      setIsSendingRequest(true); setError(''); // Set global sending state
      await axios.post('https://alumni-connect-six.vercel.app/api/mentorship', { alumniId: alumnus._id }, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      fetchMyRequests(); // Refresh statuses
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to send request.');
    } finally {
      setIsSendingRequest(false); // Clear global sending state
    }
  };
  
  const handleChatWithMentor = (alumnus) => { 
      if (!alumnus?._id) { 
        console.error("Mentorship.jsx: Cannot start chat, alumnus object or _id is missing.", alumnus); 
        setError('Could not start chat: mentor details incomplete.'); 
        return; 
      }
      localStorage.setItem('chatReceiverId', alumnus._id);
      navigate('/student-dashboard/chat');
  };

  const filteredAlumni = useMemo(() => { 
    if (!allAlumni) return [];
    if (!searchTerm.trim()) return allAlumni;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allAlumni.filter(a => 
        a.fullName?.toLowerCase().includes(lowerSearchTerm) || 
        a.currentCompany?.toLowerCase().includes(lowerSearchTerm) || 
        a.passoutYear?.toString().includes(lowerSearchTerm) ||
        (Array.isArray(a.domains) && a.domains.some(domain => domain.toLowerCase().includes(lowerSearchTerm)))
    );
  }, [allAlumni, searchTerm]);

  const totalPages = Math.ceil(filteredAlumni.length / ITEMS_PER_PAGE);
  const currentDisplayAlumni = useMemo(() => { 
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAlumni.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAlumni, currentPage]);

  const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
  const handlePageChange = (page) => { if (page >= 1 && page <= totalPages) setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' });};

  return ( 
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
      <header className="mb-10 text-center">
        <UserCheck className="mx-auto h-16 w-16 text-purple-400 mb-4" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">Find Your Mentor</span>
        </h1>
        <p className="mt-3 text-lg text-blue-200 max-w-2xl mx-auto">Connect with experienced alumni for guidance and support.</p>
      </header>

      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <input type="text" placeholder="Search mentors by name, company, skills, year..." 
                 className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500" 
                 value={searchTerm} onChange={handleSearchChange} />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>
      </div>

      {error && <ErrorState message={error} small onRetry={() => { setError(''); fetchAlumniData(); fetchMyRequests(); }} />}

      {(isLoadingAlumni || isLoadingRequests) && <LoadingState message="Loading mentors and your request statuses..." />}
      
      {!isLoadingAlumni && !isLoadingRequests && !error && currentDisplayAlumni.length === 0 && (
          <div className="text-center py-10">
              <Users size={56} className="mx-auto text-slate-500 mb-3" />
              <p className="text-xl text-slate-300">{searchTerm ? "No mentors match your search." : "No mentors available currently."}</p>
          </div>
      )}

      {!isLoadingAlumni && !isLoadingRequests && !error && currentDisplayAlumni.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentDisplayAlumni.map((alumnus) => {
            const existingRequest = myRequests.find(req => req.alumni?._id === alumnus._id);
            let buttonContent;
            let buttonAction;
            let isButtonDisabled;
            let currentActionType = 'request'; // Default type for this button

            if (existingRequest) {
              if (existingRequest.status === 'pending') {
                buttonContent = <><Clock size={16} className="mr-2"/>Request Pending</>;
                isButtonDisabled = true;
                currentActionType = 'pending';
              } else if (existingRequest.status === 'accepted') {
                buttonContent = <><MessageSquare size={16} className="mr-2"/>Chat with Mentor</>;
                buttonAction = () => handleChatWithMentor(alumnus);
                isButtonDisabled = false; // Chat button should not be disabled by isSendingRequest (for new requests)
                currentActionType = 'chat';
              } else { // Rejected, cancelled, or other - allow re-request
                buttonContent = <><UserPlus size={16} className="mr-2"/>Request Mentorship</>;
                buttonAction = () => handleMentorshipRequest(alumnus);
                isButtonDisabled = isSendingRequest; // Only disable if a new request is being sent
              }
            } else {
              buttonContent = <><UserPlus size={16} className="mr-2"/>Request Mentorship</>;
              buttonAction = () => handleMentorshipRequest(alumnus);
              isButtonDisabled = isSendingRequest; // Only disable if a new request is being sent
            }

            return (
            <article key={alumnus._id} className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col border border-slate-700/50 h-full">
              <div className="p-5 flex flex-col items-center text-center flex-grow">
                <AlumniAvatar src={alumnus.profilePic} name={alumnus.fullName} />
                <h3 className="mt-3 text-lg font-semibold text-slate-100">{alumnus.fullName}</h3>
                <p className="text-sm text-purple-300 mt-0.5 truncate w-full px-2" title={alumnus.currentRole && alumnus.currentCompany ? `${alumnus.currentRole} at ${alumnus.currentCompany}` : (alumnus.currentRole || alumnus.currentCompany || 'Alumnus/Alumna')}>
                    {alumnus.currentRole || 'Alumnus/Alumna'}{alumnus.currentCompany && ` at ${alumnus.currentCompany}`}
                </p>
                <p className="text-xs text-slate-400 mt-1">Batch of {alumnus.passoutYear || 'N/A'}</p>
                {Array.isArray(alumnus.domains) && alumnus.domains.length > 0 && (
                     <p className="text-xs text-sky-300 mt-2 px-1 line-clamp-2" title={alumnus.domains.join(', ')}>
                        Skills: {alumnus.domains.join(', ')}
                     </p>
                )}
              </div>
              <div className="p-4 border-t border-slate-700/50 mt-auto">
                <button 
                    onClick={buttonAction} 
                    disabled={isButtonDisabled}
                    className={`w-full inline-flex items-center justify-center px-4 py-2.5 font-semibold rounded-md shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                                ${currentActionType === 'chat' 
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                    : 'bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white'
                                }`}
                >
                  {/* Show loader only if this specific button's action is to 'request' AND a request is being sent */}
                  {isSendingRequest && currentActionType === 'request' && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                  {buttonContent}
                </button>
              </div>
            </article>
          )})}
        </div>
      )}
      {/* Pagination for "Find a Mentor" results */}
      {!isLoadingAlumni && !isLoadingRequests && !error && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default Mentorship;