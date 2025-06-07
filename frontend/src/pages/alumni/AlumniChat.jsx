// import React, { useEffect, useState, useRef } from 'react';

// const AlumniChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [receiverId, setReceiverId] = useState('');
//   const [content, setContent] = useState('');
//   const [studentList, setStudentList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const chatContainerRef = useRef(null);

//   const alumniId = localStorage.getItem('userId'); // Current logged-in alumni ID

//   // Auto-select student if preset from localStorage
//   useEffect(() => {
//     const presetId = localStorage.getItem('chatReceiverId');
//     if (presetId) {
//       setReceiverId(presetId);
//       localStorage.removeItem('chatReceiverId');
//     }
//   }, []);

//   // Fetch list of students
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         setLoading(true);
//         const role = localStorage.getItem('role');
//         const token =
//           role === 'student'
//             ? localStorage.getItem('student_token')
//             : role === 'alumni'
//             ? localStorage.getItem('alumni_token')
//             : role === 'admin'
//             ? localStorage.getItem('admin_token')
//             : null;

//         const res = await fetch('http://localhost:5000/api/search/students', {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         if (Array.isArray(data)) {
//           setStudentList(data);
//         } else {
//           setStudentList([]);
//           setError('No students found');
//         }
//       } catch (err) {
//         console.error(err);
//         setStudentList([]);
//         setError('Failed to load students');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Load messages with selected student
//   const loadMessages = async () => {
//     if (!receiverId) return;
//     try {
//       setLoading(true);
//       const role = localStorage.getItem('role');
//       const token =
//         role === 'student'
//           ? localStorage.getItem('student_token')
//           : role === 'alumni'
//           ? localStorage.getItem('alumni_token')
//           : role === 'admin'
//           ? localStorage.getItem('admin_token')
//           : null;

//       const res = await fetch(`http://localhost:5000/api/messages/${receiverId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       setMessages(data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load messages');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load messages when receiverId changes
//   useEffect(() => {
//     if (receiverId) loadMessages();
//   }, [receiverId]);

//   // Auto-scroll to bottom of chat
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Send message
//   const handleSend = async () => {
//     if (!content.trim() || !receiverId) return;

//     try {
//       setLoading(true);
//       const role = localStorage.getItem('role');
//       const token =
//         role === 'student'
//           ? localStorage.getItem('student_token')
//           : role === 'alumni'
//           ? localStorage.getItem('alumni_token')
//           : role === 'admin'
//           ? localStorage.getItem('admin_token')
//           : null;

//       await fetch('http://localhost:5000/api/messages', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ receiverId, content }),
//       });

//       setContent('');
//       await loadMessages();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to send message');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">Chat with Students</h2>

//         {/* Student Selector */}
//         <div className="mb-4">
//           <select
//             value={receiverId}
//             onChange={(e) => setReceiverId(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             aria-label="Select a student to chat with"
//             disabled={loading}
//           >
//             <option value="">Select Student</option>
//             {studentList.map((student) => (
//               <option key={student._id} value={student._id}>
//                 {student.fullName}
//               </option>
//             ))}
//           </select>
//           {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//           {loading && <p className="text-gray-500 text-sm mt-2">Loading...</p>}
//         </div>

//         {/* Chat Window */}
//         {receiverId && (
//           <div className="flex flex-col gap-4">
//             <div
//               ref={chatContainerRef}
//               className="border border-gray-200 rounded-md p-4 h-96 overflow-y-auto bg-gray-50"
//             >
//               {messages.length > 0 ? (
//                 messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`mb-2 flex ${
//                       msg.sender === alumniId ? 'justify-end' : 'justify-start'
//                     }`}
//                   >
//                     <div
//                       className={`max-w-xs p-3 rounded-lg ${
//                         msg.sender === alumniId
//                           ? 'bg-blue-500 text-white'
//                           : 'bg-gray-200 text-gray-900'
//                       }`}
//                     >
//                       <p className="text-sm">{msg.content}</p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 text-center">No messages yet</p>
//               )}
//             </div>

//             {/* Message Input */}
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="Type a message"
//                 className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 aria-label="Type a message"
//                 disabled={loading}
//               />
//               <button
//                 onClick={handleSend}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
//                 disabled={loading || !content.trim()}
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AlumniChat;






















import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send, Loader2, Users, Search, Check, CheckCheck,
  MessageSquarePlus, AlertTriangle, Paperclip,
} from 'lucide-react';

// --- Date Formatting Helper (Same as StudentChat) ---
const formatDateSeparator = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return 'TODAY';
  if (date.toDateString() === yesterday.toDateString()) return 'YESTERDAY';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// --- Reusable UI Helper Components ---
const LoadingSpinner = ({ size = "h-8 w-8", color = "text-purple-400" }) => (
  <Loader2 className={`animate-spin ${size} ${color}`} />
);

// --- CORRECTED UserAvatar Component ---
const UserAvatar = ({ name, src, size = "h-10 w-10", textSize = "text-lg" }) => {
  const [imgError, setImgError] = useState(false);
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  // Determine if we should attempt to render an img tag based on src and error state
  const shouldUseImage = src && !imgError;

  useEffect(() => {
    // Reset imgError if src changes, to allow retrying image load
    setImgError(false);
  }, [src]);

  if (shouldUseImage) {
    return (
      <img
        src={src} // Use the provided src
        alt={`${name || 'User'}'s avatar`}
        className={`flex-shrink-0 rounded-full object-cover shadow-md ${size}`}
        onError={() => {
          console.warn(`Avatar image failed to load: ${src}`);
          setImgError(true); // Set error to trigger fallback
        }}
      />
    );
  } else {
    // Fallback to div with initial
    return (
      <div
        className={`flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md ${size} ${textSize}`}
        aria-label={`${name || 'User'} avatar`}
      >
        {initial}
      </div>
    );
  }
};
// --- End CORRECTED UserAvatar Component ---


