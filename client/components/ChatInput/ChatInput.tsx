import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ChatInput.css';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    onSettingsClick: () => void;
    onNewSession: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onSettingsClick, onNewSession }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <motion.form 
            className="chat-input"
            onSubmit={handleSubmit}
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <div className="button-group">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                >
                    Send
                </motion.button>
                <motion.button
                    type="button"
                    className="settings-button"
                    onClick={onSettingsClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Settings
                </motion.button>
                <motion.button
                    type="button"
                    className="new-session-button"
                    onClick={onNewSession}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    +
                </motion.button>
            </div>
        </motion.form>
    );
}; 