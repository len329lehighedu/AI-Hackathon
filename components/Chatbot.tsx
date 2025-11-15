
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { startChat } from '../services/geminiService';
import { Course, ChatMessage, Major } from '../types';

interface ChatbotProps {
    allCourses: Course[];
    majors: Major[];
}

const Chatbot: React.FC<ChatbotProps> = ({ allCourses, majors }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && !chatRef.current) {
            try {
                chatRef.current = startChat(allCourses, majors);
                setMessages([{ sender: 'bot', text: "Hello! I'm your AI course assistant. I can help you with course selection and major requirements. How can I help you plan your schedule today?" }]);
            } catch (error) {
                console.error("Failed to start chat:", error);
                setMessages([{ sender: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
            }
        }
    }, [isOpen, allCourses, majors]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseStream = await chatRef.current.sendMessageStream({ message: input });
            let botResponse = '';
            setMessages(prev => [...prev, { sender: 'bot', text: '' }]);

            for await (const chunk of responseStream) {
                botResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = botResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: "I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-lehigh-gold text-lehigh-dark-brown p-3 sm:p-4 rounded-full shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-110 z-50"
                aria-label="Toggle course assistant chatbot"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="fixed bottom-24 right-6 bg-lehigh-darker-brown rounded-lg shadow-2xl flex flex-col z-50 border-2 border-lehigh-light-gold"
                    style={{
                        resize: 'both',
                        overflow: 'auto',
                        width: '384px',
                        height: '600px',
                        minWidth: '320px',
                        minHeight: '400px',
                        maxWidth: '80vw',
                        maxHeight: '80vh',
                    }}
                >
                    <header className="bg-lehigh-brown p-4 text-white font-bold text-lg flex justify-between items-center rounded-t-md sticky top-0 z-10">
                        AI Course Assistant
                        <button onClick={() => setIsOpen(false)} className="text-2xl">&times;</button>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-lehigh-gold text-lehigh-dark-brown' : 'bg-lehigh-brown text-white'}`}>
                                    {msg.text || <span className="animate-pulse">...</span>}
                                </div>
                            </div>
                        ))}
                         <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t border-lehigh-brown flex items-center sticky bottom-0 bg-lehigh-darker-brown">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask about courses..."
                            className="flex-1 bg-lehigh-dark-brown p-2 rounded-l-md border-y border-l border-lehigh-light-gold focus:outline-none focus:ring-2 focus:ring-lehigh-gold"
                            disabled={isLoading}
                        />
                        <button onClick={handleSendMessage} className="bg-lehigh-gold text-lehigh-dark-brown p-2 rounded-r-md font-bold hover:bg-yellow-500 disabled:bg-gray-500" disabled={isLoading}>
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;