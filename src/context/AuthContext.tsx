import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    location: string;
    phone: string;
    joinDate: string;
    moodHistory: { date: string; mood: string; score: number }[];
    streak: number;
    sessionsCompleted: number;
    goalsAchieved: number;
}

interface AuthContextType {
    user: UserProfile | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEFAULT_AVATAR = `https://api.dicebear.com/7.x/avataaars/svg?seed=`;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('mindspace_user');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem('mindspace_user');
            }
        }
    }, []);

    const login = async (email: string, _password: string): Promise<boolean> => {
        // Simulate API call
        await new Promise(r => setTimeout(r, 800));
        const stored = localStorage.getItem(`mindspace_account_${email}`);
        if (stored) {
            const account = JSON.parse(stored);
            setUser(account);
            localStorage.setItem('mindspace_user', JSON.stringify(account));
            return true;
        }
        return false;
    };

    const signup = async (name: string, email: string, _password: string): Promise<boolean> => {
        await new Promise(r => setTimeout(r, 800));
        const newUser: UserProfile = {
            id: Date.now().toString(),
            name,
            email,
            avatar: `${DEFAULT_AVATAR}${name}`,
            bio: 'Mental wellness enthusiast on a journey to better health.',
            location: '',
            phone: '',
            joinDate: new Date().toISOString(),
            moodHistory: [],
            streak: 0,
            sessionsCompleted: 0,
            goalsAchieved: 0,
        };
        localStorage.setItem(`mindspace_account_${email}`, JSON.stringify(newUser));
        localStorage.setItem('mindspace_user', JSON.stringify(newUser));
        setUser(newUser);
        return true;
    };

    const logout = () => {
        localStorage.removeItem('mindspace_user');
        setUser(null);
    };

    const updateProfile = (data: Partial<UserProfile>) => {
        if (!user) return;
        const updated = { ...user, ...data };
        setUser(updated);
        localStorage.setItem('mindspace_user', JSON.stringify(updated));
        localStorage.setItem(`mindspace_account_${updated.email}`, JSON.stringify(updated));
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
