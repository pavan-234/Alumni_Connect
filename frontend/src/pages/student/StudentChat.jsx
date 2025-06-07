// import React, { useEffect, useState, useRef } from 'react';

// const StudentChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [receiverId, setReceiverId] = useState('');
//   const [content, setContent] = useState('');
//   const [alumniList, setAlumniList] = useState([]);
//   const [loading, setLoading] = useState({ alumni: true, messages: false, sending: false });
//   const [error, setError] = useState('');
//   const studentId = localStorage.getItem('userId');
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to the latest message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Load preset receiver if stored
//   useEffect(() => {
//     const presetId = localStorage.getItem('chatReceiverId');
//     if (presetId) {
//       setReceiverId(presetId);
//       localStorage.removeItem('chatReceiverId');
//     }
//   }, []);

//   // Fetch alumni list
//   useEffect(() => {
//     const fetchAlumni = async () => {
//       try {
//         setError('');
//         setLoading((prev) => ({ ...prev, alumni: true }));
//         const role = localStorage.getItem('role');
//         const token =
//           role === 'student'
//             ? localStorage.getItem('student_token')
//             : role === 'alumni'
//             ? localStorage.getItem('alumni_token')
//             : role === 'admin'
//             ? localStorage.getItem('admin_token')
//             : null;

//         if (!token) {
//           throw new Error('Authentication token not found.');
//         }

//         const res = await fetch('http://localhost:5000/api/search/alumni', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           setAlumniList(data);
//         } else {
//           console.error('Invalid alumni list format', data);
//           setError('Failed to load alumni list.');
//           setAlumniList([]);
//         }
//       } catch (err) {
//         console.error('Error fetching alumni list:', err);
//         setError('Error fetching alumni list. Please try again.');
//         setAlumniList([]);
//       } finally {
//         setLoading((prev) => ({ ...prev, alumni: false }));
//       }
//     };

//     fetchAlumni();
//   }, []);

//   // Load messages with selected alumni
//   const loadMessages = async () => {
//     if (!receiverId) return;
//     try {
//       setError('');
//       setLoading((prev) => ({ ...prev, messages: true }));
//       const res = await fetch(`http://localhost:5000/api/messages/${receiverId}`, {
//         credentials: 'include',
//       });
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setMessages(data);
//       } else {
//         console.error('Invalid messages format', data);
//         setError('Failed to load messages.');
//         setMessages([]);
//       }
//     } catch (err) {
//       console.error('Error loading messages:', err);
//       setError('Error loading messages. Please try again.');
//       setMessages([]);
//     } finally {
//       setLoading((prev) => ({ ...prev, messages: false }));
//     }
//   };

//   // Auto-load messages when receiver changes
//   useEffect(() => {
//     if (receiverId) {
//       loadMessages();
//     } else {
//       setMessages([]);
//     }
//   }, [receiverId]);

//   // Send message
//   const handleSend = async () => {
//     if (!content.trim() || !receiverId) return;

//     try {
//       setError('');
//       setLoading((prev) => ({ ...prev, sending: true }));
//       await fetch('http://localhost:5000/api/messages', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ receiverId, content }),
//       });
//       setContent('');
//       await loadMessages(); // Reload after sending
//     } catch (err) {
//       console.error('Error sending message:', err);
//       setError('Error sending message. Please try again.');
//     } finally {
//       setLoading((prev) => ({ ...prev, sending: false }));
//     }
//   };

//   if (loading.alumni) {
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
//           <p className="mt-2 text-gray-600">Loading alumni...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
//       <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
//         <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//           Chat with Alumni
//         </h2>
//         {error && (
//           <p className="text-red-600 text-sm mb-4" role="alert">
//             {error}
//           </p>
//         )}
//         {!studentId && (
//           <p className="text-red-600 text-sm mb-4" role="alert">
//             User ID not found. Please log in again.
//           </p>
//         )}
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="alumniSelect" className="block text-sm font-medium text-gray-700">
//               Select Alumni
//             </label>
//             <select
//               id="alumniSelect"
//               value={receiverId}
//               onChange={(e) => setReceiverId(e.target.value)}
//               className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//               disabled={loading.sending || !studentId}
//               aria-label="Select an alumni to chat with"
//             >
//               <option value="">Select Alumni</option>
//               {alumniList.length > 0 ? (
//                 alumniList.map((a) => (
//                   <option key={a._id} value={a._id}>
//                     {a.fullName}
//                   </option>
//                 ))
//               ) : (
//                 <option value="" disabled>
//                   No alumni available
//                 </option>
//               )}
//             </select>
//           </div>
//           {receiverId && (
//             <div className="space-y-4">
//               <div
//                 className="max-h-96 overflow-y-auto border border-gray-200 rounded-md p-4 bg-gray-50"
//                 aria-live="polite"
//               >
//                 {loading.messages ? (
//                   <div className="flex justify-center">
//                     <svg
//                       className="animate-spin h-6 w-6 text-blue-600"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                   </div>
//                 ) : messages.length === 0 ? (
//                   <p className="text-gray-500 text-center">No messages yet.</p>
//                 ) : (
//                   messages.map((m, i) => (
//                     <div
//                       key={i}
//                       className={`flex ${
//                         m.sender === studentId ? 'justify-end' : 'justify-start'
//                       } mb-2`}
//                     >
//                       <div
//                         className={`max-w-xs rounded-lg p-3 ${
//                           m.sender === studentId
//                             ? 'bg-blue-100 text-blue-900'
//                             : 'bg-gray-100 text-gray-900'
//                         }`}
//                       >
//                         <p>{m.content}</p>
//                       </div>
//                     </div>
//                   ))
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   placeholder="Type a message"
//                   className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                   disabled={loading.sending || !studentId}
//                   aria-label="Type a message to send"
//                 />
//                 <button
//                   onClick={handleSend}
//                   className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
//                   disabled={loading.sending || !content.trim() || !studentId}
//                   aria-label="Send message"
//                 >
//                   {loading.sending ? 'Sending...' : 'Send'}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default StudentChat;
// import React, { useEffect, useState, useRef } from 'react';

