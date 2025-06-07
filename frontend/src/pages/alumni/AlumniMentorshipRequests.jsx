// import React, { useEffect, useState } from "react";

// const AlumniMentorshipRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Get token from localStorage
//   const role = localStorage.getItem('role');
//         const token =
//           role === 'student'
//             ? localStorage.getItem('student_token')
//             : role === 'alumni'
//             ? localStorage.getItem('alumni_token')
//             : role === 'admin'
//             ? localStorage.getItem('admin_token')
//             : null;


//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await fetch("http://localhost:5000/api/mentorship", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error("Failed to fetch mentorship requests");

//       const data = await res.json();
//       console.log("Mentorship Requests:", data);

//       if (Array.isArray(data)) {
//         setRequests(data);
//       } else {
//         setRequests([]);
//         setError("No mentorship requests found");
//       }
//     } catch (err) {
//       console.error("Error fetching mentorship requests:", err);
//       setError("Failed to load mentorship requests. Please try again later.");
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdate = async (requestId, status) => {
//     try {
//       setLoading(true);

//       const res = await fetch("http://localhost:5000/api/mentorship", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ requestId, status }),
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.message || "Update failed");
//       }

//       const data = await res.json();
//       alert(data.message || "Request updated successfully");
//       fetchRequests();
//     } catch (err) {
//       console.error("Error updating request:", err);
//       alert(err.message || "Failed to update request.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="flex flex-col items-center">
//           <svg
//             className="animate-spin h-8 w-8 text-blue-600"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//           <p className="mt-2 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//         <p className="text-red-600 text-lg" role="alert">
//           {error}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
//         <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//           Incoming Mentorship Requests
//         </h2>
//         {requests.length === 0 ? (
//           <p className="text-gray-600 text-center text-lg">
//             No mentorship requests found.
//           </p>
//         ) : (
//           <ul className="space-y-4">
//             {requests.map((req) => (
//               <li
//                 key={req._id}
//                 className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
//               >
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                   <div>
//                     <p className="text-gray-900 font-semibold">
//                       Student: {req.student?.fullName || "Unknown"}
//                     </p>
//                     <p className="text-gray-600">
//                       Status:{" "}
//                       <span
//                         className={`capitalize ${
//                           req.status === "accepted"
//                             ? "text-green-600"
//                             : req.status === "rejected"
//                             ? "text-red-600"
//                             : "text-yellow-600"
//                         }`}
//                       >
//                         {req.status}
//                       </span>
//                     </p>
//                   </div>
//                   {req.status === "pending" && (
//                     <div className="flex space-x-3">
//                       <button
//                         onClick={() => handleUpdate(req._id, "accepted")}
//                         className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300 transition-colors"
//                         aria-label={`Accept mentorship request from ${
//                           req.student?.fullName || "student"
//                         }`}
//                         disabled={loading}
//                       >
//                         Accept
//                       </button>
//                       <button
//                         onClick={() => handleUpdate(req._id, "rejected")}
//                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300 transition-colors"
//                         aria-label={`Reject mentorship request from ${
//                           req.student?.fullName || "student"
//                         }`}
//                         disabled={loading}
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AlumniMentorshipRequests;



















































import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Users, Loader2, AlertTriangle, CheckCircle2, XCircle, Handshake, Mail,
  UserCheck as AcceptIcon, UserX as RejectIcon, Clock, MessageSquare, Ban,
  // Unused icons from previous versions (Search, Briefcase, etc.) can be removed if not needed by helper components
} from 'lucide-react';

// --- Reusable UI Helper Components ---
const LoadingState = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-blue-200 py-10">
    <Loader2 className="animate-spin h-12 w-12 text-purple-400 mb-4" />
    <p className="text-xl text-white">{message}</p>
  </div>
);

const ErrorMessageDisplay = ({ message }) => {
    if (!message) return null;
    return (
        <div className="flex items-start p-3.5 rounded-md bg-red-900/40 border border-red-700/50 text-red-300 text-sm my-4 animate-fadeInUp">
            <AlertTriangle size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-red-400" />
            <span>{message}</span>
        </div>
    );
};

const SuccessMessageDisplay = ({ message }) => {
    if (!message) return null;
    return (
        <div className="flex items-start p-3.5 rounded-md bg-green-900/40 border border-green-700/50 text-green-300 text-sm my-4 animate-fadeInUp">
            <CheckCircle2 size={20} className="mr-2.5 mt-0.5 flex-shrink-0 text-green-400" />
            <span>{message}</span>
        </div>
    );
};

