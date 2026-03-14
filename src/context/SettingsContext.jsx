'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const fetchSettings = async () => {
        try {
            const response = await fetch(`${API_URL}/api/settings`, { cache: "no-store" });
            const data = await response.json();
            if (data.success) {
                setSettings(data.data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    // Helper function to get setting value based on language
    const getSetting = (key, language = 'en') => {
        if (!settings) return '';

        // If language is Bengali, try to get Bengali version first
        if (language === 'bn') {
            const bnKey = key + 'Bn';
            if (settings[bnKey]) {
                return settings[bnKey];
            }
        }

        return settings[key] || '';
    };

    const value = {
        settings,
        loading,
        getSetting,
        refreshSettings: fetchSettings,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export default SettingsContext;
