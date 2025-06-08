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
        const res = await fetch('https://alumni-connect-six.vercel.app/api/search/alumni', {
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
      const res = await fetch(`https://alumni-connect-six.vercel.app/api/messages/${currentReceiver._id}`, {
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
        const res = await fetch('https://alumni-connect-six.vercel.app/api/messages', {
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