import React, { useState } from 'react';
import { ChatMessage } from '../../components/ChatMessage/ChatMessage';
import { ChatInput } from '../../components/ChatInput/ChatInput';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { ThinkingIndicator } from '../../components/ThinkingIndicator/ThinkingIndicator';
import './HomePage.css';

interface Message {
    content: string;
    role: 'user' | 'assistant';
    timestamp: string;
}

export const HomePage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [settings, setSettings] = useState({
        model: "gpt-4o-mini",
        temperature: 0.7,
        maxTokens: 2048,
        topP: 0.9,
    });
    const [isThinking, setIsThinking] = useState(false);

    const handleSendMessage = (content: string) => {
        const newMessage: Message = {
            content,
            role: 'user',
            timestamp: new Date().toLocaleTimeString(),
        };
        const messagesToSend = [...messages, newMessage];
        setMessages(messagesToSend);
        setIsThinking(true);

        fetch("/api/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                messages: messagesToSend.map(m => ({ content: m.content, role: m.role })), 
                temperature: settings.temperature,
                maxTokens: settings.maxTokens,
                model: "gpt-4o-mini",
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("Failed to get chat completion");
        }).then((data) => {
            setMessages([...messagesToSend, { content: data.content, role: 'assistant', timestamp: new Date().toLocaleTimeString() }]);
            setIsThinking(false);
        }).catch((err) => {
            console.error(err);
            setIsThinking(false);
        });
    };

    const handleSettingsChange = (key: string, value: number | string) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="home-page-wrapper">
            <div className="chat-container">
                <div className="messages-container">
                    {messages.map((message, index) => (
                        <div key={index} className={`message-wrapper ${message.role}`}>
                            <ChatMessage
                                content={message.content}
                                isUser={message.role === 'user'}
                                timestamp={message.timestamp}
                            />
                        </div>
                    ))}
                    {isThinking && (
                        <div className="message-wrapper assistant">
                            <ThinkingIndicator />
                        </div>
                    )}
                </div>

                <ChatInput 
                    onSendMessage={handleSendMessage}
                    onSettingsClick={() => setIsSidebarOpen(true)}
                    onNewSession={() => setMessages([])}
                />
            </div>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                settings={settings}
                onSettingsChange={handleSettingsChange}
            />
        </div>
    );
};
