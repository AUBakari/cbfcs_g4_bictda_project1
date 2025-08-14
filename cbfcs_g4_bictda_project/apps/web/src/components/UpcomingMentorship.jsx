import { useState, useEffect } from "react";
import { Calendar, Clock, Video, MessageCircle, User, Plus } from "lucide-react";

// Mock data - will be replaced with real API calls
const mockSessions = [
  {
    id: 1,
    mentor_name: "Sarah Johnson",
    session_type: "video_call",
    topic: "Microsoft Excel Advanced Functions",
    status: "scheduled",
    scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    meeting_url: "https://meet.google.com/abc-def-ghi",
    mentor_avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&h=150&q=80",
    mentor_expertise: "Office Productivity Specialist",
  },
  {
    id: 2,
    mentor_name: "Michael Chen",
    session_type: "chat",
    topic: "Internet Security Best Practices",
    status: "requested",
    scheduled_at: null,
    meeting_url: null,
    mentor_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    mentor_expertise: "Cybersecurity Expert",
  },
  {
    id: 3,
    mentor_name: "Emily Rodriguez",
    session_type: "video_call",
    topic: "Government Database Systems",
    status: "completed",
    scheduled_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    meeting_url: null,
    mentor_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    mentor_expertise: "Government Systems Trainer",
    rating: 5,
  },
];

function getStatusColor(status) {
  switch (status) {
    case "scheduled":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "requested":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "in_progress":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
}

function formatDateTime(date) {
  if (!date) return null;
  return {
    date: date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }),
    time: date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    })
  };
}

