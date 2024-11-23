import React from 'react';
import './ThinkingIndicator.css';

export const ThinkingIndicator = () => {
    return (
        <div className="thinking-indicator">
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="core" />
            <div className="orbit">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
            </div>
        </div>
    );
}; 