// const StudentChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [receiverId, setReceiverId] = useState('');
//   const [content, setContent] = useState('');
//   const [alumniList, setAlumniList] = useState([]);
//   const [loading, setLoading] = useState({ alumni: true, messages: false, sending: false });
//   const [error, setError] = useState('');
//   const studentId = localStorage.getItem('userId');
//   const studentToken = localStorage.getItem('student_token');
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Load previously selected receiverId
//   useEffect(() => {
//     const presetId = localStorage.getItem('chatReceiverId');
//     if (presetId) {
//       setReceiverId(presetId);
//       localStorage.removeItem('chatReceiverId');
//     }
//   }, []);

//   // Fetch alumni list
//   useEffect(() => {
//     const fetchAlumni = async () => {
//       try {
//         setLoading((prev) => ({ ...prev, alumni: true }));
//         const res = await fetch('http://localhost:5000/api/search/alumni', {
//           headers: {
//             Authorization: `Bearer ${studentToken}`,
//           },
//         });
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           setAlumniList(data);
//         } else {
//           throw new Error('Invalid alumni list');
//         }
//       } catch (err) {
//         console.error('Error fetching alumni:', err);
//         setError('Failed to load alumni list.');
//       } finally {
//         setLoading((prev) => ({ ...prev, alumni: false }));
//       }
//     };

//     fetchAlumni();
//   }, [studentToken]);

//   // Fetch messages when receiver changes
//   useEffect(() => {
//     if (receiverId) {
//       loadMessages();
//     } else {
//       setMessages([]);
//     }
//   }, [receiverId]);

//   // Load messages with the selected alumni
//   const loadMessages = async () => {
//     if (!receiverId || !studentToken) return;
//     try {
//       setLoading((prev) => ({ ...prev, messages: true }));
//       const res = await fetch(`http://localhost:5000/api/messages/${receiverId}`, {
//         headers: {
//           Authorization: `Bearer ${studentToken}`,
//         },
//       });
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setMessages(data);
//       } else {
//         throw new Error('Invalid message format');
//       }
//     } catch (err) {
//       console.error('Error loading messages:', err);
//       setError('Failed to load messages.');
//     } finally {
//       setLoading((prev) => ({ ...prev, messages: false }));
//     }
//   };

//   // Send message
//   const handleSend = async () => {
//     if (!content.trim() || !receiverId || !studentToken) return;
//     try {
//       setLoading((prev) => ({ ...prev, sending: true }));
//       await fetch('http://localhost:5000/api/messages', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${studentToken}`,
//         },
//         body: JSON.stringify({ receiverId, content }),
//       });
//       setContent('');
//       await loadMessages();
//     } catch (err) {
//       console.error('Error sending message:', err);
//       setError('Failed to send message.');
//     } finally {
//       setLoading((prev) => ({ ...prev, sending: false }));
//     }
//   };

//   // UI
//   if (loading.alumni) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-gray-600">Loading alumni...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-4">
//       <h2 className="text-2xl font-bold mb-4 text-center">Chat with Alumni</h2>
//       {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

//       <select
//         className="w-full p-2 border mb-4 rounded"
//         value={receiverId}
//         onChange={(e) => setReceiverId(e.target.value)}
//       >
//         <option value="">Select an alumni</option>
//         {alumniList.map((alumni) => (
//           <option key={alumni._id} value={alumni._id}>
//             {alumni.fullName}
//           </option>
//         ))}
//       </select>

//       {receiverId && (
//         <>
//           <div className="border p-3 rounded h-80 overflow-y-auto bg-gray-50">
//             {loading.messages ? (
//               <p className="text-center text-sm text-gray-500">Loading messages...</p>
//             ) : messages.length === 0 ? (
//               <p className="text-center text-sm text-gray-500">No messages yet.</p>
//             ) : (
//               messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`flex mb-2 ${
//                     msg.sender === studentId ? 'justify-end' : 'justify-start'
//                   }`}
//                 >
//                   <div
//                     className={`px-3 py-2 rounded-lg text-sm max-w-xs ${
//                       msg.sender === studentId ? 'bg-blue-100' : 'bg-gray-200'
//                     }`}
//                   >
//                     {msg.content}
//                   </div>
//                 </div>
//               ))
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="flex mt-3 gap-2">
//             <input
//               type="text"
//               className="flex-1 p-2 border rounded"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="Type your message"
//             />
//             <button
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
//               onClick={handleSend}
//               disabled={loading.sending || !content.trim()}
//             >
//               {loading.sending ? 'Sending...' : 'Send'}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default StudentChat;


















// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import {
//   Send,
//   Loader2,
//   Users,
//   Search,
//   Check,
//   CheckCheck,
//   MessageSquarePlus,
//   AlertTriangle,
//   Paperclip, // Added for file input
// } from 'lucide-react';

// // --- Date Formatting Helper ---
// const formatDateSeparator = (dateString) => {
//   const date = new Date(dateString);
//   const today = new Date();
//   const yesterday = new Date(today);
//   yesterday.setDate(today.getDate() - 1);

//   if (date.toDateString() === today.toDateString()) {
//     return 'TODAY';
//   }
//   if (date.toDateString() === yesterday.toDateString()) {
//     return 'YESTERDAY';
//   }
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
// };

// // --- Reusable UI Helper Components ---
// const LoadingSpinner = ({ size = "h-8 w-8", color = "text-purple-400" }) => (
//   <Loader2 className={`animate-spin ${size} ${color}`} />
// );

