import React from 'react';
import './Layout.css';
import { Outlet } from 'react-router';

export const Layout: React.FC = () => {
  return (
    <div className="layout">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}; 