function MentorshipCard({ session }) {
  const [isHovered, setIsHovered] = useState(false);
  const dateTime = formatDateTime(session.scheduled_at);

  const handleJoinSession = () => {
    if (session.meeting_url) {
      window.open(session.meeting_url, '_blank');
    }
  };

  const handleStartChat = () => {
    // TODO: Implement chat functionality
    console.log(`Starting chat with ${session.mentor_name}`);
  };

  const handleReschedule = () => {
    // TODO: Implement rescheduling functionality
    console.log(`Rescheduling session with ${session.mentor_name}`);
  };

  return (
    <div
      className={`
        bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-5
        transition-all duration-200 ease-out cursor-pointer
        ${isHovered ? "shadow-sm dark:shadow-lg transform -translate-y-0.5" : ""}
      `}
      style={{
        boxShadow: isHovered
          ? document.documentElement.classList.contains("dark")
            ? "0 4px 12px rgba(255,255,255,0.08)"
            : "0 2px 8px rgba(0,0,0,0.06)"
          : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Block - Session Info */}
        <div className="flex gap-4">
          {/* Mentor Avatar */}
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#E7ECF3] dark:border-[#374151]">
              <img
                src={session.mentor_avatar}
                alt={`${session.mentor_name} profile`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Session Details */}
          <div className="flex-1 min-w-0">
            {/* Status Badge and Session Type */}
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(session.status)}`}>
                {session.status.charAt(0).toUpperCase() + session.status.slice(1).replace('_', ' ')}
              </span>
              <div className="flex items-center gap-1 text-[#6B7280] dark:text-[#9CA3AF]">
                {session.session_type === 'video_call' ? (
                  <Video size={14} />
                ) : (
                  <MessageCircle size={14} />
                )}
                <span className="text-xs font-medium capitalize">
                  {session.session_type.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Mentor Info */}
            <div className="mb-1">
              <h3 className="font-montserrat font-semibold text-base text-[#04111C] dark:text-[#E5E7EB] leading-tight transition-colors duration-200">
                {session.mentor_name}
              </h3>
              <p className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] transition-colors duration-200">
                {session.mentor_expertise}
              </p>
            </div>

            {/* Topic */}
            <p className="font-inter text-sm text-[#374151] dark:text-[#D1D5DB] mb-2 transition-colors duration-200">
              <strong>Topic:</strong> {session.topic}
            </p>

            {/* Date and Time for scheduled sessions */}
            {dateTime && session.status !== 'completed' && (
              <div className="flex items-center gap-4 text-xs text-[#6D7A8B] dark:text-[#9CA3AF] transition-colors duration-200">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span className="font-inter">{dateTime.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span className="font-inter">{dateTime.time}</span>
                </div>
              </div>
            )}

            {/* Rating for completed sessions */}
            {session.status === 'completed' && session.rating && (
              <div className="flex items-center gap-1 mt-2">
                <span className="text-sm font-medium text-[#6D7A8B] dark:text-[#9CA3AF]">Rating:</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < session.rating ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Block - Actions */}
        <div className="flex-shrink-0 md:min-w-[120px] flex justify-center md:justify-end">
          {session.status === 'scheduled' && session.session_type === 'video_call' ? (
            <button
              onClick={handleJoinSession}
              className="
                bg-[#30C4B5] hover:bg-[#29AF9F] dark:bg-[#30C4B5] dark:hover:bg-[#29AF9F] text-white font-inter font-semibold text-sm
                rounded-full h-10 px-6 transition-colors duration-200 ease-out
                focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-50
                flex items-center gap-2
              "
            >
              <Video size={16} />
              Join Call
            </button>
          ) : session.status === 'scheduled' && session.session_type === 'chat' ? (
            <button
              onClick={handleStartChat}
              className="
                bg-[#30C4B5] hover:bg-[#29AF9F] dark:bg-[#30C4B5] dark:hover:bg-[#29AF9F] text-white font-inter font-semibold text-sm
                rounded-full h-10 px-6 transition-colors duration-200 ease-out
                focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-50
                flex items-center gap-2
              "
            >
              <MessageCircle size={16} />
              Start Chat
            </button>
          ) : session.status === 'requested' ? (
            <button
              onClick={handleReschedule}
              className="
                bg-white dark:bg-[#262626] border border-[#30C4B5] dark:border-[#30C4B5] text-[#30C4B5] dark:text-[#30C4B5] 
                hover:bg-[#30C4B5] hover:text-white dark:hover:bg-[#30C4B5] dark:hover:text-white
                font-inter font-semibold text-sm rounded-full h-10 px-6 transition-colors duration-200 ease-out
                focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-50
              "
            >
              Pending...
            </button>
          ) : session.status === 'completed' ? (
            <span className="
              bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 
              font-inter text-sm rounded-full h-10 px-6 flex items-center
            ">
              Completed
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function UpcomingMentorship() {
  const [sessions, setSessions] = useState(mockSessions);
  const [loading, setLoading] = useState(false);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);

  useEffect(() => {
    const fetchMentorshipSessions = async () => {
      setLoading(true);
      try {
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        // API call would go here:
        // const response = await fetch('/api/mentorship/sessions');
        // const data = await response.json();
        // setSessions(data);
        
        // For now, use mock data
        setSessions(mockSessions);
      } catch (error) {
        console.error('Error fetching mentorship sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorshipSessions();
  }, []);

  const handleRequestSession = () => {
    // TODO: Implement new session request functionality
    setShowNewSessionModal(true);
    console.log('Requesting new mentorship session');
  };

  if (loading) {
    return (
      <section className="w-full">
        <div className="max-w-[1280px] mx-auto bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 transition-colors duration-200">
          <h2 className="font-montserrat text-xl font-bold text-[#04111C] dark:text-[#E5E7EB] mb-6 transition-colors duration-200">
            Mentorship & Help Desk
          </h2>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-24 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      {/* Container with background */}
      <div className="max-w-[1280px] mx-auto bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 transition-colors duration-200">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-montserrat text-xl font-bold text-[#04111C] dark:text-[#E5E7EB] transition-colors duration-200"
            role="heading"
            aria-level="2"
          >
            Mentorship & Help Desk ({sessions.length})
          </h2>
          <button
            onClick={handleRequestSession}
            className="
              flex items-center gap-2 px-4 py-2 rounded-full text-xs font-inter font-medium
              bg-[#C3F3EC] bg-opacity-60 text-[#0F9C92]
              dark:bg-[#1A2E2B] dark:bg-opacity-80 dark:text-[#34D399]
              hover:bg-[#B5EEDF] hover:bg-opacity-80 hover:text-[#0D8A7F]
              dark:hover:bg-[#1F3D33] dark:hover:text-[#22C55E]
              active:bg-[#A8E8D8] active:text-[#0B7A6F]
              dark:active:bg-[#16302A] dark:active:text-[#16A34A]
              transition-all duration-200 ease-out
              focus:outline-none focus:ring-2 focus:ring-[#0F9C92] focus:ring-opacity-50
            "
            aria-label="Request new mentorship session"
          >
            <Plus size={16} />
            Request Session
          </button>
        </div>

        {/* Sessions List */}
        {sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map((session) => (
              <MentorshipCard key={session.id} session={session} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageCircle size={48} className="mx-auto text-[#6B7280] dark:text-[#9CA3AF] mb-4" />
            <h3 className="font-montserrat font-semibold text-lg text-[#374151] dark:text-[#E5E7EB] mb-2">
              No mentorship sessions yet
            </h3>
            <p className="font-inter text-[#6B7280] dark:text-[#9CA3AF] mb-6">
              Request a session with our ICT experts to get personalized help and guidance.
            </p>
            <button
              onClick={handleRequestSession}
              className="
                inline-flex items-center gap-2 px-6 py-3 bg-[#30C4B5] hover:bg-[#29AF9F] active:bg-[#239E8F] text-white
                font-inter font-semibold rounded-lg transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-offset-2
              "
            >
              <Plus size={18} />
              Request Your First Session
            </button>
          </div>
        )}

        {/* Quick Help Options */}
        <div className="border-t border-[#E7ECF3] dark:border-[#374151] mt-8 pt-6">
          <h3 className="font-montserrat font-semibold text-base text-[#374151] dark:text-[#E5E7EB] mb-4">
            Quick Help Options
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 border border-[#E7ECF3] dark:border-[#374151] rounded-lg hover:border-[#30C4B5] dark:hover:border-[#30C4B5] hover:bg-[#F0FDFA] dark:hover:bg-[#1A2F2B] transition-colors duration-200">
              <Video size={20} className="text-[#30C4B5]" />
              <div className="text-left">
                <div className="font-inter font-medium text-sm text-[#374151] dark:text-[#E5E7EB]">Video Call</div>
                <div className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF]">Schedule 1-on-1 session</div>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 border border-[#E7ECF3] dark:border-[#374151] rounded-lg hover:border-[#30C4B5] dark:hover:border-[#30C4B5] hover:bg-[#F0FDFA] dark:hover:bg-[#1A2F2B] transition-colors duration-200">
              <MessageCircle size={20} className="text-[#30C4B5]" />
              <div className="text-left">
                <div className="font-inter font-medium text-sm text-[#374151] dark:text-[#E5E7EB]">Live Chat</div>
                <div className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF]">Get instant help</div>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 border border-[#E7ECF3] dark:border-[#374151] rounded-lg hover:border-[#30C4B5] dark:hover:border-[#30C4B5] hover:bg-[#F0FDFA] dark:hover:bg-[#1A2F2B] transition-colors duration-200">
              <User size={20} className="text-[#30C4B5]" />
              <div className="text-left">
                <div className="font-inter font-medium text-sm text-[#374151] dark:text-[#E5E7EB]">Group Session</div>
                <div className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF]">Join office hours</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}