// const UserAvatar = ({ name, size = "h-10 w-10", textSize = "text-lg" }) => {
//   const initial = name ? name.charAt(0).toUpperCase() : '?';
//   return (
//     <div
//       className={`flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md ${size} ${textSize}`}
//     >
//       {initial}
//     </div>
//   );
// };

// // --- Chat Specific Components ---

// const ChatSidebar = ({ alumniList, activeReceiverId, onSelectAlumni, isLoading }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredAlumni = alumniList.filter(alumni =>
//     alumni.fullName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="w-[30%] min-w-[280px] sm:min-w-[300px] max-w-[400px] bg-slate-800/80 backdrop-blur-md border-r border-slate-700/50 flex flex-col h-full">
//       <div className="p-4 border-b border-slate-700/50 flex-shrink-0">
//         <h2 className="text-xl font-semibold text-white flex items-center">
//           <Users className="mr-3 text-purple-400" size={24} />
//           Chats
//         </h2>
//         <div className="relative mt-4">
//           <input
//             type="text"
//             placeholder="Search or start new chat"
//             className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-700/60 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
//         </div>
//       </div>
//       <div className="flex-grow overflow-y-auto custom-scrollbar">
//         {isLoading && (
//             <div className="p-4 flex flex-col items-center justify-center h-full">
//                 <LoadingSpinner size="h-10 w-10" />
//                 <p className="mt-3 text-slate-300">Loading contacts...</p>
//             </div>
//         )}
//         {!isLoading && filteredAlumni.length > 0 ? (
//           filteredAlumni.map((alumni) => (
//             <div
//               key={alumni._id}
//               onClick={() => onSelectAlumni(alumni)}
//               className={`flex items-center p-3.5 cursor-pointer transition-colors duration-150 hover:bg-slate-700/70 border-b border-slate-700/30
//                           ${activeReceiverId === alumni._id ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/20' : ''}`}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => e.key === 'Enter' && onSelectAlumni(alumni)}
//             >
//               <UserAvatar name={alumni.fullName} />
//               <div className="ml-3 overflow-hidden">
//                 <p className={`font-medium truncate ${activeReceiverId === alumni._id ? 'text-purple-300' : 'text-slate-100'}`}>
//                   {alumni.fullName}
//                 </p>
//               </div>
//               {/* Placeholder for Unread Count Badge - to be implemented */}
//               {/* {alumni.unreadCount > 0 && (
//                 <span className="ml-auto bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                   {alumni.unreadCount}
//                 </span>
//               )} */}
//             </div>
//           ))
//         ) : (!isLoading && <p className="p-4 text-center text-slate-400">No alumni found.</p>)}
//       </div>
//     </div>
//   );
// };

// const MessageBubble = ({ message, isSender }) => {
//   const sentTime = new Date(message.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
//   const isRead = message.isRead;

//   return (
//     <div className={`flex mb-1 ${isSender ? 'justify-end' : 'justify-start'}`}>
//       <div
//         className={`px-3 py-1.5 rounded-lg text-sm max-w-[75%] sm:max-w-[65%] shadow-md break-words relative group min-w-[90px] sm:min-w-[100px]
//                     ${isSender
//                       ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-md'
//                       : 'bg-slate-700 text-slate-100 rounded-bl-md'
//                     }`}
//       >
//         {/* Content with padding to make space for the timestamp */}
//         {/* FIX for Timestamp Overlap: Added pb-4 to make space for the absolutely positioned timestamp. */}
//         <p className="whitespace-pre-wrap pb-4 pr-1"> {/* Reduced pr-1 as timestamp is absolute in its own space */}
//           {message.content}
//         </p>
        
//         {/* Timestamp and Read Receipt Area */}
//         <div className={`absolute bottom-1 right-1.5 text-[0.65rem] flex items-center pointer-events-none 
//                     ${isSender ? 'text-blue-200/90' : 'text-slate-400/90'}`}>
//           <span>{sentTime.toLowerCase()}</span>
//           {isSender && (
//             isRead ? <CheckCheck className="ml-1 h-3.5 w-3.5 text-sky-400" /> : <Check className="ml-1 h-3.5 w-3.5" />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


// const DateSeparator = ({ date }) => (
//   <div className="flex justify-center my-3">
//     <span className="bg-slate-700/80 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full shadow">
//       {date}
//     </span>
//   </div>
// );


// const ChatArea = ({ receiver, messagesWithSeparators, studentId, onSendMessage, isLoadingMessages, isSendingMessage, onSendFile }) => {
//   const [content, setContent] = useState('');
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);
//   const fileInputRef = useRef(null); // Ref for file input

//   useEffect(() => {
//     if (messagesEndRef.current) {
//         messagesEndRef.current?.scrollIntoView({ behavior: "auto" }); 
//     }
//   }, [messagesWithSeparators]);


//   useEffect(() => {
//     if (receiver && inputRef.current) {
//         setTimeout(() => inputRef.current.focus(), 100);
//     }
//   }, [receiver]);


//   const handleSend = () => {
//     if (content.trim()) {
//       onSendMessage(content.trim());
//       setContent('');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const handleFileSelect = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       onSendFile(file);
//     }
//     // Reset file input to allow selecting the same file again
//     if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//     }
//   };