const StudentAvatar = ({ src, name, size = "w-12 h-12" }) => {
  const [imgError, setImgError] = useState(false);
  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'S')}&background=random&color=fff&size=80&font-size=0.33&bold=true`;
  useEffect(() => { setImgError(false); }, [src]);
  if (src && !imgError) {
    return (<img src={src} alt={`${name || 'Student'}'s profile`} className={`${size} rounded-full object-cover border-2 border-slate-600 shadow-sm`} onError={() => setImgError(true)} />);
  }
  return (<div className={`${size} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md text-lg`} aria-label={`${name || 'Student'} avatar`}>{name ? name.charAt(0).toUpperCase() : 'S'}</div>);
};
// --- End Reusable UI Helper Components ---


// --- Individual Request Card ---
const IncomingRequestCard = ({ request, onUpdateStatus, onChat, isUpdatingId }) => {
  const { _id: requestId, student, status, requestedAt, respondedAt } = request;

  const studentName = student?.fullName || "Unknown Student";
  const studentEmail = student?.email || "Email not available";
  const studentProfilePic = student?.profilePic;

  let requestedDateDisplay = null;
  if (requestedAt) {
    const date = new Date(requestedAt);
    if (!isNaN(date.getTime())) {
      requestedDateDisplay = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
  }

  let respondedDateDisplay = null;
  if (respondedAt) {
    const date = new Date(respondedAt);
    if (!isNaN(date.getTime())) {
      respondedDateDisplay = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
  }

  const getStatusInfo = () => {
    switch (status) {
      case 'pending': return { text: 'Pending Decision', color: 'text-yellow-300', bg: 'bg-yellow-600/20', icon: <Clock size={14} className="mr-1.5"/> };
      case 'accepted': return { text: 'Accepted', color: 'text-green-300', bg: 'bg-green-600/20', icon: <CheckCircle2 size={14} className="mr-1.5"/> };
      case 'rejected': return { text: 'Rejected', color: 'text-red-300', bg: 'bg-red-600/20', icon: <XCircle size={14} className="mr-1.5"/> };
      case 'cancelled': return { text: 'Cancelled by Student', color: 'text-slate-400', bg: 'bg-slate-600/40', icon: <Ban size={14} className="mr-1.5"/> };
      default: return { text: `Status: ${status || 'Unknown'}`, color: 'text-slate-400', bg: 'bg-slate-700/30', icon: <AlertTriangle size={14} className="mr-1.5"/> };
    }
  };
  const statusInfo = getStatusInfo();

  return (
    <li className="bg-slate-800/70 backdrop-blur-md p-5 sm:p-6 rounded-xl shadow-xl border border-slate-700/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <StudentAvatar src={studentProfilePic} name={studentName} size="w-16 h-16 sm:w-20 sm:h-20" />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-white truncate" title={studentName}>
            {studentName}
          </h3>
          <a href={`mailto:${studentEmail}`} className="text-sm text-purple-300 hover:text-purple-200 hover:underline flex items-center mt-0.5 truncate" title={studentEmail}>
            <Mail size={14} className="mr-1.5 opacity-70"/> {studentEmail}
          </a>
          {/* --- CONDITIONAL DATE DISPLAY --- */}
          {requestedDateDisplay && (
            <p className="text-xs text-slate-400 mt-1">
              Requested: {requestedDateDisplay}
              {respondedDateDisplay && ` | Responded: ${respondedDateDisplay}`}
            </p>
          )}
          {/* --- END CONDITIONAL DATE DISPLAY --- */}
        </div>
        <div className={`mt-3 sm:mt-0 px-3 py-1 text-xs font-medium rounded-full inline-flex items-center self-start sm:self-center ${statusInfo.bg} ${statusInfo.color}`}>
          {statusInfo.icon} {statusInfo.text}
        </div>
      </div>

      {status === "pending" && (
        <div className="mt-4 pt-4 border-t border-slate-700/50 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={() => onUpdateStatus(requestId, "rejected")}
            disabled={isUpdatingId === requestId}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-red-300 bg-red-600/20 hover:bg-red-600/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-red-500 transition-colors disabled:opacity-50"
          >
            {isUpdatingId === requestId ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <RejectIcon size={16} className="mr-2" />}
            Reject
          </button>
          <button
            onClick={() => onUpdateStatus(requestId, "accepted")}
            disabled={isUpdatingId === requestId}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-green-300 bg-green-600/20 hover:bg-green-600/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500 transition-colors disabled:opacity-50"
          >
            {isUpdatingId === requestId ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <AcceptIcon size={16} className="mr-2" />}
            Accept
          </button>
        </div>
      )}
      {status === "accepted" && student && (
         <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-end">
            <button 
                onClick={() => onChat(student)}
                className="text-sm inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
                <MessageSquare size={16} className="mr-2" /> Chat with Mentee
            </button>
        </div>
      )}
    </li>
  );
};
// --- End Individual Request Card ---


const AlumniMentorshipRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [updatingRequestId, setUpdatingRequestId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const alumniToken = localStorage.getItem('alumni_token');

  const fetchRequests = useCallback(async () => {
    if (!alumniToken) {
      setError('Authentication required. Please log in as an alumnus.');
      setLoadingPage(false);
      return;
    }
    try {
      setLoadingPage(true); setError(''); setSuccess('');
      const res = await axios.get("http://localhost:5000/api/mentorship", {
        headers: { Authorization: `Bearer ${alumniToken}` },
      });
      
      if (Array.isArray(res.data)) {
        const validRequests = res.data.filter(req => req.student && typeof req.student === 'object' && req.student._id);
        if (validRequests.length !== res.data.length) {
            console.warn("[AlumniMentorshipRequests] Some requests filtered out due to missing student data from backend.");
        }
        const sorted = validRequests.sort((a,b) => {
            const statusOrder = { pending: 1, accepted: 2, rejected: 3, cancelled: 4, unknown: 5 };
            const statusA = statusOrder[a.status] || statusOrder.unknown;
            const statusB = statusOrder[b.status] || statusOrder.unknown;
            if (statusA !== statusB) return statusA - statusB;
            return new Date(b.requestedAt || 0) - new Date(a.requestedAt || 0);
        });
        setRequests(sorted);
      } else {
        setRequests([]);
        throw new Error("Received invalid data format for mentorship requests.");
      }
    } catch (err) {
      console.error("Error fetching mentorship requests:", err.response?.data || err.message || err);
      const errMsg = err.response?.data?.message || err.message || "Failed to load mentorship requests.";
      setError(`Error ${err.response?.status || ''}: ${errMsg}`);
      setRequests([]);
    } finally {
      setLoadingPage(false);
    }
  }, [alumniToken, navigate]);

  const handleUpdateStatus = async (requestId, status) => {
    if (!alumniToken) { setError('Authentication required.'); return; }
    try {
      setUpdatingRequestId(requestId); setError(''); setSuccess('');
      const res = await axios.put("http://localhost:5000/api/mentorship", 
        { requestId, status },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${alumniToken}` } }
      );
      setSuccess(res.data.message || `Request successfully ${status}.`);
      setRequests(prevRequests => 
        prevRequests.map(req => 
          req._id === requestId ? { ...req, status: status, respondedAt: new Date().toISOString() } : req
        ).sort((a,b) => {
            const statusOrder = { pending: 1, accepted: 2, rejected: 3, cancelled: 4, unknown: 5 };
            const statusA = statusOrder[a.status] || statusOrder.unknown;
            const statusB = statusOrder[b.status] || statusOrder.unknown;
            if (statusA !== statusB) return statusA - statusB;
            return new Date(b.requestedAt || 0) - new Date(a.requestedAt || 0);
        })
      );
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || "Failed to update request status.";
      setError(`Error updating: ${errMsg}`);
    } finally {
      setUpdatingRequestId(null);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'alumni') {
        setError("Access Denied: This page is for alumni only.");
        setLoadingPage(false);
        return;
    }
    fetchRequests();
  }, [fetchRequests]);


  if (loadingPage && requests.length === 0) {
    return <LoadingState message="Loading mentorship requests..." />;
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
      <header className="mb-10 text-center">
        <Handshake className="mx-auto h-16 w-16 text-cyan-400 mb-4" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-500">
            Mentorship Requests
          </span>
        </h1>
        <p className="mt-3 text-lg text-cyan-200 max-w-2xl mx-auto">
          Review and respond to mentorship requests from students.
        </p>
      </header>

      <ErrorMessageDisplay message={error} />
      <SuccessMessageDisplay message={success} />

      {loadingPage && requests.length > 0 && (
        <div className="text-center my-6"><Loader2 className="animate-spin h-8 w-8 text-purple-400 mx-auto"/></div>
      )}

      {!loadingPage && requests.length === 0 && !error && (
        <div className="text-center py-16 bg-slate-800/50 p-8 rounded-xl border border-slate-700/50">
          <UserCheck size={56} className="mx-auto text-slate-500 mb-4" />
          <p className="text-xl text-slate-300 font-semibold">No incoming mentorship requests.</p>
          <p className="text-slate-400 mt-1">When students request your mentorship, they will appear here.</p>
        </div>
      )}
      
      {!loadingPage && requests.length > 0 && (
        <ul className="space-y-6">
          {requests.map((req) => (
            <IncomingRequestCard
              key={req._id}
              request={req}
              onUpdateStatus={handleUpdateStatus}
              isUpdatingId={updatingRequestId}
              onChat={(studentData) => { 
                  if (!studentData?._id) {
                      console.error("Cannot start chat: student ID missing from request object's student field.");
                      setError("Error: Student details incomplete for chat.");
                      return;
                  }
                  localStorage.setItem('chatReceiverId', studentData._id);
                  navigate('/alumni-dashboard/chat'); 
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlumniMentorshipRequests;