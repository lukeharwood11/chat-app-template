import React from 'react';
import { motion } from 'framer-motion';
import './ChatMessage.css';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
    content: string;
    isUser: boolean;
    timestamp: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ content, isUser, timestamp }) => {
    return (
        <motion.div
            className={`chat-message ${isUser ? 'user' : 'assistant'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="message-content">
                {
                    isUser ? content : <ReactMarkdown>{content}</ReactMarkdown>
                }
            </div>
            <div className="message-timestamp">{timestamp}</div>
        </motion.div>
    );
}; 