//   if (!receiver) {
//     return (
//       <div className="flex-grow flex flex-col items-center justify-center p-10 bg-slate-900/70 text-slate-300 h-full">
//         <MessageSquarePlus size={80} className="text-purple-400/70 mb-6" />
//         <h3 className="text-2xl font-semibold text-white">Select a Chat</h3>
//         <p className="mt-2 text-center max-w-sm">
//           Choose an alumnus from the list to start a conversation.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-grow flex flex-col bg-slate-900/70 h-full overflow-hidden">
//       <header className="flex items-center p-3.5 border-b border-slate-700/50 bg-slate-800/90 backdrop-blur-sm flex-shrink-0">
//         <UserAvatar name={receiver.fullName} size="h-10 w-10" textSize="text-lg" />
//         <div className="ml-3">
//           <h3 className="text-md font-semibold text-white">{receiver.fullName}</h3>
//         </div>
//       </header>
//       <div className="flex-grow px-4 py-3 sm:px-6 sm:py-4 overflow-y-auto space-y-0.5 relative custom-scrollbar"
//            style={{
//              backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIoSURBVHhe7dJBCsNADETBAiD7704lqQUL6kMLYJ8FvP9gZuacY8YJPM8LzPM8LzDP87zAPM/zAvM8zwtM0vM2kPT8HSSp5214P8/zAqLPe19A9Hn7BkT/Tqbn/Z0h0vN+T5Dk+R1BkvN+TZDk+f0hQZLn43NIkvx+GZIk34+HJIkvx+NIkvx2NIgkyfsxIEnyPhyIJMn7MSBJ8j4MiCTJ+zEgSfI+HBYkyfsxIEnyPhwWJMn7MSBJ8j4cFCTJ+zEgSfI+HBAkyfsxIEnyPhwQJMn7MSBJ8j4cECTJ+zEgSfI+DBAkyfsxIEnyPhgQJMn7MSBJ8j4MCCRJ8j4MSJI+DIgkyfsxIEnyPiAgSfI+DIgkyfsxIEnyPiAgSfI+DIgkyfsxIEnyPhAQJMn7MSBJ8j4QECTJ+zEgSfI+ECTJ+zEgSfI+DwgkSfI+DIgkyfsxIEnyPhAQSZI+DIgkyfsxIEnyPhAQJMn7MSBJ8j4QJMn7MSBJ8j4MCCRJ8j4MSJI+HBAkSfI+DIgkyfsxIEnyPhgQJMn7MSBJ8j4MCCRJ8j4MSJI+DBAkyfsxIEnyPhwQJMn7MSBJ8j4cECTJ+zEgSfI+HBYkyfsxIEnyPhwWJMn7MSBJ8j4cFCTJ+zEgSfI+HBAkSfI+DIgkyfsxIEnyPhgQJMn7MSBJ8j4MCCRJ8j4MSJI+DIgkyfsxIEnyPiAgSfI+DIgkyfsxIEnyPhAQJMn7MSBJ8j4QECTJ+zEgSfI+zPM8LxDP87zAPM/zAvM8zwtM0vM2kPT8HSRp5uYcsMHkP3z+AYk2AAAAAElFTkSuQmCC")`,
//              backgroundRepeat: 'repeat', backgroundSize: '300px', opacity: 0.9,
//            }}
//       >
//         {isLoadingMessages && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm z-10">
//             <LoadingSpinner />
//             <p className="mt-3 text-slate-300">Loading messages...</p>
//           </div>
//         )}
//         {!isLoadingMessages && messagesWithSeparators.length === 0 && (
//           <p className="text-center text-sm text-slate-400 mt-10">
//             No messages yet. Start the conversation!
//           </p>
//         )}
//         {messagesWithSeparators.map((item, index) =>
//           item.type === 'separator' ? (
//             <DateSeparator key={`sep-${item.date}-${index}`} date={item.date} />
//           ) : (
//             <MessageBubble
//               key={item.message._id || item.message.tempId || `msg-${index}`}
//               message={item.message}
//               isSender={item.message.sender === studentId}
//             />
//           )
//         )}
//         <div ref={messagesEndRef} />
//       </div>
//       <footer className="p-3.5 border-t border-slate-700/50 bg-slate-800/90 backdrop-blur-sm flex-shrink-0">
//         <div className="flex items-center space-x-2 sm:space-x-3">
//           {/* File Input UI */}
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="hidden"
//             onChange={handleFileSelect}
//             // Multiple accept types for images and common documents
//             accept="image/png, image/jpeg, image/gif, image/webp, application/pdf, .doc, .docx, .txt, .xls, .xlsx, .ppt, .pptx"
//           />
//           <button
//             onClick={() => fileInputRef.current?.click()}
//             className="p-2.5 text-slate-400 hover:text-purple-400 transition-colors rounded-full hover:bg-slate-700/70"
//             aria-label="Attach file"
//             type="button" // Ensure it's not treated as a submit button if inside a form
//           >
//             <Paperclip size={20} />
//           </button>
//           <textarea
//             ref={inputRef}
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Type a message"
//             rows={1}
//             className="flex-grow p-2.5 bg-slate-700/60 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none resize-none custom-scrollbar"
//             style={{ maxHeight: '100px' }}
//           />
//           <button
//             onClick={handleSend}
//             disabled={isSendingMessage || !content.trim()}
//             className={`p-2.5 rounded-full transition-all duration-200 transform focus:outline-none focus:ring-1 focus:ring-purple-500/70
//                         ${!content.trim() || isSendingMessage
//                           ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
//                           : 'bg-gradient-to-br from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:scale-105'
//                         }`}
//             aria-label="Send message"
//           >
//             {isSendingMessage ? <LoadingSpinner size="h-5 w-5" color="text-white" /> : <Send size={20} />}
//           </button>
//         </div>
//       </footer>
//     </div>
//   );
// };

// // --- Main StudentChat Component ---
// const StudentChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [currentReceiver, setCurrentReceiver] = useState(null);
//   const [alumniList, setAlumniList] = useState([]);
//   const [loading, setLoading] = useState({ alumni: true, messages: false, sending: false, file: false }); // Added file loading state
//   const [error, setError] = useState({ alumni: '', messages: '', sending: '', file: '' }); // Added file error state

//   const studentId = localStorage.getItem('userId'); // Fetch once
//   const role = localStorage.getItem('role');
//         const studentToken =
//           role === 'student'
//             ? localStorage.getItem('student_token')
//             : role === 'alumni'
//             ? localStorage.getItem('alumni_token')
//             : role === 'admin'
//             ? localStorage.getItem('admin_token')
//             : null;

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
//     if (presetId && alumniList.length > 0) {
//       const presetAlumnus = alumniList.find(a => a._id === presetId);
//       if (presetAlumnus) {
//         setCurrentReceiver(presetAlumnus);
//       }
//       localStorage.removeItem('chatReceiverId');
//     }
//   }, [alumniList]);

//   useEffect(() => {
//     const fetchAlumni = async () => {
//       if (!studentToken) {
//         setError(prev => ({ ...prev, alumni: 'Authentication required to load contacts.'}));
//         setLoading(prev => ({ ...prev, alumni: false}));
//         return;
//       }
//       try {
//         setError(prev => ({ ...prev, alumni: '' }));
//         setLoading((prev) => ({ ...prev, alumni: true }));
//         const res = await fetch('http://localhost:5000/api/search/alumni', {
//           headers: { Authorization: `Bearer ${studentToken}` },
//         });
//         if (!res.ok) throw new Error(`Fetch alumni failed: ${res.statusText} (${res.status})`);
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           // Add unreadCount placeholder - this should come from backend
//           const alumniWithUnread = data.map(al => ({ ...al, unreadCount: 0 }));
//           setAlumniList(alumniWithUnread);
//         } else throw new Error('Invalid alumni list format.');
//       } catch (err) {
//         console.error('Fetch Alumni Error:', err);
//         setError(prev => ({ ...prev, alumni: err.message || 'Failed to load alumni.'}));
//       } finally {
//         setLoading((prev) => ({ ...prev, alumni: false }));
//       }
//     };
//     fetchAlumni();
//   }, [studentToken]);


//   const loadMessages = useCallback(async () => {
//     if (!currentReceiver?._id || !studentToken) return;
//     try {
//       setError(prev => ({ ...prev, messages: '' }));
//       setLoading((prev) => ({ ...prev, messages: true }));
//       const res = await fetch(`http://localhost:5000/api/messages/${currentReceiver._id}`, {
//         headers: { Authorization: `Bearer ${studentToken}` },
//       });
//       if (!res.ok) throw new Error(`Load messages failed: ${res.statusText} (${res.status})`);
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         const sortedMessages = data.sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0));
//         setMessages(sortedMessages);
//         // TODO: Implement marking messages as read here
//         // markMessagesAsRead(currentReceiver._id);
//       } else throw new Error('Invalid message format.');
//     } catch (err) {
//       console.error('Load Messages Error:', err);
//       setError(prev => ({ ...prev, messages: err.message || 'Failed to load messages.'}));
//     } finally {
//       setLoading((prev) => ({ ...prev, messages: false }));
//     }
//   }, [currentReceiver?._id, studentToken]);

//   useEffect(() => {
//     if (currentReceiver?._id) {
//       loadMessages();
//     } else {
//       setMessages([]);
//     }
//   }, [currentReceiver?._id, loadMessages]);

//   const handleSendMessage = async (content, messageType = 'text', fileDetails = null) => {
//     if ((messageType === 'text' && !content.trim()) || !currentReceiver?._id || !studentToken || !studentId) {
//         setError(prev => ({ ...prev, sending: 'Cannot send message. Missing required info.' }));
//         return;
//     }
    
//     const tempMessageId = `temp_${Date.now()}`;
//     const newMessage = {
//         tempId: tempMessageId, 
//         _id: tempMessageId, 
//         sender: studentId, 
//         receiver: currentReceiver._id,
//         content: messageType === 'text' ? content : (fileDetails?.name || 'File'), // For files, content can be filename
//         type: messageType, // 'text', 'image', 'file'
//         fileUrl: messageType !== 'text' ? (fileDetails?.previewUrl || '') : undefined, // For optimistic UI of images
//         fileName: messageType !== 'text' ? (fileDetails?.name || 'File') : undefined,
//         fileSize: messageType !== 'text' ? (fileDetails?.size || 0) : undefined,
//         timestamp: new Date().toISOString(),
//         isRead: false, 
//         isSending: messageType !== 'text' ? true : undefined, // For file uploads to show progress
//     };
//     setMessages(prev => [...prev, newMessage]);

//     // If it's a text message, send it directly
//     if (messageType === 'text') {
//         try {
//             setError(prev => ({ ...prev, sending: '' }));
//             setLoading((prev) => ({ ...prev, sending: true }));
//             const res = await fetch('http://localhost:5000/api/messages', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${studentToken}` },
//                 body: JSON.stringify({ receiverId: currentReceiver._id, content, type: 'text' }),
//             });
//             if (!res.ok) throw new Error(`Send message failed: ${res.statusText} (${res.status})`);
//             const savedMessage = await res.json();
//             setMessages(prev => prev.map(msg => (msg.tempId === tempMessageId ? savedMessage : msg)));
//         } catch (err) {
//             console.error('Send Text Message Error:', err);
//             setError(prev => ({ ...prev, sending: err.message || 'Failed to send message.'}));
//             setMessages(prev => prev.filter(msg => msg.tempId !== tempMessageId));
//         } finally {
//             setLoading((prev) => ({ ...prev, sending: false }));
//         }
//     }
//     // File sending logic will be handled by onSendFile which then calls this function
//     // after upload with messageType='image' or 'file' and fileDetails containing the server URL.
//   };

//   const handleSendFile = async (file) => {
//     if (!currentReceiver?._id || !studentToken || !studentId) {
//       setError(prev => ({ ...prev, file: 'Cannot send file. Missing required info.' }));
//       return;
//     }

//     // Optimistic UI for file (shows filename, maybe a generic icon)
//     const tempFileMessageId = `temp_file_${Date.now()}`;
//     const fileType = file.type.startsWith('image/') ? 'image' : 'file';
    
