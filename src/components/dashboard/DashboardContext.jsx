import React, { createContext, useContext, useState, useEffect } from 'react';


const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeSection, setActiveSection] = useState('dashboard');

    useEffect(() => {
        async function fetchUser() {
            try {
                const me = {
                    id: 1,
                    full_name: "Abdulrhman",
                    email: "a.abdulrhmana123@gmail.com",
                    role: "user",
                    avatar_url: null
                };
                // Map our DB role to our roles; default to 'student'
                const roleMap = { admin: 'admin', employee: 'employee', user: 'student' };
                setUser({
                    id: me.id,
                    name: me.full_name || me.email?.split('@')[0] || 'مستخدم',
                    email: me.email,
                    role: roleMap[me.role] || 'student',
                    avatar: me.avatar_url || null,
                });
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    return (
        <DashboardContext.Provider value={{ user, loading, sidebarOpen, setSidebarOpen, activeSection, setActiveSection }}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    return useContext(DashboardContext);
}