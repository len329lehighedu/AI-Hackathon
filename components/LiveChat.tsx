
import React, { useState, useEffect, useRef } from 'react';

interface LiveChatMessage {
  username: string;
  text: string;
  isCurrentUser: boolean;
}

// Simulated bot users and messages to make the chat feel alive
const BOT_USERS = ['HawkFan_26', 'MountainTop', 'StudyCat', 'Engineer_Pro'];
const BOT_MESSAGES = [
    "Anyone taken CSE 216 with Erle? How is it?",
    "Trying to decide between FIN 125 and MKT 111. Any thoughts?",
    "The schedule visualizer is super helpful!",
    "Does anyone know if prerequisites are strictly enforced for humanities courses?",
    "Just finished my plan for Fall 2026. So excited!",
    "Good luck with finals everyone!",
    "Looking for a study group for MATH 205.",
];

interface UsernamePromptProps {
    tempUsername: string;
    setTempUsername: (value: string) => void;
    onJoin: () => void;
}

const UsernamePrompt: React.FC<UsernamePromptProps> = ({ tempUsername, setTempUsername, onJoin }) => (
    <div
       className="fixed bottom-24 left-6 bg-brand-surface rounded-lg shadow-2xl flex flex-col z-50 border border-brand-secondary p-6 space-y-4"
       style={{ width: '350px' }}
   >
       <header className="text-brand-text font-bold text-lg text-center">
           Join Live Chat
       </header>
       <p className="text-sm text-brand-accent text-center">Choose a display name to join the conversation.</p>
       <input
           type="text"
           value={tempUsername}
           onChange={(e) => setTempUsername(e.target.value)}
           onKeyPress={(e) => e.key === 'Enter' && onJoin()}
           placeholder="Enter your name..."
           className="w-full bg-white p-2 rounded-md border border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-primary"
           aria-label="Enter your display name"
       />
       <button onClick={onJoin} className="w-full bg-brand-primary text-white p-2 rounded-md font-bold hover:bg-opacity-90">
           Join
       </button>
   </div>
);

interface ChatWindowProps {
    messages: LiveChatMessage[];
    input: string;
    setInput: (value: string) => void;
    onSendMessage: () => void;
    onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, input, setInput, onSendMessage, onClose }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div
            className="fixed bottom-24 left-6 bg-brand-surface rounded-lg shadow-2xl flex flex-col z-50 border border-brand-secondary"
            style={{ width: '350px', height: '450px' }}
        >
            <header className="bg-brand-secondary/50 p-3 text-brand-text font-bold text-lg flex justify-between items-center rounded-t-md">
                Live Student Chat
                <button onClick={onClose} className="text-2xl hover:text-brand-primary">&times;</button>
            </header>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-brand-bg">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex flex-col ${msg.isCurrentUser ? 'items-end' : 'items-start'}`}>
                        {!msg.isCurrentUser && <span className="text-xs text-brand-accent ml-1 mb-0.5">{msg.username}</span>}
                        <div className={`p-3 rounded-lg max-w-xs ${msg.isCurrentUser ? 'bg-brand-primary text-white' : 'bg-white text-brand-text shadow-sm'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-3 border-t border-brand-secondary flex items-center bg-brand-surface">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-white p-2 rounded-l-md border border-r-0 border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <button onClick={onSendMessage} className="bg-brand-primary text-white p-2 rounded-r-md font-bold hover:bg-opacity-90">
                    Send
                </button>
            </div>
        </div>
    );
};


const LiveChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [tempUsername, setTempUsername] = useState('');
    const [messages, setMessages] = useState<LiveChatMessage[]>([]);
    const [input, setInput] = useState('');
    const botIntervalRef = useRef<number | null>(null);

    // Initial welcome message
    useEffect(() => {
        if (username && messages.length === 0) {
            setMessages([
                { username: 'Moderator', text: "Welcome to the live chat! Please be respectful and helpful. This is a public forum.", isCurrentUser: false }
            ]);
        }
    }, [username, messages.length]);

    // Simulate other users talking when chat is open
    useEffect(() => {
        if (isOpen && username) {
            botIntervalRef.current = window.setInterval(() => {
                const botUser = BOT_USERS[Math.floor(Math.random() * BOT_USERS.length)];
                const botMessage = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
                
                setMessages(prev => [
                    ...prev,
                    { username: botUser, text: botMessage, isCurrentUser: false }
                ]);
            }, 8000); // New message every 8 seconds
        }

        return () => {
            if (botIntervalRef.current) {
                clearInterval(botIntervalRef.current);
            }
        };
    }, [isOpen, username]);

    const handleJoinChat = () => {
        if (tempUsername.trim()) {
            setUsername(tempUsername.trim());
        }
    };

    const handleSendMessage = () => {
        if (!input.trim() || !username) return;

        const userMessage: LiveChatMessage = { username, text: input, isCurrentUser: true };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 left-6 bg-brand-primary text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-110 z-50"
                aria-label="Toggle live chat"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015.5-4.96A5 5 0 0111 16v1H1v-1a5 5 0 015-5z" />
                </svg>
            </button>

            {isOpen && (!username ? 
                <UsernamePrompt 
                    tempUsername={tempUsername}
                    setTempUsername={setTempUsername}
                    onJoin={handleJoinChat}
                /> : 
                <ChatWindow 
                    messages={messages}
                    input={input}
                    setInput={setInput}
                    onSendMessage={handleSendMessage}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default LiveChat;
