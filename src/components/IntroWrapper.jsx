"use client";

import { useState, useEffect } from "react";
import IntroAnimation from "./IntroAnimation";

const IntroWrapper = ({ children }) => {
    const [showIntro, setShowIntro] = useState(true);
    const [contentReady, setContentReady] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check if intro has already been shown in this session
        const introShown = sessionStorage.getItem("introShown");
        if (introShown) {
            setShowIntro(false);
            setContentReady(true);
            setContentVisible(true);
        } else {
            // Hide scrollbar during intro
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const handleIntroComplete = () => {
        // First prepare content (still hidden)
        setContentReady(true);

        // Small delay to ensure DOM is ready
        requestAnimationFrame(() => {
            setShowIntro(false);
            window.scrollTo(0, 0); // Ensure page starts at top
            document.body.style.overflow = '';
            sessionStorage.setItem("introShown", "true");

            // Animate content in after intro is fully gone
            requestAnimationFrame(() => {
                setContentVisible(true);
            });
        });
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Don't render anything until mounted (prevents hydration mismatch)
    if (!mounted) {
        return null;
    }

    return (
        <>
            {showIntro && (
                <IntroAnimation onComplete={handleIntroComplete} />
            )}
            <div
                style={{
                    opacity: contentVisible ? 1 : 0,
                    transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                    visibility: contentReady ? 'visible' : 'hidden',
                }}
            >
                {children}
            </div>
        </>
    );
};

export default IntroWrapper;