// --- Chat Specific Components (Adapted from StudentChat) ---
const ContactSidebar = ({ contactList, activeReceiverId, onSelectContact, isLoading, contactTypeLabel = "Contacts" }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contactList.filter(contact =>
    (contact.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) // Add guard for fullName
  );

  return (
    <div className="w-[30%] min-w-[280px] sm:min-w-[300px] max-w-[400px] bg-slate-800/80 backdrop-blur-md border-r border-slate-700/50 flex flex-col h-full">
      <div className="p-4 border-b border-slate-700/50 flex-shrink-0">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Users className="mr-3 text-purple-400" size={24} />
          {contactTypeLabel}
        </h2>
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        {isLoading && (
            <div className="p-4 flex flex-col items-center justify-center h-full">
                <LoadingSpinner size="h-10 w-10" />
                <p className="mt-3 text-slate-300">Loading {contactTypeLabel.toLowerCase()}...</p>
            </div>
        )}
        {!isLoading && filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div
              key={contact._id}
              onClick={() => onSelectContact(contact)}
              className={`flex items-center p-3.5 cursor-pointer transition-colors duration-150 hover:bg-slate-700/70 border-b border-slate-700/30
                          ${activeReceiverId === contact._id ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/20' : ''}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectContact(contact)}
            >
              <UserAvatar src={contact.profilePic} name={contact.fullName} />
              <div className="ml-3 overflow-hidden">
                <p className={`font-medium truncate ${activeReceiverId === contact._id ? 'text-purple-300' : 'text-slate-100'}`}>
                  {contact.fullName}
                </p>
                <p className="text-xs text-slate-400 truncate">
                    {contact.collegeName || 'Student'} {contact.passoutYear ? `(${contact.passoutYear})` : ''}
                </p>
              </div>
            </div>
          ))
        ) : (!isLoading && <p className="p-4 text-center text-slate-400">No {contactTypeLabel.toLowerCase()} found {searchTerm ? 'matching your search' : ''}.</p>)}
      </div>
    </div>
  );
};

const MessageBubble = ({ message, isSender }) => {
  const sentTime = new Date(message.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const isRead = message.isRead; 

  return (
    <div className={`flex mb-1 ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`px-3 py-1.5 rounded-lg text-sm max-w-[75%] sm:max-w-[65%] shadow-md break-words relative group min-w-[90px] sm:min-w-[100px]
                    ${isSender
                      ? 'bg-gradient-to-br from-cyan-600 to-sky-700 text-white rounded-br-md' 
                      : 'bg-slate-700 text-slate-100 rounded-bl-md'
                    }`}
      >
        <p className="whitespace-pre-wrap pb-4 pr-1">{message.content}</p>
        <div className={`absolute bottom-1 right-1.5 text-[0.65rem] flex items-center pointer-events-none ${isSender ? 'text-sky-200/90' : 'text-slate-400/90'}`}>
          <span>{sentTime.toLowerCase()}</span>
          {isSender && (isRead ? <CheckCheck className="ml-1 h-3.5 w-3.5 text-sky-400" /> : <Check className="ml-1 h-3.5 w-3.5" />)}
        </div>
      </div>
    </div>
  );
};

const DateSeparator = ({ date }) => (
  <div className="flex justify-center my-3"><span className="bg-slate-700/80 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full shadow">{date}</span></div>
);

const ChatArea = ({ receiver, messagesWithSeparators, currentUserId, onSendMessage, isLoadingMessages, isSendingMessage, onSendFile }) => {
  const [content, setContent] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "auto" }); }, [messagesWithSeparators]);
  useEffect(() => { if (receiver && inputRef.current) setTimeout(() => inputRef.current.focus(), 100); }, [receiver]);

  const handleSend = () => { if (content.trim()) { onSendMessage(content.trim()); setContent(''); } };
  const handleKeyPress = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };
  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) onSendFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (!receiver) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-10 bg-slate-900/70 text-slate-300 h-full">
        <MessageSquarePlus size={80} className="text-cyan-400/70 mb-6" />
        <h3 className="text-2xl font-semibold text-white">Select a Student to Chat</h3>
        <p className="mt-2 text-center max-w-sm">Choose a student from your mentee list or contacts.</p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col bg-slate-900/70 h-full overflow-hidden">
      <header className="flex items-center p-3.5 border-b border-slate-700/50 bg-slate-800/90 backdrop-blur-sm flex-shrink-0">
        <UserAvatar src={receiver.profilePic} name={receiver.fullName} size="h-10 w-10" textSize="text-lg" />
        <div className="ml-3"><h3 className="text-md font-semibold text-white">{receiver.fullName}</h3></div>
      </header>
      <div className="flex-grow px-4 py-3 sm:px-6 sm:py-4 overflow-y-auto space-y-0.5 relative custom-scrollbar" style={{backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIoSURBVHhe7dJBCsNADETBAiD7704lqQUL6kMLYJ8FvP9gZuacY8YJPM8LzPM8LzDP87zAPM/zAvM8zwtM0vM2kPT8HSSp5214P8/zAqLPe19A9Hn7BkT/Tqbn/Z0h0vN+T5Dk+R1BkvN+TZDk+f0hQZLn43NIkvx+GZIk34+HJIkvx+NIkvx2NIgkyfsxIEnyPhyIJMn7MSBJ8j4MiCTJ+zEgSfI+HBYkyfsxIEnyPhwWJMn7MSBJ8j4cFCTJ+zEgSfI+HBAkyfsxIEnyPhwQJMn7MSBJ8j4cECTJ+zEgSfI+DBAkyfsxIEnyPhgQJMn7MSBJ8j4MCCRJ8j4MSJI+DIgkyfsxIEnyPiAgSfI+DIgkyfsxIEnyPiAgSfI+DIgkyfsxIEnyPhAQJMn7MSBJ8j4QECTJ+zEgSfI+ECTJ+zEgSfI+DwgkSfI+DIgkyfsxIEnyPhAQSZI+DIgkyfsxIEnyPhAQJMn7MSBJ8j4QJMn7MSBJ8j4MCCRJ8j4MSJI+HBAkSfI+DIgkyfsxIEnyPhgQJMn7MSBJ8j4MCCRJ8j4MSJI+DBAkyfsxIEnyPhwQJMn7MSBJ8j4cECTJ+zEgSfI+HBYkyfsxIEnyPhwWJMn7MSBJ8j4cFCTJ+zEgSfI+HBAkSfI+DIgkyfsxIEnyPhgQJMn7MSBJ8j4MCCRJ8j4MSJI+DIgkyfsxIEnyPiAgSfI+DIgkyfsxIEnyPhAQJMn7MSBJ8j4QECTJ+zEgSfI+zPM8LxDP87zAPM/zAvM8zwtM0vM2kPT8HSRp5uYcsMHkP3z+AYk2AAAAAElFTkSuQmCC")`, backgroundRepeat: 'repeat', backgroundSize: '300px', opacity: 0.9 }}>
        {isLoadingMessages && (<div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm z-10"><LoadingSpinner /><p className="mt-3 text-slate-300">Loading messages...</p></div>)}
        {!isLoadingMessages && messagesWithSeparators.length === 0 && (<p className="text-center text-sm text-slate-400 mt-10">No messages yet. Send a message to start!</p>)}
        {messagesWithSeparators.map((item, index) => item.type === 'separator' ? (<DateSeparator key={`sep-${item.date}-${index}`} date={item.date} />) : (<MessageBubble key={item.message._id || item.message.tempId || `msg-${index}`} message={item.message} isSender={item.message.sender === currentUserId} />))}
        <div ref={messagesEndRef} />
      </div>
      <footer className="p-3.5 border-t border-slate-700/50 bg-slate-800/90 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} accept="image/*,application/pdf,.doc,.docx,.txt" />
          <button onClick={() => fileInputRef.current?.click()} className="p-2.5 text-slate-400 hover:text-cyan-400 transition-colors rounded-full hover:bg-slate-700/70" aria-label="Attach file" type="button"><Paperclip size={20} /></button> */}
          <textarea ref={inputRef} value={content} onChange={(e) => setContent(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type a message" rows={1} className="flex-grow p-2.5 bg-slate-700/60 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none resize-none custom-scrollbar" style={{ maxHeight: '100px' }} />
          <button onClick={handleSend} disabled={isSendingMessage || !content.trim()} className={`p-2.5 rounded-full transition-all duration-200 transform focus:outline-none focus:ring-1 focus:ring-cyan-500/70 ${!content.trim() || isSendingMessage ? 'bg-slate-600 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white shadow-lg hover:scale-105'}`} aria-label="Send message">
            {isSendingMessage ? <LoadingSpinner size="h-5 w-5" color="text-white" /> : <Send size={20} />}
          </button>
        </div>
      </footer>
    </div>
  );
};

// --- Main AlumniChat Component ---
const AlumniChat = () => {
  const [messages, setMessages] = useState([]);
  const [currentReceiver, setCurrentReceiver] = useState(null); 
  const [studentList, setStudentList] = useState([]); 
  const [loading, setLoading] = useState({ contacts: true, messages: false, sending: false, file: false });
  const [error, setError] = useState({ contacts: '', messages: '', sending: '', file: '' });

  const alumniId = localStorage.getItem('userId'); 
  const alumniToken = localStorage.getItem('alumni_token'); 


  const messagesWithSeparators = messages.reduce((acc, message, index) => {
    const messageDate = new Date(message.timestamp || Date.now()).toDateString();
    if (index === 0 || new Date(messages[index - 1].timestamp || Date.now()).toDateString() !== messageDate) {
      acc.push({ type: 'separator', date: formatDateSeparator(messageDate) });
    }
    acc.push({ type: 'message', message });
    return acc;
  }, []);

  useEffect(() => { 
    const presetId = localStorage.getItem('chatReceiverId'); 
    if (presetId && studentList.length > 0) {
      const presetStudent = studentList.find(s => s._id === presetId);
      if (presetStudent) setCurrentReceiver(presetStudent);
      localStorage.removeItem('chatReceiverId');
    }
  }, [studentList]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!alumniToken) {
        setError(prev => ({ ...prev, contacts: 'Authentication required.'}));
        setLoading(prev => ({ ...prev, contacts: false}));
        return;
      }
      try {
        setError(prev => ({ ...prev, contacts: '' }));
        setLoading((prev) => ({ ...prev, contacts: true }));
        const res = await fetch('http://localhost:5000/api/search/students', { 
          headers: { Authorization: `Bearer ${alumniToken}` },
        });
        if (!res.ok) throw new Error(`Fetch students failed: ${res.statusText} (${res.status})`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setStudentList(data.map(s => ({ ...s, unreadCount: 0 }))); 
        } else throw new Error('Invalid student list format.');
      } catch (err) {
        console.error('Fetch Students Error:', err);
        setError(prev => ({ ...prev, contacts: err.message || 'Failed to load students.'}));
      } finally {
        setLoading((prev) => ({ ...prev, contacts: false }));
      }
    };
    fetchStudents();
  }, [alumniToken]);


  const loadMessages = useCallback(async () => {
    if (!currentReceiver?._id || !alumniToken) return;
    try {
      setError(prev => ({ ...prev, messages: '' }));
      setLoading((prev) => ({ ...prev, messages: true }));
      const res = await fetch(`http://localhost:5000/api/messages/${currentReceiver._id}`, {
        headers: { Authorization: `Bearer ${alumniToken}` },
      });
      if (!res.ok) throw new Error(`Load messages failed: ${res.statusText} (${res.status})`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data.sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0)));
      } else throw new Error('Invalid message format.');
    } catch (err) {
      console.error('Load Messages Error:', err);
      setError(prev => ({ ...prev, messages: err.message || 'Failed to load messages.'}));
    } finally {
      setLoading((prev) => ({ ...prev, messages: false }));
    }
  }, [currentReceiver?._id, alumniToken]);

  useEffect(() => {
    if (currentReceiver?._id) loadMessages();
    else setMessages([]);
  }, [currentReceiver?._id, loadMessages]);

  const handleSendMessage = async (content, messageType = 'text', fileDetails = null) => {
    if ((messageType === 'text' && !content.trim()) || !currentReceiver?._id || !alumniToken || !alumniId) {
        setError(prev => ({ ...prev, sending: 'Cannot send message. Missing required info.' }));
        return;
    }
    const tempMessageId = `temp_${Date.now()}`;
    const newMessage = {
        tempId: tempMessageId, _id: tempMessageId, sender: alumniId, 
        receiver: currentReceiver._id, 
        content: messageType === 'text' ? content : (fileDetails?.name || 'File'),
        type: messageType, fileUrl: messageType !== 'text' ? (fileDetails?.previewUrl || '') : undefined,
        // fileName: messageType !== 'text' ? (fileDetails?.name || 'File') : undefined,
        // fileSize: messageType !== 'text' ? (fileDetails?.size || 0) : undefined,
        timestamp: new Date().toISOString(), isRead: false, 
        isSending: messageType !== 'text' ? true : undefined,
    };
    setMessages(prev => [...prev, newMessage]);

    if (messageType === 'text') {
        try {
            setError(prev => ({ ...prev, sending: '' }));
            setLoading((prev) => ({ ...prev, sending: true }));
            const res = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${alumniToken}` },
                body: JSON.stringify({ receiverId: currentReceiver._id, content, type: 'text' }),
            });
            if (!res.ok) throw new Error(`Send message failed: ${res.statusText} (${res.status})`);
            const savedMessage = await res.json();
            setMessages(prev => prev.map(msg => (msg.tempId === tempMessageId ? savedMessage : msg)));
        } catch (err) {
            console.error('Send Text Message Error (Alumni):', err);
            setError(prev => ({ ...prev, sending: err.message || 'Failed to send message.'}));
            setMessages(prev => prev.filter(msg => msg.tempId !== tempMessageId));
        } finally {
            setLoading((prev) => ({ ...prev, sending: false }));
        }
    }
  };

  // const handleSendFile = async (file) => {
  //   if (!currentReceiver?._id || !alumniToken || !alumniId) {
  //     setError(prev => ({ ...prev, file: 'Cannot send file. Missing required info.' }));
  //     return;
  //   }
  //   const tempFileMessageId = `temp_file_${Date.now()}`;
  //   const fileType = file.type.startsWith('image/') ? 'image' : 'file';
  //   let previewUrl = fileType === 'image' ? URL.createObjectURL(file) : '';

  //   const optimisticFileMessage = {
  //       tempId: tempFileMessageId, _id: tempFileMessageId, sender: alumniId, receiver: currentReceiver._id,
  //       content: file.name, type: fileType, fileUrl: previewUrl, fileName: file.name, 
  //       fileSize: file.size, timestamp: new Date().toISOString(), isRead: false, isSending: true,
  //   };
  //   setMessages(prev => [...prev, optimisticFileMessage]);

  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('receiverId', currentReceiver._id); 
  //   formData.append('type', fileType);

  //   try {
  //       setError(prev => ({ ...prev, file: '' })); setLoading(prev => ({ ...prev, file: true }));
  //       const res = await fetch('http://localhost:5000/api/messages/upload', {
  //           method: 'POST', headers: { Authorization: `Bearer ${alumniToken}` }, body: formData,
  //       });
  //       if (!res.ok) throw new Error(`File upload failed: ${res.statusText} (${res.status})`);
  //       const savedFileMessage = await res.json();
  //       setMessages(prev => prev.map(msg => (msg.tempId === tempFileMessageId ? { ...savedFileMessage, isSending: false } : msg)));
  //       if (previewUrl) URL.revokeObjectURL(previewUrl);
  //   } catch (err) {
  //       console.error('Send File Error (Alumni):', err);
  //       setError(prev => ({ ...prev, file: err.message || 'Failed to send file.' }));
  //       setMessages(prev => prev.filter(msg => msg.tempId !== tempFileMessageId));
  //       if (previewUrl) URL.revokeObjectURL(previewUrl);
  //   } finally {
  //       setLoading(prev => ({ ...prev, file: false }));
  //   }
  // };

  const handleSelectStudent = (student) => setCurrentReceiver(student);

  return (
    <div className="flex justify-center items-center h-full w-full bg-slate-950 p-0 sm:p-4 md:p-6 lg:p-8">
      <div className="flex h-[95vh] sm:h-[90vh] md:h-[85vh] w-full max-w-6xl shadow-2xl rounded-none sm:rounded-xl overflow-hidden border border-slate-700/50">
        <ContactSidebar
          contactList={studentList}
          activeReceiverId={currentReceiver?._id}
          onSelectContact={handleSelectStudent}
          isLoading={loading.contacts}
          contactTypeLabel="Students"
        />
        <ChatArea
          receiver={currentReceiver}
          messagesWithSeparators={messagesWithSeparators}
          currentUserId={alumniId} 
          onSendMessage={handleSendMessage}
          // onSendFile={handleSendFile}
          isLoadingMessages={loading.messages}
          isSendingMessage={loading.sending || loading.file}
        />
        {(error.contacts || error.file || error.sending || error.messages) && (
            <div className="fixed bottom-4 right-4 bg-red-800/90 text-red-200 p-3 rounded-lg shadow-xl flex items-center max-w-sm animate-fadeInUp z-50">
                <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
                <span>{error.contacts || error.file || error.sending || error.messages || 'An error occurred.'}</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default AlumniChat;




























// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Send, Loader2, Users, Search, Check, CheckCheck,
//   MessageSquarePlus, AlertTriangle, Paperclip,
// } from 'lucide-react';

// // --- Date Formatting Helper ---
// const formatDateSeparator = (dateString) => {
//   const date = new Date(dateString);
//   const today = new Date();
//   const yesterday = new Date(today);
//   yesterday.setDate(today.getDate() - 1);
//   if (date.toDateString() === today.toDateString()) return 'TODAY';
//   if (date.toDateString() === yesterday.toDateString()) return 'YESTERDAY';
//   return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
// };

// // --- Reusable UI Helper Components ---
// const LoadingSpinner = ({ size = "h-8 w-8", color = "text-purple-400" }) => (
//   <Loader2 className={`animate-spin ${size} ${color}`} />
// );

// const UserAvatar = ({ name, src, size = "h-10 w-10", textSize = "text-lg" }) => {
//   const [imgError, setImgError] = useState(false);
//   const initial = name ? name.charAt(0).toUpperCase() : '?';
//   const shouldUseImage = src && !imgError;

//   useEffect(() => {
//     setImgError(false);
//   }, [src]);

//   if (shouldUseImage) {
//     return (<img src={src} alt={`${name || 'User'}'s avatar`} className={`flex-shrink-0 rounded-full object-cover shadow-md ${size}`} onError={() => { console.warn(`Avatar image failed to load: ${src}`); setImgError(true);}} />);
//   } else {
//     return (<div className={`flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md ${size} ${textSize}`} aria-label={`${name || 'User'} avatar`}>{initial}</div>);
//   }
// };

// // --- Chat Specific Components ---
// const ContactSidebar = ({ contactList, activeReceiverId, onSelectContact, isLoading, contactTypeLabel = "Contacts" }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const filteredContacts = contactList.filter(contact => (contact.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div className="w-[30%] min-w-[280px] sm:min-w-[300px] max-w-[400px] bg-slate-800/80 backdrop-blur-md border-r border-slate-700/50 flex flex-col h-full">
//       <div className="p-4 border-b border-slate-700/50 flex-shrink-0">
//         <h2 className="text-xl font-semibold text-white flex items-center"><Users className="mr-3 text-purple-400" size={24} />{contactTypeLabel}</h2>
//         <div className="relative mt-4">
//           <input type="text" placeholder="Search contacts..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
//         </div>
//       </div>
//       <div className="flex-grow overflow-y-auto custom-scrollbar">
//         {isLoading && (<div className="p-4 flex flex-col items-center justify-center h-full"><LoadingSpinner size="h-10 w-10" /><p className="mt-3 text-slate-300">Loading {contactTypeLabel.toLowerCase()}...</p></div>)}
//         {!isLoading && filteredContacts.length > 0 ? (
//           filteredContacts.map((contact) => (
//             <div key={contact._id} onClick={() => onSelectContact(contact)} className={`flex items-center p-3.5 cursor-pointer transition-colors duration-150 hover:bg-slate-700/70 border-b border-slate-700/30 ${activeReceiverId === contact._id ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/20' : ''}`} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onSelectContact(contact)}>
//               <UserAvatar src={contact.profilePic} name={contact.fullName} />
//               <div className="ml-3 overflow-hidden">
//                 <p className={`font-medium truncate ${activeReceiverId === contact._id ? 'text-purple-300' : 'text-slate-100'}`}>{contact.fullName}</p>
//                 <p className="text-xs text-slate-400 truncate">{contact.collegeName || 'Student'} {contact.passoutYear ? `(${contact.passoutYear})` : ''}</p>
//               </div>
//             </div>
//           ))
//         ) : (!isLoading && <p className="p-4 text-center text-slate-400">No {contactTypeLabel.toLowerCase()} found {searchTerm ? 'matching your search' : ''}.</p>)}
//       </div>
//     </div>
//   );
// };

// const MessageBubble = ({ message, isSender }) => {
//   const sentTime = new Date(message.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
//   const isRead = message.isRead;
//   const messageContentToDisplay = (typeof message.content === 'string' && message.content.trim() !== '') 
//                                 ? message.content 
//                                 : (message.type !== 'text' && message.fileName) 
//                                 ? message.fileName
//                                 : "[empty message]"; 

//   return (
//     <div className={`flex mb-1 ${isSender ? 'justify-end' : 'justify-start'}`}>
//       <div className={`px-3 py-1.5 rounded-lg text-sm max-w-[75%] sm:max-w-[65%] shadow-md break-words relative group min-w-[90px] sm:min-w-[100px] ${isSender ? 'bg-gradient-to-br from-cyan-600 to-sky-700 text-white rounded-br-md' : 'bg-slate-700 text-slate-100 rounded-bl-md'}`}>
//         <p className="whitespace-pre-wrap pb-4 pr-1">{messageContentToDisplay}</p>
//         <div className={`absolute bottom-1 right-1.5 text-[0.65rem] flex items-center pointer-events-none ${isSender ? 'text-sky-200/90' : 'text-slate-400/90'}`}>
//           <span>{sentTime.toLowerCase()}</span>
//           {isSender && (isRead ? <CheckCheck className="ml-1 h-3.5 w-3.5 text-sky-400" /> : <Check className="ml-1 h-3.5 w-3.5" />)}
//         </div>
//       </div>
//     </div>
//   );
// };

// const DateSeparator = ({ date }) => (
//   <div className="flex justify-center my-3"><span className="bg-slate-700/80 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full shadow">{date}</span></div>
// );

// const ChatArea = ({ receiver, messagesWithSeparators, currentUserId, onSendMessage, isLoadingMessages, isSendingMessage, onSendFile }) => {
//   const [content, setContent] = useState('');
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);
//   const fileInputRef = useRef(null);

//   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "auto" }); }, [messagesWithSeparators]);
//   useEffect(() => { if (receiver && inputRef.current) setTimeout(() => inputRef.current.focus(), 100); }, [receiver]);

//   const handleSend = () => { if (content.trim()) { onSendMessage(content.trim()); setContent(''); } };
//   const handleKeyPress = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };
//   const handleFileSelect = (event) => {
//     const file = event.target.files?.[0];
//     if (file) onSendFile(file);
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   if (!receiver) { 
//     return (
//       <div className="flex-grow flex flex-col items-center justify-center p-10 bg-slate-900/70 text-slate-300 h-full">
//         <MessageSquarePlus size={80} className="text-cyan-400/70 mb-6" />
//         <h3 className="text-2xl font-semibold text-white">Select a Student to Chat</h3>
//         <p className="mt-2 text-center max-w-sm">Choose a student from your mentee list or contacts.</p>
//       </div>
//     );
//   }

//   return ( 
//     <div className="flex-grow flex flex-col bg-slate-900/70 h-full overflow-hidden">
//       <header className="flex items-center p-3.5 border-b border-slate-700/50 bg-slate-800/90 backdrop-blur-sm flex-shrink-0">
//         <UserAvatar src={receiver.profilePic} name={receiver.fullName} size="h-10 w-10" textSize="text-lg" />
//         <div className="ml-3"><h3 className="text-md font-semibold text-white">{receiver.fullName}</h3></div>
//       </header>
//       <div className="flex-grow px-4 py-3 sm:px-6 sm:py-4 overflow-y-auto space-y-0.5 relative custom-scrollbar" style={{backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIoSURBVHhe7dJBCsNADETBAiD7704lqQUL6kMLYJ8FvP9gZuacY8YJPM8LzPM8LzDP87zAPM/zAvM8zwtM0vM2kPT8HSSp5214P8/zAqLPe19A9Hn7BkT/Tqbn/Z0h0vN+T5Dk+R1BkvN+TZDk+f0hQZLn43NIkvx+GZIk34+HJIkvx+NIkvx2NIgkyfsxIEnyPhyIJMn7MSBJ8j4MiCTJ+zEgSfI+HBYkyfsxIEnyPhwWJMn7MSBJ8j4cFCTJ+zEgSfI+HBAkyfsxIEnyPhwQJMn7MSBJ8j4cECTJ+zEgSfI+DBAkyfsxIEnyPhgQJMn7MSBJ8j4MCCRJ8j4MSJI+DIgkyfsxIEnyPiAgSfI+DIgkyfsxIEnyPiAgSfI+DIgkyfsxIEnyPhAQJMn7MSBJ8j4QECTJ+zEgSfI+ECTJ+zEgSfI+DwgkSfI+DIgkyfsxIEnyPhAQSZI+DIgkyfsxIEnyPhAQJMn7MSBJ8j4QJMn7MSBJ8j4MCCRJ8j4MSJI+HBAkSfI+DIgkyfsxIEnyPhgQJMn7MSBJ8j4MCCRJ8j4MSJI+DBAkyfsxIEnyPhwQJMn7MSBJ8j4cECTJ+zEgSfI+HBYkyfsxIEnyPhwWJMn7MSBJ8j4cFCTJ+zEgSfI+HBAkSfI+DIgkyfsxIEnyPhgQJMn7MSBJ8j4MCCRJ8j4MSJI+DIgkyfsxIEnyPiAgSfI+DIgkyfsxIEnyPhAQJMn7MSBJ8j4QECTJ+zEgSfI+zPM8LxDP87zAPM/zAvM8zwtM0vM2kPT8HSRp5uYcsMHkP3z+AYk2AAAAAElFTkSuQmCC")`, backgroundRepeat: 'repeat', backgroundSize: '300px', opacity: 0.9 }}>
//         {isLoadingMessages && (<div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm z-10"><LoadingSpinner /><p className="mt-3 text-slate-300">Loading messages...</p></div>)}
//         {!isLoadingMessages && messagesWithSeparators.length === 0 && (<p className="text-center text-sm text-slate-400 mt-10">No messages yet. Send a message to start!</p>)}
//         {messagesWithSeparators.map((item, index) => item.type === 'separator' ? (<DateSeparator key={`sep-${item.date}-${index}`} date={item.date} />) : (<MessageBubble key={item.message._id || item.message.tempId || `msg-${index}`} message={item.message} isSender={item.message.sender === currentUserId} />))}
//         <div ref={messagesEndRef} />
//       </div>
//       <footer className="p-3.5 border-t border-slate-700/50 bg-slate-800/90 backdrop-blur-sm flex-shrink-0">
//         <div className="flex items-center space-x-2 sm:space-x-3">
//           <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} accept="image/*,application/pdf,.doc,.docx,.txt" />
//           <button onClick={() => fileInputRef.current?.click()} className="p-2.5 text-slate-400 hover:text-cyan-400 transition-colors rounded-full hover:bg-slate-700/70" aria-label="Attach file" type="button"><Paperclip size={20} /></button>
//           <textarea ref={inputRef} value={content} onChange={(e) => setContent(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type a message" rows={1} className="flex-grow p-2.5 bg-slate-700/60 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none resize-none custom-scrollbar" style={{ maxHeight: '100px' }} />
//           <button onClick={handleSend} disabled={isSendingMessage || !content.trim()} className={`p-2.5 rounded-full transition-all duration-200 transform focus:outline-none focus:ring-1 focus:ring-cyan-500/70 ${!content.trim() || isSendingMessage ? 'bg-slate-600 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white shadow-lg hover:scale-105'}`} aria-label="Send message">
//             {isSendingMessage ? <LoadingSpinner size="h-5 w-5" color="text-white" /> : <Send size={20} />}
//           </button>
//         </div>
//       </footer>
//     </div>
//   );
// };

// // --- Main AlumniChat Component ---
// const AlumniChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [currentReceiver, setCurrentReceiver] = useState(null); 
//   const [studentList, setStudentList] = useState([]); 
//   const [loading, setLoading] = useState({ contacts: true, messages: false, sending: false, file: false });
//   const [error, setError] = useState({ contacts: '', messages: '', sending: '', file: '' });

//   const navigate = useNavigate();
//   const alumniId = localStorage.getItem('userId'); 
//   const alumniToken = localStorage.getItem('alumni_token'); 


//   const messagesWithSeparators = messages.reduce((acc, message, index) => {
//     const messageDate = new Date(message.timestamp || Date.now()).toDateString();
//     if (index === 0 || new Date(messages[index - 1].timestamp || Date.now()).toDateString() !== messageDate) {
//       acc.push({ type: 'separator', date: formatDateSeparator(messageDate) });
//     }
//     acc.push({ type: 'message', message });
//     return acc;
//   }, []);

//   useEffect(() => { 
//     const presetId = localStorage.getItem('chatReceiverId'); 
//     if (presetId && studentList.length > 0) {
//       const presetStudent = studentList.find(s => s._id === presetId);
//       if (presetStudent) setCurrentReceiver(presetStudent);
//       localStorage.removeItem('chatReceiverId');
//     }
//   }, [studentList]);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       if (!alumniToken) {
//         setError(prev => ({ ...prev, contacts: 'Authentication required.'}));
//         setLoading(prev => ({ ...prev, contacts: false}));
//         // navigate('/login'); // Consider redirecting if token is essential
//         return;
//       }
//       try {
//         setError(prev => ({ ...prev, contacts: '' }));
//         setLoading((prev) => ({ ...prev, contacts: true }));
//         const res = await fetch('http://localhost:5000/api/search/students', { 
//           headers: { Authorization: `Bearer ${alumniToken}` },
//         });
//         if (!res.ok) throw new Error(`Fetch students failed: ${res.statusText} (${res.status})`);
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           setStudentList(data.map(s => ({ ...s, unreadCount: 0 }))); 
//         } else throw new Error('Invalid student list format from server.');
//       } catch (err) {
//         console.error('Fetch Students Error:', err);
//         setError(prev => ({ ...prev, contacts: err.message || 'Failed to load students.'}));
//       } finally {
//         setLoading((prev) => ({ ...prev, contacts: false }));
//       }
//     };
//     fetchStudents();
//   }, [alumniToken, navigate]); // Added navigate to dependency


//   const loadMessages = useCallback(async () => {
//     if (!currentReceiver?._id || !alumniToken) return;
//     try {
//       setError(prev => ({ ...prev, messages: '' }));
//       setLoading((prev) => ({ ...prev, messages: true }));
//       const res = await fetch(`http://localhost:5000/api/messages/${currentReceiver._id}`, {
//         headers: { Authorization: `Bearer ${alumniToken}` },
//       });
//       if (!res.ok) throw new Error(`Load messages failed: ${res.statusText} (${res.status})`);
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setMessages(data.sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0)));
//       } else throw new Error('Invalid message format from server.');
//     } catch (err) {
//       console.error('Load Messages Error:', err);
//       setError(prev => ({ ...prev, messages: err.message || 'Failed to load messages.'}));
//     } finally {
//       setLoading((prev) => ({ ...prev, messages: false }));
//     }
//   }, [currentReceiver?._id, alumniToken]);

//   useEffect(() => {
//     if (currentReceiver?._id) loadMessages();
//     else setMessages([]);
//   }, [currentReceiver?._id, loadMessages]);

//   const handleSendMessage = async (textContentFromInput, messageType = 'text', fileDetails = null) => {
//     console.log("[AlumniChat] handleSendMessage: textContent:", `"${textContentFromInput}"`, "type:", messageType);
//     if (!alumniId) {
//         setError(prev => ({ ...prev, sending: 'User ID not found. Cannot send message.' }));
//         console.error("AlumniChat: alumniId (sender ID) is missing from localStorage.");
//         return;
//     }
//     if (messageType === 'text' && (!textContentFromInput || !textContentFromInput.trim())) {
//         setError(prev => ({ ...prev, sending: 'Cannot send an empty text message.' }));
//         return;
//     }
//     if (!currentReceiver?._id || !alumniToken) {
//         setError(prev => ({ ...prev, sending: 'Cannot send message. Receiver or token missing.' }));
//         return;
//     }
    
//     const tempMessageId = `temp_${Date.now()}`;
//     const newMessage = {
//         tempId: tempMessageId, 
//         _id: tempMessageId, 
//         sender: alumniId,
//         receiver: currentReceiver._id, 
//         content: messageType === 'text' ? textContentFromInput.trim() : (fileDetails?.name || 'File'),
//         type: messageType, 
//         fileUrl: messageType !== 'text' ? (fileDetails?.previewUrl || '') : undefined,
//         fileName: messageType !== 'text' ? (fileDetails?.name || '') : undefined,
//         fileSize: messageType !== 'text' ? (fileDetails?.size || 0) : undefined,
//         timestamp: new Date().toISOString(), 
//         isRead: false, 
//         isSending: messageType !== 'text' ? true : undefined,
//     };
//     console.log("[AlumniChat] Optimistic message to add:", JSON.stringify(newMessage, null, 2));
//     setMessages(prev => [...prev, newMessage]);

//     if (messageType === 'text') {
//         try {
//             setError(prev => ({ ...prev, sending: '' }));
//             setLoading((prev) => ({ ...prev, sending: true }));
//             const res = await fetch('http://localhost:5000/api/messages', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${alumniToken}` },
//                 body: JSON.stringify({ receiverId: currentReceiver._id, content: textContentFromInput.trim(), type: 'text' }),
//             });
//             if (!res.ok) {
//                 const errData = await res.json().catch(() => ({message: `HTTP error! Status: ${res.status}`}));
//                 throw new Error(errData.message || `Send message failed: ${res.statusText} (${res.status})`);
//             }
//             const savedMessageFromServer = await res.json();
//             console.log("[AlumniChat] Text message saved by server:", savedMessageFromServer);
//             setMessages(prev => prev.map(msg => 
//                 msg.tempId === tempMessageId 
//                 ? { ...savedMessageFromServer, sender: savedMessageFromServer.sender?._id || savedMessageFromServer.sender || alumniId } 
//                 : msg
//             ));
//         } catch (err) {
//             console.error('Send Text Message Error (Alumni):', err);
//             setError(prev => ({ ...prev, sending: err.message || 'Failed to send message.'}));
//             setMessages(prev => prev.filter(msg => msg.tempId !== tempMessageId));
//         } finally {
//             setLoading((prev) => ({ ...prev, sending: false }));
//         }
//     }
//   };

//   const handleSendFile = async (file) => {
//     if (!alumniId) {
//         setError(prev => ({ ...prev, file: 'User ID not found. Cannot send file.' }));
//         console.error("AlumniChat: alumniId (sender ID) is missing for file send.");
//         return;
//     }
//     if (!currentReceiver?._id || !alumniToken) {
//       setError(prev => ({ ...prev, file: 'Cannot send file. Missing required info.' }));
//       return;
//     }
//     const tempFileMessageId = `temp_file_${Date.now()}`;
//     const fileType = file.type.startsWith('image/') ? 'image' : 'file';
//     let previewUrl = fileType === 'image' ? URL.createObjectURL(file) : '';

//     const optimisticFileMessage = {
//         tempId: tempFileMessageId, _id: tempFileMessageId, sender: alumniId, receiver: currentReceiver._id,
//         content: file.name, type: fileType, fileUrl: previewUrl, fileName: file.name, 
//         fileSize: file.size, timestamp: new Date().toISOString(), isRead: false, isSending: true,
//     };
//     console.log("[AlumniChat] Optimistic file message to add:", JSON.stringify(optimisticFileMessage, null, 2));
//     setMessages(prev => [...prev, optimisticFileMessage]);

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('receiverId', currentReceiver._id); 
//     formData.append('type', fileType);

//     try {
//         setError(prev => ({ ...prev, file: '' })); setLoading(prev => ({ ...prev, file: true }));
//         const res = await fetch('http://localhost:5000/api/messages/upload', {
//             method: 'POST', headers: { Authorization: `Bearer ${alumniToken}` }, body: formData,
//         });
//         if (!res.ok) {
//             const errData = await res.json().catch(() => ({message: `HTTP error! Status: ${res.status}`}));
//             throw new Error(errData.message || `File upload failed: ${res.statusText} (${res.status})`);
//         }
//         const savedFileMessageFromServer = await res.json();
//         console.log("[AlumniChat] File message saved by server:", savedFileMessageFromServer);
//         setMessages(prev => prev.map(msg => 
//             msg.tempId === tempFileMessageId 
//             ? { ...savedFileMessageFromServer, sender: savedFileMessageFromServer.sender?._id || savedFileMessageFromServer.sender || alumniId, isSending: false } 
//             : msg
//         ));
//         if (previewUrl) URL.revokeObjectURL(previewUrl);
//     } catch (err) {
//         console.error('Send File Error (Alumni):', err);
//         setError(prev => ({ ...prev, file: err.message || 'Failed to send file.' }));
//         setMessages(prev => prev.filter(msg => msg.tempId !== tempFileMessageId));
//         if (previewUrl) URL.revokeObjectURL(previewUrl);
//     } finally {
//         setLoading(prev => ({ ...prev, file: false }));
//     }
//   };

//   const handleSelectStudent = (student) => setCurrentReceiver(student);

//   return (
//     <div className="flex justify-center items-center h-full w-full bg-slate-950 p-0 sm:p-4 md:p-6 lg:p-8">
//       <div className="flex h-[95vh] sm:h-[90vh] md:h-[85vh] w-full max-w-6xl shadow-2xl rounded-none sm:rounded-xl overflow-hidden border border-slate-700/50">
//         <ContactSidebar
//           contactList={studentList}
//           activeReceiverId={currentReceiver?._id}
//           onSelectContact={handleSelectStudent}
//           isLoading={loading.contacts}
//           contactTypeLabel="Students"
//         />
//         <ChatArea
//           receiver={currentReceiver}
//           messagesWithSeparators={messagesWithSeparators}
//           currentUserId={alumniId} 
//           onSendMessage={handleSendMessage}
//           onSendFile={handleSendFile}
//           isLoadingMessages={loading.messages}
//           isSendingMessage={loading.sending || loading.file}
//         />
//         {(error.contacts || error.file || error.sending || error.messages) && (
//             <div className="fixed bottom-4 right-4 bg-red-800/90 text-red-200 p-3 rounded-lg shadow-xl flex items-center max-w-sm animate-fadeInUp z-50">
//                 <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
//                 <span>{error.contacts || error.file || error.sending || error.messages || 'An error occurred.'}</span>
//             </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AlumniChat;