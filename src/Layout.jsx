import React from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { SimulatorProvider } from './contexts/SimulatorContext';

export default function Layout({ children }) {
    return (
        <ThemeProvider>
            <SimulatorProvider>
                <div className="transition-colors duration-300 bg-white dark:bg-[#0F172A] min-h-screen">
                    {children}
                </div>
            </SimulatorProvider>
        </ThemeProvider>
    );
}