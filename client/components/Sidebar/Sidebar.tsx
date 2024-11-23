import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Sidebar.css';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    settings: {
        temperature: number;
        maxTokens: number;
        topP: number;
        model: string;
    };
    onSettingsChange: (key: string, value: number | string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
    isOpen, 
    onClose, 
    settings, 
    onSettingsChange
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div 
                        className="sidebar"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20 }}
                    >
                        <button className="close-button" onClick={onClose}>×</button>
                        <h2>Settings</h2>
                        
                        <div className="setting-item">
                            <label>Model</label>
                            <motion.select
                                className="settings-select"
                                value={settings.model}
                                onChange={(e) => onSettingsChange('model', e.target.value)}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <option value="gpt-4o">GPT-4O</option>
                                <option value="gpt-4o-mini">GPT-4O Mini</option>
                            </motion.select>
                        </div>

                        <div className="setting-item">
                            <label>Temperature</label>
                            <div className="setting-input-group">
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="1" 
                                    step="0.1"
                                    value={settings.temperature}
                                    onChange={(e) => onSettingsChange('temperature', parseFloat(e.target.value))}
                                />
                                <input 
                                    type="number"
                                    className="settings-number-input"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={settings.temperature}
                                    onChange={(e) => onSettingsChange('temperature', parseFloat(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="setting-item">
                            <label>Max Tokens</label>
                            <div className="setting-input-group">
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="4000"
                                    value={settings.maxTokens}
                                    onChange={(e) => onSettingsChange('maxTokens', parseInt(e.target.value))}
                                />
                                <input 
                                    type="number"
                                    className="settings-number-input"
                                    min="1" 
                                    max="4000"
                                    value={settings.maxTokens}
                                    onChange={(e) => onSettingsChange('maxTokens', parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}; 