//     // Create a preview URL for images for optimistic UI
//     let previewUrl = '';
//     if (fileType === 'image') {
//         previewUrl = URL.createObjectURL(file);
//     }

//     const optimisticFileMessage = {
//         tempId: tempFileMessageId, _id: tempFileMessageId, sender: studentId, receiver: currentReceiver._id,
//         content: file.name, type: fileType, fileUrl: previewUrl, // Use previewUrl for images
//         fileName: file.name, fileSize: file.size, timestamp: new Date().toISOString(), isRead: false, isSending: true,
//     };
//     setMessages(prev => [...prev, optimisticFileMessage]);


//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('receiverId', currentReceiver._id);
//     formData.append('type', fileType);
//     // Add any other necessary fields like senderId if backend requires it in form-data
//     // formData.append('senderId', studentId);


//     try {
//         setError(prev => ({ ...prev, file: '' }));
//         setLoading(prev => ({ ...prev, file: true }));

//         const res = await fetch('http://localhost:5000/api/messages/upload', { // Ensure this endpoint exists
//             method: 'POST',
//             headers: { Authorization: `Bearer ${studentToken}` }, // No 'Content-Type' for FormData, browser sets it
//             body: formData,
//         });

//         if (!res.ok) throw new Error(`File upload failed: ${res.statusText} (${res.status})`);
//         const savedFileMessage = await res.json(); // Backend should return the full message object

//         // Update optimistic message with server response
//         setMessages(prev => prev.map(msg => (msg.tempId === tempFileMessageId ? { ...savedFileMessage, isSending: false } : msg)));
//         if (previewUrl) URL.revokeObjectURL(previewUrl); // Clean up preview URL

//     } catch (err) {
//         console.error('Send File Error:', err);
//         setError(prev => ({ ...prev, file: err.message || 'Failed to send file.' }));
//         // Remove optimistic message on error
//         setMessages(prev => prev.filter(msg => msg.tempId !== tempFileMessageId));
//         if (previewUrl) URL.revokeObjectURL(previewUrl);
//     } finally {
//         setLoading(prev => ({ ...prev, file: false }));
//     }
//   };


//   const handleSelectAlumni = (alumni) => {
//       setCurrentReceiver(alumni);
//       // TODO: When a chat is selected, mark its messages as read
//       // This involves an API call and updating unreadCount in alumniList
//       // markMessagesAsRead(alumni._id);
//       // setAlumniList(prevList => prevList.map(a => 
//       //   a._id === alumni._id ? { ...a, unreadCount: 0 } : a
//       // ));
//   };

//   return (
//     <div className="flex justify-center items-center h-full w-full bg-slate-950 p-0 sm:p-4 md:p-6 lg:p-8">
//       <div className="flex h-[95vh] sm:h-[90vh] md:h-[85vh] w-full max-w-6xl shadow-2xl rounded-none sm:rounded-xl overflow-hidden border border-slate-700/50">
//         <ChatSidebar
//           alumniList={alumniList}
//           activeReceiverId={currentReceiver?._id}
//           onSelectAlumni={handleSelectAlumni}
//           isLoading={loading.alumni}
//         />
//         <ChatArea
//           receiver={currentReceiver}
//           messagesWithSeparators={messagesWithSeparators}
//           studentId={studentId}
//           onSendMessage={handleSendMessage} // For text messages
//           onSendFile={handleSendFile} // For file messages
//           isLoadingMessages={loading.messages}
//           isSendingMessage={loading.sending || loading.file} // Combined sending state
//         />
//         {(error.alumni || error.file || error.sending || error.messages) && !loading.alumni && (
//             <div className="fixed bottom-4 right-4 bg-red-800/90 text-red-200 p-3 rounded-lg shadow-xl flex items-center max-w-sm animate-fadeInUp z-50">
//                 <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
//                 <span>{error.alumni || error.file || error.sending || error.messages || 'An error occurred.'}</span>
//             </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentChat;



















































import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Send,
  Loader2,
  Users,
  Search,
  Check,
  CheckCheck,
  MessageSquarePlus,
  AlertTriangle,
} from 'lucide-react';

// --- Date Formatting Helper ---
const formatDateSeparator = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'TODAY';
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'YESTERDAY';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// --- Reusable UI Helper Components ---
const LoadingSpinner = ({ size = "h-8 w-8", color = "text-purple-400" }) => (
  <Loader2 className={`animate-spin ${size} ${color}`} />
);

const UserAvatar = ({ name, size = "h-10 w-10", textSize = "text-lg" }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  return (
    <div
      className={`flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md ${size} ${textSize}`}
    >
      {initial}
    </div>
  );
};

// --- Chat Specific Components ---

