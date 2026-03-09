import React from 'react';
import { ThemeProvider } from './components/ThemeContext';

export default function Layout({ children }) {
    return (
        <ThemeProvider>
            <div className="transition-colors duration-300 bg-white dark:bg-[#0F172A] min-h-screen">
                {children}
            </div>
        </ThemeProvider>
    );
}