const ChatSidebar = ({ alumniList, activeReceiverId, onSelectAlumni, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlumni = alumniList.filter(alumni =>
    alumni.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[30%] min-w-[280px] sm:min-w-[300px] max-w-[400px] bg-slate-800/80 backdrop-blur-md border-r border-slate-700/50 flex flex-col h-full">
      <div className="p-4 border-b border-slate-700/50 flex-shrink-0">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Users className="mr-3 text-purple-400" size={24} />
          Chats
        </h2>
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search or start new chat"
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
                <p className="mt-3 text-slate-300">Loading contacts...</p>
            </div>
        )}
        {!isLoading && filteredAlumni.length > 0 ? (
          filteredAlumni.map((alumni) => (
            <div
              key={alumni._id}
              onClick={() => onSelectAlumni(alumni)}
              className={`flex items-center p-3.5 cursor-pointer transition-colors duration-150 hover:bg-slate-700/70 border-b border-slate-700/30
                          ${activeReceiverId === alumni._id ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/20' : ''}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectAlumni(alumni)}
            >
              <UserAvatar name={alumni.fullName} />
              <div className="ml-3 overflow-hidden">
                <p className={`font-medium truncate ${activeReceiverId === alumni._id ? 'text-purple-300' : 'text-slate-100'}`}>
                  {alumni.fullName}
                </p>
              </div>
            </div>
          ))
        ) : (!isLoading && <p className="p-4 text-center text-slate-400">No alumni found.</p>)}
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
                      ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-md'
                      : 'bg-slate-700 text-slate-100 rounded-bl-md'
                    }`}
      >
        <p className="whitespace-pre-wrap pb-4 pr-1">
          {message.content}
        </p>
        
        <div className={`absolute bottom-1 right-1.5 text-[0.65rem] flex items-center pointer-events-none 
                    ${isSender ? 'text-blue-200/90' : 'text-slate-400/90'}`}>
          <span>{sentTime.toLowerCase()}</span>
          {isSender && (
            isRead ? <CheckCheck className="ml-1 h-3.5 w-3.5 text-sky-400" /> : <Check className="ml-1 h-3.5 w-3.5" />
          )}
        </div>
      </div>
    </div>
  );
};

const DateSeparator = ({ date }) => (
  <div className="flex justify-center my-3">
    <span className="bg-slate-700/80 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full shadow">
      {date}
    </span>
  </div>
);

const ChatArea = ({ receiver, messagesWithSeparators, studentId, onSendMessage, isLoadingMessages, isSendingMessage }) => {
  const [content, setContent] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" }); 
    }
  }, [messagesWithSeparators]);

  useEffect(() => {
    if (receiver && inputRef.current) {
        setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [receiver]);

  const handleSend = () => {
    if (content.trim()) {
      onSendMessage(content.trim());
      setContent('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!receiver) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-10 bg-slate-900/70 text-slate-300 h-full">
        <MessageSquarePlus size={80} className="text-purple-400/70 mb-6" />
        <h3 className="text-2xl font-semibold text-white">Select a Chat</h3>
        <p className="mt-2 text-center max-w-sm">
          Choose an alumnus from the list to start a conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col bg-slate-900/70 h-full overflow-hidden">
      <header className="flex items-center p-3.5 border-b border-slate-700/50 bg-slate-800/90 backdrop-blur-sm flex-shrink-0">
        <UserAvatar name={receiver.fullName} size="h-10 w-10" textSize="text-lg" />
        <div className="ml-3">
          <h3 className="text-md font-semibold text-white">{receiver.fullName}</h3>
        </div>
      </header>
      <div className="flex-grow px-4 py-3 sm:px-6 sm:py-4 overflow-y-auto space-y-0.5 relative custom-scrollbar"
           style={{
             backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIoSURBVHhe7dJBCsNADETBAiD7704lqQUL6kMLYJ8FvP9gZuacY8YJPM8LzPM8LzDP87zAPM/zAvM8zwtM0vM2kPT8HSSp5214P8/zAqLPe19A9Hn7BkT/Tqbn/Z0h0vN+T5Dk+R1BkvN+TZDk+f0hQZLn43NIkvx+GZIk34+HJIkvx+NIkvx2NIgkyfsxIEnyPhyIJMn7MSBJ8j4MiCTJ+zEgSfI+HBYkyfsxIEnyPhwWJMn7MSBJ8j4cFCTJ+zEgSfI+HBAkyfsxIEnyPhwQJMn7MSBJ8j4cECTJ+zEgSfI+DBAkyfsxIEnyPhgQJMn7MSBJ8j4MCCRJ8j4MSJI+DIgkyfsxIEnyPiAgSfI+DIgkyfsxIEnyPhAQJMn7MSBJ8j4QECTJ+zEgSfI+ECTJ+zEgSfI+DwgkSfI+DIgkyfsxIEnyPhAQSZI+DIgkyfsxIEnyPhAQJMn7MSBJ8j4QJMn7MSBJ8j4MCCRJ8j4MSJI+HBAkSfI+DIgkyfsxIEnyPhgQJMn7MSBJ8j4MCCRJ8j4MSJI+DBAkyfsxIEnyPhwQJMn7MSBJ8j4cECTJ+zEgSfI+HBYkyfsxIEnyPhwWJMn7MSBJ8j4cFCTJ+zEgSfI+HBAkSfI+DIgkyfsxIEnyPhgQJMn7MSBJ8j4MCCRJ8j4MSJI+DIgkyfsxIEnyPiAgSfI+DIgkyfsxIEnyPhAQJMn7MSBJ8j4QECTJ+zEgSfI+zPM8LxDP87zAPM/zAvM8zwtM0vM2kPT8HSRp5uYcsMHkP3z+AYk2AAAAAElFTkSuQmCC")`,
             backgroundRepeat: 'repeat', backgroundSize: '300px', opacity: 0.9,
           }}
      >
        {isLoadingMessages && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm z-10">
            <LoadingSpinner />
            <p className="mt-3 text-slate-300">Loading messages...</p>
          </div>
        )}
        {!isLoadingMessages && messagesWithSeparators.length === 0 && (
          <p className="text-center text-sm text-slate-400 mt-10">
            No messages yet. Start the conversation!
          </p>
        )}
        {messagesWithSeparators.map((item, index) =>
          item.type === 'separator' ? (
            <DateSeparator key={`sep-${item.date}-${index}`} date={item.date} />
          ) : (
            <MessageBubble
              key={item.message._id || `msg-${index}`}
              message={item.message}
              isSender={item.message.sender === studentId}
            />
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <footer className="p-3.5 border-t border-slate-700/50 bg-slate-800/90 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <textarea
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            rows={1}
            className="flex-grow p-2.5 bg-slate-700/60 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none resize-none custom-scrollbar"
            style={{ maxHeight: '100px' }}
          />
          <button
            onClick={handleSend}
            disabled={isSendingMessage || !content.trim()}
            className={`p-2.5 rounded-full transition-all duration-200 transform focus:outline-none focus:ring-1 focus:ring-purple-500/70
                        ${!content.trim() || isSendingMessage
                          ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                          : 'bg-gradient-to-br from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:scale-105'
                        }`}
            aria-label="Send message"
          >
            {isSendingMessage ? <LoadingSpinner size="h-5 w-5" color="text-white" /> : <Send size={20} />}
          </button>
        </div>
      </footer>
    </div>
  );
};

// --- Main StudentChat Component ---
const StudentChat = () => {
  const [messages, setMessages] = useState([]);
  const [currentReceiver, setCurrentReceiver] = useState(null);
  const [alumniList, setAlumniList] = useState([]);
  const [loading, setLoading] = useState({ alumni: true, messages: false, sending: false });
  const [error, setError] = useState({ alumni: '', messages: '', sending: '' });

  const studentId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');
  const studentToken =
    role === 'student'
      ? localStorage.getItem('student_token')
      : role === 'alumni'
      ? localStorage.getItem('alumni_token')
      : role === 'admin'
      ? localStorage.getItem('admin_token')
      : null;

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
    if (presetId && alumniList.length > 0) {
      const presetAlumnus = alumniList.find(a => a._id === presetId);
      if (presetAlumnus) {
        setCurrentReceiver(presetAlumnus);
      }
      localStorage.removeItem('chatReceiverId');
    }
  }, [alumniList]);

  useEffect(() => {
    const fetchAlumni = async () => {
      if (!studentToken) {
        setError(prev => ({ ...prev, alumni: 'Authentication required to load contacts.'}));
        setLoading(prev => ({ ...prev, alumni: false}));
        return;
      }
      try {
        setError(prev => ({ ...prev, alumni: '' }));
        setLoading((prev) => ({ ...prev, alumni: true }));
        const res = await fetch('http://localhost:5000/api/search/alumni', {
          headers: { Authorization: `Bearer ${studentToken}` },
        });
        if (!res.ok) throw new Error(`Fetch alumni failed: ${res.statusText} (${res.status})`);
        const data = await res.json();
        if (Array.isArray(data)) {
          const alumniWithUnread = data.map(al => ({ ...al, unreadCount: 0 }));
          setAlumniList(alumniWithUnread);
        } else throw new Error('Invalid alumni list format.');
      } catch (err) {
        console.error('Fetch Alumni Error:', err);
        setError(prev => ({ ...prev, alumni: err.message || 'Failed to load alumni.'}));
      } finally {
        setLoading((prev) => ({ ...prev, alumni: false }));
      }
    };
    fetchAlumni();
  }, [studentToken]);

  const loadMessages = useCallback(async () => {
    if (!currentReceiver?._id || !studentToken) return;
    try {
      setError(prev => ({ ...prev, messages: '' }));
      setLoading((prev) => ({ ...prev, messages: true }));
      const res = await fetch(`http://localhost:5000/api/messages/${currentReceiver._id}`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      if (!res.ok) throw new Error(`Load messages failed: ${res.statusText} (${res.status})`);
      const data = await res.json();
      if (Array.isArray(data)) {
        const sortedMessages = data.sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0));
        setMessages(sortedMessages);
      } else throw new Error('Invalid message format.');
    } catch (err) {
      console.error('Load Messages Error:', err);
      setError(prev => ({ ...prev, messages: err.message || 'Failed to load messages.'}));
    } finally {
      setLoading((prev) => ({ ...prev, messages: false }));
    }
  }, [currentReceiver?._id, studentToken]);

  useEffect(() => {
    if (currentReceiver?._id) {
      loadMessages();
    } else {
      setMessages([]);
    }
  }, [currentReceiver?._id, loadMessages]);

  const handleSendMessage = async (content) => {
    if (!content.trim() || !currentReceiver?._id || !studentToken || !studentId) {
        setError(prev => ({ ...prev, sending: 'Cannot send message. Missing required info.' }));
        return;
    }
    
    try {
        setError(prev => ({ ...prev, sending: '' }));
        setLoading((prev) => ({ ...prev, sending: true }));
        const res = await fetch('http://localhost:5000/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${studentToken}` },
            body: JSON.stringify({ receiverId: currentReceiver._id, content, type: 'text' }),
        });
        if (!res.ok) throw new Error(`Send message failed: ${res.statusText} (${res.status})`);
        const savedMessage = await res.json();
        
        // Add the new message directly to the state
        setMessages(prev => [...prev, savedMessage]);
        
    } catch (err) {
        console.error('Send Text Message Error:', err);
        setError(prev => ({ ...prev, sending: err.message || 'Failed to send message.'}));
    } finally {
        setLoading((prev) => ({ ...prev, sending: false }));
    }
  };

  const handleSelectAlumni = (alumni) => {
      setCurrentReceiver(alumni);
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-slate-950 p-0 sm:p-4 md:p-6 lg:p-8">
      <div className="flex h-[95vh] sm:h-[90vh] md:h-[85vh] w-full max-w-6xl shadow-2xl rounded-none sm:rounded-xl overflow-hidden border border-slate-700/50">
        <ChatSidebar
          alumniList={alumniList}
          activeReceiverId={currentReceiver?._id}
          onSelectAlumni={handleSelectAlumni}
          isLoading={loading.alumni}
        />
        <ChatArea
          receiver={currentReceiver}
          messagesWithSeparators={messagesWithSeparators}
          studentId={studentId}
          onSendMessage={handleSendMessage}
          isLoadingMessages={loading.messages}
          isSendingMessage={loading.sending}
        />
        {(error.alumni || error.sending || error.messages) && !loading.alumni && (
            <div className="fixed bottom-4 right-4 bg-red-800/90 text-red-200 p-3 rounded-lg shadow-xl flex items-center max-w-sm animate-fadeInUp z-50">
                <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
                <span>{error.alumni || error.sending || error.messages || 'An error occurred.'}</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default StudentChat;